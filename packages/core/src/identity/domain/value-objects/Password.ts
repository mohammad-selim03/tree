/**
 * Password Value Object
 * 
 * Encapsulates password validation and hashing logic.
 * Ensures passwords meet security requirements.
 */

import bcrypt from 'bcryptjs';

export class Password {
  private readonly hashedValue: string;
  private static readonly SALT_ROUNDS = 12;
  private static readonly MIN_LENGTH = 8;

  private constructor(hashedValue: string) {
    this.hashedValue = hashedValue;
  }

  /**
   * Create a Password from plaintext (for registration/password change)
   */
  public static async create(plaintext: string): Promise<Password> {
    Password.validate(plaintext);
    const hashed = await bcrypt.hash(plaintext, Password.SALT_ROUNDS);
    return new Password(hashed);
  }

  /**
   * Reconstitute a Password from a hash (from database)
   */
  public static fromHash(hash: string): Password {
    if (!hash || hash.length === 0) {
      throw new Error('Password hash cannot be empty');
    }
    return new Password(hash);
  }

  /**
   * Validate plaintext password meets requirements
   */
  private static validate(plaintext: string): void {
    if (!plaintext || plaintext.length === 0) {
      throw new Error('Password cannot be empty');
    }

    if (plaintext.length < Password.MIN_LENGTH) {
      throw new Error(`Password must be at least ${Password.MIN_LENGTH} characters`);
    }

    if (plaintext.length > 128) {
      throw new Error('Password cannot exceed 128 characters');
    }

    // Must contain at least one uppercase letter
    if (!/[A-Z]/.test(plaintext)) {
      throw new Error('Password must contain at least one uppercase letter');
    }

    // Must contain at least one lowercase letter
    if (!/[a-z]/.test(plaintext)) {
      throw new Error('Password must contain at least one lowercase letter');
    }

    // Must contain at least one number
    if (!/[0-9]/.test(plaintext)) {
      throw new Error('Password must contain at least one number');
    }

    // Check for common weak passwords
    const weakPasswords = ['Password123', 'Admin123', 'Welcome123'];
    if (weakPasswords.includes(plaintext)) {
      throw new Error('Password is too common, please choose a stronger password');
    }
  }

  /**
   * Compare plaintext password with hashed password
   */
  public async compare(plaintext: string): Promise<boolean> {
    return bcrypt.compare(plaintext, this.hashedValue);
  }

  /**
   * Get the hashed value (for persistence)
   */
  public getHashedValue(): string {
    return this.hashedValue;
  }
}
