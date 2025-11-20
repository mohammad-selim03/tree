/**
 * Listings Query Hooks
 * 
 * TanStack Query hooks for listing operations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-client';
import type { ListingFilters, CreateListingInput, UpdateListingInput } from '@/types/api';

/**
 * Search listings query
 */
export function useListings(filters?: ListingFilters) {
    return useQuery({
        queryKey: queryKeys.listings.list(filters || {}),
        queryFn: async () => {
            const result = await api.listings.search(filters);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
    });
}

/**
 * Get single listing query
 */
export function useListing(id: string, enabled = true) {
    return useQuery({
        queryKey: queryKeys.listings.detail(id),
        queryFn: async () => {
            const result = await api.listings.getById(id);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        enabled,
    });
}

/**
 * Create listing mutation
 */
export function useCreateListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateListingInput) => {
            const result = await api.listings.create(data);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        onSuccess: () => {
            // Invalidate listings queries
            queryClient.invalidateQueries({ queryKey: queryKeys.listings.lists() });
        },
    });
}

/**
 * Update listing mutation
 */
export function useUpdateListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateListingInput }) => {
            const result = await api.listings.update(id, data);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        onSuccess: (data) => {
            // Invalidate listings queries
            queryClient.invalidateQueries({ queryKey: queryKeys.listings.lists() });

            // Update single listing cache
            queryClient.setQueryData(queryKeys.listings.detail(data.id), data);
        },
    });
}

/**
 * Delete listing mutation
 */
export function useDeleteListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const result = await api.listings.delete(id);
            if (!result.success) throw new Error(result.error.message);
        },
        onSuccess: () => {
            // Invalidate listings queries
            queryClient.invalidateQueries({ queryKey: queryKeys.listings.lists() });
        },
    });
}
