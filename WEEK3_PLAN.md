# Week 3 Implementation Plan - Payments & Orders

**Start Date:** November 20, 2025  
**Duration:** 7 days  
**Goal:** Implement payment processing and order management system

---

## 📋 Week 3 Objectives

1. ✅ **Payment Integration (Stripe)**
   - Stripe Connect for seller payments
   - Payment processing
   - Seller onboarding
   - Payout management

2. ✅ **Order Management**
   - Order creation
   - Order status tracking
   - Inventory updates
   - Order history

3. ✅ **Fulfillment System**
   - Shipping integration
   - Tracking updates
   - Delivery confirmation

4. ✅ **Notifications**
   - Email notifications
   - Order confirmations
   - Payment receipts

---

## 🗓️ Day-by-Day Breakdown

### **Day 1-2: Payment Domain** (Nov 20-21)

#### Value Objects
- [ ] `Amount` value object
- [ ] `StripeAccountId` value object
- [ ] `PaymentIntentId` value object

#### Entities & Aggregates
- [ ] `Payment` entity
- [ ] `StripeAccount` entity (for sellers)

#### Services
- [ ] `StripePaymentService`
- [ ] `PayoutService`

**Files to Create:** ~8 files

---

### **Day 3-4: Order Domain** (Nov 22-23)

#### Value Objects
- [ ] `OrderNumber` value object
- [ ] `ShippingAddress` value object

#### Aggregates
- [ ] `Order` aggregate root
- [ ] `OrderItem` entity
- [ ] `OrderStatus` enum

#### Events
- [ ] `OrderCreated`
- [ ] `OrderPaid`
- [ ] `OrderShipped`
- [ ] `OrderDelivered`

**Files to Create:** ~10 files

---

### **Day 5: Order Use Cases & APIs** (Nov 24)

#### Use Cases
- [ ] `CreateOrderUseCase`
- [ ] `ProcessPaymentUseCase`
- [ ] `GetOrderUseCase`
- [ ] `GetOrderHistoryUseCase`
- [ ] `UpdateOrderStatusUseCase`

#### API Endpoints
- [ ] `POST /api/v1/orders` - Create order
- [ ] `GET /api/v1/orders` - Get order history
- [ ] `GET /api/v1/orders/:id` - Get order details
- [ ] `POST /api/v1/orders/:id/cancel` - Cancel order

**Files to Create:** ~8 files

---

### **Day 6: Payment Processing** (Nov 25)

#### Stripe Integration
- [ ] Seller onboarding flow
- [ ] Payment intent creation
- [ ] Webhook handling
- [ ] Payout automation

#### API Endpoints
- [ ] `POST /api/v1/payments/create-intent` - Create payment
- [ ] `POST /api/v1/payments/confirm` - Confirm payment
- [ ] `POST /api/v1/stripe/webhook` - Handle webhooks
- [ ] `POST /api/v1/sellers/stripe-onboard` - Onboard seller

**Files to Create:** ~6 files

---

### **Day 7: Testing & Integration** (Nov 26)

#### Tests
- [ ] Payment service tests
- [ ] Order aggregate tests
- [ ] CreateOrder use case tests
- [ ] Payment integration tests
- [ ] Webhook handling tests

**Files to Create:** ~5 files

---

## 📁 File Structure

```
packages/core/src/
├── payments/                      # NEW Payment Domain
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Payment.ts
│   │   │   └── StripeAccount.ts
│   │   ├── value-objects/
│   │   │   ├── Amount.ts
│   │   │   ├── StripeAccountId.ts
│   │   │   └── PaymentIntentId.ts
│   │   ├── services/
│   │   │   ├── StripePaymentService.ts
│   │   │   └── PayoutService.ts
│   │   └── repositories/
│   │       ├── IPaymentRepository.ts
│   │       └── IStripeAccountRepository.ts
│   │
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── CreatePaymentIntentUseCase.ts
│   │   │   ├── ConfirmPaymentUseCase.ts
│   │   │   └── OnboardSellerUseCase.ts
│   │   └── dtos/
│   │       └── PaymentDTO.ts
│   │
│   └── infrastructure/
│       └── repositories/
│           ├── PrismaPaymentRepository.ts
│           └── PrismaStripeAccountRepository.ts
│
├── orders/                        # NEW Order Domain
│   ├── domain/
│   │   ├── aggregates/
│   │   │   └── Order.ts
│   │   ├── entities/
│   │   │   └── OrderItem.ts
│   │   ├── value-objects/
│   │   │   ├── OrderNumber.ts
│   │   │   └── ShippingAddress.ts
│   │   └── repositories/
│   │       └── IOrderRepository.ts
│   │
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── CreateOrderUseCase.ts
│   │   │   ├── ProcessPaymentUseCase.ts
│   │   │   ├── GetOrderUseCase.ts
│   │   │   └── UpdateOrderStatusUseCase.ts
│   │   └── dtos/
│   │       └── OrderDTO.ts
│   │
│   └── infrastructure/
│       └── repositories/
│           └── PrismaOrderRepository.ts

apps/web/app/api/v1/
├── orders/
│   ├── route.ts                   # POST, GET
│   └── [id]/
│       ├── route.ts               # GET, PUT
│       └── cancel/
│           └── route.ts           # POST
│
├── payments/
│   ├── create-intent/
│   │   └── route.ts               # POST
│   ├── confirm/
│   │   └── route.ts               # POST
│   └── webhook/
│       └── route.ts               # POST (Stripe webhook)
│
└── sellers/
    └── stripe-onboard/
        └── route.ts               # POST
```

---

## 💳 Payment Flow

### **Order & Payment Process**

```
1. Customer adds items to cart
2. Customer initiates checkout
3. Backend creates Order (PENDING status)
4. Backend creates Stripe PaymentIntent
5. Frontend collects payment details
6. Customer confirms payment
7. Stripe processes payment
8. Webhook confirms payment success
9. Order status → PAID
10. Inventory decreases
11. Seller receives payout (after holding period)
```

### **Seller Onboarding Flow**

```
1. Seller registers account
2. Seller clicks "Connect Stripe"
3. Backend creates Stripe Connect account link
4. Seller completes Stripe onboarding
5. Stripe redirects back with account ID
6. Backend saves Stripe account ID
7. Seller can now receive payments
```

---

## 🛡️ Payment Security

### **Stripe Best Practices**
- ✅ Never store card details (use Stripe.js)
- ✅ Use PaymentIntents API (SCA compliant)
- ✅ Verify webhook signatures
- ✅ Use idempotency keys
- ✅ Handle disputes/refunds

### **Order Security**
- ✅ Validate inventory before creating order
- ✅ Check payment status before fulfillment
- ✅ Prevent duplicate orders
- ✅ Audit trail for all changes

---

## 📊 Database Schema

### **Orders Table** (Already in schema.prisma)
```prisma
model Order {
  id              String   @id @default(uuid())
  orderNumber     String   @unique
  buyerId         String
  sellerId        String
  status          OrderStatus
  totalAmount     Decimal
  shippingAddress Json
  items           OrderItem[]
  payment         Payment?
  createdAt       DateTime
  updatedAt       DateTime
}
```

### **Payments Table**
```prisma
model Payment {
  id                String   @id @default(uuid())
  orderId           String   @unique
  amount            Decimal
  currency          String
  stripePaymentId   String
  status            PaymentStatus
  createdAt         DateTime
}
```

---

## 🎯 Success Criteria

By end of Week 3, you should be able to:

```bash
# 1. Create an order
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "...",
    "quantity": 2,
   "shippingAddress": {...}
  }'

# 2. Process payment
curl -X POST http://localhost:3000/api/v1/payments/create-intent \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "..."
  }'

# 3. Get order history
curl -X GET http://localhost:3000/api/v1/orders \
  -H "Authorization: Bearer <TOKEN>"

# 4. Onboard seller to Stripe
curl -X POST http://localhost:3000/api/v1/sellers/stripe-onboard \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 📦 Dependencies to Add

```json
{
  "dependencies": {
    "stripe": "^14.9.0"
  },
  "devDependencies": {
    "@types/stripe": "^8.0.417"
  }
}
```

---

## 🧪 Testing Plan

### **Unit Tests**
- [ ] Order aggregate business rules
- [ ] Payment entity validation
- [ ] CreateOrder use case
- [ ] Payment processing logic

### **Integration Tests**
- [ ] Full order creation flow
- [ ] Payment processing end-to-end
- [ ] Webhook handling
- [ ] Inventory updates

### **Stripe Testing**
- [ ] Use Stripe test mode
- [ ] Test cards: 4242 4242 4242 4242
- [ ] Test webhook events
- [ ] Error scenarios (declined cards, etc.)

---

## 🎯 Week 3 Milestones

| Day | Milestone | Deliverable |
|-----|-----------|-------------|
| 1-2 | Payment domain complete | Stripe integration ready |
| 3-4 | Order domain complete | Order management working |
| 5 | APIs complete | All endpoints functional |
| 6 | Payment processing | Stripe webhooks working |
| 7 | Testing complete | 80%+ test coverage |

---

## ⚠️ Important Notes

### **Stripe Configuration**
1. Create Stripe account (test mode)
2. Get API keys (publishable + secret)
3. Set up webhooks
4. Configure Stripe Connect (for marketplace)

### **Environment Variables Needed**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...
```

### **Webhook Endpoints**
```
https://your-domain.com/api/v1/payments/webhook
```

Events to handle:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `account.updated` (for Connect)

---

## 🚀 Let's Begin!

**Current Status:** Planning complete  
**Next Action:** Implement Order domain

Ready to start Week 3 implementation with Orders and Payments!
