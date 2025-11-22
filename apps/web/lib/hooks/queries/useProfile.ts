/**
 * User Profile Query Hooks
 * 
 * TanStack Query hooks for user profile operations.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/lib/api/client';
import { queryKeys } from '@/lib/query-client';
import type { Result } from '@/types/api';

/**
 * Update Profile Input
 */
export interface UpdateProfileInput {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

/**
 * Change Password Input
 */
export interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

/**
 * Update user profile mutation
 */
export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateProfileInput) => {
            const result = await httpClient.patch<any>('/users/profile', data);
            if (!result.success) throw new Error(result.error.message);
            return result.data;
        },
        onSuccess: (data) => {
            // Update the user data in cache
            queryClient.setQueryData(queryKeys.auth.me(), data);
        },
    });
}

/**
 * Change password mutation
 */
export function useChangePassword() {
    return useMutation({
        mutationFn: async (data: ChangePasswordInput) => {
            if (data.newPassword !== data.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const result = await httpClient.post<void>('/auth/change-password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            if (!result.success) throw new Error(result.error.message);
        },
    });
}
