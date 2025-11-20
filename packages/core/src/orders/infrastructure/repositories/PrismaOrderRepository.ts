/**
 * Prisma Order Repository Implementation
 * 
 * Implements IOrderRepository using Prisma ORM.
 */

import { PrismaClient } from '@repo/database';
import { IOrderRepository, OrderSearchFilters, OrderSearchResult } from '../../domain/repositories/IOrderRepository';
import { Order, OrderStatus } from '../../domain/aggregates/Order';
import { OrderItem } from '../../domain/entities/OrderItem';
import { OrderNumber } from '../../domain/value-objects/OrderNumber';
import { ShippingAddress } from '../../domain/value-objects/ShippingAddress';
import { Money } from '../../../marketplace/domain/value-objects/Money';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
      },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByBuyerId(buyerId: string): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { buyerId },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  async findBySellerId(sellerId: string): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { sellerId },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  async search(filters: OrderSearchFilters): Promise<OrderSearchResult> {
    const where: any = {};

    if (filters.buyerId) {
      where.buyerId = filters.buyerId;
    }

    if (filters.sellerId) {
      where.sellerId = filters.sellerId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.fromDate || filters.toDate) {
      where.createdAt = {};
      if (filters.fromDate) {
        where.createdAt.gte = filters.fromDate;
      }
      if (filters.toDate) {
        where.createdAt.lte = filters.toDate;
      }
    }

    const limit = filters.limit ?? 20;
    const offset = filters.offset ?? 0;

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: true,
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders: data.map((d: any) => this.toDomain(d)),
      total,
      limit,
      offset,
    };
  }

  async save(order: Order): Promise<void> {
    const data = this.toPersistence(order);

    await this.prisma.order.upsert({
      where: { id: order.id },
      create: {
        ...data,
        items: {
          create: data.items,
        },
      },
      update: {
        status: data.status,
        paymentIntentId: data.paymentIntentId,
        trackingNumber: data.trackingNumber,
        notes: data.notes,
        paidAt: data.paidAt,
        shippedAt: data.shippedAt,
        deliveredAt: data.deliveredAt,
        cancelledAt: data.cancelledAt,
        updatedAt: data.updatedAt,
      },
    });

    // Clear domain events
    order.clearDomainEvents();
  }

  async count(filters?: Partial<OrderSearchFilters>): Promise<number> {
    const where: any = {};

    if (filters?.buyerId) {
      where.buyerId = filters.buyerId;
    }

    if (filters?.sellerId) {
      where.sellerId = filters.sellerId;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.order.count({ where });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { status },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  /**
   * Convert Prisma model to Domain aggregate
   */
  private toDomain(data: any): Order {
    // Parse items
    const items = data.items.map((item: any) =>
      OrderItem.reconstitute({
        id: item.id,
        listingId: item.listingId,
        quantity: item.quantity,
        unitPrice: Money.create(Number(item.unitPrice), 'USD'),
        totalPrice: Money.create(Number(item.totalPrice), 'USD'),
        sellerName: item.sellerName,
      })
    );

    // Parse shipping address
    const shippingAddress = ShippingAddress.create(
      typeof data.shippingAddress === 'string'
        ? JSON.parse(data.shippingAddress)
        : data.shippingAddress
    );

    return Order.reconstitute({
      id: data.id,
      orderNumber: OrderNumber.fromString(data.orderNumber),
      buyerId: data.buyerId,
      sellerId: data.sellerId,
      items,
      totalAmount: Money.create(Number(data.totalAmount), 'USD'),
      shippingAddress,
      status: data.status as OrderStatus,
      paymentIntentId: data.paymentIntentId ?? undefined,
      trackingNumber: data.trackingNumber ?? undefined,
      notes: data.notes ?? undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      paidAt: data.paidAt ?? undefined,
      shippedAt: data.shippedAt ?? undefined,
      deliveredAt: data.deliveredAt ?? undefined,
      cancelledAt: data.cancelledAt ?? undefined,
    });
  }

  /**
   * Convert Domain aggregate to Prisma model data
   */
  private toPersistence(order: Order): any {
    const props = order.getProps();

    return {
      id: order.id,
      orderNumber: order.orderNumber.getValue(),
      buyerId: order.buyerId,
      sellerId: order.sellerId,
      totalAmount: order.totalAmount.getAmount(),
      shippingAddress: order.shippingAddress.toObject(),
      status: order.status,
      paymentIntentId: order.paymentIntentId ?? null,
      trackingNumber: order.trackingNumber ?? null,
      notes: order.notes ?? null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      paidAt: order.paidAt ?? null,
      shippedAt: order.shippedAt ?? null,
      deliveredAt: order.deliveredAt ?? null,
      cancelledAt: props.cancelledAt ?? null,
      items: order.items.map((item) => ({
        id: item.id,
        listingId: item.listingId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.getAmount(),
        totalPrice: item.totalPrice.getAmount(),
        sellerName: item.sellerName ?? null,
      })),
    };
  }
}
