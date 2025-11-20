/**
 * Create Listing Use Case
 * 
 * Handles the business logic for creating a new listing.
 * Validates seller exists and delegates to domain entity for creation.
 */

import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { ISellerRepository } from '../../domain/repositories/ISellerRepository';
import { Listing } from '../../domain/aggregates/Listing';
import { Money } from '../../domain/value-objects/Money';
import { CreateListingDTO, ListingResponseDTO } from '../dtos/ListingDTO';

export class CreateListingUseCase {
  constructor(
    private listingRepository: IListingRepository,
    private sellerRepository: ISellerRepository
  ) {}

  async execute(dto: CreateListingDTO): Promise<ListingResponseDTO> {
    // 1. Verify seller exists and is active
    const seller = await this.sellerRepository.findById(dto.sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }

    if (!seller.verified) {
      throw new Error('Only verified sellers can create listings');
    }

    // 2. Create listing domain object
    const listing = Listing.create({
      sellerId: dto.sellerId,
      speciesId: dto.speciesId,
      title: dto.title,
      description: dto.description,
      basePrice: Money.create(dto.basePrice, 'USD'),
      inventory: dto.inventory,
      metadata: dto.metadata,
    });

    // 3. Persist listing
    await this.listingRepository.save(listing);

    // 4. Return DTO
    return this.toResponseDTO(listing);
  }

  private toResponseDTO(listing: Listing): ListingResponseDTO {
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
