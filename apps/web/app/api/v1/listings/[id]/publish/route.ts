/**
 * Publish Listing API Route
 * 
 * POST /api/v1/listings/[id]/publish  - Publish a listing
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { PublishListingUseCase } from '@repo/core/marketplace/application/use-cases/PublishListingUseCase';
import { PrismaListingRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository';

const PublishListingSchema = z.object({
  sellerId: z.string().uuid('Invalid seller ID format'),
});

/**
 * POST /api/v1/listings/[id]/publish
 * Publish a listing
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate listing ID format
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
    const validatedData = PublishListingSchema.parse(body);

    // Initialize repository and use case
    const listingRepository = new PrismaListingRepository(prisma);
    const useCase = new PublishListingUseCase(listingRepository);

    // Execute use case
    const result = await useCase.execute(id, validatedData.sellerId);

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Listing published successfully',
      },
      { status: 200 }
    );
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
      // Handle specific business errors
      if (error.message.includes('not found')) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 404 }
        );
      }

      if (error.message.includes('owner')) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
