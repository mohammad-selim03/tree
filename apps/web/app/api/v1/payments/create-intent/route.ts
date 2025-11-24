/**
 * Create Payment Intent API Route
 * 
 * POST /api/v1/payments/create-intent - Create Stripe payment intent
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { CreatePaymentIntentUseCase, StripePaymentService } from '@repo/core/payments';
import { PrismaOrderRepository } from '@repo/core/orders';
import { requireAuthenticated } from '@/lib/middleware/auth';

const CreatePaymentIntentSchema = z.object({
  orderId: z.string().uuid('Invalid order ID'),
});

/**
 * POST /api/v1/payments/create-intent
 * Create payment intent for an order (PROTECTED)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    const user = await requireAuthenticated(request);

    // 2. Parse and validate request body
    const body = await request.json();
    const validatedData = CreatePaymentIntentSchema.parse(body);

    // 3. Initialize dependencies
    const orderRepository = new PrismaOrderRepository(prisma);
    const stripeService = new StripePaymentService();
    const useCase = new CreatePaymentIntentUseCase(orderRepository, stripeService);

    // 4. Execute use case
    const result = await useCase.execute(validatedData, user.userId);

    // 5. Return success response
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Payment intent created successfully',
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
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
