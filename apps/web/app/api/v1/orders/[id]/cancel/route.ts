/**
 * Cancel Order API Route
 * 
 * POST /api/v1/orders/:id/cancel - Cancel an order
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { CancelOrderUseCase } from '@repo/core/orders/application/use-cases/CancelOrderUseCase';
import { PrismaOrderRepository } from '@repo/core/orders/infrastructure/repositories/PrismaOrderRepository';
import { PrismaListingRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository';
import { requireAuthenticated } from '@/lib/middleware/auth';

const CancelOrderSchema = z.object({
  reason: z.string().optional(),
});

/**
 * POST /api/v1/orders/:id/cancel
 * Cancel an order (PROTECTED - Buyer only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authenticate
    const user = await requireAuthenticated(request);

    // 2. Parse request body
    const body = await request.json();
    const validatedData = CancelOrderSchema.parse(body);

    // 3. Initialize dependencies
    const orderRepository = new PrismaOrderRepository(prisma);
    const listingRepository = new PrismaListingRepository(prisma);
    const useCase = new CancelOrderUseCase(orderRepository, listingRepository);

    // 4. Execute use case
    const result = await useCase.execute(params.id, user.userId, validatedData.reason);

    // 5. Return success response
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Order cancelled successfully',
    });
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

    // Handle authorization errors
    if (error instanceof Error && error.message.includes('Only the buyer')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 403 }
      );
    }

    // Handle validation errors
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

    // Handle business logic errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    // Unknown error
    console.error('Cancel order error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
