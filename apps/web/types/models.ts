/**
 * Domain Models
 * 
 * Core business entities that mirror the database schema.
 * These types represent the domain model and should be used
 * throughout the application for type safety.
 */

// ============================================================================
// User & Authentication
// ============================================================================

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    profile?: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        avatar?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Session {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
}

// ============================================================================
// Marketplace
// ============================================================================

export type ListingStatus = 'DRAFT' | 'ACTIVE' | 'SOLD_OUT' | 'FLAGGED' | 'ARCHIVED';

export interface Listing {
    id: string;
    sellerId: string;
    speciesId: string;
    title: string;
    description: string;
    basePrice: number;
    inventory: number;
    status: ListingStatus;
    viewCount: number;
    metadata?: {
        tags?: string[];
        featured?: boolean;
        seoTitle?: string;
        seoDescription?: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;

    // Relations
    seller?: Seller;
    species?: Species;
    images?: ListingImage[];
    variants?: Variant[];
    reviews?: Review[];
}

export interface Species {
    id: string;
    scientificName: string;
    commonName: string;
    family: string;
    careRequirements: {
        sunlight?: string;
        water?: string;
        soil?: string;
        temperature?: string;
    };
    hardinessZones: string[];
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Seller {
    id: string;
    userId: string;
    businessName: string;
    verified: boolean;
    rating: number;
    storefront?: {
        bio?: string;
        banner?: string;
        policies?: string;
    };
    stripeAccountId?: string;
    createdAt: string;
    updatedAt: string;

    // Relations
    user?: User;
}

export interface Variant {
    id: string;
    listingId: string;
    attributes: {
        age?: string;
        size?: string;
        potType?: string;
        [key: string]: string | undefined;
    };
    priceModifier: number;
    stock: number;
    sku?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ListingImage {
    id: string;
    listingId: string;
    url: string;
    order: number;
    altText?: string;
    createdAt: string;
}

// ============================================================================
// Orders & Payments
// ============================================================================

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Order {
    id: string;
    orderNumber: string;
    buyerId: string;
    sellerId: string;
    totalPrice: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;

    // Relations
    buyer?: User;
    seller?: Seller;
    items?: OrderItem[];
    payment?: Payment;
    shipment?: Shipment;
}

export interface OrderItem {
    id: string;
    orderId: string;
    listingId: string;
    variantId?: string;
    quantity: number;
    price: number; // Snapshot price at purchase
    createdAt: string;

    // Relations
    listing?: Listing;
    variant?: Variant;
}

export interface Payment {
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    stripePaymentIntentId: string;
    status: PaymentStatus;
    metadata?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

export type ShipmentStatus = 'PREPARING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';

export interface Shipment {
    id: string;
    orderId: string;
    carrier?: string;
    trackingNumber?: string;
    status: ShipmentStatus;
    estimatedDelivery?: string;
    deliveredAt?: string;
    createdAt: string;
    updatedAt: string;

    // Relations
    address?: DeliveryAddress;
}

export interface DeliveryAddress {
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat?: number;
    lng?: number;
}

// ============================================================================
// Reviews
// ============================================================================

export interface Review {
    id: string;
    userId: string;
    listingId: string;
    rating: number; // 1-5
    comment?: string;
    helpful: number;
    createdAt: string;
    updatedAt: string;

    // Relations
    user?: User;
}

// ============================================================================
// AI & ML
// ============================================================================

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'MISMATCH' | 'FLAGGED';

export interface ImageAnalysis {
    id: string;
    imageId: string;
    predictions: Array<{
        label: string;
        confidence: number;
    }>;
    topPrediction?: string;
    confidence?: number;
    verificationStatus: VerificationStatus;
    mismatchReason?: string;
    createdAt: string;
}

export interface AICarePlan {
    id: string;
    userId: string;
    speciesId?: string;
    schedule: {
        watering?: Array<{ day: string; time: string }>;
        fertilizing?: Array<{ month: string; instructions: string }>;
        pruning?: Array<{ season: string; instructions: string }>;
    };
    generatedContent: string;
    icsFileUrl?: string;
    createdAt: string;
}

// ============================================================================
// Cart (Client-side only)
// ============================================================================

export interface CartItem {
    id: string; // listingId or variantId
    listingId: string;
    variantId?: string;
    quantity: number;
    price: number;
    title: string;
    imageUrl?: string;
    sellerName: string;
    sellerId: string;
}
