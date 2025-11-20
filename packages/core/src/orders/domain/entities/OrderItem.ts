/**
 * OrderItem Entity
 * 
 * Represents an item within an order.
 */

import { Money } from '../../../marketplace/domain/value-objects/Money';

export interface OrderItemProps {
  id: string;
  listingId: string;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  sellerName?: string;
}

export class OrderItem {
  private props: OrderItemProps;

  private constructor(props: OrderItemProps) {
    this.props = props;
  }

  public static create(props: Omit<OrderItemProps, 'id' | 'totalPrice'>): OrderItem {
    OrderItem.validate(props);

    // Calculate total price
    const totalPrice = props.unitPrice.multiply(props.quantity);

    return new OrderItem({
      id: crypto.randomUUID(),
      ...props,
      totalPrice,
    });
  }

  public static reconstitute(props: OrderItemProps): OrderItem {
    return new OrderItem(props);
  }

  private static validate(props: Omit<OrderItemProps, 'id' | 'totalPrice'>): void {
    if (!props.listingId || props.listingId.trim().length === 0) {
      throw new Error('Listing ID is required');
    }

    if (props.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    if (props.quantity > 1000) {
      throw new Error('Quantity cannot exceed 1000 per order');
    }

    if (props.unitPrice.isZero()) {
      throw new Error('Unit price must be greater than zero');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get listingId(): string {
    return this.props.listingId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unitPrice(): Money {
    return this.props.unitPrice;
  }

  get totalPrice(): Money {
    return this.props.totalPrice;
  }

  get sellerName(): string | undefined {
    return this.props.sellerName;
  }

  /**
   * Update quantity and recalculate total
   */
  public updateQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    if (newQuantity > 1000) {
      throw new Error('Quantity cannot exceed 1000');
    }

    this.props.quantity = newQuantity;
    this.props.totalPrice = this.props.unitPrice.multiply(newQuantity);
  }

  public getProps(): OrderItemProps {
    return { ...this.props };
  }
}
