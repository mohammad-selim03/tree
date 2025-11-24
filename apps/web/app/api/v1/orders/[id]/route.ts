/**
 * Single Order API Routes
 * 
 * GET /api/v1/orders/:id - Get order details
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { GetOrderUseCase, PrismaOrderRepository } from '@repo/core/orders';
import { requireAuthenticated } from '@/lib/middleware/auth';

/**
 * GET /api/v1/orders/:id
 * Get order details (PROTECTED)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate
    const user = await requireAuthenticated(request);

    // 2. Await params (Next.js 15+ requirement)
    const { id } = await params;

    // 3. Initialize dependencies
    const orderRepository = new PrismaOrderRepository(prisma);
    const useCase = new GetOrderUseCase(orderRepository);

    // 4. Execute use case
    const result = await useCase.execute(id, user.userId);

    // 4. Return success response
    return NextResponse.json({
      success: true,
      data: result,
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
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 403 }
      );
    }

    // Handle not found errors
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 404 }
      );
    }

    // Unknown error
    console.error('Get order error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
