/**
 * Marketplace Domain Module Exports
 * 
 * Exports all domain entities, value objects, aggregates, and repositories.
 */

// Value Objects
export { Money } from './domain/value-objects/Money';
export { SKU } from './domain/value-objects/SKU';

// Entities
export { Seller, type SellerProps } from './domain/entities/Seller';

// Aggregates
export { 
  Listing, 
  ListingStatus, 
  type ListingProps,
  type DomainEvent 
} from './domain/aggregates/Listing';

// Repository Interfaces
export { 
  type IListingRepository,
  type ListingSearchFilters,
  type ListingSearchResult 
} from './domain/repositories/IListingRepository';
export { type ISellerRepository } from './domain/repositories/ISellerRepository';

// Repository Implementations
export { PrismaListingRepository } from './infrastructure/repositories/PrismaListingRepository';
export { PrismaSellerRepository } from './infrastructure/repositories/PrismaSellerRepository';

// DTOs
export {
  type CreateListingDTO,
  type UpdateListingDTO,
  type SearchListingsDTO,
  type ListingResponseDTO,
  type ListingDetailResponseDTO,
  type ListingSearchResponseDTO,
} from './application/dtos/ListingDTO';

export {
  type CreateSellerDTO,
  type UpdateSellerDTO,
  type ConnectStripeDTO,
  type SellerResponseDTO,
  type SellerProfileDTO,
} from './application/dtos/SellerDTO';

// Use Cases
export { CreateListingUseCase } from './application/use-cases/CreateListingUseCase';
export { PublishListingUseCase } from './application/use-cases/PublishListingUseCase';
export { GetListingUseCase } from './application/use-cases/GetListingUseCase';
export { SearchListingsUseCase } from './application/use-cases/SearchListingsUseCase';
