/**
 * Authentication API Endpoints
 * 
 * All authentication-related API calls.
 */

import { httpClient } from '../client';
import type {
    LoginInput,
    RegisterInput,
    AuthResponse,
    RefreshTokenInput,
    Result,
} from '@/types/api';
import type { User } from '@/types/models';

export const authApi = {
    /**
     * Login user
     */
    login: async (credentials: LoginInput): Promise<Result<AuthResponse>> => {
        return httpClient.post<AuthResponse>('/auth/login', credentials, {
            skipAuth: true, // Don't send auth token for login
        });
    },

    /**
     * Register new user
     */
    register: async (data: RegisterInput): Promise<Result<AuthResponse>> => {
        return httpClient.post<AuthResponse>('/auth/register', data, {
            skipAuth: true,
        });
    },

    /**
     * Get current authenticated user
     */
    me: async (): Promise<Result<User>> => {
        return httpClient.get<User>('/auth/me');
    },

    /**
     * Refresh authentication token
     */
    refresh: async (data: RefreshTokenInput): Promise<Result<AuthResponse>> => {
        return httpClient.post<AuthResponse>('/auth/refresh', data);
    },

    /**
     * Logout (clear token from storage)
     */
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
        }
    },
};
