# Week 1 Execution Plan - TreeVerse Backend

**Start Date:** November 20, 2025  
**Goal:** Build complete Marketplace domain with working API endpoint

---

## 📋 Implementation Checklist

### **Day 1-2: Domain Layer** (Nov 20-21)

#### Value Objects
- [ ] Create `Money.ts` value object
- [ ] Create `SKU.ts` value object  
- [ ] Add unit tests for value objects

#### Entities & Aggregates
- [ ] Create `Seller.ts` entity
- [ ] Create `Listing.ts` aggregate (most complex)
- [ ] Create `Variant.ts` entity
- [ ] Add domain events to Listing
- [ ] Add unit tests for entities

**Files to Create:** 8 files total
- `/packages/core/src/marketplace/domain/value-objects/Money.ts`
- `/packages/core/src/marketplace/domain/value-objects/SKU.ts`
- `/packages/core/src/marketplace/domain/entities/Seller.ts`
- `/packages/core/src/marketplace/domain/aggregates/Listing.ts`
- `/packages/core/src/marketplace/domain/aggregates/Variant.ts`
- `/packages/core/src/marketplace/domain/__tests__/Money.test.ts`
- `/packages/core/src/marketplace/domain/__tests__/Listing.test.ts`
- `/packages/core/src/marketplace/domain/__tests__/Seller.test.ts`

---

### **Day 3-4: Repository Pattern** (Nov 22-23)

#### Repository Interfaces
- [ ] Create `IListingRepository.ts` interface
- [ ] Create `ISellerRepository.ts` interface
- [ ] Create `IVariantRepository.ts` interface

#### Repository Implementations
- [ ] Implement `PrismaListingRepository.ts`
- [ ] Implement `PrismaSellerRepository.ts`
- [ ] Implement `PrismaVariantRepository.ts`
- [ ] Add repository unit tests (with mocks)

**Files to Create:** 9 files total
- `/packages/core/src/marketplace/domain/repositories/IListingRepository.ts`
- `/packages/core/src/marketplace/domain/repositories/ISellerRepository.ts`
- `/packages/core/src/marketplace/domain/repositories/IVariantRepository.ts`
- `/packages/core/src/marketplace/infrastructure/repositories/PrismaListingRepository.ts`
- `/packages/core/src/marketplace/infrastructure/repositories/PrismaSellerRepository.ts`
- `/packages/core/src/marketplace/infrastructure/repositories/PrismaVariantRepository.ts`
- `/packages/core/src/marketplace/infrastructure/__tests__/PrismaListingRepository.test.ts`

---

### **Day 5-6: Application Layer** (Nov 24-25)

#### DTOs
- [ ] Create `CreateListingDTO.ts`
- [ ] Create `UpdateListingDTO.ts`
- [ ] Create `ListingResponseDTO.ts`
- [ ] Create `CreateSellerDTO.ts`

#### Use Cases
- [ ] Implement `CreateListingUseCase.ts`
- [ ] Implement `PublishListingUseCase.ts`
- [ ] Implement `UpdateListingUseCase.ts`
- [ ] Implement `GetListingUseCase.ts`
- [ ] Implement `SearchListingsUseCase.ts`
- [ ] Add use case unit tests

**Files to Create:** 12 files total
- `/packages/core/src/marketplace/application/dtos/CreateListingDTO.ts`
- `/packages/core/src/marketplace/application/dtos/ListingResponseDTO.ts`
- `/packages/core/src/marketplace/application/dtos/CreateSellerDTO.ts`
- `/packages/core/src/marketplace/application/use-cases/CreateListingUseCase.ts`
- `/packages/core/src/marketplace/application/use-cases/PublishListingUseCase.ts`
- `/packages/core/src/marketplace/application/use-cases/GetListingUseCase.ts`
- `/packages/core/src/marketplace/application/use-cases/SearchListingsUseCase.ts`
- `/packages/core/src/marketplace/application/__tests__/CreateListingUseCase.test.ts`

---

### **Day 7: API Layer** (Nov 26)

#### API Routes
- [ ] Create `POST /api/v1/listings` - Create listing
- [ ] Create `GET /api/v1/listings` - Search listings
- [ ] Create `GET /api/v1/listings/[id]` - Get single listing
- [ ] Create `PUT /api/v1/listings/[id]` - Update listing
- [ ] Create `POST /api/v1/listings/[id]/publish` - Publish listing

#### Middleware
- [ ] Create validation middleware
- [ ] Create error handling middleware
- [ ] Create logging setup

**Files to Create:** 8 files total
- `/apps/web/app/api/v1/listings/route.ts`
- `/apps/web/app/api/v1/listings/[id]/route.ts`
- `/apps/web/app/api/v1/listings/[id]/publish/route.ts`
- `/apps/web/lib/middleware/validation.ts`
- `/apps/web/lib/middleware/errorHandler.ts`
- `/apps/web/lib/logger.ts`

---

## 📊 Progress Tracking

**Total Files to Create:** ~40 files
**Estimated Lines of Code:** ~3,000 lines

### Current Progress
- [x] Planning complete
- [ ] Day 1-2: Domain layer (0/8 files)
- [ ] Day 3-4: Repositories (0/9 files)
- [ ] Day 5-6: Application layer (0/12 files)
- [ ] Day 7: API layer (0/8 files)

---

## ✅ Success Criteria

By end of Week 1, you should be able to:

```bash
# 1. Run all tests successfully
npm test

# 2. Start the development server
npm run dev

# 3. Create a listing via API
curl -X POST http://localhost:3000/api/v1/listings \
  -H "Content-Type: application/json" \
  -d '{
    "sellerId": "uuid",
    "speciesId": "uuid",
    "title": "Beautiful Oak Tree",
    "description": "A magnificent oak tree perfect for your garden that will provide shade and beauty for decades to come.",
    "basePrice": 99.99,
    "inventory": 10
  }'

# 4. Get listings
curl http://localhost:3000/api/v1/listings

# 5. Publish a listing
curl -X POST http://localhost:3000/api/v1/listings/{id}/publish
```

---

## 🔧 Prerequisites

Before starting, ensure:
- [ ] Docker is running (for Postgres)
- [ ] Dependencies installed: `npm install`
- [ ] Prisma client generated: `npx prisma generate`
- [ ] Database migrated: `npx prisma db push`

---

## 🚀 Let's Begin!

**Starting implementation NOW...**
