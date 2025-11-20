/**
 * IListingRepository Interface
 * 
 * Defines the contract for listing persistence operations.
 * Implementations can use Prisma, TypeORM, or any other data access layer.
 */

import { Listing } from '../aggregates/Listing';

export interface ListingSearchFilters {
  speciesId?: string;
  sellerId?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  limit?: number;
  offset?: number;
}

export interface ListingSearchResult {
  listings: Listing[];
  total: number;
  limit: number;
  offset: number;
}

export interface IListingRepository {
  /**
   * Find a listing by its ID
   */
  findById(id: string): Promise<Listing | null>;

  /**
   * Find multiple listings by their IDs
   */
  findByIds(ids: string[]): Promise<Listing[]>;

  /**
   * Find all listings for a specific seller
   */
  findBySellerId(sellerId: string): Promise<Listing[]>;

  /**
   * Find all listings for a specific species
   */
  findBySpeciesId(speciesId: string): Promise<Listing[]>;

  /**
   * Search listings with filters and pagination
   */
  search(filters: ListingSearchFilters): Promise<ListingSearchResult>;

  /**
   * Save a listing (insert or update)
   */
  save(listing: Listing): Promise<void>;

  /**
   * Delete a listing (soft delete by setting deletedAt)
   */
  delete(id: string): Promise<void>;

  /**
   * Count total listings (optionally filtered by status)
   */
  count(status?: string): Promise<number>;

  /**
   * Find listings that need attention (flagged, sold out, etc.)
   */
  findNeedingAttention(): Promise<Listing[]>;
}
