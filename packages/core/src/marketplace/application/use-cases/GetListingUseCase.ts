/**
 * Get Listing Use Case
 * 
 * Retrieve a single listing by ID and increment view count.
 */

import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { ListingResponseDTO } from '../dtos/ListingDTO';

export class GetListingUseCase {
  constructor(private listingRepository: IListingRepository) {}

  async execute(listingId: string, incrementView: boolean = true): Promise<ListingResponseDTO> {
    // 1. Find listing
    const listing = await this.listingRepository.findById(listingId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    // 2. Increment view count if requested (e.g., when buyer views, not when seller edits)
    if (incrementView && listing.isVisible()) {
      listing.incrementViewCount();
      await this.listingRepository.save(listing);
    }

    // 3. Return response
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
