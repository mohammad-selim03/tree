/**
 * API Client Index
 * 
 * Centralized exports for all API endpoints.
 * Import from here for clean, organized API calls.
 * 
 * @example
 * import { api } from '@/lib/api';
 * 
 * const result = await api.auth.login(credentials);
 * const listings = await api.listings.search(filters);
 */

export { httpClient } from './client';
export { authApi } from './endpoints/auth';
export { listingsApi } from './endpoints/listings';
export { ordersApi } from './endpoints/orders';

/**
 * Unified API object for convenient access
 */
export const api = {
    auth: authApi,
    listings: listingsApi,
    orders: ordersApi,
} as const;
