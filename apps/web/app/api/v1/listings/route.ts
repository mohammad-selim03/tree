import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { CreateListingUseCase } from '@repo/core/marketplace/application/use-cases/CreateListingUseCase';
import { SearchListingsUseCase } from '@repo/core/marketplace/application/use-cases/SearchListingsUseCase';
import { PrismaListingRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository';
import { PrismaSellerRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaSellerRepository';
import { requireSeller } from '@/lib/middleware/auth';

// Validation Schemas
const CreateListingSchema = z.object({
  speciesId: z.string().uuid('Invalid species ID format'),
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title cannot exceed 200 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  basePrice: z.number().positive('Price must be positive'),
  inventory: z.number().int().min(0, 'Inventory cannot be negative'),
  metadata: z.object({}).optional(),
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

/**
 * POST /api/v1/listings
 * Create a new listing (PROTECTED - Requires SELLER role)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate and check role
    const authenticatedUser = await requireSeller(request);
    
    // 2. Parse and validate request body
    const body = await request.json();
    const validatedData = CreateListingSchema.parse(body);

    // 3. Initialize repositories and use case
    const listingRepository = new PrismaListingRepository(prisma);
    const sellerRepository = new PrismaSellerRepository(prisma);
    const useCase = new CreateListingUseCase(listingRepository, sellerRepository);

    // 4. Execute use case with authenticated user's ID
    const result = await useCase.execute({
      ...validatedData,
      sellerId: authenticatedUser.userId, // Use authenticated user's ID, not from request body
    });

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
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
      status: searchParams.get('status') || undefined,
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

    // 5. Return success response
    return NextResponse.json({
      success: true,
      data: result,
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
