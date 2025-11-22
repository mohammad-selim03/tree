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
"[project]/packages/core/src/orders/domain/aggregates/Order.ts [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/packages/core/src/orders/domain/aggregates/Order.ts'\n\nExpected '{', got 'interface'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/packages/core/src/orders/domain/entities/OrderItem.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * OrderItem Entity
 * 
 * Represents an item within an order.
 */ __turbopack_context__.s([
    "OrderItem",
    ()=>OrderItem
]);
class OrderItem {
    props;
    constructor(props){
        this.props = props;
    }
    static create(props) {
        OrderItem.validate(props);
        // Calculate total price
        const totalPrice = props.unitPrice.multiply(props.quantity);
        return new OrderItem({
            id: crypto.randomUUID(),
            ...props,
            totalPrice
        });
    }
    static reconstitute(props) {
        return new OrderItem(props);
    }
    static validate(props) {
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
    get id() {
        return this.props.id;
    }
    get listingId() {
        return this.props.listingId;
    }
    get quantity() {
        return this.props.quantity;
    }
    get unitPrice() {
        return this.props.unitPrice;
    }
    get totalPrice() {
        return this.props.totalPrice;
    }
    get sellerName() {
        return this.props.sellerName;
    }
    /**
   * Update quantity and recalculate total
   */ updateQuantity(newQuantity) {
        if (newQuantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (newQuantity > 1000) {
            throw new Error('Quantity cannot exceed 1000');
        }
        this.props.quantity = newQuantity;
        this.props.totalPrice = this.props.unitPrice.multiply(newQuantity);
    }
    getProps() {
        return {
            ...this.props
        };
    }
}
}),
"[project]/packages/core/src/orders/domain/value-objects/ShippingAddress.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ShippingAddress Value Object
 * 
 * Encapsulates shipping address information with validation.
 */ __turbopack_context__.s([
    "ShippingAddress",
    ()=>ShippingAddress
]);
class ShippingAddress {
    props;
    constructor(props){
        this.props = props;
    }
    static create(props) {
        ShippingAddress.validate(props);
        return new ShippingAddress(props);
    }
    static validate(props) {
        if (!props.fullName || props.fullName.trim().length === 0) {
            throw new Error('Full name is required');
        }
        if (props.fullName.length < 2 || props.fullName.length > 100) {
            throw new Error('Full name must be between 2 and 100 characters');
        }
        if (!props.addressLine1 || props.addressLine1.trim().length === 0) {
            throw new Error('Address line 1 is required');
        }
        if (!props.city || props.city.trim().length === 0) {
            throw new Error('City is required');
        }
        if (!props.state || props.state.trim().length === 0) {
            throw new Error('State is required');
        }
        if (!props.postalCode || props.postalCode.trim().length === 0) {
            throw new Error('Postal code is required');
        }
        // Validate postal code format (simple validation, can be enhanced)
        if (!/^[A-Z0-9\s-]{3,10}$/i.test(props.postalCode)) {
            throw new Error('Invalid postal code format');
        }
        if (!props.country || props.country.trim().length === 0) {
            throw new Error('Country is required');
        }
        // Validate country code (2-letter ISO code)
        if (!/^[A-Z]{2}$/i.test(props.country)) {
            throw new Error('Country must be a 2-letter ISO code (e.g., US, GB)');
        }
        if (!props.phoneNumber || props.phoneNumber.trim().length === 0) {
            throw new Error('Phone number is required');
        }
        // Basic phone number validation
        if (!/^[\d\s\-+()]{7,20}$/.test(props.phoneNumber)) {
            throw new Error('Invalid phone number format');
        }
    }
    // Getters
    get fullName() {
        return this.props.fullName;
    }
    get addressLine1() {
        return this.props.addressLine1;
    }
    get addressLine2() {
        return this.props.addressLine2;
    }
    get city() {
        return this.props.city;
    }
    get state() {
        return this.props.state;
    }
    get postalCode() {
        return this.props.postalCode;
    }
    get country() {
        return this.props.country.toUpperCase();
    }
    get phoneNumber() {
        return this.props.phoneNumber;
    }
    /**
   * Get formatted address string
   */ getFormattedAddress() {
        const lines = [
            this.fullName,
            this.addressLine1,
            this.addressLine2,
            `${this.city}, ${this.state} ${this.postalCode}`,
            this.country
        ].filter(Boolean);
        return lines.join('\n');
    }
    /**
   * Convert to plain object for persistence
   */ toObject() {
        return {
            ...this.props
        };
    }
    equals(other) {
        return this.addressLine1 === other.addressLine1 && this.city === other.city && this.state === other.state && this.postalCode === other.postalCode && this.country === other.country;
    }
}
}),
"[project]/packages/core/src/orders/application/use-cases/CreateOrderUseCase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create Order Use Case
 * 
 * Handles the business logic for creating a new order.
 */ __turbopack_context__.s([
    "CreateOrderUseCase",
    ()=>CreateOrderUseCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$aggregates$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/aggregates/Order.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$entities$2f$OrderItem$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/entities/OrderItem.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$value$2d$objects$2f$ShippingAddress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/value-objects/ShippingAddress.ts [app-route] (ecmascript)");
;
;
;
class CreateOrderUseCase {
    orderRepository;
    listingRepository;
    constructor(orderRepository, listingRepository){
        this.orderRepository = orderRepository;
        this.listingRepository = listingRepository;
    }
    async execute(buyerId, dto) {
        // 1. Find and validate listing
        const listing = await this.listingRepository.findById(dto.listingId);
        if (!listing) {
            throw new Error('Listing not found');
        }
        // 2. Check if listing is available
        if (!listing.isAvailable()) {
            throw new Error('Listing is not available for purchase');
        }
        // 3. Check inventory
        if (listing.inventory < dto.quantity) {
            throw new Error(`Insufficient inventory. Only ${listing.inventory} items available`);
        }
        // 4. Create shipping address value object
        const shippingAddress = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$value$2d$objects$2f$ShippingAddress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ShippingAddress"].create(dto.shippingAddress);
        // 5. Create order item
        const orderItem = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$entities$2f$OrderItem$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderItem"].create({
            listingId: listing.id,
            quantity: dto.quantity,
            unitPrice: listing.basePrice
        });
        // 6. Create order
        const order = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$aggregates$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"].create({
            buyerId,
            sellerId: listing.sellerId,
            items: [
                orderItem
            ],
            shippingAddress,
            notes: dto.notes
        });
        // 7. Decrease inventory (optimistic)
        listing.decreaseInventory(dto.quantity);
        // 8. Save order and update listing
        await Promise.all([
            this.orderRepository.save(order),
            this.listingRepository.save(listing)
        ]);
        // 9. Return response
        return this.toResponseDTO(order);
    }
    toResponseDTO(order) {
        return {
            id: order.id,
            orderNumber: order.orderNumber.getValue(),
            buyerId: order.buyerId,
            sellerId: order.sellerId,
            items: order.items.map((item)=>({
                    id: item.id,
                    listingId: item.listingId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice.getAmount(),
                    totalPrice: item.totalPrice.getAmount(),
                    sellerName: item.sellerName
                })),
            totalAmount: order.totalAmount.getAmount(),
            currency: order.totalAmount.getCurrency(),
            shippingAddress: order.shippingAddress.toObject(),
            status: order.status,
            paymentIntentId: order.paymentIntentId,
            trackingNumber: order.trackingNumber,
            notes: order.notes,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            paidAt: order.paidAt?.toISOString(),
            shippedAt: order.shippedAt?.toISOString(),
            deliveredAt: order.deliveredAt?.toISOString()
        };
    }
}
}),
"[project]/packages/core/src/orders/application/use-cases/GetOrderHistoryUseCase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get Order History Use Case
 * 
 * Retrieves order history for a user (buyer or seller).
 */ __turbopack_context__.s([
    "GetOrderHistoryUseCase",
    ()=>GetOrderHistoryUseCase
]);
class GetOrderHistoryUseCase {
    orderRepository;
    constructor(orderRepository){
        this.orderRepository = orderRepository;
    }
    async execute(userId, dto, role) {
        const page = dto.page ?? 1;
        const pageSize = dto.pageSize ?? 20;
        const offset = (page - 1) * pageSize;
        // Build filters based on role
        const filters = {
            limit: pageSize,
            offset
        };
        if (role === 'buyer') {
            filters.buyerId = userId;
        } else if (role === 'seller') {
            filters.sellerId = userId;
        }
        if (dto.status) {
            filters.status = dto.status;
        }
        if (dto.fromDate) {
            filters.fromDate = new Date(dto.fromDate);
        }
        if (dto.toDate) {
            filters.toDate = new Date(dto.toDate);
        }
        // Execute search
        const result = await this.orderRepository.search(filters);
        // Calculate total pages
        const totalPages = Math.ceil(result.total / pageSize);
        // Map to response DTOs
        const orders = result.orders.map((order)=>this.toResponseDTO(order));
        return {
            orders,
            total: result.total,
            page,
            pageSize,
            totalPages
        };
    }
    toResponseDTO(order) {
        return {
            id: order.id,
            orderNumber: order.orderNumber.getValue(),
            buyerId: order.buyerId,
            sellerId: order.sellerId,
            items: order.items.map((item)=>({
                    id: item.id,
                    listingId: item.listingId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice.getAmount(),
                    totalPrice: item.totalPrice.getAmount(),
                    sellerName: item.sellerName
                })),
            totalAmount: order.totalAmount.getAmount(),
            currency: order.totalAmount.getCurrency(),
            shippingAddress: order.shippingAddress.toObject(),
            status: order.status,
            paymentIntentId: order.paymentIntentId,
            trackingNumber: order.trackingNumber,
            notes: order.notes,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            paidAt: order.paidAt?.toISOString(),
            shippedAt: order.shippedAt?.toISOString(),
            deliveredAt: order.deliveredAt?.toISOString()
        };
    }
}
}),
"[project]/packages/core/src/orders/domain/value-objects/OrderNumber.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * OrderNumber Value Object
 * 
 * Generates and validates unique order numbers.
 * Format: ORD-YYYYMMDD-XXXXX (e.g., ORD-20251120-A1B2C)
 */ __turbopack_context__.s([
    "OrderNumber",
    ()=>OrderNumber
]);
class OrderNumber {
    value;
    constructor(value){
        this.value = value;
    }
    /**
   * Generate a new order number
   */ static generate() {
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
        const orderNumber = `ORD-${dateStr}-${randomStr}`;
        return new OrderNumber(orderNumber);
    }
    /**
   * Create from existing order number (from database)
   */ static fromString(orderNumber) {
        OrderNumber.validate(orderNumber);
        return new OrderNumber(orderNumber);
    }
    /**
   * Validate order number format
   */ static validate(orderNumber) {
        if (!orderNumber || orderNumber.length === 0) {
            throw new Error('Order number cannot be empty');
        }
        // Check format: ORD-YYYYMMDD-XXXXX
        const regex = /^ORD-\d{8}-[A-Z0-9]{5}$/;
        if (!regex.test(orderNumber)) {
            throw new Error('Invalid order number format. Expected: ORD-YYYYMMDD-XXXXX');
        }
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
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
"[project]/packages/core/src/orders/infrastructure/repositories/PrismaOrderRepository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prisma Order Repository Implementation
 * 
 * Implements IOrderRepository using Prisma ORM.
 */ __turbopack_context__.s([
    "PrismaOrderRepository",
    ()=>PrismaOrderRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$aggregates$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/aggregates/Order.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$entities$2f$OrderItem$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/entities/OrderItem.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$value$2d$objects$2f$OrderNumber$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/value-objects/OrderNumber.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$value$2d$objects$2f$ShippingAddress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/domain/value-objects/ShippingAddress.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/domain/value-objects/Money.ts [app-route] (ecmascript)");
;
;
;
;
;
class PrismaOrderRepository {
    prisma;
    constructor(prisma){
        this.prisma = prisma;
    }
    async findById(id) {
        const data = await this.prisma.order.findUnique({
            where: {
                id
            },
            include: {
                items: true
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findByOrderNumber(orderNumber) {
        const data = await this.prisma.order.findUnique({
            where: {
                orderNumber
            },
            include: {
                items: true
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findByBuyerId(buyerId) {
        const data = await this.prisma.order.findMany({
            where: {
                buyerId
            },
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async findBySellerId(sellerId) {
        const data = await this.prisma.order.findMany({
            where: {
                sellerId
            },
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async search(filters) {
        const where = {};
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
                    items: true
                },
                take: limit,
                skip: offset,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            this.prisma.order.count({
                where
            })
        ]);
        return {
            orders: data.map((d)=>this.toDomain(d)),
            total,
            limit,
            offset
        };
    }
    async save(order) {
        const data = this.toPersistence(order);
        await this.prisma.order.upsert({
            where: {
                id: order.id
            },
            create: {
                ...data,
                items: {
                    create: data.items
                }
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
                updatedAt: data.updatedAt
            }
        });
        // Clear domain events
        order.clearDomainEvents();
    }
    async count(filters) {
        const where = {};
        if (filters?.buyerId) {
            where.buyerId = filters.buyerId;
        }
        if (filters?.sellerId) {
            where.sellerId = filters.sellerId;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        return this.prisma.order.count({
            where
        });
    }
    async findByStatus(status) {
        const data = await this.prisma.order.findMany({
            where: {
                status
            },
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    /**
   * Convert Prisma model to Domain aggregate
   */ toDomain(data) {
        // Parse items
        const items = data.items.map((item)=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$entities$2f$OrderItem$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderItem"].reconstitute({
                id: item.id,
                listingId: item.listingId,
                quantity: item.quantity,
                unitPrice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Money"].create(Number(item.unitPrice), 'USD'),
                totalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Money"].create(Number(item.totalPrice), 'USD'),
                sellerName: item.sellerName
            }));
        // Parse shipping address
        const shippingAddress = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$value$2d$objects$2f$ShippingAddress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ShippingAddress"].create(typeof data.shippingAddress === 'string' ? JSON.parse(data.shippingAddress) : data.shippingAddress);
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$aggregates$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"].reconstitute({
            id: data.id,
            orderNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$domain$2f$value$2d$objects$2f$OrderNumber$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderNumber"].fromString(data.orderNumber),
            buyerId: data.buyerId,
            sellerId: data.sellerId,
            items,
            totalAmount: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$domain$2f$value$2d$objects$2f$Money$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Money"].create(Number(data.totalAmount), 'USD'),
            shippingAddress,
            status: data.status,
            paymentIntentId: data.paymentIntentId ?? undefined,
            trackingNumber: data.trackingNumber ?? undefined,
            notes: data.notes ?? undefined,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            paidAt: data.paidAt ?? undefined,
            shippedAt: data.shippedAt ?? undefined,
            deliveredAt: data.deliveredAt ?? undefined,
            cancelledAt: data.cancelledAt ?? undefined
        });
    }
    /**
   * Convert Domain aggregate to Prisma model data
   */ toPersistence(order) {
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
            items: order.items.map((item)=>({
                    id: item.id,
                    listingId: item.listingId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice.getAmount(),
                    totalPrice: item.totalPrice.getAmount(),
                    sellerName: item.sellerName ?? null
                }))
        };
    }
}
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
"[project]/apps/web/app/api/v1/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Orders API Routes
 * 
 * POST /api/v1/orders - Create order
 * GET  /api/v1/orders - Get order history
 */ __turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/database/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$application$2f$use$2d$cases$2f$CreateOrderUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/application/use-cases/CreateOrderUseCase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$application$2f$use$2d$cases$2f$GetOrderHistoryUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/application/use-cases/GetOrderHistoryUseCase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$infrastructure$2f$repositories$2f$PrismaOrderRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/orders/infrastructure/repositories/PrismaOrderRepository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaListingRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/marketplace/infrastructure/repositories/PrismaListingRepository.ts [app-route] (ecmascript)");
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
const CreateOrderSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    listingId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid listing ID'),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive('Quantity must be positive').max(1000),
    shippingAddress: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        fullName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2).max(100),
        addressLine1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        addressLine2: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        postalCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(3).max(10),
        country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().length(2),
        phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(7).max(20)
    }),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const SearchOrdersSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'PENDING',
        'PAID',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED'
    ]).optional(),
    fromDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    toDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(100).optional()
});
async function POST(request) {
    try {
        // 1. Authenticate
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuthenticated"])(request);
        // 2. Parse and validate request body
        const body = await request.json();
        const validatedData = CreateOrderSchema.parse(body);
        // 3. Initialize dependencies
        const orderRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$infrastructure$2f$repositories$2f$PrismaOrderRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaOrderRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const listingRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$marketplace$2f$infrastructure$2f$repositories$2f$PrismaListingRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaListingRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const useCase = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$application$2f$use$2d$cases$2f$CreateOrderUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateOrderUseCase"](orderRepository, listingRepository);
        // 4. Execute use case
        const result = await useCase.execute(user.userId, validatedData);
        // 5. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result,
            message: 'Order created successfully'
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
        // Handle validation errors
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Validation failed',
                details: error.errors
            }, {
                status: 400
            });
        }
        // Handle business logic errors
        if (error instanceof Error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 400
            });
        }
        // Unknown error
        console.error('Create order error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    try {
        // 1. Authenticate
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuthenticated"])(request);
        // 2. Parse query parameters
        const { searchParams } = new URL(request.url);
        const queryParams = {
            status: searchParams.get('status') || undefined,
            fromDate: searchParams.get('fromDate') || undefined,
            toDate: searchParams.get('toDate') || undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined,
            pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : undefined
        };
        const validatedParams = SearchOrdersSchema.parse(queryParams);
        // 3. Initialize dependencies
        const orderRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$infrastructure$2f$repositories$2f$PrismaOrderRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaOrderRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const useCase = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$orders$2f$application$2f$use$2d$cases$2f$GetOrderHistoryUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetOrderHistoryUseCase"](orderRepository);
        // 4. Determine role (buyer or seller)
        const role = user.role === 'SELLER' ? 'seller' : 'buyer';
        // 5. Execute use case
        const result = await useCase.execute(user.userId, validatedParams, role);
        // 6. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result
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
        // Handle validation errors
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Validation failed',
                details: error.errors
            }, {
                status: 400
            });
        }
        // Unknown error
        console.error('Get orders error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d50ee0aa._.js.map