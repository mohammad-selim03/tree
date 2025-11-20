/**
 * ISellerRepository Interface
 * 
 * Defines the contract for seller persistence operations.
 */

import { Seller } from '../entities/Seller';

export interface ISellerRepository {
  /**
   * Find a seller by their ID
   */
  findById(id: string): Promise<Seller | null>;

  /**
   * Find a seller by their user ID
   */
  findByUserId(userId: string): Promise<Seller | null>;

  /**
   * Find a seller by Stripe account ID
   */
  findByStripeAccountId(stripeAccountId: string): Promise<Seller | null>;

  /**
   * Find all verified sellers
   */
  findVerified(): Promise<Seller[]>;

  /**
   * Find sellers with ratings above a threshold
   */
  findByMinimumRating(rating: number): Promise<Seller[]>;

  /**
   * Save a seller (insert or update)
   */
  save(seller: Seller): Promise<void>;

  /**
   * Delete a seller (soft delete)
   */
  delete(id: string): Promise<void>;

  /**
   * Count total sellers
   */
  count(): Promise<number>;
}
