/**
 * Refresh Token API Route
 * 
 * POST /api/v1/auth/refresh
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { RefreshTokenUseCase, PrismaUserRepository, TokenService } from '@repo/core/identity';

const RefreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = RefreshSchema.parse(body);

    // 2. Initialize dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const tokenService = new TokenService();
    const useCase = new RefreshTokenUseCase(userRepository, tokenService);

    // 3. Execute use case
    const result = await useCase.execute(validatedData);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Token refreshed successfully',
      },
      { status: 200 }
    );
  } catch (error) {
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
      // Invalid or expired token
      if (
        error.message.includes('expired') ||
        error.message.includes('Invalid') ||
        error.message.includes('not found')
      ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid or expired refresh token',
          },
          { status: 401 } // Unauthorized
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

    // Unknown error
    console.error('Token refresh error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
