/**
 * Ship Order Use Case
 * 
 * Marks an order as shipped with tracking information.
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { OrderResponseDTO } from '../dtos/OrderDTO';

export interface ShipOrderDTO {
  trackingNumber: string;
  carrier?: string;
  notes?: string;
}

export class ShipOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string, sellerId: string, dto: ShipOrderDTO): Promise<OrderResponseDTO> {
    // 1. Find order
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // 2. Verify authorization (only seller can ship)
    if (order.sellerId !== sellerId) {
      throw new Error('Only the seller can ship this order');
    }

    // 3. Mark as shipped
    order.markAsShipped(dto.trackingNumber);

    // 4. Add notes if provided
    if (dto.notes) {
      const existingNotes = order.notes || '';
      const newNotes = existingNotes + '\n' + `[SHIPPING] ${dto.notes}`;
      order.addNotes(newNotes);
    }

    // 5. Save order
    await this.orderRepository.save(order);

    // 6. TODO: Send shipping notification email to buyer

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
    };
  }
}
