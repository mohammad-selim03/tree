/**
 * Ship Order API Route
 * 
 * POST /api/v1/orders/:id/ship - Mark order as shipped
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { ShipOrderUseCase } from '@repo/core/orders/application/use-cases/ShipOrderUseCase';
import { PrismaOrderRepository } from '@repo/core/orders/infrastructure/repositories/PrismaOrderRepository';
import { requireSeller } from '@/lib/middleware/auth';

const ShipOrderSchema = z.object({
  trackingNumber: z.string().min(1, 'Tracking number is required'),
  carrier: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * POST /api/v1/orders/:id/ship
 * Ship an order (PROTECTED - Seller only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authenticate and check role
    const user = await requireSeller(request);

    // 2. Parse request body
    const body = await request.json();
    const validatedData = ShipOrderSchema.parse(body);

    // 3. Initialize dependencies
    const orderRepository = new PrismaOrderRepository(prisma);
    const useCase = new ShipOrderUseCase(orderRepository);

    // 4. Execute use case
    const result = await useCase.execute(params.id, user.userId, validatedData);

    // 5. Return success response
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Order marked as shipped',
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
    if (error instanceof Error && error.message.includes('Only the seller')) {
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
    console.error('Ship order error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
