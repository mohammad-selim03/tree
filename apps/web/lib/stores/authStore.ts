/**
 * Authentication Store
 * 
 * Global auth state using Zustand with persistence.
 * Handles user authentication, token management, and auth state.
 */

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User } from '@/types/models';

interface AuthState {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;

    // Selectors
    isSeller: () => boolean;
    isAdmin: () => boolean;
    isBuyer: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            immer((set, get) => ({
                // Initial state
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,

                // Actions
                setUser: (user) => set((state) => {
                    state.user = user;
                    state.isAuthenticated = !!user;
                }),

                setToken: (token) => set((state) => {
                    state.token = token;

                    // Also store in localStorage for API client
                    if (typeof window !== 'undefined') {
                        if (token) {
                            localStorage.setItem('auth_token', token);
                        } else {
                            localStorage.removeItem('auth_token');
                        }
                    }
                }),

                login: (user, token) => set((state) => {
                    state.user = user;
                    state.token = token;
                    state.isAuthenticated = true;
                    state.isLoading = false;

                    // Store token
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('auth_token', token);
                    }
                }),

                logout: () => set((state) => {
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;

                    // Clear storage
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('refresh_token');
                    }
                }),

                setLoading: (loading) => set({ isLoading: loading }),

                // Selectors
                isSeller: () => get().user?.role === 'SELLER',
                isAdmin: () => get().user?.role === 'ADMIN',
                isBuyer: () => get().user?.role === 'BUYER',
            })),
            {
                name: 'auth-storage',
                // Only persist user and token
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                }),
            }
        ),
        { name: 'AuthStore' }
    )
);

/**
 * Selector hooks for performance
 */
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsSeller = () => useAuthStore((state) => state.isSeller());
export const useIsAdmin = () => useAuthStore((state) => state.isAdmin());
export const useIsBuyer = () => useAuthStore((state) => state.isBuyer());
