/**
 * Auth Query Hooks
 * 
 * TanStack Query hooks for authentication operations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-client';
import { useAuthStore } from '@/lib/stores/authStore';
import type { LoginInput, RegisterInput } from '@/types/api';

/**
 * Get current user query
 */
export function useMe() {
    const { isAuthenticated } = useAuthStore();

    return useQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: async () => {
            const result = await api.auth.me();
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        enabled: isAuthenticated, // Only fetch if authenticated
        staleTime: Infinity, // User data rarely changes
    });
}

/**
 * Login mutation
 */
export function useLogin() {
    const { login } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginInput) => {
            const result = await api.auth.login(credentials);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        onSuccess: (data) => {
            // Update auth store
            login(data.user, data.token);

            // Set user in cache
            queryClient.setQueryData(queryKeys.auth.me(), data.user);
        },
    });
}

/**
 * Register mutation
 */
export function useRegister() {
    const { login } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RegisterInput) => {
            const result = await api.auth.register(data);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        onSuccess: (data) => {
            // Update auth store
            login(data.user, data.token);

            // Set user in cache
            queryClient.setQueryData(queryKeys.auth.me(), data.user);
        },
    });
}

/**
 * Logout mutation
 */
export function useLogout() {
    const { logout } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            api.auth.logout();
        },
        onSuccess: () => {
            // Clear auth store
            logout();

            // Clear all queries
            queryClient.clear();
        },
    });
}
