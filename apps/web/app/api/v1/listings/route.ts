import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { CreateListingUseCase, SearchListingsUseCase, PrismaListingRepository, PrismaSellerRepository } from '@repo/core/marketplace';
import { requireSeller } from '@/lib/middleware/auth';

// Validation Schemas
const CreateListingSchema = z.object({
  speciesId: z.string().uuid('Invalid species ID format'),
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title cannot exceed 200 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  basePrice: z.number().positive('Price must be positive'),
  inventory: z.number().int().min(0, 'Inventory cannot be negative'),
  metadata: z.object({}).optional(),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required').max(6, 'Maximum 6 images allowed').optional(),
});

const SearchListingsSchema = z.object({
  speciesId: z.string().uuid().optional(),
  sellerId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'SOLD_OUT', 'FLAGGED', 'ARCHIVED']).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  searchTerm: z.string().optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(100).optional(),
});

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}

/**
 * POST /api/v1/listings
 * Create a new listing (PROTECTED - Requires SELLER role)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate and check role
    const authenticatedUser = await requireSeller(request);
    console.log('User authenticated for create listing:', authenticatedUser);

    // 2. Parse and validate request body
    const body = await request.json();
    const { images, ...listingData } = body;
    const validatedData = CreateListingSchema.parse(body);

    // 3. Initialize repositories and use case
    const listingRepository = new PrismaListingRepository(prisma);
    const sellerRepository = new PrismaSellerRepository(prisma);
    const useCase = new CreateListingUseCase(listingRepository, sellerRepository);

    // 4. Execute use case with authenticated user's ID
    const result = await useCase.execute({
      ...listingData,
      sellerId: authenticatedUser.userId, // Use authenticated user's ID, not from request body
    });

    // 5. Save images to database if provided
    // 5. Save images to database if provided
    if (images && images.length > 0) {
      // Create images
      await prisma.listingImage.createMany({
        data: images.map((url: string, index: number) => ({
          listingId: result.id,
          url: url,
          order: index,
          altText: `${result.title} - Image ${index + 1}`,
        })),
      });

      console.log(`Saved ${images.length} images for listing ${result.id}`);

      // Queue background jobs for species verification
      try {
        // Dynamic import to avoid build issues if worker deps are missing
        const { getQueue, QUEUE_NAMES } = await import('@/lib/queue/config');
        const verificationQueue = getQueue(QUEUE_NAMES.SPECIES_VERIFICATION);

        // Fetch the created images to get their IDs
        const createdImages = await prisma.listingImage.findMany({
          where: { listingId: result.id },
        });

        // Add jobs to queue
        const jobPromises = createdImages.map((image) => 
          verificationQueue.add('verify-species', {
            listingId: result.id,
            imageId: image.id,
            imageUrl: image.url,
          })
        );

        await Promise.all(jobPromises);
        console.log(`🚀 Queued ${jobPromises.length} verification jobs`);
      } catch (queueError) {
        console.error('❌ Failed to queue verification jobs:', queueError);
        // Don't fail the request, just log the error
      }
    }

    // 6. Fetch listing with images
    const listingWithImages = await prisma.listing.findUnique({
      where: { id: result.id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        seller: {
          select: {
            id: true,
            businessName: true,
            verified: true,
            rating: true,
          },
        },
        species: {
          select: {
            id: true,
            scientificName: true,
            commonName: true,
          },
        },
      },
    });

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        data: listingWithImages,
        message: 'Listing created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle authentication errors
    if (error instanceof Error && error.message.includes('Authentication')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 401 }
      );
    }

    return handleError(error);
  }
}

/**
 * GET /api/v1/listings
 * Search listings with filters
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Parse query parameters
    const searchParams = request.nextUrl.searchParams;

    const queryData = {
      speciesId: searchParams.get('speciesId') || undefined,
      sellerId: searchParams.get('sellerId') || undefined,
      status: searchParams.get('status')?.toUpperCase() || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      searchTerm: searchParams.get('searchTerm') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : undefined,
    };

    // 2. Validate query parameters
    const validatedData = SearchListingsSchema.parse(queryData);

    // 3. Initialize repository and use case
    const listingRepository = new PrismaListingRepository(prisma);
    const useCase = new SearchListingsUseCase(listingRepository);

    // 4. Execute use case
    const result = await useCase.execute(validatedData);

    // 5. Fetch images for the listings (Presentation Layer enrichment)
    const listingIds = result.listings.map(l => l.id);
    
    const images = await prisma.listingImage.findMany({
      where: { listingId: { in: listingIds } },
      orderBy: { order: 'asc' },
      include: {
        imageAnalysis: true, // Include AI analysis data!
      },
    });

    // 6. Attach images to listings
    const listingsWithImages = result.listings.map(listing => {
      const listingImages = images.filter(img => img.listingId === listing.id);
      return {
        ...listing, // Spread domain entity properties
        // Manually map domain properties to JSON since spread on class instance might miss getters
        id: listing.id,
        title: listing.title,
        description: listing.description,
        basePrice: listing.basePrice.getAmount(),
        currency: listing.basePrice.getCurrency(),
        inventory: listing.inventory,
        status: listing.status,
        sellerId: listing.sellerId,
        speciesId: listing.speciesId,
        createdAt: listing.createdAt,
        images: listingImages.map(img => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          analysis: img.imageAnalysis ? {
            status: img.imageAnalysis.verificationStatus,
            topPrediction: img.imageAnalysis.topPrediction,
            confidence: img.imageAnalysis.confidence,
          } : null,
        })),
      };
    });

    // 7. Return success response
    return NextResponse.json({
      success: true,
      data: {
        ...result,
        listings: listingsWithImages,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Centralized error handler
 */
function handleError(error: unknown): NextResponse {
  // Validation errors (Zod)
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }

  // Business logic errors
  if (error instanceof Error) {
    // Check for specific error messages
    if (error.message.includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 404 }
      );
    }

    if (error.message.includes('Only verified sellers')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 403 }
      );
    }

    // Generic business error
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }

  // Unknown error
  console.error('Unexpected error:', error);
  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error',
    },
    { status: 500 }
  );
}
