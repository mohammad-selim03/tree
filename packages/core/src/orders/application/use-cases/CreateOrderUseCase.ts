/**
 * Create Order Use Case
 * 
 * Handles the business logic for creating a new order.
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IListingRepository } from '../../../marketplace/domain/repositories/IListingRepository';
import { Order } from '../../domain/aggregates/Order';
import { OrderItem } from '../../domain/entities/OrderItem';
import { ShippingAddress } from '../../domain/value-objects/ShippingAddress';
import { CreateOrderDTO, OrderResponseDTO } from '../dtos/OrderDTO';

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private listingRepository: IListingRepository
  ) {}

  async execute(buyerId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    // 1. Find and validate listing
    const listing = await this.listingRepository.findById(dto.listingId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    // 2. Check if listing is available
    if (!listing.isAvailable()) {
      throw new Error('Listing is not available for purchase');
    }

    // 3. Check inventory
    if (listing.inventory < dto.quantity) {
      throw new Error(`Insufficient inventory. Only ${listing.inventory} items available`);
    }

    // 4. Create shipping address value object
    const shippingAddress = ShippingAddress.create(dto.shippingAddress);

    // 5. Create order item
    const orderItem = OrderItem.create({
      listingId: listing.id,
      quantity: dto.quantity,
      unitPrice: listing.basePrice,
    });

    // 6. Create order
    const order = Order.create({
      buyerId,
      sellerId: listing.sellerId,
      items: [orderItem],
      shippingAddress,
      notes: dto.notes,
    });

    // 7. Decrease inventory (optimistic)
    listing.decreaseInventory(dto.quantity);

    // 8. Save order and update listing
    await Promise.all([
      this.orderRepository.save(order),
      this.listingRepository.save(listing),
    ]);

    // 9. Return response
    return this.toResponseDTO(order);
  }

  private toResponseDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      orderNumber: order.orderNumber.getValue(),
      buyerId: order.buyerId,
      sellerId: order.sellerId,
      items: order.items.map((item) => ({
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
