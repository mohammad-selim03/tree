/**
 * Get Order Use Case
 * 
 * Retrieves order details by ID.
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { OrderResponseDTO } from '../dtos/OrderDTO';

export class GetOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string, userId: string): Promise<OrderResponseDTO> {
    // 1. Find order
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // 2. Verify authorization (buyer or seller can view)
    if (order.buyerId !== userId && order.sellerId !== userId) {
      throw new Error('Unauthorized to view this order');
    }

    // 3. Return response
    return this.toResponseDTO(order);
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
