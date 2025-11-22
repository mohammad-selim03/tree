/**
 * Orders Query Hooks
 * 
 * TanStack Query hooks for order operations.
 */

import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/lib/api/client';
import type { Result } from '@/types/api';

/**
 * Order Type
 */
export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: Array<{
        id: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
}

/**
 * Mock orders for fallback
 */
export const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'ORD-2025-001',
        date: '2025-11-15',
        status: 'delivered',
        total: 149.99,
        items: [
            { id: '1', productName: 'Japanese Maple', quantity: 1, price: 149.99 }
        ],
        shippingAddress: {
            street: '123 Garden St',
            city: 'Portland',
            state: 'OR',
            zip: '97201'
        }
    },
    {
        id: '2',
        orderNumber: 'ORD-2025-002',
        date: '2025-11-18',
        status: 'processing',
        total: 219.98,
        items: [
            { id: '2', productName: 'Blue Spruce', quantity: 1, price: 89.99 },
            { id: '3', productName: 'Apple Tree', quantity: 1, price: 129.99 }
        ],
        shippingAddress: {
            street: '456 Oak Ave',
            city: 'Seattle',
            state: 'WA',
            zip: '98101'
        }
    },
    {
        id: '3',
        orderNumber: 'ORD-2025-003',
        date: '2025-11-20',
        status: 'pending',
        total: 199.99,
        items: [
            { id: '4', productName: 'Red Oak', quantity: 1, price: 199.99 }
        ],
        shippingAddress: {
            street: '789 Pine Rd',
            city: 'Vancouver',
            state: 'BC',
            zip: 'V6B 1A1'
        }
    },
];

/**
 * Get user orders query
 */
export function useOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const result = await httpClient.get<{ orders: Order[] }>('/orders');
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        // Refetch every 30 seconds to get status updates
        staleTime: 30 * 1000,
    });
}

/**
 * Get single order query
 */
export function useOrder(id: string) {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const result = await httpClient.get<Order>(`/orders/${id}`);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
    });
}
