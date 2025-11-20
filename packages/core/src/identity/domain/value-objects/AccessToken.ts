/**
 * AccessToken Value Object
 * 
 * Encapsulates JWT access token logic.
 * Short-lived token for API authentication (15 minutes).
 */

import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AccessToken {
  private readonly token: string;
  private static readonly EXPIRY = '15m'; // 15 minutes
  private static readonly SECRET = process.env.JWT_ACCESS_SECRET || 'default-access-secret-change-in-production';

  private constructor(token: string) {
    this.token = token;
  }

  /**
   * Generate a new access token
   */
  public static generate(payload: AccessTokenPayload): AccessToken {
    const token = jwt.sign(
      payload,
      AccessToken.SECRET,
      {
        expiresIn: AccessToken.EXPIRY,
        issuer: 'treeverse-api',
        audience: 'treeverse-client',
      }
    );

    return new AccessToken(token);
  }

  /**
   * Verify and decode an access token
   */
  public static verify(token: string): AccessTokenPayload {
    try {
      const decoded = jwt.verify(token, AccessToken.SECRET, {
        issuer: 'treeverse-api',
        audience: 'treeverse-client',
      }) as AccessTokenPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      }
      throw new Error('Access token verification failed');
    }
  }

  /**
   * Create from existing token string (for verification)
   */
  public static fromString(token: string): AccessToken {
    // Verify the token is valid before creating the value object
    AccessToken.verify(token);
    return new AccessToken(token);
  }

  /**
   * Get the token string
   */
  public getValue(): string {
    return this.token;
  }

  /**
   * Check if token is expired
   */
  public isExpired(): boolean {
    try {
      jwt.verify(this.token, AccessToken.SECRET);
      return false;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return true;
      }
      return false;
    }
  }
}
