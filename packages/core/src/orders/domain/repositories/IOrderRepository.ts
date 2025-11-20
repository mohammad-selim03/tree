/**
 * IOrderRepository Interface
 * 
 * Defines the contract for order persistence operations.
 */

import { Order, OrderStatus } from '../aggregates/Order';

export interface OrderSearchFilters {
  buyerId?: string;
  sellerId?: string;
  status?: OrderStatus;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}

export interface OrderSearchResult {
  orders: Order[];
  total: number;
  limit: number;
  offset: number;
}

export interface IOrderRepository {
  /**
   * Find an order by ID
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Find an order by order number
   */
  findByOrderNumber(orderNumber: string): Promise<Order | null>;

  /**
   * Find all orders for a buyer
   */
  findByBuyerId(buyerId: string): Promise<Order[]>;

  /**
   * Find all orders for a seller
   */
  findBySellerId(sellerId: string): Promise<Order[]>;

  /**
   * Search orders with filters
   */
  search(filters: OrderSearchFilters): Promise<OrderSearchResult>;

  /**
   * Save an order (create or update)
   */
  save(order: Order): Promise<void>;

  /**
   * Count total orders
   */
  count(filters?: Partial<OrderSearchFilters>): Promise<number>;

  /**
   * Find orders by status
   */
  findByStatus(status: OrderStatus): Promise<Order[]>;
}
