# 🗺️ TreeVerse Frontend Architecture Map

## 📊 Backend API Analysis

```
✅ COMPLETED APIS
├── /api/v1/auth/
│   ├── POST   /register      → User registration
│   ├── POST   /login          → User authentication  
│   ├── POST   /refresh        → Token refresh
│   └── GET    /me             → Get current user
│
├── /api/v1/listings/
│   ├── POST   /               → Create listing (SELLER only)
│   └── GET    /               → Search listings (filters: species, seller, price, status)
│
└── /api/v1/orders/
    ├── POST   /               → Create order (AUTHENTICATED)
    └── GET    /               → Get order history (buyer/seller specific)

⏳ PARTIAL/INCOMPLETE
└── /api/v1/payments/          → Needs completion for checkout flow

❌ NEEDED (TO BE CREATED)
├── /api/v1/listings/[id]      → GET, PATCH, DELETE single listing
├── /api/v1/reviews            → POST create, GET list reviews
├── /api/v1/payments/          → Complete payment intent & confirmation
├── /api/v1/seller/stats       → Dashboard analytics
├── /api/v1/species            → Species catalog endpoints
├── /api/v1/ai/*               → AI-powered features (image search, care plans, price suggestions)
└── /api/v1/admin/*            → Admin management endpoints
```

---

## 🎨 Frontend Pages Roadmap

### 🔴 PHASE 1: CORE MVP (Weeks 1-3)

```
Authentication
├── /login                     ❌ TO BUILD
├── /register                  ❌ TO BUILD  
└── /forgot-password           ❌ TO BUILD

Product Discovery
├── /trees                     ✅ EXISTS (needs enhancement)
├── /trees/[id]                ✅ COMPLETED (premium design)
└── /species/[id]              ❌ TO BUILD

Shopping Flow
├── /cart                      ❌ TO BUILD
├── /checkout                  ❌ TO BUILD
├── /orders/[id]/confirmation  ❌ TO BUILD
└── /orders/[id]               ❌ TO BUILD

Seller Basics
├── /seller/dashboard          ❌ TO BUILD
├── /seller/listings           ❌ TO BUILD
├── /seller/listings/new       ❌ TO BUILD
└── /seller/listings/[id]/edit ❌ TO BUILD
```

### 🟡 PHASE 2: ENHANCED (Weeks 4-6)

```
Seller Complete
├── /seller/orders             ❌ TO BUILD
├── /seller/analytics          ❌ TO BUILD
└── /seller/settings           ❌ TO BUILD

User Features
├── /profile                   ❌ TO BUILD
├── /orders                    ❌ TO BUILD
├── /orders/[id]/review        ❌ TO BUILD
└── /sellers/[id]              ❌ TO BUILD (public seller page)

Advanced Search
├── /search                    ❌ TO BUILD (enhanced version)
└── /search/image              ❌ TO BUILD (AI image search)
```

### 🟢 PHASE 3: AI & ADMIN (Weeks 7-8)

```
AI Features
├── /care-plans/[speciesId]    ❌ TO BUILD
├── /simulator/[speciesId]     ❌ TO BUILD (growth simulator)
└── AI-powered suggestions     ❌ TO BUILD (integrated)

Admin
├── /admin                     ❌ TO BUILD
├── /admin/users               ❌ TO BUILD
├── /admin/listings            ❌ TO BUILD
└── /admin/ai-flags            ❌ TO BUILD
```

---

## 🧩 Component Library Architecture

```
/components
├── /ui (shadcn/ui + custom)
│   ├── /forms
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   ├── FileUpload.tsx
│   │   ├── DatePicker.tsx
│   │   └── PriceRangeSlider.tsx
│   │
│   ├── /buttons
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   └── ButtonGroup.tsx
│   │
│   ├── /display
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── RatingStars.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Stepper.tsx
│   │   └── Timeline.tsx
│   │
│   ├── /feedback
│   │   ├── Toast.tsx
│   │   ├── Modal.tsx
│   │   ├── Alert.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Skeleton.tsx
│   │   └── EmptyState.tsx
│   │
│   └── /data
│       ├── Table.tsx
│       ├── Pagination.tsx
│       ├── Tabs.tsx
│       ├── Accordion.tsx
│       └── Tooltip.tsx
│
├── /layout
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── Breadcrumbs.tsx
│
├── /features (domain-specific)
│   ├── /auth
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthProvider.tsx
│   │
│   ├── /products
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetails.tsx
│   │   └── ProductFilters.tsx
│   │
│   ├── /cart
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartProvider.tsx
│   │
│   ├── /checkout
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── OrderReview.tsx
│   │
│   ├── /seller
│   │   ├── ListingForm.tsx
│   │   ├── DashboardCard.tsx
│   │   └── AnalyticsChart.tsx
│   │
│   └── /ai
│       ├── ImageSearch.tsx
│       ├── CarePlanGenerator.tsx
│       └── GrowthSimulator.tsx
│
└── SmoothScroll.tsx ✅ (already exists)
```

---

## 📦 State Management Strategy

```
Global State (Zustand)
├── /stores
│   ├── useAuthStore.ts       → user, token, login, logout
│   ├── useCartStore.ts       → items, add, remove, update quantity
│   ├── useUIStore.ts         → theme, sidebar open, modal state
│   └── useFilterStore.ts     → search filters, sort preferences

Server State (TanStack Query)
├── /queries
│   ├── useListings.ts        → GET /api/v1/listings
│   ├── useListing.ts         → GET /api/v1/listings/[id]
│   ├── useOrders.ts          → GET /api/v1/orders
│   ├── useOrder.ts           → GET /api/v1/orders/[id]
│   ├── useSpecies.ts         → GET /api/v1/species
│   └── useReviews.ts         → GET /api/v1/reviews
│
└── /mutations
    ├── useCreateListing.ts   → POST /api/v1/listings
    ├── useUpdateListing.ts   → PATCH /api/v1/listings/[id]
    ├── useCreateOrder.ts     → POST /api/v1/orders
    ├── useCreateReview.ts    → POST /api/v1/reviews
    └── useLogin.ts           → POST /api/v1/auth/login
```

---

## 🎯 Implementation Workflow

### Week-by-Week Breakdown

```
WEEK 1: Foundation
├── Day 1-2: Component Library Setup
│   ├── Install shadcn/ui
│   ├── Create base components (Button, Input, Card)
│   ├── Set up Storybook
│   └── Create theme configuration
│
├── Day 3-4: State Management
│   ├── Set up TanStack Query
│   ├── Create Zustand stores
│   ├── Create auth context
│   └── Set up API client
│
└── Day 5-7: Authentication
    ├── Build login page
    ├── Build register page
    ├── Implement auth flow
    └── Add protected routes

WEEK 2: Shopping Experience
├── Day 1-2: Product Browsing
│   ├── Enhance /trees page with filters
│   ├── Connect to real API
│   ├── Add pagination
│   └── Add sort options
│
├── Day 3-4: Shopping Cart
│   ├── Build cart page
│   ├── Implement cart state
│   ├── Add cart icon to navbar
│   └── Add/remove items functionality
│
└── Day 5-7: Checkout
    ├── Build checkout page (3 steps)
    ├── Integrate Stripe
    ├── Create order confirmation
    └── Test complete flow

WEEK 3: Seller Dashboard
├── Day 1-2: Dashboard Layout
│   ├── Build seller navbar/sidebar
│   ├── Create dashboard overview
│   └── Add stats cards
│
├── Day 3-5: Listings Management
│   ├── Build listings table
│   ├── Create listing form (multi-step)
│   ├── Add image upload
│   └── Connect to API
│
└── Day 6-7: Orders Management
    ├── Build seller orders page
    ├── Add order status updates
    └── Add order filters

WEEK 4: Enhancement
├── Advanced search
├── Reviews system  
├── User profile
└── Polish UI/UX

WEEK 5-6: AI Features
├── Image search
├── Care plan generator
├── Price suggestions
└── Species verification UI

WEEK 7-8: Admin & Testing
├── Admin dashboard
├── E2E tests
├── Performance optimization
└── Final polish
```

---

## 🛠️ Tech Stack Summary

```
Frontend Framework
├── Next.js 14+ (App Router)          ✅
├── TypeScript (strict mode)          ✅
├── React 19                          ✅

Styling
├── Tailwind CSS v4                   ✅
├── Custom CSS                        ✅
├── Lenis (smooth scroll)             ✅

UI Components
├── shadcn/ui                         ❌ TO INSTALL
├── Custom components                 ❌ TO BUILD
├── Framer Motion (animations)        ❌ TO INSTALL
├── Recharts (charts)                 ❌ TO INSTALL

State Management
├── Zustand (client state)            ❌ TO INSTALL
├── TanStack Query (server state)     ❌ TO INSTALL
├── React Context (auth, theme)       ❌ TO BUILD

Forms & Validation
├── React Hook Form                   ❌ TO INSTALL
├── Zod                              ✅

HTTP & Data
├── Native fetch API                  ✅
├── TanStack Query                    ❌ TO INSTALL

Payments
├── Stripe Elements                   ❌ TO INSTALL
├── Stripe Checkout                   ❌ TO INSTALL

Development
├── Storybook                         ❌ TO INSTALL
├── Jest + RTL                        ❌ TO INSTALL
├── Playwright                        ❌ TO INSTALL
├── ESLint + Prettier                 ✅
```

---

## 📋 Quick Reference: API Endpoints

### Authentication
```typescript
// Login
POST /api/v1/auth/login
Body: { email: string, password: string }
Response: { token: string, user: User }

// Register  
POST /api/v1/auth/register
Body: { email: string, password: string, role: 'BUYER' | 'SELLER' }
Response: { token: string, user: User }

// Get current user
GET /api/v1/auth/me
Headers: { Authorization: 'Bearer <token>' }
Response: { user: User }
```

### Listings
```typescript
// Search listings
GET /api/v1/listings?searchTerm=oak&minPrice=50&maxPrice=200&page=1
Response: { listings: Listing[], total: number, page: number }

// Create listing (SELLER only)
POST /api/v1/listings
Headers: { Authorization: 'Bearer <token>' }
Body: { speciesId, title, description, basePrice, inventory }
Response: { listing: Listing }
```

### Orders
```typescript
// Create order
POST /api/v1/orders
Headers: { Authorization: 'Bearer <token>' }
Body: { listingId, quantity, shippingAddress }
Response: { order: Order }

// Get orders
GET /api/v1/orders?status=PENDING&role=buyer
Headers: { Authorization: 'Bearer <token>' }
Response: { orders: Order[] }
```

---

## 🎯 Success Metrics

```
Performance Goals
├── Lighthouse Score: > 90
├── First Contentful Paint: < 1.5s
├── Time to Interactive: < 3.5s
└── Largest Contentful Paint: < 2.5s

UX Goals
├── Mobile Responsive: 100%
├── Accessibility (WCAG AA): 100%
├── Smooth 60fps animations: ✓
└── Zero console errors: ✓

Code Quality
├── TypeScript strict: 100%
├── Test Coverage: > 70%
├── ESLint compliance: 100%
└── Documentation: Complete
```

---

## 🚀 Getting Started

**Immediate Next Steps:**

1. ✅ Review this plan
2. ❌ Install required dependencies (shadcn/ui, TanStack Query, Zustand)
3. ❌ Set up component library structure
4. ❌ Build authentication pages
5. ❌ Start shopping cart feature

**Priority Order:**
1. 🔴 Auth → Shopping → Checkout (Week 1-2)
2. 🟡 Seller Dashboard (Week 3)
3. 🟢 AI Features & Admin (Week 4+)

---

Ready to build the future of tree marketplaces! 🌳✨
