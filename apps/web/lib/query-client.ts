/**
 * TanStack Query Configuration
 * 
 * Query client setup with defaults and query key factory.
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Create Query Client with optimized defaults
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: 'always',
        },
        mutations: {
            retry: 1,
        },
    },
});

/**
 * Query Keys Factory
 * Centralized, type-safe query keys following TanStack Query best practices
 */
export const queryKeys = {
    // Auth
    auth: {
        all: ['auth'] as const,
        me: () => [...queryKeys.auth.all, 'me'] as const,
    },

    // Listings
    listings: {
        all: ['listings'] as const,
        lists: () => [...queryKeys.listings.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.listings.lists(), { filters }] as const,
        details: () => [...queryKeys.listings.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.listings.details(), id] as const,
    },

    // Orders
    orders: {
        all: ['orders'] as const,
        lists: () => [...queryKeys.orders.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.orders.lists(), { filters }] as const,
        details: () => [...queryKeys.orders.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.orders.details(), id] as const,
    },

    // Species
    species: {
        all: ['species'] as const,
        lists: () => [...queryKeys.species.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.species.lists(), { filters }] as const,
        details: () => [...queryKeys.species.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.species.details(), id] as const,
    },

    // Reviews
    reviews: {
        all: ['reviews'] as const,
        byListing: (listingId: string) =>
            [...queryKeys.reviews.all, 'listing', listingId] as const,
    },

    // Seller
    seller: {
        all: ['seller'] as const,
        stats: (sellerId: string) =>
            [...queryKeys.seller.all, 'stats', sellerId] as const,
    },
} as const;
