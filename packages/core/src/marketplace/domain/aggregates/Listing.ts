/**
 * Listing Aggregate Root
 * 
 * Central aggregate for marketplace listings.
 * Manages product listings, inventory, pricing, and publication status.
 * Emits domain events for state changes.
 */

import { Money } from '../value-objects/Money';

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SOLD_OUT = 'SOLD_OUT',
  FLAGGED = 'FLAGGED',
  ARCHIVED = 'ARCHIVED',
}

export interface DomainEvent {
  type: string;
  aggregateId: string;
  occurredAt: Date;
  data: any;
}

export interface ListingProps {
  id: string;
  sellerId: string;
  speciesId: string;
  title: string;
  description: string;
  basePrice: Money;
  inventory: number;
  status: ListingStatus;
  viewCount: number;
  metadata?: object;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export class Listing {
  private props: ListingProps;
  private domainEvents: DomainEvent[] = [];

  private constructor(props: ListingProps) {
    this.props = props;
  }

  /**
   * Create a new listing (starts in DRAFT status)
   */
  public static create(
    props: Omit<ListingProps, 'id' | 'status' | 'viewCount' | 'createdAt' | 'updatedAt'>
  ): Listing {
    // Validate title
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    if (props.title.length < 10) {
      throw new Error('Title must be at least 10 characters');
    }
    if (props.title.length > 200) {
      throw new Error('Title cannot exceed 200 characters');
    }

    // Validate description
    if (!props.description || props.description.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
    if (props.description.length < 50) {
      throw new Error('Description must be at least 50 characters');
    }

    // Validate price
    if (props.basePrice.isZero() || props.basePrice.getAmount() <= 0) {
      throw new Error('Base price must be greater than zero');
    }

    // Validate inventory
    if (props.inventory < 0) {
      throw new Error('Inventory cannot be negative');
    }

    const listing = new Listing({
      ...props,
      id: crypto.randomUUID(),
      status: ListingStatus.DRAFT,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    listing.addDomainEvent({
      type: 'ListingCreated',
      aggregateId: listing.id,
      occurredAt: new Date(),
      data: {
        listingId: listing.id,
        sellerId: listing.sellerId,
        title: listing.title,
      },
    });

    return listing;
  }

  /**
   * Reconstitute a listing from persistence
   */
  public static reconstitute(props: ListingProps): Listing {
    return new Listing(props);
  }

  /**
   * Publish the listing (make it visible to buyers)
   */
  public publish(): void {
    if (this.props.inventory === 0) {
      throw new Error('Cannot publish listing with zero inventory');
    }

    if (this.props.status !== ListingStatus.DRAFT) {
      throw new Error('Only draft listings can be published');
    }

    this.props.status = ListingStatus.ACTIVE;
    this.props.publishedAt = new Date();
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'ListingPublished',
      aggregateId: this.props.id,
      occurredAt: new Date(),
      data: {
        listingId: this.props.id,
        publishedAt: this.props.publishedAt,
      },
    });
  }

  /**
   * Update listing details
   */
  public updateDetails(title: string, description: string): void {
    if (this.props.status === ListingStatus.ARCHIVED) {
      throw new Error('Cannot update archived listing');
    }

    if (title && title.length >= 10 && title.length <= 200) {
      this.props.title = title;
    }

    if (description && description.length >= 50) {
      this.props.description = description;
    }

    this.props.updatedAt = new Date();
  }

  /**
   * Update the base price
   */
  public updatePrice(newPrice: Money): void {
    if (this.props.status === ListingStatus.ARCHIVED) {
      throw new Error('Cannot update price of archived listing');
    }

    if (newPrice.isZero() || newPrice.getAmount() <= 0) {
      throw new Error('Price must be greater than zero');
    }

    this.props.basePrice = newPrice;
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'ListingPriceUpdated',
      aggregateId: this.props.id,
      occurredAt: new Date(),
      data: {
        listingId: this.props.id,
        newPrice: newPrice.getAmount(),
        currency: newPrice.getCurrency(),
      },
    });
  }

  /**
   * Set inventory to a specific amount
   */
  public updateInventory(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Inventory cannot be negative');
    }

    const previousInventory = this.props.inventory;
    this.props.inventory = quantity;
    this.props.updatedAt = new Date();

    // If inventory drops to zero, mark as sold out
    if (quantity === 0 && this.props.status === ListingStatus.ACTIVE) {
      this.markAsSoldOut();
    }

    // If inventory was zero and now has stock, reactivate
    if (previousInventory === 0 && quantity > 0 && this.props.status === ListingStatus.SOLD_OUT) {
      this.props.status = ListingStatus.ACTIVE;
    }
  }

  /**
   * Decrease inventory by a specific amount (e.g., after purchase)
   */
  public decreaseInventory(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount to decrease must be positive');
    }

    const newInventory = this.props.inventory - amount;
    if (newInventory < 0) {
      throw new Error('Insufficient inventory');
    }

    this.updateInventory(newInventory);
  }

  /**
   * Increase inventory by a specific amount (e.g., restock)
   */
  public increaseInventory(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount to increase must be positive');
    }

    this.updateInventory(this.props.inventory + amount);
  }

  /**
   * Increment view count (for analytics)
   */
  public incrementViewCount(): void {
    this.props.viewCount += 1;
  }

  /**
   * Flag the listing (e.g., for fraud, policy violation)
   */
  public flag(reason: string): void {
    if (!reason || reason.trim().length === 0) {
      throw new Error('Flag reason is required');
    }

    this.props.status = ListingStatus.FLAGGED;
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'ListingFlagged',
      aggregateId: this.props.id,
      occurredAt: new Date(),
      data: {
        listingId: this.props.id,
        reason,
      },
    });
  }

  /**
   * Unflag the listing (after review)
   */
  public unflag(): void {
    if (this.props.status !== ListingStatus.FLAGGED) {
      throw new Error('Listing is not flagged');
    }

    // Return to previous status based on inventory
    this.props.status = this.props.inventory > 0 ? ListingStatus.ACTIVE : ListingStatus.DRAFT;
    this.props.updatedAt = new Date();
  }

  /**
   * Archive the listing (soft delete)
   */
  public archive(): void {
    this.props.status = ListingStatus.ARCHIVED;
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'ListingArchived',
      aggregateId: this.props.id,
      occurredAt: new Date(),
      data: {
        listingId: this.props.id,
      },
    });
  }

  /**
   * Mark listing as sold out
   */
  private markAsSoldOut(): void {
    this.props.status = ListingStatus.SOLD_OUT;

    this.addDomainEvent({
      type: 'ListingSoldOut',
      aggregateId: this.props.id,
      occurredAt: new Date(),
      data: {
        listingId: this.props.id,
      },
    });
  }

  /**
   * Check if listing is available for purchase
   */
  public isAvailable(): boolean {
    return this.props.status === ListingStatus.ACTIVE && this.props.inventory > 0;
  }

  /**
   * Check if listing is visible to buyers
   */
  public isVisible(): boolean {
    return this.props.status === ListingStatus.ACTIVE || this.props.status === ListingStatus.SOLD_OUT;
  }

  /**
   * Update metadata (SEO, tags, etc.)
   */
  public updateMetadata(metadata: object): void {
    this.props.metadata = metadata;
    this.props.updatedAt = new Date();
  }

  // Domain Events Management
  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get sellerId(): string {
    return this.props.sellerId;
  }

  get speciesId(): string {
    return this.props.speciesId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get basePrice(): Money {
    return this.props.basePrice;
  }

  get inventory(): number {
    return this.props.inventory;
  }

  get status(): ListingStatus {
    return this.props.status;
  }

  get viewCount(): number {
    return this.props.viewCount;
  }

  get metadata(): object | undefined {
    return this.props.metadata;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get publishedAt(): Date | undefined {
    return this.props.publishedAt;
  }
}
