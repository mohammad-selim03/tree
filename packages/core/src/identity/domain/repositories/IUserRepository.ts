/**
 * User Repository Interface
 * 
 * Defines the contract for user persistence operations.
 */

import { User } from '../entities/User';
import { Email } from '../value-objects/Email';

export interface IUserRepository {
  /**
   * Find a user by their ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find a user by email address
   */
  findByEmail(email: Email): Promise<User | null>;

  /**
   * Save a user (create or update)
   */
  save(user: User): Promise<void>;

  /**
   * Delete a user (soft delete)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if email already exists
   */
  existsByEmail(email: Email): Promise<boolean>;

  /**
   * Find all users with a specific role
   */
  findByRole(role: string): Promise<User[]>;

  /**
   * Count total users
   */
  count(): Promise<number>;
}
