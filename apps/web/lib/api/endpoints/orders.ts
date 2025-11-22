/**
 * Orders API Endpoints
 * 
 * All order-related API calls.
 */

import { httpClient } from '../client';
import queryString from 'query-string';
import type {
    CreateOrderInput,
    OrderFilters,
    OrderHistoryResponse,
    UpdateOrderStatusInput,
    Result,
} from '@/types/api';
import type { Order } from '@/types/models';

export const ordersApi = {
    /**
     * Create new order
     */
    create: async (data: CreateOrderInput): Promise<Result<Order>> => {
        return httpClient.post<Order>('/orders', data);
    },

    /**
     * Get order history (buyer or seller)
     */
    getHistory: async (filters?: OrderFilters): Promise<Result<OrderHistoryResponse>> => {
        const query = filters ? `?${queryString.stringify(filters)}` : '';
        return httpClient.get<OrderHistoryResponse>(`/orders${query}`);
    },

    /**
     * Get single order by ID
     */
    getById: async (id: string): Promise<Result<Order>> => {
        return httpClient.get<Order>(`/orders/${id}`);
    },

    /**
     * Update order status (SELLER only)
     */
    updateStatus: async (
        id: string,
        data: UpdateOrderStatusInput
    ): Promise<Result<Order>> => {
        return httpClient.patch<Order>(`/orders/${id}/status`, data);
    },

    /**
     * Cancel order
     */
    cancel: async (id: string): Promise<Result<Order>> => {
        return httpClient.patch<Order>(`/orders/${id}`, {
            status: 'CANCELLED',
        });
    },
};
