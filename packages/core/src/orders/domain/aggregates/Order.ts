/**
 * Order Aggregate Root
 * 
 * Core aggregate for order management.
 * Handles order lifecycle, payments, and fulfillment.
 */

import { Money } from '../../../marketplace/domain/value-objects/Money';
import { OrderNumber } from '../value-objects/OrderNumber';
import { ShippingAddress } from '../value-objects/ShippingAddress';
import { OrderItem } from '../entities/OrderItem';

export enum OrderStatus {
  PENDING = 'PENDING',           // Order created, awaiting payment
  PAID = 'PAID',                 // Payment confirmed
  PROCESSING = 'PROCESSING',     // Being prepared for shipment
  SHIPPED = 'SHIPPED',           // Shipped to customer
  DELIVERED = 'DELIVERED',       // Successfully delivered
  CANCELLED = 'CANCELLED',       // Cancelled by customer or system
  REFUNDED = 'REFUNDED',         // Payment refunded
}

export interface OrderProps {
  id: string;
  orderNumber: OrderNumber;
  buyerId: string;
  sellerId: string;
  items: Order Item[];
  totalAmount: Money;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  paymentIntentId?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

export class Order {
  private props: OrderProps;
  private domainEvents: DomainEvent[] = [];

  private constructor(props: OrderProps) {
    this.props = props;
  }

  /**
   * Create a new order
   */
  public static create(props: Omit<OrderProps, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'updatedAt'>): Order {
    // Validate
    Order.validate(props);

    // Calculate total amount
    const totalAmount = props.items.reduce(
      (sum, item) => sum.add(item.totalPrice),
      Money.zero()
    );

    const order = new Order({
      id: crypto.randomUUID(),
      orderNumber: OrderNumber.generate(),
      status: OrderStatus.PENDING,
      ...props,
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Emit domain event
    order.addDomainEvent({
      type: 'OrderCreated',
      occurredAt: new Date(),
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber.getValue(),
        buyerId: order.buyerId,
        sellerId: order.sellerId,
        totalAmount: order.totalAmount.getAmount(),
        itemCount: order.items.length,
      },
    });

    return order;
  }

  /**
   * Reconstitute order from persistence
   */
  public static reconstitute(props: OrderProps): Order {
    return new Order(props);
  }

  private static validate(props: Partial<OrderProps>): void {
    if (!props.buyerId || props.buyerId.trim().length === 0) {
      throw new Error('Buyer ID is required');
    }

    if (!props.sellerId || props.sellerId.trim().length === 0) {
      throw new Error('Seller ID is required');
    }

    if (!props.items || props.items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    if (props.items.length > 50) {
      throw new Error('Order cannot have more than 50 items');
    }

    if (!props.shippingAddress) {
      throw new Error('Shipping address is required');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get orderNumber(): OrderNumber {
    return this.props.orderNumber;
  }

  get buyerId(): string {
    return this.props.buyerId;
  }

  get sellerId(): string {
    return this.props.sellerId;
  }

  get items(): OrderItem[] {
    return [...this.props.items];
  }

  get totalAmount(): Money {
    return this.props.totalAmount;
  }

  get shippingAddress(): ShippingAddress {
    return this.props.shippingAddress;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get paymentIntentId(): string | undefined {
    return this.props.paymentIntentId;
  }

  get trackingNumber(): string | undefined {
    return this.props.trackingNumber;
  }

  get notes(): string | undefined {
    return this.props.notes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get paidAt(): Date | undefined {
    return this.props.paidAt;
  }

  get shippedAt(): Date | undefined {
    return this.props.shippedAt;
  }

  get deliveredAt(): Date | undefined {
    return this.props.deliveredAt;
  }

  /**
   * Mark order as paid
   */
  public markAsPaid(paymentIntentId: string): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be marked as paid');
    }

    if (!paymentIntentId) {
      throw new Error('Payment intent ID is required');
    }

    this.props.status = OrderStatus.PAID;
    this.props.paymentIntentId = paymentIntentId;
    this.props.paidAt = new Date();
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'OrderPaid',
      occurredAt: new Date(),
      data: {
        orderId: this.id,
        paymentIntentId,
        amount: this.totalAmount.getAmount(),
      },
    });
  }

  /**
   * Mark order as processing
   */
  public startProcessing(): void {
    if (this.status !== OrderStatus.PAID) {
      throw new Error('Only paid orders can be processed');
}

    this.props.status = OrderStatus.PROCESSING;
    this.props.updatedAt = new Date();
  }

  /**
   * Mark order as shipped
   */
  public markAsShipped(trackingNumber: string): void {
    if (this.status !== OrderStatus.PROCESSING) {
      throw new Error('Only processing orders can be shipped');
    }

    if (!trackingNumber || trackingNumber.trim().length === 0) {
      throw new Error('Tracking number is required');
    }

    this.props.status = OrderStatus.SHIPPED;
    this.props.trackingNumber = trackingNumber;
    this.props.shippedAt = new Date();
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'OrderShipped',
      occurredAt: new Date(),
      data: {
        orderId: this.id,
        trackingNumber,
        shippedAt: this.props.shippedAt,
      },
    });
  }

  /**
   * Mark order as delivered
   */
  public markAsDelivered(): void {
    if (this.status !== OrderStatus.SHIPPED) {
      throw new Error('Only shipped orders can be marked as delivered');
    }

    this.props.status = OrderStatus.DELIVERED;
    this.props.deliveredAt = new Date();
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'OrderDelivered',
      occurredAt: new Date(),
      data: {
        orderId: this.id,
        deliveredAt: this.props.deliveredAt,
      },
    });
  }

  /**
   * Cancel order
   */
  public cancel(reason?: string): void {
    if (this.status === OrderStatus.SHIPPED || this.status === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel shipped or delivered orders');
    }

    if (this.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }

    const previousStatus = this.status;
    this.props.status = OrderStatus.CANCELLED;
    this.props.cancelledAt = new Date();
    this.props.updatedAt = new Date();

    if (reason) {
      this.props.notes = reason;
    }

    this.addDomainEvent({
      type: 'OrderCancelled',
      occurredAt: new Date(),
      data: {
        orderId: this.id,
        previousStatus,
        reason,
        cancelledAt: this.props.cancelledAt,
      },
    });
  }

  /**
   * Check if order can be cancelled
   */
  public canBeCancelled(): boolean {
    return (
      this.status === OrderStatus.PENDING ||
      this.status === OrderStatus.PAID ||
      this.status === OrderStatus.PROCESSING
    );
  }

  /**
   * Check if order can be refunded
   */
  public canBeRefunded(): boolean {
    return (
      this.status === OrderStatus.PAID ||
      this.status === OrderStatus.PROCESSING ||
      this.status === OrderStatus.CANCELLED
    );
  }

  /**
   * Add notes to order
   */
  public addNotes(notes: string): void {
    this.props.notes = notes;
    this.props.updatedAt = new Date();
  }

  // Domain Events
  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }

  public getProps(): OrderProps {
    return {
      ...this.props,
      items: this.props.items.map(item => item.getProps()).map(props => OrderItem.reconstitute(props)),
    };
  }
}

// Domain Event Type
export interface DomainEvent {
  type: string;
  occurredAt: Date;
  data: any;
}
