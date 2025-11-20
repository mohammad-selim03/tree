/**
 * Search Listings Use Case
 * 
 * Search and filter listings with pagination.
 */

import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { SearchListingsDTO, ListingSearchResponseDTO, ListingResponseDTO } from '../dtos/ListingDTO';

export class SearchListingsUseCase {
  constructor(private listingRepository: IListingRepository) {}

  async execute(dto: SearchListingsDTO): Promise<ListingSearchResponseDTO> {
    // Set defaults
    const page = dto.page ?? 1;
    const pageSize = dto.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    // Execute search
    const result = await this.listingRepository.search({
      speciesId: dto.speciesId,
      sellerId: dto.sellerId,
      status: dto.status ?? 'ACTIVE', // Default to showing only active listings
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      searchTerm: dto.searchTerm,
      limit: pageSize,
      offset,
    });

    // Calculate total pages
    const totalPages = Math.ceil(result.total / pageSize);

    // Map to response DTOs
    const listings = result.listings.map(listing => this.toResponseDTO(listing));

    return {
      listings,
      total: result.total,
      page,
      pageSize,
      totalPages,
    };
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
