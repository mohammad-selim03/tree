/**
 * Seller DTOs (Data Transfer Objects)
 */

// Request DTOs

export interface CreateSellerDTO {
  userId: string;
  businessName: string;
  storefront?: object;
}

export interface UpdateSellerDTO {
  businessName?: string;
  storefront?: object;
}

export interface ConnectStripeDTO {
  stripeAccountId: string;
}

// Response DTOs

export interface SellerResponseDTO {
  id: string;
  userId: string;
  businessName: string;
  verified: boolean;
  rating: number;
  storefront?: object;
  stripeAccountId?: string;
  canAcceptPayments: boolean;
  hasGoodStanding: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerProfileDTO extends SellerResponseDTO {
  totalListings: number;
  activeListings: number;
  totalSales: number;
  joinedDate: string;
}
