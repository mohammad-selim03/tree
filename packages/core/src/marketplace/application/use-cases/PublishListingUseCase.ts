/**
 * Publish Listing Use Case
 * 
 * Handles the business logic for publishing a listing.
 */

import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { ListingResponseDTO } from '../dtos/ListingDTO';

export class PublishListingUseCase {
  constructor(private listingRepository: IListingRepository) {}

  async execute(listingId: string, sellerId: string): Promise<ListingResponseDTO> {
    // 1. Find listing
    const listing = await this.listingRepository.findById(listingId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    // 2. Verify ownership
    if (listing.sellerId !== sellerId) {
      throw new Error('Only the listing owner can publish it');
    }

    // 3. Publish listing (domain logic handles validation)
    listing.publish();

    // 4. Persist changes
    await this.listingRepository.save(listing);

    // 5. Return response
    return this.toResponseDTO(listing);
  }

  private toResponseDTO(listing: any): ListingResponseDTO {
    return {
      id: listing.id,
      sellerId: listing.sellerId,
      speciesId: listing.speciesId,
      title: listing.title,
      description: listing.description,
      basePrice: listing.basePrice.getAmount(),
      currency: listing.basePrice.getCurrency(),
      inventory: listing.inventory,
      status: listing.status,
      viewCount: listing.viewCount,
      metadata: listing.metadata,
      publishedAt: listing.publishedAt?.toISOString(),
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    };
  }
}
