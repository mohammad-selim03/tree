/**
 * Orders API Routes
 * 
 * POST /api/v1/orders - Create order
 * GET  /api/v1/orders - Get order history
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { CreateOrderUseCase } from '@repo/core/orders/application/use-cases/CreateOrderUseCase';
import { GetOrderHistoryUseCase } from '@repo/core/orders/application/use-cases/GetOrderHistoryUseCase';
import { PrismaOrderRepository } from '@repo/core/orders/infrastructure/repositories/PrismaOrderRepository';
import { PrismaListingRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository';
import { requireAuthenticated } from '@/lib/middleware/auth';

// Validation Schemas
const CreateOrderSchema = z.object({
  listingId: z.string().uuid('Invalid listing ID'),
  quantity: z.number().int().positive('Quantity must be positive').max(1000),
  shippingAddress: z.object({
    fullName: z.string().min(2).max(100),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(3).max(10),
    country: z.string().length(2),
    phoneNumber: z.string().min(7).max(20),
  }),
  notes: z.string().optional(),
});

const SearchOrdersSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(100).optional(),
});

/**
 * POST /api/v1/orders
 * Create a new order (PROTECTED)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    const user = await requireAuthenticated(request);

    // 2. Parse and validate request body
    const body = await request.json();
    const validatedData = CreateOrderSchema.parse(body);

    // 3. Initialize dependencies
    const orderRepository = new PrismaOrderRepository(prisma);
    const listingRepository = new PrismaListingRepository(prisma);
    const useCase = new CreateOrderUseCase(orderRepository, listingRepository);

    // 4. Execute use case
    const result = await useCase.execute(user.userId, validatedData);

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Order created successfully',
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
    console.error('Create order error:', error);
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
 * GET /api/v1/orders
 * Get order history (PROTECTED)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate
    const user = await requireAuthenticated(request);

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = {
      status: searchParams.get('status') || undefined,
      fromDate: searchParams.get('fromDate') || undefined,
      toDate: searchParams.get('toDate') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : undefined,
    };

    const validatedParams = SearchOrdersSchema.parse(queryParams);

    // 3. Initialize dependencies
    const orderRepository = new PrismaOrderRepository(prisma);
    const useCase = new GetOrderHistoryUseCase(orderRepository);

    // 4. Determine role (buyer or seller)
    const role: 'buyer' | 'seller' = user.role === 'SELLER' ? 'seller' : 'buyer';

    // 5. Execute use case
    const result = await useCase.execute(user.userId, validatedParams, role);

    // 6. Return success response
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

    // Unknown error
    console.error('Get orders error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
