# 🚀 Quick Start: Week 1 Implementation Guide

This guide provides a step-by-step implementation plan for **Week 1** to kickstart the backend development with working code.

---

## 🎯 Week 1 Goals

By the end of Week 1, you will have:
- ✅ Complete Marketplace domain entities (Seller, Listing, Variant)
- ✅ Repository pattern implemented
- ✅ First API endpoint working (`POST /api/v1/listings`)
- ✅ Basic authentication
- ✅ Unit tests for domain logic

---

## 📋 Day-by-Day Breakdown

### **Day 1-2: Marketplace Domain Entities**

#### Task 1.1: Create Value Objects

**File:** `packages/core/src/marketplace/domain/value-objects/Money.ts`

```typescript
export class Money {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number, currency: string = 'USD') {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
    this.amount = amount;
    this.currency = currency;
  }

  public static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return Money.create(this.amount + other.amount, this.currency);
  }

  public multiply(factor: number): Money {
    return Money.create(this.amount * factor, this.currency);
  }

  public equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
```

**File:** `packages/core/src/marketplace/domain/value-objects/SKU.ts`

```typescript
export class SKU {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): SKU {
    if (!value || value.length < 3) {
      throw new Error('SKU must be at least 3 characters');
    }
    return new SKU(value.toUpperCase());
  }

  public static generate(sellerId: string, productId: string): SKU {
    const timestamp = Date.now().toString(36);
    const skuValue = `${sellerId.substring(0, 4)}-${productId.substring(0, 4)}-${timestamp}`;
    return new SKU(skuValue.toUpperCase());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: SKU): boolean {
    return this.value === other.value;
  }
}
```

#### Task 1.2: Create Seller Entity

**File:** `packages/core/src/marketplace/domain/entities/Seller.ts`

```typescript
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
    this.props = props;
  }

  public static create(props: Omit<SellerProps, 'rating' | 'verified' | 'createdAt' | 'updatedAt'>): Seller {
    return new Seller({
      ...props,
      rating: 0,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static reconstitute(props: SellerProps): Seller {
    return new Seller(props);
  }

  private validateRating(rating: number): void {
    if (rating < 0 || rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
  }

  public verify(): void {
    this.props.verified = true;
    this.props.updatedAt = new Date();
  }

  public updateRating(newRating: number): void {
    this.validateRating(newRating);
    this.props.rating = newRating;
    this.props.updatedAt = new Date();
  }

  public connectStripe(accountId: string): void {
    if (!accountId) {
      throw new Error('Stripe account ID is required');
    }
    this.props.stripeAccountId = accountId;
    this.props.updatedAt = new Date();
  }

  // Getters
  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get businessName(): string { return this.props.businessName; }
  get verified(): boolean { return this.props.verified; }
  get rating(): number { return this.props.rating; }
  get stripeAccountId(): string | undefined { return this.props.stripeAccountId; }
}
```

#### Task 1.3: Create Listing Aggregate

**File:** `packages/core/src/marketplace/domain/aggregates/Listing.ts`

```typescript
import { Money } from '../value-objects/Money';

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SOLD_OUT = 'SOLD_OUT',
  FLAGGED = 'FLAGGED',
  ARCHIVED = 'ARCHIVED',
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
  private domainEvents: any[] = [];

  private constructor(props: ListingProps) {
    this.props = props;
  }

  public static create(
    props: Omit<ListingProps, 'id' | 'status' | 'viewCount' | 'createdAt' | 'updatedAt'>
  ): Listing {
    if (props.inventory < 0) {
      throw new Error('Inventory cannot be negative');
    }

    if (props.title.length < 10) {
      throw new Error('Title must be at least 10 characters');
    }

    if (props.description.length < 50) {
      throw new Error('Description must be at least 50 characters');
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
      data: { listingId: listing.id, sellerId: listing.sellerId },
    });

    return listing;
  }

  public static reconstitute(props: ListingProps): Listing {
    return new Listing(props);
  }

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
      data: { listingId: this.props.id, publishedAt: this.props.publishedAt },
    });
  }

  public updateInventory(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Inventory cannot be negative');
    }

    this.props.inventory = quantity;
    this.props.updatedAt = new Date();

    if (quantity === 0 && this.props.status === ListingStatus.ACTIVE) {
      this.markAsSoldOut();
    }
  }

  public decreaseInventory(amount: number): void {
    const newInventory = this.props.inventory - amount;
    if (newInventory < 0) {
      throw new Error('Insufficient inventory');
    }
    this.updateInventory(newInventory);
  }

  public increaseViewCount(): void {
    this.props.viewCount += 1;
  }

  public flag(reason: string): void {
    this.props.status = ListingStatus.FLAGGED;
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      type: 'ListingFlagged',
      aggregateId: this.props.id,
      data: { listingId: this.props.id, reason },
    });
  }

  public archive(): void {
    this.props.status = ListingStatus.ARCHIVED;
    this.props.updatedAt = new Date();
  }

  private markAsSoldOut(): void {
    this.props.status = ListingStatus.SOLD_OUT;
    this.addDomainEvent({
      type: 'ListingSoldOut',
      aggregateId: this.props.id,
      data: { listingId: this.props.id },
    });
  }

  private addDomainEvent(event: any): void {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): any[] {
    return this.domainEvents;
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }

  // Getters
  get id(): string { return this.props.id; }
  get sellerId(): string { return this.props.sellerId; }
  get speciesId(): string { return this.props.speciesId; }
  get title(): string { return this.props.title; }
  get description(): string { return this.props.description; }
  get basePrice(): Money { return this.props.basePrice; }
  get inventory(): number { return this.props.inventory; }
  get status(): ListingStatus { return this.props.status; }
  get viewCount(): number { return this.props.viewCount; }
  get publishedAt(): Date | undefined { return this.props.publishedAt; }
}
```

#### Task 1.4: Create Unit Tests

**File:** `packages/core/src/marketplace/domain/__tests__/Listing.test.ts`

```typescript
import { Listing, ListingStatus } from '../aggregates/Listing';
import { Money } from '../value-objects/Money';

describe('Listing Aggregate', () => {
  describe('create', () => {
    it('should create a listing in DRAFT status', () => {
      const listing = Listing.create({
        sellerId: 'seller-123',
        speciesId: 'species-456',
        title: 'Beautiful Oak Tree',
        description: 'A beautiful oak tree that will grow tall and strong, perfect for your backyard.',
        basePrice: Money.create(99.99),
        inventory: 10,
      });

      expect(listing.status).toBe(ListingStatus.DRAFT);
      expect(listing.inventory).toBe(10);
      expect(listing.viewCount).toBe(0);
    });

    it('should throw error if title is too short', () => {
      expect(() => {
        Listing.create({
          sellerId: 'seller-123',
          speciesId: 'species-456',
          title: 'Short',
          description: 'A beautiful oak tree that will grow tall and strong.',
          basePrice: Money.create(99.99),
          inventory: 10,
        });
      }).toThrow('Title must be at least 10 characters');
    });
  });

  describe('publish', () => {
    it('should change status to ACTIVE', () => {
      const listing = Listing.create({
        sellerId: 'seller-123',
        speciesId: 'species-456',
        title: 'Beautiful Oak Tree',
        description: 'A beautiful oak tree that will grow tall and strong, perfect for your backyard.',
        basePrice: Money.create(99.99),
        inventory: 10,
      });

      listing.publish();

      expect(listing.status).toBe(ListingStatus.ACTIVE);
      expect(listing.publishedAt).toBeDefined();
    });

    it('should throw error if inventory is zero', () => {
      const listing = Listing.create({
        sellerId: 'seller-123',
        speciesId: 'species-456',
        title: 'Beautiful Oak Tree',
        description: 'A beautiful oak tree that will grow tall and strong, perfect for your backyard.',
        basePrice: Money.create(99.99),
        inventory: 0,
      });

      expect(() => listing.publish()).toThrow('Cannot publish listing with zero inventory');
    });
  });

  describe('decreaseInventory', () => {
    it('should decrease inventory', () => {
      const listing = Listing.create({
        sellerId: 'seller-123',
        speciesId: 'species-456',
        title: 'Beautiful Oak Tree',
        description: 'A beautiful oak tree that will grow tall and strong, perfect for your backyard.',
        basePrice: Money.create(99.99),
        inventory: 10,
      });

      listing.decreaseInventory(3);

      expect(listing.inventory).toBe(7);
    });

    it('should mark as SOLD_OUT when inventory reaches zero', () => {
      const listing = Listing.create({
        sellerId: 'seller-123',
        speciesId: 'species-456',
        title: 'Beautiful Oak Tree',
        description: 'A beautiful oak tree that will grow tall and strong, perfect for your backyard.',
        basePrice: Money.create(99.99),
        inventory: 5,
      });

      listing.publish();
      listing.decreaseInventory(5);

      expect(listing.status).toBe(ListingStatus.SOLD_OUT);
    });
  });
});
```

---

### **Day 3-4: Repository Pattern**

#### Task 2.1: Create Repository Interfaces

**File:** `packages/core/src/marketplace/domain/repositories/IListingRepository.ts`

```typescript
import { Listing } from '../aggregates/Listing';

export interface IListingRepository {
  findById(id: string): Promise<Listing | null>;
  findByIds(ids: string[]): Promise<Listing[]>;
  findBySellerId(sellerId: string): Promise<Listing[]>;
  save(listing: Listing): Promise<void>;
  delete(id: string): Promise<void>;
  search(filters: {
    speciesId?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
  }): Promise<{ listings: Listing[]; total: number }>;
}
```

**File:** `packages/core/src/marketplace/domain/repositories/ISellerRepository.ts`

```typescript
import { Seller } from '../entities/Seller';

export interface ISellerRepository {
  findById(id: string): Promise<Seller | null>;
  findByUserId(userId: string): Promise<Seller | null>;
  save(seller: Seller): Promise<void>;
  delete(id: string): Promise<void>;
}
```

#### Task 2.2: Implement Prisma Repositories

**File:** `packages/core/src/marketplace/infrastructure/repositories/PrismaListingRepository.ts`

```typescript
import { PrismaClient } from '@repo/database';
import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { Listing, ListingStatus } from '../../domain/aggregates/Listing';
import { Money } from '../../domain/value-objects/Money';

export class PrismaListingRepository implements IListingRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Listing | null> {
    const data = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!data) return null;

    return Listing.reconstitute({
      id: data.id,
      sellerId: data.sellerId,
      speciesId: data.speciesId,
      title: data.title,
      description: data.description,
      basePrice: Money.create(Number(data.basePrice)),
      inventory: data.inventory,
      status: data.status as ListingStatus,
      viewCount: data.viewCount,
      metadata: data.metadata as object | undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      publishedAt: data.publishedAt ?? undefined,
    });
  }

  async findByIds(ids: string[]): Promise<Listing[]> {
    const data = await this.prisma.listing.findMany({
      where: { id: { in: ids } },
    });

    return data.map(d => this.toDomain(d));
  }

  async findBySellerId(sellerId: string): Promise<Listing[]> {
    const data = await this.prisma.listing.findMany({
      where: { sellerId },
      orderBy: { createdAt: 'desc' },
    });

    return data.map(d => this.toDomain(d));
  }

  async save(listing: Listing): Promise<void> {
    await this.prisma.listing.upsert({
      where: { id: listing.id },
      create: {
        id: listing.id,
        sellerId: listing.sellerId,
        speciesId: listing.speciesId,
        title: listing.title,
        description: listing.description,
        basePrice: listing.basePrice.getAmount(),
        inventory: listing.inventory,
        status: listing.status,
        viewCount: listing.viewCount,
        publishedAt: listing.publishedAt,
      },
      update: {
        title: listing.title,
        description: listing.description,
        basePrice: listing.basePrice.getAmount(),
        inventory: listing.inventory,
        status: listing.status,
        viewCount: listing.viewCount,
        publishedAt: listing.publishedAt,
      },
    });

    // Clear domain events after persisting
    listing.clearDomainEvents();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.listing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async search(filters: {
    speciesId?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
  }): Promise<{ listings: Listing[]; total: number }> {
    const where: any = {};

    if (filters.speciesId) where.speciesId = filters.speciesId;
    if (filters.status) where.status = filters.status;
    if (filters.minPrice || filters.maxPrice) {
      where.basePrice = {};
      if (filters.minPrice) where.basePrice.gte = filters.minPrice;
      if (filters.maxPrice) where.basePrice.lte = filters.maxPrice;
    }

    const [data, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        take: filters.limit ?? 20,
        skip: filters.offset ?? 0,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      listings: data.map(d => this.toDomain(d)),
      total,
    };
  }

  private toDomain(data: any): Listing {
    return Listing.reconstitute({
      id: data.id,
      sellerId: data.sellerId,
      speciesId: data.speciesId,
      title: data.title,
      description: data.description,
      basePrice: Money.create(Number(data.basePrice)),
      inventory: data.inventory,
      status: data.status as ListingStatus,
      viewCount: data.viewCount,
      metadata: data.metadata as object | undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      publishedAt: data.publishedAt ?? undefined,
    });
  }
}
```

---

### **Day 5-6: Application Services & Use Cases**

#### Task 3.1: Create DTOs

**File:** `packages/core/src/marketplace/application/dtos/CreateListingDTO.ts`

```typescript
export interface CreateListingDTO {
  sellerId: string;
  speciesId: string;
  title: string;
  description: string;
  basePrice: number;
  inventory: number;
}

export interface ListingResponseDTO {
  id: string;
  sellerId: string;
  speciesId: string;
  title: string;
  description: string;
  basePrice: number;
  inventory: number;
  status: string;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
``

#### Task 3.2: Create Use Case

**File:** `packages/core/src/marketplace/application/use-cases/CreateListingUseCase.ts`

```typescript
import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { ISellerRepository } from '../../domain/repositories/ISellerRepository';
import { Listing } from '../../domain/aggregates/Listing';
import { Money } from '../../domain/value-objects/Money';
import { CreateListingDTO, ListingResponseDTO } from '../dtos/CreateListingDTO';

export class CreateListingUseCase {
  constructor(
    private listingRepository: IListingRepository,
    private sellerRepository: ISellerRepository
  ) {}

  async execute(dto: CreateListingDTO): Promise<ListingResponseDTO> {
    // 1. Verify seller exists
    const seller = await this.sellerRepository.findById(dto.sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }

    // 2. Create listing domain object
    const listing = Listing.create({
      sellerId: dto.sellerId,
      speciesId: dto.speciesId,
      title: dto.title,
      description: dto.description,
      basePrice: Money.create(dto.basePrice),
      inventory: dto.inventory,
    });

    // 3. Persist
    await this.listingRepository.save(listing);

    // 4. Return DTO
    return this.toDTO(listing);
  }

  private toDTO(listing: Listing): ListingResponseDTO {
    return {
      id: listing.id,
      sellerId: listing.sellerId,
      speciesId: listing.speciesId,
      title: listing.title,
      description: listing.description,
      basePrice: listing.basePrice.getAmount(),
      inventory: listing.inventory,
      status: listing.status,
      viewCount: listing.viewCount,
      publishedAt: listing.publishedAt?.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
```

---

### **Day 7: First API Endpoint**

#### Task 4.1: Create API Route

**File:** `apps/web/app/api/v1/listings/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@repo/database';
import { CreateListingUseCase } from '@repo/core/marketplace/application/use-cases/CreateListingUseCase';
import { PrismaListingRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository';
import { PrismaSellerRepository } from '@repo/core/marketplace/infrastructure/repositories/PrismaSellerRepository';

const CreateListingSchema = z.object({
  sellerId: z.string().uuid(),
  speciesId: z.string().uuid(),
  title: z.string().min(10).max(200),
  description: z.string().min(50),
  basePrice: z.number().positive(),
  inventory: z.number().int().min(0),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = CreateListingSchema.parse(body);

    // 2. Initialize repositories and use case
    const listingRepository = new PrismaListingRepository(prisma);
    const sellerRepository = new PrismaSellerRepository(prisma);
    const useCase = new CreateListingUseCase(listingRepository, sellerRepository);

    // 3. Execute use case
    const result = await useCase.execute(validatedData);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
```

---

## ✅ Validation Checklist

By the end of Week 1, you should be able to:

- [ ] Run unit tests: `npm test`
- [ ] Create a listing via API:
  ```bash
  curl -X POST http://localhost:3000/api/v1/listings \
    -H "Content-Type: application/json" \
    -d '{
      "sellerId": "uuid-here",
      "speciesId": "uuid-here",
      "title": "Beautiful Oak Tree",
      "description": "A magnificent oak tree perfect for your garden...",
      "basePrice": 99.99,
      "inventory": 10
    }'
  ```
- [ ] See data persisted in database
- [ ] All tests passing with >80% coverage

---

## 🚀 Next Steps (Week 2)

Once Week 1 is complete, move on to:
1. Complete authentication (register/login)
2. Add authorization middleware
3. Create GET endpoints for listings
4. Implement search functionality
5. Add more use cases (PublishListing, UpdateListing)

---

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Validation](https://zod.dev/)
- [Jest Testing](https://jestjs.io/)

---

**Good luck! 🎯**
