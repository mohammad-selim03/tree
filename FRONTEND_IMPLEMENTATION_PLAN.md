# 🎯 TreeVerse Frontend Implementation Plan

## 📊 PROJECT ANALYSIS SUMMARY

### Backend APIs Available
Based on analysis of `/apps/web/app/api/v1/`:

#### ✅ **Authentication APIs** (`/api/v1/auth/`)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Token refresh
- `GET /api/v1/auth/me` - Get current user

#### ✅ **Listings APIs** (`/api/v1/listings/`)
- `POST /api/v1/listings` - Create listing (Protected - SELLER only)
- `GET /api/v1/listings` - Search listings with filters
  - Filters: speciesId, sellerId, status, minPrice, maxPrice, searchTerm, page, pageSize

#### ✅ **Orders APIs** (`/api/v1/orders/`)
- `POST /api/v1/orders` - Create order (Protected)
- `GET /api/v1/orders` - Get order history (Protected)
  - Filters: status, fromDate, toDate, page, pageSize

#### ⏳ **Payment APIs** (`/api/v1/payments/`)
- Partially implemented - needs completion

### Database Schema Analysis
From `packages/database/prisma/schema.prisma`:

**Core Models:**
- User (BUYER, SELLER, ADMIN roles)
- Seller (businessName, verified, rating, storefront)
- Species (scientificName, commonName, careRequirements)
- Listing (title, description, basePrice, inventory, status)
- Variant (attributes, priceModifier, stock, sku)
- Order (orderNumber, totalPrice, status, paymentStatus)
- Review (rating, comment, helpful)
- ImageAnalysis (AI predictions, verificationStatus)
- AICarePlan (schedule, generatedContent)

**Enums:**
- UserRole: BUYER, SELLER, ADMIN
- ListingStatus: DRAFT, ACTIVE, SOLD_OUT, FLAGGED, ARCHIVED
- OrderStatus: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
- PaymentStatus: PENDING, COMPLETED, FAILED, REFUNDED

---

## 🎨 FRONTEND PAGES TO BUILD

### 1. **AUTHENTICATION PAGES** 🔐
Priority: HIGH | Complexity: MEDIUM

#### 1.1 Login Page (`/login`)
**Design:**
- Modern gradient background (purple/green theme)
- Card-based form with smooth animations
- Social login options (Google, GitHub)
- Remember me checkbox
- "Forgot password?" link

**Features:**
- [ ] Email/password login form
- [ ] Zod validation
- [ ] Error handling with toast notifications
- [ ] Loading states
- [ ] Redirect to dashboard after login
- [ ] "Don't have an account? Sign up" CTA

**API Integration:**
- `POST /api/v1/auth/login`
- Store token in cookies/localStorage
- Set user context

#### 1.2 Register Page (`/register`)
**Design:**
- Multi-step wizard (3 steps)
  - Step 1: Basic info (email, password)
  - Step 2: User type (Buyer/Seller)
  - Step 3: Profile details
- Progress indicator
- Premium gradient design

**Features:**
- [ ] Multi-step form with validation
- [ ] Role selection (Buyer/Seller)
- [ ] Password strength indicator
- [ ] Terms & conditions checkbox
- [ ] Email verification notice

**API Integration:**
- `POST /api/v1/auth/register`

#### 1.3 Forgot Password Page (`/forgot-password`)
**Features:**
- [ ] Email input form
- [ ] Success message
- [ ] Resend link option

---

### 2. **MARKETPLACE PAGES** 🛒
Priority: HIGH | Complexity: HIGH

#### 2.1 Advanced Search Page (`/search` or `/trees`) ✅ PARTIALLY DONE
**Current Status:** Basic listing exists, needs enhancement

**Enhancements Needed:**
- [ ] **Advanced Filters Sidebar**
  - Price range slider
  - Species filter (dropdown)
  - Category filter
  - Hardiness zones filter
  - Seller rating filter
  - Verified sellers only toggle
  - Stock availability filter
  
- [ ] **Sort Options**
  - Relevance
  - Price: Low to High
  - Price: High to Low
  - Newest first
  - Highest rated
  - Most popular (view count)

- [ ] **Search Bar**
  - Auto-complete suggestions
  - Recent searches
  - AI-powered image search (upload to search)

- [ ] **Results Grid/List Toggle**
  - Grid view (cards)
  - List view (detailed)
  - Map view (geo-based)

- [ ] **Pagination**
  - Infinite scroll option
  - Page numbers
  - Items per page selector

**API Integration:**
- `GET /api/v1/listings` with all filters
- Real-time updates

#### 2.2 Tree Details Page (`/trees/[id]`) ✅ DONE
**Status:** Completed with premium design
**Enhancements:**
- [ ] Connect to real API instead of mock data
- [ ] Add real image gallery
- [ ] Add "Contact Seller" functionality
- [ ] Add "Add to Cart" functionality
- [ ] Add variant selection
- [ ] Show real reviews from API

#### 2.3 Species Information Page (`/species/[id]`)
Priority: MEDIUM

**Design:**
- Wikipedia-style information page
- Rich media (images, videos)
- Care guide section
- Related listings

**Features:**
- [ ] Scientific name & common name
- [ ] Family information
- [ ] Care requirements display
- [ ] Hardiness zones map
- [ ] Related listings from this species
- [ ] "Find this tree" CTA button

**Data Source:**
- Species table in database
- Related listings via `speciesId`

---

### 3. **SELLER DASHBOARD** 👨‍💼
Priority: HIGH | Complexity: HIGH

#### 3.1 Seller Dashboard Overview (`/seller/dashboard`)
**Design:**
- Modern SaaS dashboard
- Cards with stats
- Charts and graphs
- Quick actions

**Features:**
- [ ] **Key Metrics Cards**
  - Total sales (this month)
  - Active listings
  - Pending orders
  - Average rating
  - Total revenue
  
- [ ] **Charts**
  - Sales over time (line chart)
  - Top selling species (bar chart)
  - Order status distribution (pie chart)

- [ ] **Recent Activity**
  - Latest orders
  - New reviews
  - Low stock alerts

- [ ] **Quick Actions**
  - "Create new listing" button
  - "View orders" button
  - "Manage inventory" button

**API Integration:**
- `GET /api/v1/seller/stats` (needs to be created)
- `GET /api/v1/orders?sellerId={id}`

#### 3.2 Manage Listings Page (`/seller/listings`)
**Design:**
- Data table with filters
- Bulk actions
- Quick edit functionality

**Features:**
- [ ] **Listings Table**
  - Columns: Image, Title, Species, Price, Stock, Status, Views, Actions
  - Sortable columns
  - Search/filter
  - Status badges (DRAFT, ACTIVE, SOLD_OUT)
  
- [ ] **Bulk Actions**
  - Activate selected
  - Deactivate selected
  - Delete selected
  
- [ ] **Quick Actions Per Row**
  - Edit button
  - View button
  - Duplicate button
  - Archive button
  - View analytics button

- [ ] **Create Listing Button** (prominent CTA)

**API Integration:**
- `GET /api/v1/listings?sellerId={id}`
- `PATCH /api/v1/listings/[id]` (needs to be created)
- `DELETE /api/v1/listings/[id]` (needs to be created)

#### 3.3 Create/Edit Listing Page (`/seller/listings/new` & `/seller/listings/[id]/edit`)
**Design:**
- Multi-step form wizard
- Auto-save drafts
- Image upload with preview
- AI-powered features

**Steps:**
1. **Basic Information**
   - Title (AI suggestion available)
   - Species selection (searchable dropdown)
   - Description (AI-generated template available)
   - Category

2. **Pricing & Inventory**
   - Base price
   - Price suggestions (AI-powered)
   - Inventory count
   - Variants (age, size, pot type)
   - SKU generation

3. **Images**
   - Multiple image upload
   - Drag & drop reordering
   - Primary image selection
   - AI verification status
   - Alt text for each image

4. **Additional Details**
   - Care instructions
   - Shipping information
   - Metadata/tags
   - SEO fields

**Features:**
- [ ] Form with Zod validation
- [ ] Image upload with preview
- [ ] AI species verification indicator
- [ ] Price suggestion tooltip
- [ ] Save as draft
- [ ] Publish listing
- [ ] Auto-save every 30 seconds

**API Integration:**
- `POST /api/v1/listings` (existing)
- `PATCH /api/v1/listings/[id]` (needs to be created)
- `POST /api/v1/images/upload` (needs to be created)
- `GET /api/v1/ai/price-suggestion` (needs to be created)

#### 3.4 Seller Orders Page (`/seller/orders`)
**Design:**
- Tabbed interface (All, Pending, Shipped, Delivered)
- Order cards or table view
- Quick actions

**Features:**
- [ ] **Orders List**
  - Order number
  - Buyer name
  - Items
  - Total amount
  - Status
  - Date
  
- [ ] **Filters**
  - Status filter
  - Date range
  - Search by order number
  
- [ ] **Actions Per Order**
  - View details
  - Mark as shipped
  - Add tracking number
  - Contact buyer
  - Process refund

**API Integration:**
- `GET /api/v1/orders?sellerId={id}&role=seller`
- `PATCH /api/v1/orders/[id]/status` (needs to be created)

#### 3.5 Seller Analytics Page (`/seller/analytics`)
**Design:**
- Comprehensive analytics dashboard
- Date range selector
- Export data option

**Features:**
- [ ] Sales metrics
- [ ] Traffic analytics
- [ ] Conversion funnel
- [ ] Top performing listings
- [ ] Customer demographics
- [ ] Revenue trends

---

### 4. **BUYER EXPERIENCE** 🛍️
Priority: HIGH | Complexity: MEDIUM

#### 4.1 Shopping Cart Page (`/cart`)
**Design:**
- Clean cart layout
- Item cards with images
- Sticky summary sidebar
- Quick checkout CTA

**Features:**
- [ ] Cart items list
- [ ] Quantity adjustment
- [ ] Remove item
- [ ] Save for later
- [ ] Continue shopping button
- [ ] Order summary (subtotal, shipping, tax, total)
- [ ] Promo code input
- [ ] Checkout button

**State Management:**
- Use Zustand for cart state
- Persist to localStorage
- Sync with backend on login

#### 4.2 Checkout Page (`/checkout`)
**Design:**
- Multi-step checkout (Shipping → Payment → Review)
- Progress indicator
- Security badges
- Mobile-optimized

**Features:**
- [ ] **Step 1: Shipping Information**
  - Address form with validation
  - Save address for future
  - Address autocomplete (Google Places API)
  
- [ ] **Step 2: Payment**
  - Stripe Elements integration
  - Card payment
  - Payment method selection
  - Billing address (same as shipping option)
  
- [ ] **Step 3: Review & Confirm**
  - Order summary
  - Edit buttons for each section
  - Terms acceptance
  - Place order button

**API Integration:**
- `POST /api/v1/orders` (existing)
- `POST /api/v1/payments/create-intent` (needs completion)
- `POST /api/v1/payments/confirm` (needs completion)

#### 4.3 Order Confirmation Page (`/orders/[id]/confirmation`)
**Design:**
- Success animation
- Order details
- Next steps
- Email confirmation notice

**Features:**
- [ ] Order number display
- [ ] Estimated delivery date
- [ ] Order summary
- [ ] Seller information
- [ ] Track order button
- [ ] Download invoice button
- [ ] Continue shopping button

#### 4.4 Order Tracking Page (`/orders/[id]`)
**Design:**
- Visual tracking timeline
- Map view (optional)
- Order details sidebar

**Features:**
- [ ] **Order Status Timeline**
  - Ordered
  - Confirmed
  - Shipped (with tracking)
  - In Transit
  - Delivered
  
- [ ] Order items list
- [ ] Shipping address
- [ ] Tracking number (clickable link to carrier)
- [ ] Estimated delivery
- [ ] Contact seller button
- [ ] Request return/refund button
- [ ] Leave review button (if delivered)

**API Integration:**
- `GET /api/v1/orders/[id]`
- `GET /api/v1/shipping/track/[trackingNumber]` (needs to be created)

#### 4.5 My Orders Page (`/orders`)
**Design:**
- List of all orders
- Filters and search
- Quick status view

**Features:**
- [ ] Orders list (tabbed by status)
- [ ] Search by order number
- [ ] Date range filter
- [ ] Status filter
- [ ] View details button per order
- [ ] Reorder button

**API Integration:**
- `GET /api/v1/orders` (existing)

#### 4.6 Reviews Page (`/orders/[id]/review`)
**Design:**
- Clean review form
- Image upload
- Rating stars

**Features:**
- [ ] 5-star rating
- [ ] Review text area
- [ ] Image upload (optional)
- [ ] Recommend toggle
- [ ] Submit review button

**API Integration:**
- `POST /api/v1/reviews` (needs to be created)

---

### 5. **AI-POWERED FEATURES** 🤖
Priority: MEDIUM | Complexity: HIGH

#### 5.1 AI Image Search (`/search/image`)
**Design:**
- Upload area or camera capture
- Visual similarity results
- "Search by image" on search page

**Features:**
- [ ] Image upload/capture
- [ ] AI processing indicator
- [ ] Visual similar results
- [ ] Confidence scores

**API Integration:**
- `POST /api/v1/ai/image-search` (needs to be created)
- Uses CLIP embeddings and vector search

#### 5.2 AI Care Plan Generator (`/care-plans/[speciesId]`)
**Design:**
- Interactive care calendar
- Downloadable schedule
- Reminder settings

**Features:**
- [ ] Personalized care schedule
- [ ] Watering reminders
- [ ] Fertilizing schedule
- [ ] Pruning guide
- [ ] Seasonal tips
- [ ] Export to Google Calendar
- [ ] Download ICS file

**API Integration:**
- `POST /api/v1/ai/care-plan` (needs to be created)
- `GET /api/v1/care-plans/[id]`

#### 5.3 Growth Simulator (`/simulator/[speciesId]`)
**Design:**
- Interactive timeline
- Visual growth stages
- 3D model (if available)

**Features:**
- [ ] Timeline slider (years)
- [ ] Growth visualization
- [ ] Size predictions
- [ ] Care milestones

---

### 6. **USER PROFILE & SETTINGS** 👤
Priority: MEDIUM | Complexity: LOW

#### 6.1 Profile Page (`/profile`)
**Features:**
- [ ] User information
- [ ] Avatar upload
- [ ] Edit profile
- [ ] Account settings
- [ ] Notification preferences
- [ ] Saved addresses
- [ ] Payment methods

#### 6.2 Seller Profile Page (`/sellers/[id]`)
**Design:**
- Public seller storefront
- Listings showcase
- Ratings and reviews

**Features:**
- [ ] Seller info
- [ ] Verified badge
- [ ] Rating display
- [ ] Active listings
- [ ] Reviews
- [ ] Contact seller button
- [ ] Follow seller button (future)

---

### 7. **ADMIN DASHBOARD** 👨‍💼
Priority: LOW (Phase 2) | Complexity: HIGH

#### 7.1 Admin Overview (`/admin`)
**Features:**
- [ ] Platform metrics
- [ ] User statistics
- [ ] Revenue dashboard
- [ ] Flagged listings queue
- [ ] AI verification review queue

#### 7.2 Manage Users (`/admin/users`)
**Features:**
- [ ] Users table
- [ ] Search and filters
- [ ] Ban/unban users
- [ ] Change roles
- [ ] View user details

#### 7.3 Manage Listings (`/admin/listings`)
**Features:**
- [ ] All listings table
- [ ] Approve flagged listings
- [ ] Remove listings
- [ ] AI verification review

---

## 🎨 UI COMPONENTS LIBRARY

### Core Components Needed

#### Navigation
- [ ] **Navbar** (responsive, dropdown menus, search bar, cart icon)
- [ ] **Footer** (links, newsletter signup, social media)
- [ ] **Sidebar** (dashboard navigation)
- [ ] **Breadcrumbs**

#### Forms
- [ ] **Input** (text, email, password with validation)
- [ ] **Textarea**
- [ ] **Select** (searchable, multi-select)
- [ ] **Checkbox** & **Radio**
- [ ] **Toggle Switch**
- [ ] **File Upload** (drag & drop, multiple files)
- [ ] **Date Picker**
- [ ] **Price Range Slider**

#### Buttons
- [ ] **Primary Button** (gradient, with loading)
- [ ] **Secondary Button**
- [ ] **Outline Button**
- [ ] **Icon Button**
- [ ] **Button Group**

#### Display
- [ ] **Card** (product card, stat card, info card)
- [ ] **Badge** (status badges)
- [ ] **Avatar**
- [ ] **Rating Stars**
- [ ] **Progress Bar**
- [ ] **Stepper** (wizard steps)
- [ ] **Timeline** (order tracking)

#### Feedback
- [ ] **Toast Notifications**
- [ ] **Modal/Dialog**
- [ ] **Alert**
- [ ] **Loading Spinner**
- [ ] **Skeleton Loader**
- [ ] **Empty State**

#### Data Display
- [ ] **Table** (sortable, filterable)
- [ ] **Pagination**
- [ ] **Tabs**
- [ ] **Accordion**
- [ ] **Tooltip**

---

## 📋 IMPLEMENTATION PRIORITY

### 🔴 Phase 1: Core E-commerce (Weeks 1-3)
**Must-Have for MVP**

1. **Authentication** (Week 1)
   - Login page
   - Register page
   - Auth context/provider

2. **Product Browsing** (Week 1-2)
   - Enhanced trees listing page ✅
   - Tree details page ✅
   - Basic search and filters

3. **Shopping Flow** (Week 2-3)
   - Shopping cart
   - Checkout page
   - Order confirmation
   - Order tracking

4. **Seller Basic** (Week 3)
   - Seller dashboard basics
   - Create listing page
   - Manage listings page

### 🟡 Phase 2: Enhanced Features (Weeks 4-6)

5. **Seller Complete** (Week 4)
   - Seller analytics
   - Order management
   - Inventory management

6. **User Profile** (Week 4)
   - Profile page
   - Settings page
   - Order history

7. **Reviews & Ratings** (Week 5)
   - Leave review page
   - Reviews display on products
   - Seller ratings

8. **Advanced Search** (Week 5-6)
   - Advanced filters
   - Sort options
   - Image search

### 🟢 Phase 3: AI & Advanced (Weeks 7-8)

9. **AI Features** (Week 7)
   - AI care plans
   - Species verification display
   - AI-powered suggestions

10. **Admin Dashboard** (Week 8)
    - Basic admin panel
    - Moderation queue
    - Analytics dashboard

---

## 🛠️ TECHNICAL STACK RECOMMENDATIONS

### Frontend
- **Framework**: Next.js 14+ (App Router) ✅
- **Styling**: Tailwind CSS + Custom CSS ✅
- **UI Components**: shadcn/ui + custom components
- **State Management**: 
  - Zustand (global client state - cart, user prefs)
  - TanStack Query (server state - API data)
- **Forms**: React Hook Form + Zod ✅
- **HTTP Client**: Native fetch with TanStack Query
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis ✅
- **Charts**: Recharts or Chart.js
- **Maps**: Mapbox or Google Maps API
- **Image Handling**: Next.js Image + Cloudinary/S3

### Developer Experience
- **TypeScript**: Strict mode ✅
- **ESLint**: Configured ✅
- **Prettier**: Code formatting
- **Storybook**: Component development
- **Testing**: Jest + React Testing Library + Playwright

---

## 📦 REQUIRED BACKEND APIs (TO BE CREATED)

### High Priority
- [ ] `PATCH /api/v1/listings/[id]` - Update listing
- [ ] `DELETE /api/v1/listings/[id]` - Delete listing
- [ ] `GET /api/v1/listings/[id]` - Get single listing
- [ ] `POST /api/v1/reviews` - Create review
- [ ] `GET /api/v1/reviews?listingId=[id]` - Get listing reviews
- [ ] `POST /api/v1/payments/create-intent` - Create payment intent
- [ ] `POST /api/v1/payments/confirm` - Confirm payment
- [ ] `PATCH /api/v1/orders/[id]/status` - Update order status
- [ ] `GET /api/v1/seller/stats` - Get seller statistics

### Medium Priority
- [ ] `POST /api/v1/images/upload` - Upload images
- [ ] `POST /api/v1/ai/image-search` - AI image search
- [ ] `POST /api/v1/ai/care-plan` - Generate care plan
- [ ] `GET /api/v1/ai/price-suggestion` - AI price suggestion
- [ ] `GET /api/v1/species` - List all species
- [ ] `GET /api/v1/species/[id]` - Get species details

### Low Priority
- [ ] Admin endpoints
- [ ] Analytics endpoints
- [ ] Notification endpoints

---

## ✅ NEXT STEPS CHECKLIST

### Immediate (This Week)
- [ ] Set up component library structure
- [ ] Create reusable UI components (Button, Input, Card, etc.)
- [ ] Set up TanStack Query provider
- [ ] Set up Zustand stores (cart, auth)
- [ ] Create auth context and hooks
- [ ] Build login page
- [ ] Build register page
- [ ] Connect tree details page to real API

### Week 2
- [ ] Build shopping cart functionality
- [ ] Create checkout flow
- [ ] Integrate Stripe
- [ ] Build order confirmation page
- [ ] Start seller dashboard

### Week 3-4
- [ ] Complete seller features
- [ ] Build advanced search
- [ ] Add reviews functionality
- [ ] Start AI features

---

## 📊 SUCCESS METRICS

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s

### UX
- [ ] Mobile responsive (all breakpoints)
- [ ] Accessibility (WCAG AA)
- [ ] Smooth animations (60fps)

### Code Quality
- [ ] TypeScript strict mode (no `any`)
- [ ] Test coverage > 70%
- [ ] Zero console errors/warnings
- [ ] ESLint/Prettier compliance

---

## 🎯 CONCLUSION

This is a comprehensive plan to build a production-grade, AI-powered tree marketplace frontend. The phased approach ensures we deliver core functionality first, then enhance with advanced features.

**Priority Focus:**
1. ✅ Authentication
2. ✅ Product browsing (partially done)
3. 🔴 Shopping cart & checkout
4. 🔴 Seller dashboard
5. 🟡 AI features
6. 🟢 Admin panel

**Total Estimated Timeline:** 8-10 weeks for full MVP with AI features

Let's start building! 🚀
