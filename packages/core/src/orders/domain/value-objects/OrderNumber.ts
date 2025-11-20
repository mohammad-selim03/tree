/**
 * OrderNumber Value Object
 * 
 * Generates and validates unique order numbers.
 * Format: ORD-YYYYMMDD-XXXXX (e.g., ORD-20251120-A1B2C)
 */

export class OrderNumber {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Generate a new order number
   */
  public static generate(): OrderNumber {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const orderNumber = `ORD-${dateStr}-${randomStr}`;
    return new OrderNumber(orderNumber);
  }

  /**
   * Create from existing order number (from database)
   */
  public static fromString(orderNumber: string): OrderNumber {
    OrderNumber.validate(orderNumber);
    return new OrderNumber(orderNumber);
  }

  /**
   * Validate order number format
   */
  private static validate(orderNumber: string): void {
    if (!orderNumber || orderNumber.length === 0) {
      throw new Error('Order number cannot be empty');
    }

    // Check format: ORD-YYYYMMDD-XXXXX
    const regex = /^ORD-\d{8}-[A-Z0-9]{5}$/;
    if (!regex.test(orderNumber)) {
      throw new Error('Invalid order number format. Expected: ORD-YYYYMMDD-XXXXX');
    }
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: OrderNumber): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
