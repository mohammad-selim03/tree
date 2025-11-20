/**
 * TokenService
 * 
 * Domain service for managing authentication tokens.
 * Handles token generation, verification, and refresh.
 */

import { AccessToken, AccessTokenPayload } from '../value-objects/AccessToken';
import { RefreshToken } from '../value-objects/RefreshToken';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class TokenService {
  /**
   * Generate a new token pair (access + refresh)
   */
  public generateTokenPair(userId: string, email: string, role: string): TokenPair {
    const accessTokenPayload: AccessTokenPayload = {
      userId,
      email,
      role,
    };

    const accessToken = AccessToken.generate(accessTokenPayload);
    const refreshToken = RefreshToken.generate(userId);

    return {
      accessToken: accessToken.getValue(),
      refreshToken: refreshToken.getValue(),
    };
  }

  /**
   * Verify an access token
   */
  public verifyAccessToken(token: string): AccessTokenPayload {
    return AccessToken.verify(token);
  }

  /**
   * Verify a refresh token
   */
  public verifyRefreshToken(token: string): { userId: string; tokenId: string } {
    return RefreshToken.verify(token);
  }

  /**
   * Refresh tokens - generate new pair from valid refresh token
   */
  public refreshTokens(
    refreshTokenString: string,
    email: string,
    role: string
  ): TokenPair {
    // Verify the refresh token
    const refreshToken = RefreshToken.fromString(refreshTokenString);
    const userId = refreshToken.getUserId();

    // Generate new token pair
    return this.generateTokenPair(userId, email, role);
  }

  /**
   * Extract token from Authorization header
   */
  public extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader) {
      return null;
    }

    // Expected format: "Bearer <token>"
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}
