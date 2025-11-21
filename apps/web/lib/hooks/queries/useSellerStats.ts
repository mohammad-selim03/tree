/**
 * Seller Query Hooks
 * 
 * TanStack Query hooks for seller-specific operations (stats, analytics, etc.).
 */

import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/lib/api/client';
import type { Result } from '@/types/api';

/**
 * Seller Stats Response
 */
interface SellerStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    activeCustomers: number;
    revenueChange: number; // percentage change from last month
    ordersChange: number;
    monthlyRevenue: Array<{
        month: string;
        total: number;
    }>;
    recentSales: Array<{
        id: string;
        customerName: string;
        customerEmail: string;
        amount: number;
        date: string;
    }>;
}

/**
 * Get seller dashboard stats
 */
export function useSellerStats() {
    return useQuery({
        queryKey: ['seller', 'stats'],
        queryFn: async () => {
            const result = await httpClient.get<SellerStats>('/seller/stats');
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        // Refetch every 5 minutes
        staleTime: 5 * 60 * 1000,
        // Keep data  cached for 10 minutes
        gcTime: 10 * 60 * 1000,
    });
}

/**
 * Mock data for when backend is not available
 */
export const mockSellerStats: SellerStats = {
    totalRevenue: 15231.89,
    totalOrders: 2350,
    totalProducts: 12,
    activeCustomers: 573,
    revenueChange: 20.1,
    ordersChange: 18.2,
    monthlyRevenue: [
        { month: "Jan", total: 1200 },
        { month: "Feb", total: 2100 },
        { month: "Mar", total: 1800 },
        { month: "Apr", total: 2400 },
        { month: "May", total: 3200 },
        { month: "Jun", total: 4500 },
    ],
    recentSales: [
        {
            id: '1',
            customerName: 'Olivia Martin',
            customerEmail: 'olivia.martin@email.com',
            amount: 1999.00,
            date: '2025-11-20',
        },
        {
            id: '2',
            customerName: 'Jackson Lee',
            customerEmail: 'jackson.lee@email.com',
            amount: 39.00,
            date: '2025-11-20',
        },
        {
            id: '3',
            customerName: 'Isabella Nguyen',
            customerEmail: 'isabella.nguyen@email.com',
            amount: 299.00,
            date: '2025-11-19',
        },
    ],
};
