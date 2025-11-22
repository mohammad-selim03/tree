module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/packages/database/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: [
        'query',
        'error',
        'warn'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/packages/core/src/marketplace/domain/aggregates/Listing.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Listing Aggregate Root
 * 
 * Central aggregate for marketplace listings.
 * Manages product listings, inventory, pricing, and publication status.
 * Emits domain events for state changes.
 */ __turbopack_context__.s([
    "Listing",
    ()=>Listing,
    "ListingStatus",
    ()=>ListingStatus
]);
var ListingStatus = /*#__PURE__*/ function(ListingStatus) {
    ListingStatus["DRAFT"] = "DRAFT";
    ListingStatus["ACTIVE"] = "ACTIVE";
    ListingStatus["SOLD_OUT"] = "SOLD_OUT";
    ListingStatus["FLAGGED"] = "FLAGGED";
    ListingStatus["ARCHIVED"] = "ARCHIVED";
    return ListingStatus;
}({});
class Listing {
    props;
    domainEvents = [];
    constructor(props){
        this.props = props;
    }
    /**
   * Create a new listing (starts in DRAFT status)
   */ static create(props) {
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
            status: "DRAFT",
            viewCount: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        listing.addDomainEvent({
            type: 'ListingCreated',
            aggregateId: listing.id,
            occurredAt: new Date(),
            data: {
                listingId: listing.id,
                sellerId: listing.sellerId,
                title: listing.title
            }
        });
        return listing;
    }
    /**
   * Reconstitute a listing from persistence
   */ static reconstitute(props) {
        return new Listing(props);
    }
    /**
   * Publish the listing (make it visible to buyers)
   */ publish() {
        if (this.props.inventory === 0) {
            throw new Error('Cannot publish listing with zero inventory');
        }
        if (this.props.status !== "DRAFT") {
            throw new Error('Only draft listings can be published');
        }
        this.props.status = "ACTIVE";
        this.props.publishedAt = new Date();
        this.props.updatedAt = new Date();
        this.addDomainEvent({
            type: 'ListingPublished',
            aggregateId: this.props.id,
            occurredAt: new Date(),
            data: {
                listingId: this.props.id,
                publishedAt: this.props.publishedAt
            }
        });
    }
    /**
   * Update listing details
   */ updateDetails(title, description) {
        if (this.props.status === "ARCHIVED") {
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
   */ updatePrice(newPrice) {
        if (this.props.status === "ARCHIVED") {
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
                currency: newPrice.getCurrency()
            }
        });
    }
    /**
   * Set inventory to a specific amount
   */ updateInventory(quantity) {
        if (quantity < 0) {
            throw new Error('Inventory cannot be negative');
        }
        const previousInventory = this.props.inventory;
        this.props.inventory = quantity;
        this.props.updatedAt = new Date();
        // If inventory drops to zero, mark as sold out
        if (quantity === 0 && this.props.status === "ACTIVE") {
            this.markAsSoldOut();
        }
        // If inventory was zero and now has stock, reactivate
        if (previousInventory === 0 && quantity > 0 && this.props.status === "SOLD_OUT") {
            this.props.status = "ACTIVE";
        }
    }
    /**
   * Decrease inventory by a specific amount (e.g., after purchase)
   */ decreaseInventory(amount) {
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
   */ increaseInventory(amount) {
        if (amount <= 0) {
            throw new Error('Amount to increase must be positive');
        }
        this.updateInventory(this.props.inventory + amount);
    }
    /**
   * Increment view count (for analytics)
   */ incrementViewCount() {
        this.props.viewCount += 1;
    }
    /**
   * Flag the listing (e.g., for fraud, policy violation)
   */ flag(reason) {
        if (!reason || reason.trim().length === 0) {
            throw new Error('Flag reason is required');
        }
        this.props.status = "FLAGGED";
        this.props.updatedAt = new Date();
        this.addDomainEvent({
            type: 'ListingFlagged',
            aggregateId: this.props.id,
            occurredAt: new Date(),
            data: {
                listingId: this.props.id,
                reason
            }
        });
    }
    /**
   * Unflag the listing (after review)
   */ unflag() {
        if (this.props.status !== "FLAGGED") {
            throw new Error('Listing is not flagged');
        }
        // Return to previous status based on inventory
        this.props.status = this.props.inventory > 0 ? "ACTIVE" : "DRAFT";
        this.props.updatedAt = new Date();
    }
    /**
   * Archive the listing (soft delete)
   */ archive() {
        this.props.status = "ARCHIVED";
        this.props.updatedAt = new Date();
        this.addDomainEvent({
            type: 'ListingArchived',
            aggregateId: this.props.id,
            occurredAt: new Date(),
            data: {
                listingId: this.props.id
            }
        });
    }
    /**
   * Mark listing as sold out
   */ markAsSoldOut() {
        this.props.status = "SOLD_OUT";
        this.addDomainEvent({
            type: 'ListingSoldOut',
            aggregateId: this.props.id,
            occurredAt: new Date(),
            data: {
                listingId: this.props.id
            }
        });
    }
    /**
   * Check if listing is available for purchase
   */ isAvailable() {
        return this.props.status === "ACTIVE" && this.props.inventory > 0;
    }
    /**
   * Check if listing is visible to buyers
   */ isVisible() {
        return this.props.status === "ACTIVE" || this.props.status === "SOLD_OUT";
    }
    /**
   * Update metadata (SEO, tags, etc.)
   */ updateMetadata(metadata) {
        this.props.metadata = metadata;
        this.props.updatedAt = new Date();
    }
    // Domain Events Management
    addDomainEvent(event) {
        this.domainEvents.push(event);
    }
    getDomainEvents() {
        return [
            ...this.domainEvents
        ];
    }
    clearDomainEvents() {
        this.domainEvents = [];
    }
    // Getters
    get id() {
        return this.props.id;
    }
    get sellerId() {
        return this.props.sellerId;
    }
    get speciesId() {
        return this.props.speciesId;
    }
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get basePrice() {
        return this.props.basePrice;
    }
    get inventory() {
        return this.props.inventory;
    }
    get status() {
        return this.props.status;
    }
    get viewCount() {
        return this.props.viewCount;
    }
    get metadata() {
        return this.props.metadata;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get publishedAt() {
        return this.props.publishedAt;
    }
}
}),
"[project]/packages/core/src/marketplace/domain/value-objects/Money.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Money Value Object
 * 
 * Represents monetary value with currency.
 * Ensures money operations are type-safe and currency-aware.
 */ __turbopack_context__.s([
    "Money",
    ()=>Money
]);
class Money {
    amount;
    currency;
    constructor(amount, currency = 'USD'){
        if (amount < 0) {
            throw new Error('Money amount cannot be negative');
        }
        if (!currency || currency.length !== 3) {
            throw new Error('Currency must be a valid 3-letter code');
        }
        this.amount = amount;
        this.currency = currency.toUpperCase();
    }
    static create(amount, currency = 'USD') {
        return new Money(amount, currency);
    }
    static zero(currency = 'USD') {
        return new Money(0, currency);
    }
    getAmount() {
        return this.amount;
    }
    getCurrency() {
        return this.currency;
    }
    add(other) {
        this.assertSameCurrency(other);
        return Money.create(this.amount + other.amount, this.currency);
    }
    subtract(other) {
        this.assertSameCurrency(other);
        const result = this.amount - other.amount;
        if (result < 0) {
            throw new Error('Subtraction would result in negative money');
        }
        return Money.create(result, this.currency);
    }
    multiply(factor) {
        if (factor < 0) {
            throw new Error('Cannot multiply money by negative factor');
        }
        return Money.create(this.amount * factor, this.currency);
    }
    divide(divisor) {
        if (divisor <= 0) {
            throw new Error('Cannot divide money by zero or negative number');
        }
        return Money.create(this.amount / divisor, this.currency);
    }
    isGreaterThan(other) {
        this.assertSameCurrency(other);
        return this.amount > other.amount;
    }
    isLessThan(other) {
        this.assertSameCurrency(other);
        return this.amount < other.amount;
    }
    equals(other) {
        return this.amount === other.amount && this.currency === other.currency;
    }
    isZero() {
        return this.amount === 0;
    }
    toString() {
        return `${this.currency} ${this.amount.toFixed(2)}`;
    }
    assertSameCurrency(other) {
        if (this.currency !== other.currency) {
            throw new Error(`Cannot perform operation on different currencies: ${this.currency} and ${other.currency}`);
        }
    }
}
}),
"[project]/packages/core/src/marketplace/application/use-cases/CreateListingUseCase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create Listing Use Case
 * 
 * Handles the business logic for creating a new listing.
 * Validates seller exists and delegates to domain entity for creation.
 */ __turbopack_context__.s([
    "CreateListingUseCase",
    ()=>CreateListingUseCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$aggregates$2f$Listing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/domain/aggregates/Listing.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/domain/value-objects/Money.ts [app-route] (ecmascript)");
;
;
class CreateListingUseCase {
    listingRepository;
    sellerRepository;
    constructor(listingRepository, sellerRepository){
        this.listingRepository = listingRepository;
        this.sellerRepository = sellerRepository;
    }
    async execute(dto) {
        // 1. Verify seller exists and is active
        const seller = await this.sellerRepository.findById(dto.sellerId);
        if (!seller) {
            throw new Error('Seller not found');
        }
        if (!seller.verified) {
            throw new Error('Only verified sellers can create listings');
        }
        // 2. Create listing domain object
        const listing = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$aggregates$2f$Listing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Listing"].create({
            sellerId: dto.sellerId,
            speciesId: dto.speciesId,
            title: dto.title,
            description: dto.description,
            basePrice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Money"].create(dto.basePrice, 'USD'),
            inventory: dto.inventory,
            metadata: dto.metadata
        });
        // 3. Persist listing
        await this.listingRepository.save(listing);
        // 4. Return DTO
        return this.toResponseDTO(listing);
    }
    toResponseDTO(listing) {
        return {
            id: listing.id,
            sellerId: listing.sellerId,
            speciesId: listing.speciesId,
            title: listing.title,
            description: listing.description,
            basePrice: listing.basePrice.getAmount(),
            currency: listing.basePrice.getCurrency(),
            inventory: listing.inventory,
            status: listing.status,
            viewCount: listing.viewCount,
            metadata: listing.metadata,
            publishedAt: listing.publishedAt?.toISOString(),
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt.toISOString()
        };
    }
}
}),
"[project]/packages/core/src/marketplace/application/use-cases/SearchListingsUseCase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Search Listings Use Case
 * 
 * Search and filter listings with pagination.
 */ __turbopack_context__.s([
    "SearchListingsUseCase",
    ()=>SearchListingsUseCase
]);
class SearchListingsUseCase {
    listingRepository;
    constructor(listingRepository){
        this.listingRepository = listingRepository;
    }
    async execute(dto) {
        // Set defaults
        const page = dto.page ?? 1;
        const pageSize = dto.pageSize ?? 20;
        const offset = (page - 1) * pageSize;
        // Execute search
        const result = await this.listingRepository.search({
            speciesId: dto.speciesId,
            sellerId: dto.sellerId,
            status: dto.status ?? 'ACTIVE',
            minPrice: dto.minPrice,
            maxPrice: dto.maxPrice,
            searchTerm: dto.searchTerm,
            limit: pageSize,
            offset
        });
        // Calculate total pages
        const totalPages = Math.ceil(result.total / pageSize);
        // Map to response DTOs
        const listings = result.listings.map((listing)=>this.toResponseDTO(listing));
        return {
            listings,
            total: result.total,
            page,
            pageSize,
            totalPages
        };
    }
    toResponseDTO(listing) {
        return {
            id: listing.id,
            sellerId: listing.sellerId,
            speciesId: listing.speciesId,
            title: listing.title,
            description: listing.description,
            basePrice: listing.basePrice.getAmount(),
            currency: listing.basePrice.getCurrency(),
            inventory: listing.inventory,
            status: listing.status,
            viewCount: listing.viewCount,
            metadata: listing.metadata,
            publishedAt: listing.publishedAt?.toISOString(),
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt.toISOString()
        };
    }
}
}),
"[project]/packages/core/src/marketplace/infrastructure/repositories/PrismaListingRepository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prisma Listing Repository Implementation
 * 
 * Implements IListingRepository using Prisma ORM.
 * Handles mapping between domain entities and database models.
 */ __turbopack_context__.s([
    "PrismaListingRepository",
    ()=>PrismaListingRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$aggregates$2f$Listing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/domain/aggregates/Listing.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/domain/value-objects/Money.ts [app-route] (ecmascript)");
;
;
class PrismaListingRepository {
    prisma;
    constructor(prisma){
        this.prisma = prisma;
    }
    async findById(id) {
        const data = await this.prisma.listing.findUnique({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findByIds(ids) {
        const data = await this.prisma.listing.findMany({
            where: {
                id: {
                    in: ids
                },
                deletedAt: null
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async findBySellerId(sellerId) {
        const data = await this.prisma.listing.findMany({
            where: {
                sellerId,
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async findBySpeciesId(speciesId) {
        const data = await this.prisma.listing.findMany({
            where: {
                speciesId,
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async search(filters) {
        const where = {
            deletedAt: null
        };
        if (filters.speciesId) {
            where.speciesId = filters.speciesId;
        }
        if (filters.sellerId) {
            where.sellerId = filters.sellerId;
        }
        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.basePrice = {};
            if (filters.minPrice !== undefined) {
                where.basePrice.gte = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                where.basePrice.lte = filters.maxPrice;
            }
        }
        if (filters.searchTerm) {
            where.OR = [
                {
                    title: {
                        contains: filters.searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: filters.searchTerm,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        const limit = filters.limit ?? 20;
        const offset = filters.offset ?? 0;
        const [data, total] = await Promise.all([
            this.prisma.listing.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: {
                    publishedAt: {
                        sort: 'desc',
                        nulls: 'last'
                    }
                }
            }),
            this.prisma.listing.count({
                where
            })
        ]);
        return {
            listings: data.map((d)=>this.toDomain(d)),
            total,
            limit,
            offset
        };
    }
    async save(listing) {
        const data = this.toPersistence(listing);
        await this.prisma.listing.upsert({
            where: {
                id: listing.id
            },
            create: data,
            update: {
                title: data.title,
                description: data.description,
                basePrice: data.basePrice,
                inventory: data.inventory,
                status: data.status,
                viewCount: data.viewCount,
                metadata: data.metadata,
                publishedAt: data.publishedAt,
                updatedAt: data.updatedAt
            }
        });
        // In a real implementation, you would also persist domain events here
        // For now, we'll just clear them
        listing.clearDomainEvents();
    }
    async delete(id) {
        await this.prisma.listing.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async count(status) {
        const where = {
            deletedAt: null
        };
        if (status) {
            where.status = status;
        }
        return this.prisma.listing.count({
            where
        });
    }
    async findNeedingAttention() {
        const data = await this.prisma.listing.findMany({
            where: {
                deletedAt: null,
                OR: [
                    {
                        status: 'FLAGGED'
                    },
                    {
                        status: 'SOLD_OUT'
                    },
                    {
                        status: 'ACTIVE',
                        inventory: {
                            lte: 5
                        }
                    }
                ]
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    /**
   * Convert Prisma model to Domain entity
   */ toDomain(data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$aggregates$2f$Listing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Listing"].reconstitute({
            id: data.id,
            sellerId: data.sellerId,
            speciesId: data.speciesId,
            title: data.title,
            description: data.description,
            basePrice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Money"].create(Number(data.basePrice), 'USD'),
            inventory: data.inventory,
            status: data.status,
            viewCount: data.viewCount,
            metadata: data.metadata,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            publishedAt: data.publishedAt ?? undefined
        });
    }
    /**
   * Convert Domain entity to Prisma model data
   */ toPersistence(listing) {
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
            metadata: listing.metadata ?? null,
            publishedAt: listing.publishedAt ?? null,
            createdAt: listing.createdAt,
            updatedAt: listing.updatedAt
        };
    }
}
}),
"[project]/packages/core/src/marketplace/domain/entities/Seller.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Seller Entity
 * 
 * Represents a seller in the marketplace.
 * Manages seller-specific business rules like verification, ratings, and Stripe integration.
 */ __turbopack_context__.s([
    "Seller",
    ()=>Seller
]);
class Seller {
    props;
    constructor(props){
        this.validateRating(props.rating);
        this.validateBusinessName(props.businessName);
        this.props = props;
    }
    /**
   * Create a new seller (not yet verified)
   */ static create(props) {
        return new Seller({
            ...props,
            rating: 0,
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    /**
   * Reconstitute a seller from persistence
   */ static reconstitute(props) {
        return new Seller(props);
    }
    validateRating(rating) {
        if (rating < 0 || rating > 5) {
            throw new Error('Rating must be between 0 and 5');
        }
    }
    validateBusinessName(name) {
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
   */ verify() {
        if (this.props.verified) {
            throw new Error('Seller is already verified');
        }
        this.props.verified = true;
        this.props.updatedAt = new Date();
    }
    /**
   * Unverify the seller (if fraudulent activity detected)
   */ unverify() {
        this.props.verified = false;
        this.props.updatedAt = new Date();
    }
    /**
   * Update seller rating based on reviews
   */ updateRating(newRating) {
        this.validateRating(newRating);
        this.props.rating = newRating;
        this.props.updatedAt = new Date();
    }
    /**
   * Connect Stripe account for payouts
   */ connectStripe(accountId) {
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
   */ disconnectStripe() {
        this.props.stripeAccountId = undefined;
        this.props.updatedAt = new Date();
    }
    /**
   * Update storefront configuration
   */ updateStorefront(storefront) {
        this.props.storefront = storefront;
        this.props.updatedAt = new Date();
    }
    /**
   * Check if seller can accept payments
   */ canAcceptPayments() {
        return this.props.verified && !!this.props.stripeAccountId;
    }
    /**
   * Check if seller has good standing (rating >= 3.0)
   */ hasGoodStanding() {
        return this.props.rating >= 3.0;
    }
    // Getters
    get id() {
        return this.props.id;
    }
    get userId() {
        return this.props.userId;
    }
    get businessName() {
        return this.props.businessName;
    }
    get verified() {
        return this.props.verified;
    }
    get rating() {
        return this.props.rating;
    }
    get storefront() {
        return this.props.storefront;
    }
    get stripeAccountId() {
        return this.props.stripeAccountId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
}
}),
"[project]/packages/core/src/marketplace/infrastructure/repositories/PrismaSellerRepository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prisma Seller Repository Implementation
 * 
 * Implements ISellerRepository using Prisma ORM.
 */ __turbopack_context__.s([
    "PrismaSellerRepository",
    ()=>PrismaSellerRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$entities$2f$Seller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/domain/entities/Seller.ts [app-route] (ecmascript)");
;
class PrismaSellerRepository {
    prisma;
    constructor(prisma){
        this.prisma = prisma;
    }
    async findById(id) {
        const data = await this.prisma.seller.findUnique({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findByUserId(userId) {
        const data = await this.prisma.seller.findUnique({
            where: {
                userId,
                deletedAt: null
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findByStripeAccountId(stripeAccountId) {
        const data = await this.prisma.seller.findFirst({
            where: {
                stripeAccountId,
                deletedAt: null
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findVerified() {
        const data = await this.prisma.seller.findMany({
            where: {
                verified: true,
                deletedAt: null
            },
            orderBy: {
                rating: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async findByMinimumRating(rating) {
        const data = await this.prisma.seller.findMany({
            where: {
                rating: {
                    gte: rating
                },
                deletedAt: null
            },
            orderBy: {
                rating: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async save(seller) {
        const data = this.toPersistence(seller);
        await this.prisma.seller.upsert({
            where: {
                id: seller.id
            },
            create: data,
            update: {
                businessName: data.businessName,
                verified: data.verified,
                rating: data.rating,
                storefront: data.storefront,
                stripeAccountId: data.stripeAccountId,
                updatedAt: data.updatedAt
            }
        });
    }
    async delete(id) {
        await this.prisma.seller.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async count() {
        return this.prisma.seller.count({
            where: {
                deletedAt: null
            }
        });
    }
    /**
   * Convert Prisma model to Domain entity
   */ toDomain(data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$entities$2f$Seller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Seller"].reconstitute({
            id: data.id,
            userId: data.userId,
            businessName: data.businessName,
            verified: data.verified,
            rating: data.rating,
            storefront: data.storefront,
            stripeAccountId: data.stripeAccountId ?? undefined,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }
    /**
   * Convert Domain entity to Prisma model data
   */ toPersistence(seller) {
        return {
            id: seller.id,
            userId: seller.userId,
            businessName: seller.businessName,
            verified: seller.verified,
            rating: seller.rating,
            storefront: seller.storefront ?? null,
            stripeAccountId: seller.stripeAccountId ?? null,
            createdAt: seller.createdAt,
            updatedAt: seller.updatedAt
        };
    }
}
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/packages/core/src/identity/domain/value-objects/AccessToken.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AccessToken Value Object
 * 
 * Encapsulates JWT access token logic.
 * Short-lived token for API authentication (15 minutes).
 */ __turbopack_context__.s([
    "AccessToken",
    ()=>AccessToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
class AccessToken {
    token;
    static EXPIRY = '15m';
    static SECRET = process.env.JWT_ACCESS_SECRET || 'default-access-secret-change-in-production';
    constructor(token){
        this.token = token;
    }
    /**
   * Generate a new access token
   */ static generate(payload) {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, AccessToken.SECRET, {
            expiresIn: AccessToken.EXPIRY,
            issuer: 'treeverse-api',
            audience: 'treeverse-client'
        });
        return new AccessToken(token);
    }
    /**
   * Verify and decode an access token
   */ static verify(token) {
        try {
            const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, AccessToken.SECRET, {
                issuer: 'treeverse-api',
                audience: 'treeverse-client'
            });
            return decoded;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                throw new Error('Access token has expired');
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].JsonWebTokenError) {
                throw new Error('Invalid access token');
            }
            throw new Error('Access token verification failed');
        }
    }
    /**
   * Create from existing token string (for verification)
   */ static fromString(token) {
        // Verify the token is valid before creating the value object
        AccessToken.verify(token);
        return new AccessToken(token);
    }
    /**
   * Get the token string
   */ getValue() {
        return this.token;
    }
    /**
   * Check if token is expired
   */ isExpired() {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(this.token, AccessToken.SECRET);
            return false;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                return true;
            }
            return false;
        }
    }
}
}),
"[project]/packages/core/src/identity/domain/value-objects/RefreshToken.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RefreshToken Value Object
 * 
 * Encapsulates JWT refresh token logic.
 * Long-lived token for obtaining new access tokens (7 days).
 */ __turbopack_context__.s([
    "RefreshToken",
    ()=>RefreshToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
class RefreshToken {
    token;
    static EXPIRY = '7d';
    static SECRET = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-change-in-production';
    constructor(token){
        this.token = token;
    }
    /**
   * Generate a new refresh token
   */ static generate(userId) {
        const tokenId = RefreshToken.generateTokenId();
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId,
            tokenId
        }, RefreshToken.SECRET, {
            expiresIn: RefreshToken.EXPIRY,
            issuer: 'treeverse-api',
            audience: 'treeverse-client'
        });
        return new RefreshToken(token);
    }
    /**
   * Verify and decode a refresh token
   */ static verify(token) {
        try {
            const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, RefreshToken.SECRET, {
                issuer: 'treeverse-api',
                audience: 'treeverse-client'
            });
            return decoded;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                throw new Error('Refresh token has expired');
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].JsonWebTokenError) {
                throw new Error('Invalid refresh token');
            }
            throw new Error('Refresh token verification failed');
        }
    }
    /**
   * Create from existing token string (for verification)
   */ static fromString(token) {
        // Verify the token is valid before creating the value object
        RefreshToken.verify(token);
        return new RefreshToken(token);
    }
    /**
   * Generate a unique token ID for tracking/revocation
   */ static generateTokenId() {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString('hex');
    }
    /**
   * Get the token string
   */ getValue() {
        return this.token;
    }
    /**
   * Get the token ID from the token
   */ getTokenId() {
        const payload = RefreshToken.verify(this.token);
        return payload.tokenId;
    }
    /**
   * Get the user ID from the token
   */ getUserId() {
        const payload = RefreshToken.verify(this.token);
        return payload.userId;
    }
    /**
   * Check if token is expired
   */ isExpired() {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(this.token, RefreshToken.SECRET);
            return false;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                return true;
            }
            return false;
        }
    }
}
}),
"[project]/packages/core/src/identity/domain/services/TokenService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TokenService
 * 
 * Domain service for managing authentication tokens.
 * Handles token generation, verification, and refresh.
 */ __turbopack_context__.s([
    "TokenService",
    ()=>TokenService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$AccessToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/AccessToken.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/RefreshToken.ts [app-route] (ecmascript)");
;
;
class TokenService {
    /**
   * Generate a new token pair (access + refresh)
   */ generateTokenPair(userId, email, role) {
        const accessTokenPayload = {
            userId,
            email,
            role
        };
        const accessToken = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$AccessToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessToken"].generate(accessTokenPayload);
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshToken"].generate(userId);
        return {
            accessToken: accessToken.getValue(),
            refreshToken: refreshToken.getValue()
        };
    }
    /**
   * Verify an access token
   */ verifyAccessToken(token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$AccessToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessToken"].verify(token);
    }
    /**
   * Verify a refresh token
   */ verifyRefreshToken(token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshToken"].verify(token);
    }
    /**
   * Refresh tokens - generate new pair from valid refresh token
   */ refreshTokens(refreshTokenString, email, role) {
        // Verify the refresh token
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshToken"].fromString(refreshTokenString);
        const userId = refreshToken.getUserId();
        // Generate new token pair
        return this.generateTokenPair(userId, email, role);
    }
    /**
   * Extract token from Authorization header
   */ extractTokenFromHeader(authHeader) {
        if (!authHeader) {
            return null;
        }
        // Expected format: "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }
        return parts[1];
    }
}
}),
"[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Authentication Middleware
 * 
 * Verifies JWT tokens and attaches user information to requests.
 */ __turbopack_context__.s([
    "authenticateRequest",
    ()=>authenticateRequest,
    "requireAdmin",
    ()=>requireAdmin,
    "requireAuthenticated",
    ()=>requireAuthenticated,
    "requireRole",
    ()=>requireRole,
    "requireSeller",
    ()=>requireSeller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$services$2f$TokenService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/services/TokenService.ts [app-route] (ecmascript)");
;
async function authenticateRequest(request) {
    const tokenService = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$services$2f$TokenService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TokenService"]();
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = tokenService.extractTokenFromHeader(authHeader);
    if (!token) {
        throw new Error('No authentication token provided');
    }
    // Verify token
    try {
        const payload = tokenService.verifyAccessToken(token);
        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        };
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        // Debug: Check if secret is loaded
        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET is missing in environment variables!');
        }
        if (error instanceof Error) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
        throw new Error('Authentication failed');
    }
}
function requireRole(allowedRoles) {
    return async (request)=>{
        const user = await authenticateRequest(request);
        if (!allowedRoles.includes(user.role)) {
            console.error(`Role mismatch: User role '${user.role}' is not in allowed roles: ${allowedRoles.join(', ')}`);
            throw new Error(`Forbidden: Requires one of the following roles: ${allowedRoles.join(', ')}`);
        }
        return user;
    };
}
const requireAdmin = requireRole([
    'ADMIN'
]);
const requireSeller = requireRole([
    'SELLER',
    'ADMIN'
]);
const requireAuthenticated = authenticateRequest;
}),
"[project]/apps/web/app/api/v1/listings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/database/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$application$2f$use$2d$cases$2f$CreateListingUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/application/use-cases/CreateListingUseCase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$application$2f$use$2d$cases$2f$SearchListingsUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/application/use-cases/SearchListingsUseCase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaListingRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/infrastructure/repositories/PrismaListingRepository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaSellerRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/infrastructure/repositories/PrismaSellerRepository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
// Validation Schemas
const CreateListingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    speciesId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid species ID format'),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10, 'Title must be at least 10 characters').max(200, 'Title cannot exceed 200 characters'),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(50, 'Description must be at least 50 characters'),
    basePrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive('Price must be positive'),
    inventory: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0, 'Inventory cannot be negative'),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({}).optional()
});
const SearchListingsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    speciesId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    sellerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'DRAFT',
        'ACTIVE',
        'SOLD_OUT',
        'FLAGGED',
        'ARCHIVED'
    ]).optional(),
    minPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional(),
    maxPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional(),
    searchTerm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(100).optional()
});
async function OPTIONS() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200
    });
}
async function POST(request) {
    try {
        // 1. Authenticate and check role
        // 1. Authenticate and check role
        const authenticatedUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireSeller"])(request);
        console.log('User authenticated for create listing:', authenticatedUser);
        // 2. Parse and validate request body
        const body = await request.json();
        const validatedData = CreateListingSchema.parse(body);
        // 3. Initialize repositories and use case
        const listingRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaListingRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaListingRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const sellerRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaSellerRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaSellerRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const useCase = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$application$2f$use$2d$cases$2f$CreateListingUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateListingUseCase"](listingRepository, sellerRepository);
        // 4. Execute use case with authenticated user's ID
        const result = await useCase.execute({
            ...validatedData,
            sellerId: authenticatedUser.userId
        });
        // 5. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result,
            message: 'Listing created successfully'
        }, {
            status: 201
        });
    } catch (error) {
        // Handle authentication errors
        if (error instanceof Error && error.message.includes('Authentication')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 401
            });
        }
        return handleError(error);
    }
}
async function GET(request) {
    try {
        // 1. Parse query parameters
        const searchParams = request.nextUrl.searchParams;
        const queryData = {
            speciesId: searchParams.get('speciesId') || undefined,
            sellerId: searchParams.get('sellerId') || undefined,
            status: searchParams.get('status')?.toUpperCase() || undefined,
            minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : undefined,
            maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : undefined,
            searchTerm: searchParams.get('searchTerm') || undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined,
            pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : undefined
        };
        // 2. Validate query parameters
        const validatedData = SearchListingsSchema.parse(queryData);
        // 3. Initialize repository and use case
        const listingRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaListingRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaListingRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const useCase = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$application$2f$use$2d$cases$2f$SearchListingsUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SearchListingsUseCase"](listingRepository);
        // 4. Execute use case
        const result = await useCase.execute(validatedData);
        // 5. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(error);
    }
}
/**
 * Centralized error handler
 */ function handleError(error) {
    // Validation errors (Zod)
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Validation failed',
            details: error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message
                }))
        }, {
            status: 400
        });
    }
    // Business logic errors
    if (error instanceof Error) {
        // Check for specific error messages
        if (error.message.includes('not found')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 404
            });
        }
        if (error.message.includes('Only verified sellers')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 403
            });
        }
        // Generic business error
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 400
        });
    }
    // Unknown error
    console.error('Unexpected error:', error);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: 'Internal server error'
    }, {
        status: 500
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d4c832aa._.js.map