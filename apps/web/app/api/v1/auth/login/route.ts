/**
 * Login API Route
 * 
 * POST /api/v1/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { LoginUserUseCase, PrismaUserRepository, TokenService } from '@repo/core/identity';

const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = LoginSchema.parse(body);

    // 2. Initialize dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const tokenService = new TokenService();
    const useCase = new LoginUserUseCase(userRepository, tokenService);

    // 3. Execute use case
    const result = await useCase.execute(validatedData);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Login successful',
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
      // Don't reveal whether email or password was wrong (security)
      if (error.message.includes('Invalid email or password')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid email or password',
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
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
