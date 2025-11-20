/**
 * Payment Entity
 * 
 * Represents a payment transaction for an order.
 */

export enum PaymentStatus {
  PENDING = 'PENDING',               // Payment intent created
  PROCESSING = 'PROCESSING',         // Payment being processed
  SUCCEEDED = 'SUCCEEDED',           // Payment successful
  FAILED = 'FAILED',                 // Payment failed
  CANCELLED = 'CANCELLED',           // Payment cancelled
  REFUNDED = 'REFUNDED',             // Payment refunded
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED', // Partial refund
}

export enum PaymentMethod {
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  WALLET = 'WALLET',
}

export interface PaymentProps {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
  failureReason?: string;
  refundAmount?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  refundedAt?: Date;
}

export class Payment {
  private props: PaymentProps;

  private constructor(props: PaymentProps) {
    this.props = props;
  }

  public static create(props: Omit<PaymentProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Payment {
    Payment.validate(props);

    return new Payment({
      id: crypto.randomUUID(),
      status: PaymentStatus.PENDING,
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static reconstitute(props: PaymentProps): Payment {
    return new Payment(props);
  }

  private static validate(props: Partial<PaymentProps>): void {
    if (!props.orderId) {
      throw new Error('Order ID is required');
    }

    if (!props.amount || props.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    if (!props.currency) {
      throw new Error('Currency is required');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get orderId(): string {
    return this.props.orderId;
  }

  get amount(): number {
    return this.props.amount;
  }

  get currency(): string {
    return this.props.currency;
  }

  get status(): PaymentStatus {
    return this.props.status;
  }

  get paymentMethod(): PaymentMethod | undefined {
    return this.props.paymentMethod;
  }

  get stripePaymentIntentId(): string | undefined {
    return this.props.stripePaymentIntentId;
  }

  get stripeChargeId(): string | undefined {
    return this.props.stripeChargeId;
  }

  get failureReason(): string | undefined {
    return this.props.failureReason;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get paidAt(): Date | undefined {
    return this.props.paidAt;
  }

  /**
   * Mark payment as processing
   */
  public markAsProcessing(stripePaymentIntentId: string): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be marked as processing');
    }

    this.props.status = PaymentStatus.PROCESSING;
    this.props.stripePaymentIntentId = stripePaymentIntentId;
    this.props.updatedAt = new Date();
  }

  /**
   * Mark payment as succeeded
   */
  public markAsSucceeded(stripeChargeId: string, paymentMethod: PaymentMethod): void {
    if (this.status !== PaymentStatus.PROCESSING && this.status !== PaymentStatus.PENDING) {
      throw new Error('Only processing or pending payments can be marked as succeeded');
    }

    this.props.status = PaymentStatus.SUCCEEDED;
    this.props.stripeChargeId = stripeChargeId;
    this.props.paymentMethod = paymentMethod;
    this.props.paidAt = new Date();
    this.props.updatedAt = new Date();
  }

  /**
   * Mark payment as failed
   */
  public markAsFailed(reason: string): void {
    if (this.status === PaymentStatus.SUCCEEDED || this.status === PaymentStatus.REFUNDED) {
      throw new Error('Cannot mark succeeded or refunded payments as failed');
    }

    this.props.status = PaymentStatus.FAILED;
    this.props.failureReason = reason;
    this.props.updatedAt = new Date();
  }

  /**
   * Mark payment as cancelled
   */
  public cancel(): void {
    if (this.status === PaymentStatus.SUCCEEDED || this.status === PaymentStatus.REFUNDED) {
      throw new Error('Cannot cancel succeeded or refunded payments');
    }

    this.props.status = PaymentStatus.CANCELLED;
    this.props.updatedAt = new Date();
  }

  /**
   * Refund payment (full or partial)
   */
  public refund(amount?: number): void {
    if (this.status !== PaymentStatus.SUCCEEDED) {
      throw new Error('Only succeeded payments can be refunded');
    }

    const refundAmount = amount ?? this.amount;

    if (refundAmount <= 0 || refundAmount > this.amount) {
      throw new Error('Invalid refund amount');
    }

    this.props.refundAmount = (this.props.refundAmount ?? 0) + refundAmount;

    if (this.props.refundAmount >= this.amount) {
      this.props.status = PaymentStatus.REFUNDED;
    } else {
      this.props.status = PaymentStatus.PARTIALLY_REFUNDED;
    }

    this.props.refundedAt = new Date();
    this.props.updatedAt = new Date();
  }

  /**
   * Check if payment is successful
   */
  public isSuccessful(): boolean {
    return this.status === PaymentStatus.SUCCEEDED;
  }

  /**
   * Check if payment can be refunded
   */
  public canBeRefunded(): boolean {
    return this.status === PaymentStatus.SUCCEEDED || this.status === PaymentStatus.PARTIALLY_REFUNDED;
  }

  public getProps(): PaymentProps {
    return { ...this.props };
  }
}
