/**
 * Cancel Order Use Case
 * 
 * Handles order cancellation logic.
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IListingRepository } from '../../../marketplace/domain/repositories/IListingRepository';
import { OrderResponseDTO } from '../dtos/OrderDTO';

export class CancelOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private listingRepository: IListingRepository
  ) {}

  async execute(orderId: string, userId: string, reason?: string): Promise<OrderResponseDTO> {
    // 1. Find order
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // 2. Verify authorization (only buyer can cancel)
    if (order.buyerId !== userId) {
      throw new Error('Only the buyer can cancel an order');
    }

    // 3. Check if order can be cancelled
    if (!order.canBeCancelled()) {
      throw new Error(`Order cannot be cancelled in ${order.status} status`);
    }

    // 4. Cancel order
    order.cancel(reason);

    // 5. Restore inventory for each item
    for (const item of order.items) {
      const listing = await this.listingRepository.findById(item.listingId);
      if (listing) {
        listing.increaseInventory(item.quantity);
        await this.listingRepository.save(listing);
      }
    }

    // 6. Save order
    await this.orderRepository.save(order);

    // 7. Return response
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
      cancelledAt: order.getProps().cancelledAt?.toISOString(),
    };
  }
}
