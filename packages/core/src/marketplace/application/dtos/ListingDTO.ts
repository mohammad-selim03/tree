/**
 * Listing DTOs (Data Transfer Objects)
 * 
 * Used for transferring data between layers (API -> Application -> Domain).
 */

// Request DTOs

export interface CreateListingDTO {
  sellerId: string;
  speciesId: string;
  title: string;
  description: string;
  basePrice: number;
  inventory: number;
  metadata?: object;
}

export interface UpdateListingDTO {
  title?: string;
  description?: string;
  basePrice?: number;
  inventory?: number;
  metadata?: object;
}

export interface SearchListingsDTO {
  speciesId?: string;
  sellerId?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

// Response DTOs

export interface ListingResponseDTO {
  id: string;
  sellerId: string;
  speciesId: string;
  title: string;
  description: string;
  basePrice: number;
  currency: string;
  inventory: number;
  status: string;
  viewCount: number;
  metadata?: object;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingDetailResponseDTO extends ListingResponseDTO {
  seller: {
    id: string;
    businessName: string;
    verified: boolean;
    rating: number;
  };
  species: {
    id: string;
    commonName: string;
    scientificName: string;
  };
  images?: Array<{
    id: string;
    url: string;
    altText?: string;
  }>;
}

export interface ListingSearchResponseDTO {
  listings: ListingResponseDTO[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
