/**
 * Listings API Endpoints
 * 
 * All listing-related API calls.
 */

import { httpClient } from '../client';
import queryString from 'query-string';
import type {
    CreateListingInput,
    UpdateListingInput,
    ListingFilters,
    ListingSearchResponse,
    ListingDetailsResponse,
    Result,
} from '@/types/api';
import type { Listing } from '@/types/models';

export const listingsApi = {
    /**
     * Search/filter listings
     */
    search: async (filters?: ListingFilters): Promise<Result<ListingSearchResponse>> => {
        const query = filters ? `?${queryString.stringify(filters)}` : '';
        return httpClient.get<ListingSearchResponse>(`/listings${query}`);
    },

    /**
     * Get single listing by ID
     */
    getById: async (id: string): Promise<Result<ListingDetailsResponse>> => {
        return httpClient.get<ListingDetailsResponse>(`/listings/${id}`);
    },

    /**
     * Create new listing (SELLER only)
     */
    create: async (data: CreateListingInput): Promise<Result<Listing>> => {
        return httpClient.post<Listing>('/listings', data);
    },

    /**
     * Update existing listing
     */
    update: async (id: string, data: UpdateListingInput): Promise<Result<Listing>> => {
        return httpClient.patch<Listing>(`/listings/${id}`, data);
    },

    /**
     * Delete listing
     */
    delete: async (id: string): Promise<Result<void>> => {
        return httpClient.delete<void>(`/listings/${id}`);
    },

    /**
     * Publish draft listing
     */
    publish: async (id: string): Promise<Result<Listing>> => {
        return httpClient.patch<Listing>(`/listings/${id}`, { status: 'ACTIVE' });
    },

    /**
     * Archive listing
     */
    archive: async (id: string): Promise<Result<Listing>> => {
        return httpClient.patch<Listing>(`/listings/${id}`, { status: 'ARCHIVED' });
    },
};
