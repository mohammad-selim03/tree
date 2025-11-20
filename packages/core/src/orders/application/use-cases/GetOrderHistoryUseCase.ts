/**
 * Get Order History Use Case
 * 
 * Retrieves order history for a user (buyer or seller).
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { SearchOrdersDTO, OrderSearchResponseDTO, OrderResponseDTO } from '../dtos/OrderDTO';

export class GetOrderHistoryUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(userId: string, dto: SearchOrdersDTO, role: 'buyer' | 'seller'): Promise<OrderSearchResponseDTO> {
    const page = dto.page ?? 1;
    const pageSize = dto.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    // Build filters based on role
    const filters: any = {
      limit: pageSize,
      offset,
    };

    if (role === 'buyer') {
      filters.buyerId = userId;
    } else if (role === 'seller') {
      filters.sellerId = userId;
    }

    if (dto.status) {
      filters.status = dto.status;
    }

    if (dto.fromDate) {
      filters.fromDate = new Date(dto.fromDate);
    }

    if (dto.toDate) {
      filters.toDate = new Date(dto.toDate);
    }

    // Execute search
    const result = await this.orderRepository.search(filters);

    // Calculate total pages
    const totalPages = Math.ceil(result.total / pageSize);

    // Map to response DTOs
    const orders = result.orders.map((order) => this.toResponseDTO(order));

    return {
      orders,
      total: result.total,
      page,
      pageSize,
      totalPages,
    };
  }

  private toResponseDTO(order: any): OrderResponseDTO {
    return {
      id: order.id,
      orderNumber: order.orderNumber.getValue(),
      buyerId: order.buyerId,
      sellerId: order.sellerId,
      items: order.items.map((item: any) => ({
        id: item.id,
        listingId: item.listingId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.getAmount(),
        totalPrice: item.totalPrice.getAmount(),
        sellerName: item.sellerName,
      })),
      totalAmount: order.totalAmount.getAmount(),
      currency: order.totalAmount.getCurrency(),
      shippingAddress: order.shippingAddress.toObject(),
      status: order.status,
      paymentIntentId: order.paymentIntentId,
      trackingNumber: order.trackingNumber,
      notes: order.notes,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      paidAt: order.paidAt?.toISOString(),
      shippedAt: order.shippedAt?.toISOString(),
      deliveredAt: order.deliveredAt?.toISOString(),
    };
  }
}
