/**
 * Authentication Middleware
 * 
 * Verifies JWT tokens and attaches user information to requests.
 */

import { NextRequest } from 'next/server';
import { TokenService } from '@repo/core/identity/domain/services/TokenService';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

/**
 * Extract and verify JWT token from request
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<{ userId: string; email: string; role: string }> {
  const tokenService = new TokenService();

  // Extract token from Authorization header
  const authHeader = request.headers.get('Authorization');
  const token = tokenService.extractTokenFromHeader(authHeader);

  if (!token) {
    throw new Error('No authentication token provided');
  }

  // Verify token
  try {
    const payload = tokenService.verifyAccessToken(token);

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    // Debug: Check if secret is loaded
    if (!process.env.JWT_SECRET) {
      console.error('CRITICAL: JWT_SECRET is missing in environment variables!');
    }

    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw new Error('Authentication failed');
  }
}

/**
 * Middleware to require specific roles
 */
export function requireRole(allowedRoles: string[]) {
  return async (request: AuthenticatedRequest) => {
    const user = await authenticateRequest(request);

    if (!allowedRoles.includes(user.role)) {
      console.error(`Role mismatch: User role '${user.role}' is not in allowed roles: ${allowedRoles.join(', ')}`);
      throw new Error(
        `Forbidden: Requires one of the following roles: ${allowedRoles.join(', ')}`
      );
    }

    return user;
  };
}

/**
 * Common role checks
 */
export const requireAdmin = requireRole(['ADMIN']);
export const requireSeller = requireRole(['SELLER', 'ADMIN']);
export const requireAuthenticated = authenticateRequest;
