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

    constructor(config: HTTPClientConfig) {
        this.baseURL = config.baseURL;
        this.defaultHeaders = config.headers || {};
        this.timeout = config.timeout || 30000; // 30 seconds default
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
     * Make HTTP request with timeout and error handling
     */
    private async request<T>(
        endpoint: string,
        config?: RequestConfig
    ): Promise<Result<T>> {
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

            // Handle non-OK responses
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

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
