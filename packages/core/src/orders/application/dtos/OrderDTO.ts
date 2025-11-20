/**
 * Order DTOs (Data Transfer Objects)
 * 
 * Used for transferring order data between layers.
 */

// Request DTOs

export interface CreateOrderDTO {
  listingId: string;
  quantity: number;
  shippingAddress: ShippingAddressDTO;
  notes?: string;
}

export interface ShippingAddressDTO {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface UpdateOrderStatusDTO {
  status: string;
  trackingNumber?: string;
  notes?: string;
}

export interface SearchOrdersDTO {
  buyerId?: string;
  sellerId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}

// Response DTOs

export interface OrderResponseDTO {
  id: string;
  orderNumber: string;
  buyerId: string;
  sellerId: string;
  items: OrderItemDTO[];
  totalAmount: number;
  currency: string;
  shippingAddress: ShippingAddressDTO;
  status: string;
  paymentIntentId?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

export interface OrderItemDTO {
  id: string;
  listingId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sellerName?: string;
}

export interface OrderSearchResponseDTO {
  orders: OrderResponseDTO[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface OrderDetailResponseDTO extends OrderResponseDTO {
  buyer: {
    id: string;
    email: string;
  };
  seller: {
    id: string;
    businessName: string;
  };
  listing: {
    id: string;
    title: string;
    imageUrl?: string;
  };
}
