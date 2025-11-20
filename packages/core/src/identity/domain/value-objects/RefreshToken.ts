/**
 * RefreshToken Value Object
 * 
 * Encapsulates JWT refresh token logic.
 * Long-lived token for obtaining new access tokens (7 days).
 */

import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string; // Unique ID for token rotation/revocation
}

export class RefreshToken {
  private readonly token: string;
  private static readonly EXPIRY = '7d'; // 7 days
  private static readonly SECRET = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-change-in-production';

  private constructor(token: string) {
    this.token = token;
  }

  /**
   * Generate a new refresh token
   */
  public static generate(userId: string): RefreshToken {
    const tokenId = RefreshToken.generateTokenId();

    const token = jwt.sign(
      { userId, tokenId } as RefreshTokenPayload,
      RefreshToken.SECRET,
      {
        expiresIn: RefreshToken.EXPIRY,
        issuer: 'treeverse-api',
        audience: 'treeverse-client',
      }
    );

    return new RefreshToken(token);
  }

  /**
   * Verify and decode a refresh token
   */
  public static verify(token: string): RefreshTokenPayload {
    try {
      const decoded = jwt.verify(token, RefreshToken.SECRET, {
        issuer: 'treeverse-api',
        audience: 'treeverse-client',
      }) as RefreshTokenPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      throw new Error('Refresh token verification failed');
    }
  }

  /**
   * Create from existing token string (for verification)
   */
  public static fromString(token: string): RefreshToken {
    // Verify the token is valid before creating the value object
    RefreshToken.verify(token);
    return new RefreshToken(token);
  }

  /**
   * Generate a unique token ID for tracking/revocation
   */
  private static generateTokenId(): string {
    return randomBytes(16).toString('hex');
  }

  /**
   * Get the token string
   */
  public getValue(): string {
    return this.token;
  }

  /**
   * Get the token ID from the token
   */
  public getTokenId(): string {
    const payload = RefreshToken.verify(this.token);
    return payload.tokenId;
  }

  /**
   * Get the user ID from the token
   */
  public getUserId(): string {
    const payload = RefreshToken.verify(this.token);
    return payload.userId;
  }

  /**
   * Check if token is expired
   */
  public isExpired(): boolean {
    try {
      jwt.verify(this.token, RefreshToken.SECRET);
      return false;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return true;
      }
      return false;
    }
  }
}
