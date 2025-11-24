# 🧪 Comprehensive Testing Plan - TreeVerse Marketplace

**Date:** November 24, 2025  
**Purpose:** Test all major functionalities including Authentication, Dashboard, Payments, AI Features  
**Environment:** Development (localhost:3000)

---

## 📋 Test Categories

### 1. Authentication & Authorization ✅
### 2. Dashboard Logic 📊
### 3. Payment Processing 💳
### 4. Listings Management 🌳
### 5. AI Features 🤖
### 6. Analytics & Reporting 📈

---

## 🔐 1. AUTHENTICATION & AUTHORIZATION TESTS

### Test 1.1: User Registration
**Priority:** HIGH  
**Endpoint:** `POST /api/v1/auth/register`

**Test Cases:**
- [ ] Register as BUYER with valid data
- [ ] Register as SELLER with valid data
- [ ] Reject registration with existing email
- [ ] Reject registration with invalid email format
- [ ] Reject registration with weak password
- [ ] Validate all required fields

**Expected Behavior:**
- Returns JWT token on success
- Returns 400 for validation errors
- Returns 409 for duplicate email
- User created in database

**Manual Test Steps:**
1. Navigate to `/auth/register`
2. Fill in registration form
3. Select role (BUYER/SELLER)
4. Submit and verify redirect
5. Check JWT token in LocalStorage

---

### Test 1.2: User Login
**Priority:** HIGH  
**Endpoint:** `POST /api/v1/auth/login`

**Test Cases:**
- [ ] Login with valid credentials
- [ ] Reject login with wrong password
- [ ] Reject login with non-existent email
- [ ] Login persists across page refresh
- [ ] Token expiration handling
- [ ] Token refresh mechanism

**Expected Behavior:**
- Returns JWT access token + refresh token
- Redirects to dashboard based on role
- Token stored in auth store (Zustand)
- Returns 401 for invalid credentials

**Manual Test Steps:**
1. Navigate to `/auth/login`
2. Enter valid credentials
3. Submit and verify token storage
4. Check redirect to appropriate dashboard
5. Refresh page - should remain logged in

---

### Test 1.3: Protected Route Access
**Priority:** HIGH  
**Middleware:** `authenticateRequest()`

**Test Cases:**
- [ ] Access `/seller/*` without authentication → 401
- [ ] Access `/admin/*` without admin role → 403
- [ ] Access `/api/v1/auth/me` with valid token → 200
- [ ] Access protected route with expired token → 401
- [ ] Seller cannot access admin routes
- [ ] Buyer cannot access seller routes

**Expected Behavior:**
- Unauthorized users redirected to login
- Role-based access enforced
- Proper HTTP status codes returned

**Manual Test Steps:**
1. Logout (clear tokens)
2. Try accessing `/seller/dashboard` → redirect to login
3. Login as BUYER
4. Try accessing `/seller/*` → 403 Forbidden
5. Login as SELLER
6. Access `/seller/dashboard` → Success

---

### Test 1.4: JWT Token Validation
**Priority:** HIGH  
**File:** `apps/web/lib/middleware/auth.ts`

**Test Cases:**
- [ ] Valid token passes authentication
- [ ] Expired token returns 401
- [ ] Tampered token returns 401
- [ ] Missing token returns 401
- [ ] Token payload contains userId, email, role
- [ ] JWT_SECRET is loaded from environment

**Expected Behavior:**
- TokenService verifies signature
- Expired tokens rejected
- Invalid signatures rejected
- Proper error messages returned

**API Test:**
```bash
# Valid token
curl -H "Authorization: Bearer <valid_token>" http://localhost:3000/api/v1/auth/me

# Invalid token
curl -H "Authorization: Bearer invalid_token" http://localhost:3000/api/v1/auth/me

# No token
curl http://localhost:3000/api/v1/auth/me
```

---

## 📊 2. DASHBOARD LOGIC TESTS

### Test 2.1: Seller Dashboard Overview
**Priority:** HIGH  
**Page:** `/seller/dashboard`

**Test Cases:**
- [ ] Stats cards display correctly
  - Total Revenue
  - Total Orders  
  - Active Listings
  - Pending Orders
- [ ] Revenue chart renders with data
- [ ] Recent sales table populated
- [ ] Data updates on time period change (7d, 30d, 90d)
- [ ] Empty state when no data

**Expected Behavior:**
- Fetches data from `/api/v1/analytics/overview`
- Charts use Recharts library
- Real-time updates (optional)
- Proper loading states
- Error handling

**Manual Test Steps:**
1. Login as SELLER
2. Navigate to `/seller/dashboard`
3. Verify all 4 stat cards render
4. Check chart displays
5. Switch time periods
6. Verify data updates

---

### Test 2.2: Listings Management
**Priority:** HIGH  
**Page:** `/seller/listings`

**Test Cases:**
- [ ] Display all seller's listings
- [ ] Search functionality works
- [ ] Sort by different columns
- [ ] Pagination (10, 25, 50 per page)
- [ ] Filter by status (ACTIVE, DRAFT, SOLD)
- [ ] Edit listing action
- [ ] Delete listing action
- [ ] View listing details

**Expected Behavior:**
- DataTable component with TanStack Table
- Server-side pagination
- Debounced search
- Optimistic updates on delete

**Manual Test Steps:**
1. Navigate to `/seller/listings`
2. Verify listings table loads
3. Search for specific listing
4. Sort by price (asc/desc)
5. Change page size
6. Edit a listing
7. Delete a listing with confirmation

---

### Test 2.3: Create Listing Flow
**Priority:** HIGH  
**Page:** `/seller/listings/new`
**Endpoint:** `POST /api/v1/listings`

**Test Cases:**
- [ ] Form validation (Zod schema)
  - Required: title, species, description, price, inventory
  - Min/max lengths
  - Positive numbers
- [ ] Image upload (UploadThing)
  - Max 5 images
  - Image size limit (4MB)
  - Image type validation (image/*)
- [ ] Species selection dropdown
- [ ] AI verification triggers automatically
- [ ] Success toast notification
- [ ] Redirect to listings page

**Expected Behavior:**
- Real-time validation
- Drag & drop image upload
- Preview uploaded images
- Form submission creates listing
- Background worker processes verification

**Manual Test Steps:**
1. Navigate to `/seller/listings/new`
2. Fill all required fields
3. Upload 2-3 tree images
4. Select species from dropdown
5. Set price and inventory
6. Submit form
7. Verify redirect and toast
8. Check listing appears in table

---

### Test 2.4: Admin Verification Dashboard
**Priority:** MEDIUM  
**Page:** `/admin/verifications`
**Endpoint:** `GET /api/v1/admin/verifications`

**Test Cases:**
- [ ] Display all AI verifications
- [ ] Filter by status (ALL, VERIFIED, MISMATCH, PENDING)
- [ ] Search by listing title
- [ ] Stats cards show correct counts
- [ ] Images display correctly
- [ ] Confidence % displayed
- [ ] Update verification status (optional)

**Expected Behavior:**
- Fetches ImageAnalysis records
- Real-time updates (polling or WebSocket)
- Color-coded status badges
- Admin-only access

**Manual Test Steps:**
1. Login as ADMIN
2. Navigate to `/admin/verifications`
3. Verify stats cards
4. Filter by VERIFIED
5. Filter by MISMATCH
6. Search for specific listing
7. Check image thumbnails load

---

## 💳 3. PAYMENT PROCESSING TESTS

### Test 3.1: Create Payment Intent
**Priority:** HIGH  
**Endpoint:** `POST /api/v1/payments/create-intent`

**Test Cases:**
- [ ] Create payment intent for valid order
- [ ] Reject if order doesn't exist
- [ ] Reject if order already paid
- [ ] Reject if user isn't order owner
- [ ] Returns Stripe client secret
- [ ] Payment intent amount matches order total
- [ ] Currency is USD

**Expected Behavior:**
- Calls Stripe API
- Creates PaymentIntent
- Saves payment record to DB
- Returns clientSecret for frontend

**API Test:**
```bash
curl -X POST http://localhost:3000/api/v1/payments/create-intent \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "order_123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Payment intent created successfully",
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "amount": 14999,
    "currency": "usd"
  }
}
```

---

### Test 3.2: Stripe Webhook Handler
**Priority:** HIGH  
**Endpoint:** `POST /api/v1/payments/webhook`

**Test Cases:**
- [ ] Verify webhook signature
- [ ] Handle payment_intent.succeeded event
- [ ] Handle payment_intent.failed event
- [ ] Update order status to COMPLETED
- [ ] Update order status to FAILED
- [ ] Reduce inventory on success
- [ ] Send confirmation email (if implemented)
- [ ] Reject invalid signatures

**Expected Behavior:**
- Stripe signature verification
- Idempotent event handling
- Order status updates
- Inventory management
- Returns 200 to Stripe

**Webhook Events to Test:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.canceled`

**Test with Stripe CLI:**
```bash
stripe listen --forward-to localhost:3000/api/v1/payments/webhook
stripe trigger payment_intent.succeeded
```

---

### Test 3.3: Checkout Flow (End-to-End)
**Priority:** HIGH  
**Pages:** `/cart` → `/checkout` → Success

**Test Cases:**
- [ ] Add items to cart
- [ ] View cart summary
- [ ] Proceed to checkout
- [ ] Fill shipping information
- [ ] Enter payment details (Stripe Elements)
- [ ] Submit payment
- [ ] Handle 3D Secure (optional)
- [ ] Success page displays
- [ ] Order confirmation email sent
- [ ] Inventory decremented

**Expected Behavior:**
- Stripe Elements integration
- Real-time card validation
- Loading states during payment
- Error handling for failed payments
- Order created in database
- Cart cleared on success

**Manual Test Steps:**
1. Add 2-3 items to cart
2. Navigate to `/cart`
3. Click "Proceed to Checkout"
4. Fill shipping form
5. Enter test card: 4242 4242 4242 4242
6. Submit payment
7. Verify success page
8. Check order in `/seller/orders`

---

### Test 3.4: Payment Error Handling
**Priority:** MEDIUM

**Test Cases:**
- [ ] Card declined → Show error message
- [ ] Insufficient funds → Show error
- [ ] Network error → Retry mechanism
- [ ] Stripe API down → Graceful degradation
- [ ] Invalid card number → Client-side validation

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Insufficient Funds: `4000 0000 0000 9995`
- 3D Secure: `4000 0027 6000 3184`

---

## 🌳 4. LISTINGS MANAGEMENT TESTS

### Test 4.1: Listing CRUD Operations
**Priority:** HIGH

**Test Cases:**
- [ ] **CREATE** listing with all fields
- [ ] **READ** single listing details
- [ ] **UPDATE** listing information
- [ ] **DELETE** listing (soft delete)
- [ ] Validate SKU uniqueness
- [ ] Handle concurrent updates
- [ ] Optimistic UI updates

**Endpoints:**
- `POST /api/v1/listings`
- `GET /api/v1/listings/:id`
- `PUT /api/v1/listings/:id`
- `DELETE /api/v1/listings/:id`

---

### Test 4.2: Image Upload & Management
**Priority:** HIGH  
**Service:** UploadThing

**Test Cases:**
- [ ] Upload single image
- [ ] Upload multiple images (max 5)
- [ ] Reject files > 4MB
- [ ] Reject non-image files
- [ ] Drag & drop upload
- [ ] Delete uploaded image
- [ ] Reorder images
- [ ] Image optimization (WebP)

**Expected Behavior:**
- Files uploaded to UploadThing CDN
- Returns permanent URLs
- Images associated with listing
- Primary image designation

---

### Test 4.3: Inventory Management
**Priority:** HIGH

**Test Cases:**
- [ ] Set initial inventory quantity
- [ ] Decrement on order
- [ ] Prevent negative inventory
- [ ] Low stock warnings
- [ ] Out of stock status
- [ ] Auto-deactivate when inventory = 0

---

## 🤖 5. AI FEATURES TESTS

### Test 5.1: Species Verification (HuggingFace)
**Priority:** HIGH  
**Worker:** Background job (BullMQ)

**Test Cases:**
- [ ] Job enqueued on listing creation
- [ ] Image sent to HuggingFace API
- [ ] Classification results parsed
- [ ] Top prediction extracted
- [ ] Confidence % calculated
- [ ] Result saved to ImageAnalysis table
- [ ] Verification status determined:
  - VERIFIED: species match + high confidence
  - MISMATCH: species mismatch
  - PENDING: low confidence
- [ ] Badge displayed on product card

**Expected Behavior:**
- Async processing (no blocking)
- Retry on API failure
- Job logs accessible
- Results viewable in admin dashboard

**Manual Test:**
1. Create listing with Japanese Maple image
2. Set species to "Acer palmatum"
3. Check worker logs for processing
4. Wait 10-30 seconds
5. Check `/admin/verifications`
6. Verify status is VERIFIED
7. Check product card shows badge

**Worker Log Should Show:**
```
🔍 Processing species verification for listing...
🌱 Claimed species: Japanese Maple (Acer palmatum)
🤖 AI Prediction: maple tree (94%)
✅ Verification Result: VERIFIED
```

---

### Test 5.2: Care Plan Generation (Gemini)
**Priority:** MEDIUM  
**Endpoint:** `POST /api/v1/care-plans/generate`

**Test Cases:**
- [ ] Generate care plan for species
- [ ] Parse structured response
- [ ] Save to AICarePlan table
- [ ] Display on product detail page
- [ ] Cache results (avoid duplicate API calls)
- [ ] Handle API key missing
- [ ] Handle rate limiting
- [ ] Handle quota exceeded

**Expected Response Structure:**
```json
{
  "speciesId": "uuid",
  "summary": "The Japanese Maple is a stunning...",
  "watering": "Water once per week",
  "sunlight": "Partial shade",
  "soilType": "Well-draining acidic soil",
  "temperature": "Hardy in zones 5-9",
  "pruning": "Prune in late winter",
  "fertilizing": "Feed monthly in spring/summer",
  "commonIssues": "Watch for aphids...",
  "tips": "Mulch around base..."
}
```

**Manual Test:**
```bash
cd apps/web
npx tsx test-gemini.ts
```

**Expected Output:**
```
🧪 Testing Google Gemini API...
✅ API key found
📡 Testing connection...
✅ Gemini API connected!
🌱 Generating sample care plan for Japanese Maple...
✅ Care Plan Generated!
📋 Summary: The Japanese Maple is a stunning...
💧 Watering: Once per week
☀️ Sunlight: Partial shade
🎉 Test successful!
```

---

### Test 5.3: AI Analytics
**Priority:** LOW  
**Page:** `/seller/analytics` (AI tab)

**Test Cases:**
- [ ] Track verification success rate
- [ ] Track care plan generation count
- [ ] Display verification timeline chart
- [ ] Show AI confidence distribution
- [ ] Calculate accuracy metrics

---

## 📈 6. ANALYTICS & REPORTING TESTS

### Test 6.1: Seller Analytics Dashboard
**Priority:** MEDIUM  
**Page:** `/seller/analytics`
**Endpoint:** `GET /api/v1/analytics`

**Test Cases:**
- [ ] Revenue over time (line chart)
- [ ] Orders by status (pie chart)
- [ ] Top selling products (bar chart)
- [ ] Conversion rate
- [ ] Average order value
- [ ] Page views analytics
- [ ] Time period filters work (7d, 30d, 90d, all)
- [ ] Export data to CSV (optional)

**Expected Behavior:**
- Real data from database
- Charts render correctly
- Responsive design
- Loading skeletons
- No data state

---

### Test 6.2: Admin Platform Analytics
**Priority:** LOW  
**Page:** `/admin/analytics`

**Test Cases:**
- [ ] Total platform revenue
- [ ] Active users count
- [ ] Listings by category
- [ ] AI verification stats
- [ ] Top sellers leaderboard
- [ ] Growth metrics (MoM, YoY)

---

## 🔄 7. ERROR HANDLING & EDGE CASES

### Test 7.1: Network Errors
**Test Cases:**
- [ ] API timeout → Retry with backoff
- [ ] 500 Server Error → Show error message
- [ ] 503 Service Unavailable → Retry
- [ ] No internet → Offline message
- [ ] Slow network → Loading indicators

---

### Test 7.2: Validation Errors
**Test Cases:**
- [ ] Client-side validation (Zod)
- [ ] Server-side validation
- [ ] Field-level error messages
- [ ] Form-level error messages
- [ ] Toast notifications

---

### Test 7.3: Database Errors
**Test Cases:**
- [ ] Connection pool exhausted
- [ ] Transaction conflicts
- [ ] Unique constraint violations
- [ ] Foreign key violations
- [ ] Deadlocks

---

## 🧪 8. AUTOMATED TEST SCRIPT

### API Test Script
Create: `apps/web/test-api.ts`

```typescript
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

async function runTests() {
  console.log('🧪 Testing TreeVerse API...\n');
  
  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  const health = await axios.get('http://localhost:3000/api/health');
  console.log(health.data);
  
  // Test 2: Register User
  console.log('\n2️⃣ Testing User Registration...');
  const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
    email: `test${Date.now()}@example.com`,
    password: 'Test123!@#',
    firstName: 'Test',
    lastName: 'User',
    role: 'SELLER'
  });
  console.log('✅ User registered:', registerRes.data.data.user.email);
  
  const token = registerRes.data.data.accessToken;
  
  // Test 3: Get Profile
  console.log('\n3️⃣ Testing Get Profile...');
  const profile = await axios.get(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('✅ Profile fetched:', profile.data.data.email);
  
  // Test 4: Create Listing
  console.log('\n4️⃣ Testing Create Listing...');
  const listing = await axios.post(`${BASE_URL}/listings`, {
    title: 'Test Japanese Maple',
    speciesId: 'uuid-from-db',
    description: 'A beautiful test tree for automated testing purposes',
    price: 149.99,
    inventory: 10,
    height: 120,
    diameter: 3.5
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('✅ Listing created:', listing.data.data.id);
  
  console.log('\n✅ All tests passed!');
}

runTests().catch(console.error);
```

---

## 📊 TEST EXECUTION CHECKLIST

### Pre-Test Setup
- [ ] Database seeded with test data
- [ ] Redis running
- [ ] Worker process running
- [ ] Environment variables set
- [ ] API keys configured (HuggingFace, Gemini, UploadThing, Stripe)

### Execute Tests
- [ ] Authentication tests (1.1 - 1.4)
- [ ] Dashboard tests (2.1 - 2.4)
- [ ] Payment tests (3.1 - 3.4)
- [ ] Listings tests (4.1 - 4.3)
- [ ] AI feature tests (5.1 - 5.3)
- [ ] Analytics tests (6.1 - 6.2)

### Post-Test
- [ ] Document failures
- [ ] Create bug tickets
- [ ] Update test plan
- [ ] Generate test report

---

## 🎯 TESTING TOOLS

### Manual Testing
- Browser DevTools (Network, Console)
- React DevTools
- Redux/Zustand DevTools

### API Testing
- Postman/Insomnia
- cURL commands
- Custom test scripts

### E2E Testing (Future)
- Playwright
- Cypress
- Jest + Supertest

---

## 📝 TEST REPORT TEMPLATE

```markdown
# Test Execution Report

**Date:** November 24, 2025
**Tester:** [Your Name]
**Environment:** Development

## Summary
- Total Tests: X
- Passed: Y
- Failed: Z
- Skipped: W

## Detailed Results

### Authentication
- [x] User Registration - PASSED
- [ ] User Login - FAILED (Invalid token format)
- [x] Protected Routes - PASSED

### Dashboard
...

## Issues Found
1. **Bug:** ...
   - **Severity:** High
   - **Steps to Reproduce:** ...
   - **Expected:** ...
   - **Actual:** ...

## Recommendations
- Fix critical authentication bug
- Add loading states to dashboard
- Improve error messages
```

---

## 🚀 NEXT STEPS

After testing:
1. Fix identified bugs
2. Add automated tests
3. Set up CI/CD pipeline
4. Performance testing
5. Security audit
6. Load testing
7. Production deployment

---

**Status:** Ready for Testing 🧪  
**Last Updated:** November 24, 2025
