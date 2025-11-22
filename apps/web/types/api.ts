/**
 * API Types
 * 
 * Request/Response types for API endpoints.
 * Following the Result pattern for explicit error handling.
 */

import type {
    User,
    Listing,
    Order,
    Species,
    Review,
    Seller
} from './models';

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Result type for explicit error handling
 * Inspired by Rust's Result<T, E>
 */
export type Result<T, E = ApiError> =
    | { success: true; data: T }
    | { success: false; error: E };

/**
 * API Error type
 */
export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    details?: Record<string, string[]>;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

// ============================================================================
// Authentication
// ============================================================================

export interface LoginInput {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterInput {
    email: string;
    password: string;
    role: 'BUYER' | 'SELLER';
    profile?: {
        firstName?: string;
        lastName?: string;
    };
}

export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: string;
}

export interface RefreshTokenInput {
    refreshToken: string;
}

// ============================================================================
// Listings
// ============================================================================

export interface CreateListingInput {
    speciesId: string;
    title: string;
    description: string;
    basePrice: number;
    inventory: number;
    metadata?: {
        tags?: string[];
        featured?: boolean;
    };
}

export interface UpdateListingInput {
    title?: string;
    description?: string;
    basePrice?: number;
    inventory?: number;
    status?: 'DRAFT' | 'ACTIVE' | 'SOLD_OUT' | 'ARCHIVED';
    metadata?: {
        tags?: string[];
        featured?: boolean;
    };
}

export interface ListingFilters {
    speciesId?: string;
    sellerId?: string;
    status?: 'DRAFT' | 'ACTIVE' | 'SOLD_OUT' | 'FLAGGED' | 'ARCHIVED';
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
    page?: number;
    pageSize?: number;
    sortBy?: 'price' | 'createdAt' | 'rating' | 'popularity';
    sortOrder?: 'asc' | 'desc';
}

export interface ListingSearchResponse {
    listings: Listing[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ListingDetailsResponse {
    listing: Listing;
    seller: Seller;
    species: Species;
    reviews: Review[];
    relatedListings: Listing[];
}

// ============================================================================
// Orders
// ============================================================================

export interface CreateOrderInput {
    listingId: string;
    variantId?: string;
    quantity: number;
    shippingAddress: {
        fullName: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phoneNumber: string;
    };
    notes?: string;
}

export interface OrderFilters {
    status?: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    fromDate?: string;
    toDate?: string;
    page?: number;
    pageSize?: number;
}

export interface OrderHistoryResponse {
    orders: Order[];
    total: number;
    page: number;
    pageSize: number;
}

export interface UpdateOrderStatusInput {
    status: 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    trackingNumber?: string;
    carrier?: string;
}

// ============================================================================
// Payments
// ============================================================================

export interface CreatePaymentIntentInput {
    orderId: string;
    amount: number;
    currency?: string;
}

export interface CreatePaymentIntentResponse {
    clientSecret: string;
    paymentIntentId: string;
}

export interface ConfirmPaymentInput {
    paymentIntentId: string;
    paymentMethodId: string;
}

// ============================================================================
// Reviews
// ============================================================================

export interface CreateReviewInput {
    listingId: string;
    orderId?: string;
    rating: number;
    comment?: string;
}

export interface ReviewsResponse {
    reviews: Review[];
    averageRating: number;
    total: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

// ============================================================================
// AI Features
// ============================================================================

export interface ImageSearchInput {
    imageFile: File;
}

export interface ImageSearchResponse {
    results: Array<{
        listing: Listing;
        similarity: number;
    }>;
}

export interface GenerateCarePlanInput {
    speciesId: string;
    climate?: string;
    experience?: 'beginner' | 'intermediate' | 'expert';
}

export interface PriceSuggestionInput {
    speciesId: string;
    condition?: string;
    size?: string;
    age?: string;
}

export interface PriceSuggestionResponse {
    suggestedPrice: number;
    priceRange: {
        min: number;
        max: number;
    };
    confidence: number;
    factors: Array<{
        name: string;
        impact: string;
    }>;
}

// ============================================================================
// Species
// ============================================================================

export interface SpeciesFilters {
    family?: string;
    hardinessZone?: string;
    searchTerm?: string;
    page?: number;
    pageSize?: number;
}

export interface SpeciesListResponse {
    species: Species[];
    total: number;
    page: number;
    pageSize: number;
}

// ============================================================================
// Seller
// ============================================================================

export interface SellerStatsResponse {
    totalSales: number;
    totalRevenue: number;
    activeListings: number;
    pendingOrders: number;
    averageRating: number;
    totalReviews: number;
    salesData: Array<{
        date: string;
        amount: number;
    }>;
    topSellingListings: Array<{
        listing: Listing;
        totalSales: number;
    }>;
}

export interface UpdateSellerProfileInput {
    businessName?: string;
    storefront?: {
        bio?: string;
        banner?: string;
        policies?: string;
    };
}

// ============================================================================
// Image Upload
// ============================================================================

export interface UploadImageInput {
    file: File;
    type: 'listing' | 'avatar' | 'banner';
}

export interface UploadImageResponse {
    url: string;
    id: string;
    width: number;
    height: number;
}
