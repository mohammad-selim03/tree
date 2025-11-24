/**
 * Get Current User Profile API Route
 * 
 * GET /api/v1/auth/me
 * Protected route - requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { GetUserProfileUseCase, PrismaUserRepository } from '@repo/core/identity';
import { authenticateRequest } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate request
    const user = await authenticateRequest(request);

    // 2. Initialize dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const useCase = new GetUserProfileUseCase(userRepository);

    // 3. Execute use case
    const result = await useCase.execute(user.userId);

    // 4. Return success response
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Handle authentication errors
    if (error instanceof Error) {
      if (
        error.message.includes('Authentication failed') ||
        error.message.includes('No authentication token')
      ) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 401 } // Unauthorized
        );
      }

      if (error.message.includes('not found')) {
        return NextResponse.json(
          {
            success: false,
            error: 'User not found',
          },
          { status: 404 }
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
    console.error('Get profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
