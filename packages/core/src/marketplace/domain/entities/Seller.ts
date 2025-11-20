/**
 * Seller Entity
 * 
 * Represents a seller in the marketplace.
 * Manages seller-specific business rules like verification, ratings, and Stripe integration.
 */

export interface SellerProps {
  id: string;
  userId: string;
  businessName: string;
  verified: boolean;
  rating: number;
  storefront?: object;
  stripeAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Seller {
  private props: SellerProps;

  private constructor(props: SellerProps) {
    this.validateRating(props.rating);
    this.validateBusinessName(props.businessName);
    this.props = props;
  }

  /**
   * Create a new seller (not yet verified)
   */
  public static create(props: Omit<SellerProps, 'rating' | 'verified' | 'createdAt' | 'updatedAt'>): Seller {
    return new Seller({
      ...props,
      rating: 0,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Reconstitute a seller from persistence
   */
  public static reconstitute(props: SellerProps): Seller {
    return new Seller(props);
  }

  private validateRating(rating: number): void {
    if (rating < 0 || rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
  }

  private validateBusinessName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Business name cannot be empty');
    }

    if (name.length < 3) {
      throw new Error('Business name must be at least 3 characters');
    }

    if (name.length > 100) {
      throw new Error('Business name cannot exceed 100 characters');
    }
  }

  /**
   * Verify the seller (after KYC/business validation)
   */
  public verify(): void {
    if (this.props.verified) {
      throw new Error('Seller is already verified');
    }
    this.props.verified = true;
    this.props.updatedAt = new Date();
  }

  /**
   * Unverify the seller (if fraudulent activity detected)
   */
  public unverify(): void {
    this.props.verified = false;
    this.props.updatedAt = new Date();
  }

  /**
   * Update seller rating based on reviews
   */
  public updateRating(newRating: number): void {
    this.validateRating(newRating);
    this.props.rating = newRating;
    this.props.updatedAt = new Date();
  }

  /**
   * Connect Stripe account for payouts
   */
  public connectStripe(accountId: string): void {
    if (!accountId || accountId.trim().length === 0) {
      throw new Error('Stripe account ID is required');
    }

    if (!accountId.startsWith('acct_')) {
      throw new Error('Invalid Stripe account ID format');
    }

    this.props.stripeAccountId = accountId;
    this.props.updatedAt = new Date();
  }

  /**
   * Disconnect Stripe account
   */
  public disconnectStripe(): void {
    this.props.stripeAccountId = undefined;
    this.props.updatedAt = new Date();
  }

  /**
   * Update storefront configuration
   */
  public updateStorefront(storefront: object): void {
    this.props.storefront = storefront;
    this.props.updatedAt = new Date();
  }

  /**
   * Check if seller can accept payments
   */
  public canAcceptPayments(): boolean {
    return this.props.verified && !!this.props.stripeAccountId;
  }

  /**
   * Check if seller has good standing (rating >= 3.0)
   */
  public hasGoodStanding(): boolean {
    return this.props.rating >= 3.0;
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get businessName(): string {
    return this.props.businessName;
  }

  get verified(): boolean {
    return this.props.verified;
  }

  get rating(): number {
    return this.props.rating;
  }

  get storefront(): object | undefined {
    return this.props.storefront;
  }

  get stripeAccountId(): string | undefined {
    return this.props.stripeAccountId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
