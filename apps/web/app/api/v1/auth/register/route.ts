/**
 * Register API Route
 * 
 * POST /api/v1/auth/register
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { RegisterUserUseCase } from '@repo/core/identity/application/use-cases/RegisterUserUseCase';
import { PrismaUserRepository } from '@repo/core/identity/infrastructure/repositories/PrismaUserRepository';
import { TokenService } from '@repo/core/identity/domain/services/TokenService';

const RegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().optional(),
  role: z.enum(['BUYER', 'SELLER']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = RegisterSchema.parse(body);

    // 2. Initialize dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const tokenService = new TokenService();
    const useCase = new RegisterUserUseCase(userRepository, tokenService);

    // 3. Execute use case
    const result = await useCase.execute(validatedData);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'User registered successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle business logic errors
    if (error instanceof Error) {
      // Check for duplicate email
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 409 } // Conflict
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
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
