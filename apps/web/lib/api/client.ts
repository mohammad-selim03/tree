/**
 * HTTP Client
 * 
 * Base HTTP client with interceptors, error handling, and type safety.
 * Follows best practices for production API clients.
 */

import type { Result, ApiError } from '@/types/api';

/**
 * Custom API Error class
 */
export class HTTPError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public data?: unknown
    ) {
        super(`HTTP Error ${status}: ${statusText}`);
        this.name = 'HTTPError';
    }
}

/**
 * HTTP Client Configuration
 */
interface HTTPClientConfig {
    baseURL: string;
    headers?: HeadersInit;
    timeout?: number;
}

/**
 * Request Configuration
 */
interface RequestConfig extends RequestInit {
    timeout?: number;
    skipAuth?: boolean;
}

/**
 * HTTP Client Class
 * 
 * Provides a type-safe, interceptor-based HTTP client
 * with automatic error handling and token management.
 */
export class HTTPClient {
    private baseURL: string;
    private defaultHeaders: HeadersInit;
    private timeout: number;
    private refreshingToken: Promise<string | null> | null = null;

    constructor(config: HTTPClientConfig) {
        this.baseURL = config.baseURL;
        this.defaultHeaders = config.headers || {};
        this.timeout = config.timeout || 30000; // 30 seconds default
    }

    /**
     * Refresh the authentication token
     */
    private async refreshToken(): Promise<string | null> {
        // Prevent multiple simultaneous refresh requests
        if (this.refreshingToken) {
            return this.refreshingToken;
        }

        this.refreshingToken = (async () => {
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) return null;

                const response = await fetch(`${this.baseURL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken }),
                });

                if (!response.ok) {
                    // Refresh failed, clear tokens
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('refresh_token');
                    return null;
                }

                const data = await response.json();
                const newToken = data.data?.token || data.token;

                if (newToken) {
                    localStorage.setItem('auth_token', newToken);
                }

                return newToken;
            } catch (error) {
                console.error('Token refresh failed:', error);
                return null;
            } finally {
                this.refreshingToken = null;
            }
        })();

        return this.refreshingToken;
    }

    /**
     * Get auth token from storage
     */
    private getAuthToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    }

    /**
     * Build headers with auth token
     */
    private buildHeaders(config?: RequestConfig): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...this.defaultHeaders,
            ...config?.headers,
        };

        // Add auth token if not skipped
        if (!config?.skipAuth) {
            const token = this.getAuthToken();
            if (token) {
                (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    }

    /**
     * Make HTTP request with timeout, retry, and error handling
     */
    private async request<T>(
        endpoint: string,
        config?: RequestConfig & { _retryCount?: number }
    ): Promise<Result<T>> {
        const retryCount = config?._retryCount || 0;
        const maxRetries = 3;

        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => controller.abort(),
                config?.timeout || this.timeout
            );

            // Make request
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...config,
                headers: this.buildHeaders(config),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            // Handle 401 Unauthorized - try token refresh
            if (response.status === 401 && !config?.skipAuth && retryCount === 0) {
                const newToken = await this.refreshToken();

                if (newToken) {
                    // Retry the request with new token
                    return this.request<T>(endpoint, {
                        ...config,
                        _retryCount: retryCount + 1,
                    });
                } else {
                    // Token refresh failed, redirect to login
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    return {
                        success: false,
                        error: {
                            message: 'Session expired. Please log in again.',
                            code: 'UNAUTHORIZED',
                            status: 401,
                        },
                    };
                }
            }

            // Handle non-OK responses
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                // Retry on server errors (5xx) with exponential backoff
                if (response.status >= 500 && retryCount < maxRetries) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
                    await new Promise(resolve => setTimeout(resolve, delay));

                    return this.request<T>(endpoint, {
                        ...config,
                        _retryCount: retryCount + 1,
                    });
                }

                return {
                    success: false,
                    error: {
                        message: errorData.error || errorData.message || response.statusText,
                        code: errorData.code,
                        status: response.status,
                        details: errorData.details,
                    },
                };
            }

            // Parse JSON response
            const data = await response.json();

            // Handle API response format
            if (data.success === false) {
                return {
                    success: false,
                    error: {
                        message: data.error || 'An error occurred',
                        code: data.code,
                        details: data.details,
                    },
                };
            }

            // Return successful result
            return {
                success: true,
                data: data.data || data,
            };
        } catch (error) {
            // Retry on network errors with exponential backoff
            if (retryCount < maxRetries && error instanceof Error && error.name !== 'AbortError') {
                const delay = Math.pow(2, retryCount) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));

                return this.request<T>(endpoint, {
                    ...config,
                    _retryCount: retryCount + 1,
                });
            }

            // Handle network errors
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return {
                        success: false,
                        error: {
                            message: 'Request timeout',
                            code: 'TIMEOUT',
                        },
                    };
                }

                return {
                    success: false,
                    error: {
                        message: error.message,
                        code: 'NETWORK_ERROR',
                    },
                };
            }

            return {
                success: false,
                error: {
                    message: 'An unexpected error occurred',
                    code: 'UNKNOWN_ERROR',
                },
            };
        }
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string, config?: RequestConfig): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: 'GET',
            ...config,
        });
    }

    /**
     * POST request
     */
    async post<T>(
        endpoint: string,
        body?: unknown,
        config?: RequestConfig
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
            ...config,
        });
    }

    /**
     * PATCH request
     */
    async patch<T>(
        endpoint: string,
        body?: unknown,
        config?: RequestConfig
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
            ...config,
        });
    }

    /**
     * PUT request
     */
    async put<T>(
        endpoint: string,
        body?: unknown,
        config?: RequestConfig
    ): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
            ...config,
        });
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string, config?: RequestConfig): Promise<Result<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            ...config,
        });
    }
}

/**
 * Create HTTP client instance
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export const httpClient = new HTTPClient({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
