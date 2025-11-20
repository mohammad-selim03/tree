/**
 * Single Listing API Routes
 * 
 * GET    /api/v1/listings/[id]  - Get a single listing
 * PUT    /api/v1/listings/[id]  - Update a listing
 * DELETE /api/v1/listings/[id]  - Delete a listing
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { GetListingUseCase } from '@repo/core/marketplace/application/use-cases/GetListingUseCase';
import { PrismaListingRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository';

const UpdateListingSchema = z.object({
  title: z.string().min(10).max(200).optional(),
  description: z.string().min(50).optional(),
  basePrice: z.number().positive().optional(),
  inventory: z.number().int().min(0).optional(),
  metadata: z.object({}).optional(),
});

/**
 * GET /api/v1/listings/[id]
 * Get a single listing by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid listing ID format',
        },
        { status: 400 }
      );
    }

    // Initialize repository and use case
    const listingRepository = new PrismaListingRepository(prisma);
    const useCase = new GetListingUseCase(listingRepository);

    // Execute use case
    const result = await useCase.execute(id);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Listing not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/v1/listings/[id]
 * Update a listing
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid listing ID format',
        },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = UpdateListingSchema.parse(body);

    // Get listing
    const listingRepository = new PrismaListingRepository(prisma);
    const listing = await listingRepository.findById(id);

    if (!listing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Listing not found',
        },
        { status: 404 }
      );
    }

    // Update listing
    if (validatedData.title || validatedData.description) {
      listing.updateDetails(
        validatedData.title ?? listing.title,
        validatedData.description ?? listing.description
      );
    }

    if (validatedData.basePrice !== undefined) {
      const { Money } = await import('@repo/core/marketplace/domain/value-objects/Money');
      listing.updatePrice(Money.create(validatedData.basePrice));
    }

    if (validatedData.inventory !== undefined) {
      listing.updateInventory(validatedData.inventory);
    }

    if (validatedData.metadata) {
      listing.updateMetadata(validatedData.metadata);
    }

    // Save changes
    await listingRepository.save(listing);

    // Return updated listing
    const useCase = new GetListingUseCase(listingRepository);
    const result = await useCase.execute(id, false);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Listing updated successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/listings/[id]
 * Delete (archive) a listing
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid listing ID format',
        },
        { status: 400 }
      );
    }

    // Delete listing
    const listingRepository = new PrismaListingRepository(prisma);
    await listingRepository.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
