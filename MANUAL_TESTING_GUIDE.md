# 🧪 Manual Testing Guide - TreeVerse Marketplace

This guide provides step-by-step instructions for manually testing all website functionalities.

---

## 🚀 Pre-Testing Setup

### 1. Start the Application

Open **3 terminals**:

**Terminal 1 - Database (if using Docker):**
```powershell
cd c:\Users\selim\Projects\personal\tree
docker-compose up -d
```

**Terminal 2 - Web Server:**
```powershell
cd c:\Users\selim\Projects\personal\tree
pnpm dev
```

**Terminal 3 - Background Worker:**
```powershell
cd c:\Users\selim\Projects\personal\tree\apps\web
pnpm run worker
```

### 2. Verify Services Are Running

Open browser and check:
- ✅ **Web App:** http://localhost:3000
- ✅ **Health Check:** http://localhost:3000/api/health

Expected health check response:
```json
{
  "status": "healthy",
  "checks": {
    "database": true,
    "redis": true
  }
}
```

---

## 🔐 SECTION 1: AUTHENTICATION TESTING

### Test 1.1: User Registration (BUYER)

**Steps:**
1. Navigate to: http://localhost:3000/auth/register
2. Fill in the form:
   - **Email:** buyer@test.com
   - **Password:** Test123!@#
   - **First Name:** John
   - **Last Name:** Doe
   - **Role:** Select "BUYER"
3. Click "Register"

**Expected Results:**
- ✅ Form validates in real-time
- ✅ Password strength indicator shows
- ✅ Success toast notification appears
- ✅ Redirect to homepage or dashboard
- ✅ JWT token stored in localStorage/cookies
- ✅ User is logged in automatically

**How to Verify:**
- Open DevTools → Application → Local Storage
- Look for auth token
- Check Network tab for `/api/v1/auth/register` request
- Status should be `201 Created`

---

### Test 1.2: User Registration (SELLER)

**Steps:**
1. **Logout first** (if logged in)
2. Navigate to: http://localhost:3000/auth/register
3. Fill form:
   - **Email:** seller@test.com
   - **Password:** Test123!@#
   - **First Name:** Jane
   - **Last Name:** Smith
   - **Role:** Select "SELLER"
4. Click "Register"

**Expected Results:**
- ✅ Redirect to `/seller/dashboard`
- ✅ Seller dashboard loads
- ✅ User can create listings

---

### Test 1.3: Login with Existing User

**Steps:**
1. Logout
2. Navigate to: http://localhost:3000/auth/login
3. Enter credentials:
   - **Email:** seller@test.com
   - **Password:** Test123!@#
4. Click "Login"

**Expected Results:**
- ✅ Success message
- ✅ Redirect based on role (seller → `/seller/dashboard`)
- ✅ Token stored
- ✅ User menu shows profile picture/name

**Error Cases to Test:**
- ❌ Wrong password → "Invalid credentials"
- ❌ Non-existent email → "User not found"
- ❌ Empty fields → Validation errors

---

### Test 1.4: Protected Route Access

**Scenario A: Logged Out User**
1. Logout completely
2. Try to access: http://localhost:3000/seller/dashboard

**Expected:**
- ✅ Redirect to `/auth/login`
- ✅ Error message: "Please login to continue"

**Scenario B: Buyer Accessing Seller Route**
1. Login as BUYER
2. Try to access: http://localhost:3000/seller/dashboard

**Expected:**
- ✅ 403 Forbidden or redirect
- ✅ Error: "Insufficient permissions"

**Scenario C: Seller Accessing Admin Route**
1. Login as SELLER
2. Try to access: http://localhost:3000/admin/verifications

**Expected:**
- ✅ 403 Forbidden
- ✅ Error message shown

---

### Test 1.5: Token Persistence

**Steps:**
1. Login as any user
2. Refresh the page (F5)
3. Navigate away and come back
4. Close tab and reopen

**Expected Results:**
- ✅ User remains logged in after refresh
- ✅ Token is validated on page load
- ✅ User data fetched from `/api/v1/auth/me`

---

### Test 1.6: Logout

**Steps:**
1. Click on user profile dropdown (top right)
2. Click "Logout"

**Expected Results:**
- ✅ Token cleared from storage
- ✅ Redirect to homepage
- ✅ Protected routes no longer accessible
- ✅ Success message: "Logged out successfully"

---

## 📊 SECTION 2: DASHBOARD LOGIC TESTING

### Test 2.1: Seller Dashboard Overview

**Prerequisites:** Login as SELLER

**Steps:**
1. Navigate to: http://localhost:3000/seller/dashboard

**Expected Elements:**

**Stat Cards (4 total):**
- ✅ **Total Revenue** - Shows dollar amount
- ✅ **Total Orders** - Shows count
- ✅ **Active Listings** - Shows count
- ✅ **Pending Orders** - Shows count

**Charts:**
- ✅ Revenue chart (bar/line chart)
- ✅ X-axis shows dates
- ✅ Y-axis shows revenue amounts
- ✅ Data points are interactive (hover shows tooltip)

**Recent Sales Table:**
- ✅ Shows latest orders
- ✅ Columns: Order ID, Customer, Amount, Status, Date
- ✅ Clickable rows to view details

**Time Period Filters:**
- ✅ Buttons: 7 Days, 30 Days, 90 Days, All Time
- ✅ Clicking updates all stats and charts
- ✅ Active filter highlighted

**Loading States:**
1. Refresh page
2. Watch for skeleton loaders
3. ✅ Cards show shimmer effect
4. ✅ Chart shows placeholder
5. ✅ Smooth transition to actual data

**Empty State:**
If no data exists:
- ✅ Message: "No sales yet"
- ✅ Call-to-action: "Create your first listing"

---

### Test 2.2: Listings Management Table

**Steps:**
1. Navigate to: http://localhost:3000/seller/listings

**Table Features to Test:**

**Search:**
1. Enter "maple" in search box
2. ✅ Results filter in real-time
3. ✅ Debounced (waits ~300ms before searching)

**Sort:**
1. Click "Price" column header
2. ✅ Sorts ascending
3. Click again
4. ✅ Sorts descending
5. ✅ Arrow icon indicates sort direction

**Pagination:**
1. Change "Rows per page" to 10, 25, 50
2. ✅ Table updates
3. ✅ Pagination controls show correct total pages
4. Click "Next" button
5. ✅ Loads next page
6. ✅ URL updates with ?page=2

**Status Filter:**
1. Filter by "ACTIVE"
2. ✅ Shows only active listings
3. Filter by "DRAFT"
4. ✅ Shows only drafts

**Actions Menu:**
1. Click "⋮" (three dots) on any listing
2. ✅ Dropdown menu appears
3. Options:
   - View
   - Edit
   - Delete

**Edit Listing:**
1. Click "Edit" on a listing
2. ✅ Navigate to edit page
3. ✅ Form pre-filled with existing data
4. Change title
5. Click "Save"
6. ✅ Success notification
7. ✅ Changes reflected in table

**Delete Listing:**
1. Click "Delete" on a listing
2. ✅ Confirmation dialog appears
3. Click "Cancel"
4. ✅ Nothing happens
5. Click "Delete" again
6. Click "Confirm"
7. ✅ Listing removed from table
8. ✅ Success notification
9. ✅ Database updated

---

### Test 2.3: Create New Listing

**Steps:**
1. Navigate to: http://localhost:3000/seller/listings/new

**Form Validation:**

Test each field:

**Title:**
- ❌ Empty → "Title is required"
- ❌ < 10 characters → "Min 10 characters"
- ✅ Valid title accepted

**Species:**
- ❌ Not selected → "Species is required"
- ✅ Dropdown shows all species
- ✅ Can search in dropdown

**Description:**
- ❌ Empty → "Description is required"
- ❌ < 50 characters → "Min 50 characters"
- ✅ Textarea expands as you type

**Price:**
- ❌ Empty → "Price is required"
- ❌ Zero → "Must be greater than 0"
- ❌ Negative → "Must be positive"
- ❌ Non-number → "Must be a number"
- ✅ Valid price (e.g., 149.99)

**Inventory:**
- ❌ Empty → "Inventory is required"
- ❌ Zero → "Must have at least 1"
- ✅ Valid number (e.g., 10)

**Image Upload:**
1. Click upload area or drag image
2. ✅ File browser opens
3. Select image file
4. ✅ Progress bar shows
5. ✅ Image preview appears
6. ✅ Can upload multiple (max 5)
7. ✅ Can delete uploaded image
8. ✅ Can reorder images (drag & drop)

**Test Invalid Images:**
- ❌ PDF file → "Only images allowed"
- ❌ File > 4MB → "File too large"
- ❌ More than 5 images → "Max 5 images"

**Full Submission:**
1. Fill all fields correctly
2. Upload 2-3 images
3. Click "Create Listing"
4. ✅ Loading spinner shows on button
5. ✅ Button disabled during submission
6. ✅ Success toast: "Listing created successfully"
7. ✅ Redirect to `/seller/listings`
8. ✅ New listing appears in table

**Check Background Processing:**
1. Open Terminal 3 (Worker)
2. ✅ Should see: "🔍 Processing species verification..."
3. Wait 10-30 seconds
4. ✅ Should see: "✅ Verification Result: VERIFIED" (or MISMATCH)

---

### Test 2.4: Analytics Dashboard

**Steps:**
1. Navigate to: http://localhost:3000/seller/analytics

**Tabs to Test:**

**Tab 1: Overview**
- ✅ Revenue over time chart
- ✅ Orders by status (pie chart)
- ✅ Top products (bar chart)

**Tab 2: Views**
- ✅ Page views over time
- ✅ Most viewed listings
- ✅ View-to-purchase conversion rate

**Tab 3: AI Verification**
- ✅ Verification success rate
- ✅ Verification timeline
- ✅ Confidence distribution

**Tab 4: Performance**
- ✅ Average response time
- ✅ Error rate
- ✅ API usage stats

**Interactions:**
1. Switch between tabs
2. ✅ Content loads without page reload
3. ✅ Charts render correctly
4. Change time period (7d, 30d, 90d)
5. ✅ All charts update
6. ✅ API calls shown in Network tab

---

### Test 2.5: Admin Verification Dashboard

**Prerequisites:** Login as ADMIN

**Steps:**
1. Navigate to: http://localhost:3000/admin/verifications

**Stat Cards:**
- ✅ Total Verifications
- ✅ Verified Count (green)
- ✅ Mismatches Count (red)
- ✅ Pending Count (yellow)

**Filters:**
1. Click "VERIFIED"
2. ✅ Shows only verified listings
3. Click "MISMATCH"
4. ✅ Shows only mismatches
5. Click "PENDING"
6. ✅ Shows pending verifications

**Search:**
1. Enter listing title in search
2. ✅ Results filter

**Verification Cards:**
Each card should show:
- ✅ Listing image
- ✅ Listing title
- ✅ Claimed species
- ✅ AI prediction
- ✅ Confidence %
- ✅ Status badge (color-coded)
- ✅ Timestamp

**Actions (if implemented):**
- ✅ Override verification
- ✅ Mark as reviewed
- ✅ View full details

---

## 💳 SECTION 3: PAYMENT PROCESSING TESTING

### Test 3.1: Add to Cart

**Steps:**
1. Navigate to: http://localhost:3000/trees
2. Click on any listing
3. Click "Add to Cart" button

**Expected Results:**
- ✅ Success toast: "Added to cart"
- ✅ Cart badge count increases
- ✅ Cart icon shows number of items
- ✅ Item stored in cart (Zustand store)

**Edge Cases:**
- ✅ Can't add more than available inventory
- ✅ Can add same item multiple times
- ✅ Cart persists across page refresh

---

### Test 3.2: View Cart

**Steps:**
1. Click cart icon (top right)
2. Or navigate to: http://localhost:3000/cart

**Cart Page Elements:**

**Item List:**
- ✅ Shows all cart items
- ✅ Each item displays:
  - Image
  - Title
  - Price
  - Quantity selector
  - Remove button

**Quantity Controls:**
1. Click "+" to increase quantity
2. ✅ Quantity increases
3. ✅ Subtotal updates
4. ✅ Total updates
5. Click "-" to decrease
6. ✅ Quantity decreases
7. ✅ Can't go below 1
8. ✅ Can't exceed inventory

**Remove Item:**
1. Click "Remove" button
2. ✅ Confirmation (optional)
3. ✅ Item removed from cart
4. ✅ Totals recalculate

**Cart Summary:**
- ✅ Subtotal
- ✅ Shipping fee
- ✅ Tax (if applicable)
- ✅ Total (bold/highlighted)

**Empty Cart State:**
1. Remove all items
2. ✅ Message: "Your cart is empty"
3. ✅ Button: "Continue Shopping"

---

### Test 3.3: Checkout Flow

**Steps:**
1. With items in cart, click "Proceed to Checkout"
2. Navigate to: http://localhost:3000/checkout

**Page Sections:**

**1. Shipping Information:**
Fill in:
- Full Name
- Address
- City
- State/Province
- ZIP/Postal Code
- Country
- Phone Number

**Validation:**
- ❌ Empty fields → Error messages
- ❌ Invalid ZIP → "Invalid format"
- ❌ Invalid phone → "Invalid phone number"
- ✅ All valid → Continue enabled

**2. Payment Information:**

***NOTE: This requires Stripe integration***

**If Stripe is configured:**

1. Stripe Elements should load
2. Enter test card details:
   - **Card Number:** 4242 4242 4242 4242
   - **Expiry:** 12/34
   - **CVC:** 123
   - **ZIP:** 12345

3. ✅ Real-time card validation
4. ✅ Card brand icon shows (Visa)
5. ✅ Error messages for invalid cards

**3. Order Review:**
- ✅ List of items
- ✅ Shipping address
- ✅ Total amount
- ✅ Terms & conditions checkbox

**4. Place Order:**
1. Check terms checkbox
2. Click "Place Order"
3. ✅ Loading indicator
4. ✅ Button disabled during processing
5. ✅ Payment processing message

**Expected Results:**

**Success Path:**
- ✅ Payment intent created (API call)
- ✅ Stripe payment processed
- ✅ Order created in database
- ✅ Inventory decremented
- ✅ Success page displayed
- ✅ Order confirmation shown
- ✅ Cart cleared
- ✅ Email sent (if configured)

**Failure Path:**
- ❌ Card declined → Error message
- ❌ Insufficient funds → Error message
- ❌ Network error → Retry option

---

### Test 3.4: Stripe Webhook Testing

***This requires Stripe CLI***

**Setup:**
```powershell
# Install Stripe CLI (if not installed)
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to http://localhost:3000/api/v1/payments/webhook
```

**Trigger Events:**

```powershell
# Test successful payment
stripe trigger payment_intent.succeeded

# Test failed payment
stripe trigger payment_intent.payment_failed
```

**Check Results:**
1. Monitor Terminal 2 (Web Server)
2. ✅ Webhook received
3. ✅ Signature verified
4. ✅ Event processed
5. ✅ Order status updated in database

**Database Check:**
1. Open database client (e.g., pgAdmin, Prisma Studio)
2. Query: `SELECT * FROM "Order" ORDER BY "createdAt" DESC LIMIT 5;`
3. ✅ Order status = "COMPLETED" (for succeeded)
4. ✅ Order status = "FAILED" (for failed)

---

### Test 3.5: Order History

**Steps:**
1. Login as BUYER
2. Navigate to: http://localhost:3000/dashboard/orders

**Order List:**
- ✅ Shows all user's orders
- ✅ Sortable by date, amount, status
- ✅ Filterable by status

**Order Details:**
1. Click on an order
2. ✅ Shows full order details:
   - Order number
   - Date placed
   - Items ordered
   - Shipping address
   - Payment status
   - Total amount
   - Tracking info (if available)

---

## 🌳 SECTION 4: LISTINGS & PRODUCT CATALOG

### Test 4.1: Product Catalog Page

**Steps:**
1. Navigate to: http://localhost:3000/trees

**Layout:**
- ✅ Grid of product cards (responsive)
- ✅ Desktop: 3 columns
- ✅ Tablet: 2 columns
- ✅ Mobile: 1 column

**Product Card Elements:**
- ✅ Image (with fallback)
- ✅ Title
- ✅ Price
- ✅ Species name
- ✅ Verification badge (if verified)
- ✅ Rating stars (if has reviews)
- ✅ "Add to Cart" button

**Filters (Sidebar):**

**Category Filter:**
- ✅ Checkboxes for each category
- ✅ Checking filters results
- ✅ Multiple selections work
- ✅ Count shows next to category

**Price Range:**
- ✅ Price slider (min/max)
- ✅ Drag to adjust
- ✅ Results filter in real-time
- ✅ Current range displayed

**Specifications:**
- Height range
- Diameter range
- Age range

**Search:**
1. Enter "maple" in search box
2. ✅ Results filter
3. ✅ Highlights matching listings

**Sort:**
- Dropdown with options:
  - Price: Low to High
  - Price: High to Low
  - Newest First
  - Most Popular
  - Highest Rated

**Pagination:**
- ✅ Shows current page
- ✅ Total pages
- ✅ Previous/Next buttons
- ✅ Page numbers clickable
- ✅ URL updates with ?page=N

---

### Test 4.2: Product Detail Page

**Steps:**
1. Click on any product card
2. Navigate to: http://localhost:3000/trees/[id]

**Page Sections:**

**Hero Section:**
- ✅ Large image gallery
- ✅ Thumbnail strip below
- ✅ Click thumbnail → Changes main image
- ✅ Zoom on hover (optional)

**Product Info:**
- ✅ Title (H1)
- ✅ Price (large, prominent)
- ✅ Species name (scientific)
- ✅ Verification badge
- ✅ Rating & review count
- ✅ Seller info (name, rating)
- ✅ Inventory status ("X in stock")

**Specifications:**
- ✅ Height
- ✅ Diameter
- ✅ Age
- ✅ Category
- ✅ SKU

**Description:**
- ✅ Full product description
- ✅ Properly formatted

**Add to Cart Section:**
- ✅ Quantity selector
- ✅ "Add to Cart" button
- ✅ "Out of Stock" if inventory = 0
- ✅ Can't add more than available

**AI Care Plan:**
- ✅ Tab or accordion section
- ✅ Care instructions displayed
- ✅ Sections:
  - Watering
  - Sunlight
  - Soil
  - Temperature
  - Pruning
  - Fertilizing
  - Common Issues

**Reviews Section:**
- ✅ List of reviews
- ✅ Star rating
- ✅ Reviewer name
- ✅ Review text
- ✅ Date posted
- ✅ "Write a Review" button (if purchased)

**Related Products:**
- ✅ Show similar listings
- ✅ Based on species or category
- ✅ Carousel or grid

---

## 🤖 SECTION 5: AI FEATURES TESTING

### Test 5.1: Species Verification (Automatic)

**Prerequisites:**
- Worker process running (Terminal 3)
- HuggingFace API key configured

**Steps:**
1. Create a new listing with an image
2. Monitor worker terminal

**Expected Logs:**
```
🔍 Processing species verification for listing ID: abc-123
📸 Image URL: https://...
🌱 Claimed species: Japanese Maple (Acer palmatum)
🤖 Calling HuggingFace AI API...
✅ AI Response received
🎯 Top prediction: maple tree (Confidence: 94.2%)
✅ Verification Result: VERIFIED
💾 Saved to ImageAnalysis table
```

**Verification Outcomes:**

**VERIFIED (Match):**
- Claimed: "Japanese Maple"
- AI Prediction: "maple tree" (>80% confidence)
- ✅ Badge: "✨ Verified Species"

**MISMATCH:**
- Claimed: "Oak Tree"
- AI Prediction: "maple tree" (>80% confidence)
- ⚠️ Badge: "⚠️ Species Mismatch"

**PENDING:**
- AI Prediction: confidence < 60%
- ⏳ Badge: "Pending Verification"

**Check in Admin Dashboard:**
1. Navigate to: http://localhost:3000/admin/verifications
2. ✅ New verification appears
3. ✅ Correct status shown
4. ✅ Confidence % displayed

---

### Test 5.2: Care Plan Generation (Manual)

**Prerequisites:**
- Google Gemini API key configured

**Test Script:**
```powershell
cd apps\web
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

📋 Summary:
The Japanese Maple is a stunning deciduous tree...

💧 Watering:
Water deeply once per week during growing season...

☀️ Sunlight:
Partial shade to filtered sun. Protect from harsh afternoon sun...

🌡️ Temperature:
Hardy in zones 5-9. Protect from extreme cold...

🎉 Test successful!
```

**Manual Test in UI:**
1. Navigate to product detail page
2. Click "Generate Care Plan" button (if not auto-generated)
3. ✅ Loading indicator shows
4. ✅ Content appears after 3-5 seconds
5. ✅ Properly formatted markdown
6. ✅ Saved to database
7. ✅ Subsequent visits load instantly (cached)

---

### Test 5.3: AI Analytics

**Steps:**
1. Navigate to: http://localhost:3000/seller/analytics
2. Click "AI Features" tab

**Metrics to Verify:**
- ✅ Total verifications run
- ✅ Success rate (%)
- ✅ Average confidence score
- ✅ Care plans generated
- ✅ Verification timeline chart
- ✅ Confidence distribution chart

---

## 🧪 SECTION 6: ERROR HANDLING & EDGE CASES

### Test 6.1: Network Errors

**Simulate Offline:**
1. Open DevTools → Network → Throttling
2. Select "Offline"
3. Try any action (e.g., submit form)

**Expected:**
- ✅ Error message: "Network error. Please check your connection."
- ✅ Retry button appears
- ✅ No crash or white screen

---

### Test 6.2: API Errors

**Simulate 500 Error:**
1. Temporarily break an API route
2. Try action that uses that route

**Expected:**
- ✅ Error boundary catches error
- ✅ User-friendly error message
- ✅ Option to refresh or go back

---

### Test 6.3: Form Validation Errors

**Test Every Form:**
- ✅ Real-time validation
- ✅ Field-level error messages
- ✅ Form-level error messages
- ✅ Prevents submission when invalid
- ✅ Clear error on fix

---

### Test 6.4: Authentication Errors

**Expired Token:**
1. Wait for token to expire (or manually set expired token)
2. Try protected action

**Expected:**
- ✅ Auto-refresh token (if refresh token valid)
- ✅ OR redirect to login
- ✅ Message: "Session expired. Please login again."

---

## 📱 SECTION 7: RESPONSIVE DESIGN TESTING

### Test 7.1: Mobile (375px - iPhone)

**Open DevTools → Toggle Device Toolbar → iPhone 12**

Pages to Test:
- ✅ Homepage
- ✅ Product catalog
- ✅ Product detail
- ✅ Cart
- ✅ Checkout
- ✅ Dashboard
- ✅ Analytics

**Check:**
- ✅ No horizontal scroll
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Readable text (min 16px)
- ✅ Mobile navigation menu (hamburger)
- ✅ Images scale properly
- ✅ Forms usable

---

### Test 7.2: Tablet (768px - iPad)

**Toggle to iPad**

**Check:**
- ✅ 2-column layouts work
- ✅ Sidebar converts to drawer
- ✅ Tables scroll horizontally if needed

---

### Test 7.3: Desktop (1920px)

**Check:**
- ✅ Content doesn't stretch too wide
- ✅ Max-width containers
- ✅ Proper use of whitespace

---

## ✅ FINAL TESTING CHECKLIST

### Phase 1: Setup
- [ ] Database running
- [ ] Redis running
- [ ] Web server running (port 3000)
- [ ] Worker process running
- [ ] All API keys configured

### Phase 2: Authentication (HIGH PRIORITY)
- [ ] Register as Buyer
- [ ] Register as Seller
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Protected routes enforce auth
- [ ] Role-based access works
- [ ] Token persistence works
- [ ] Logout works

### Phase 3: Dashboard (HIGH PRIORITY)
- [ ] Seller dashboard loads
- [ ] Stats cards display
- [ ] Charts render
- [ ] Time period filters work
- [ ] Listings table loads
- [ ] Search works
- [ ] Sort works
- [ ] Pagination works
- [ ] Edit listing works
- [ ] Delete listing works

### Phase 4: Listings (HIGH PRIORITY)
- [ ] Create new listing
- [ ] Form validation works
- [ ] Image upload works
- [ ] Product detail page loads
- [ ] All info displays correctly
- [ ] Add to cart works

### Phase 5: Payments (HIGH PRIORITY)
- [ ] Add to cart works
- [ ] Cart page loads
- [ ] Quantity updates work
- [ ] Checkout page loads
- [ ] Shipping form validates
- [ ] Payment form (Stripe) loads
- [ ] Payment intent creates
- [ ] Payment processes
- [ ] Order creates
- [ ] Inventory decrements
- [ ] Webhook handles events

### Phase 6: AI Features (MEDIUM PRIORITY)
- [ ] Species verification runs
- [ ] Results save to database
- [ ] Badge displays on card
- [ ] Admin dashboard shows verifications
- [ ] Care plan generates
- [ ] Care plan displays
- [ ] AI analytics show

### Phase 7: Analytics (MEDIUM PRIORITY)
- [ ] Seller analytics load
- [ ] Charts render
- [ ] Filters work
- [ ] Admin analytics load (if admin)

### Phase 8: Edge Cases (LOW PRIORITY)
- [ ] Error handling works
- [ ] Loading states show
- [ ] Empty states show
- [ ] Network errors handled
- [ ] Form errors display

### Phase 9: Responsive (LOW PRIORITY)
- [ ] Mobile (375px) works
- [ ] Tablet (768px) works
- [ ] Desktop (1920px) works
- [ ] No horizontal scroll
- [ ] Touch-friendly

---

## 📝 BUG REPORT TEMPLATE

When you find a bug, document it:

```markdown
### Bug #X: [Short Title]

**Severity:** Critical / High / Medium / Low
**Page/Feature:** [e.g., Checkout page]
**User Role:** [e.g., Buyer, Seller, Admin]

**Steps to Reproduce:**
1. Navigate to...
2. Click on...
3. Enter...
4. Observe...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[Attach if applicable]

**Console Errors:**
[Any errors from DevTools console]

**Network Errors:**
[Any failed API calls from Network tab]

**Environment:**
- OS: Windows 11
- Browser: Chrome 120
- Screen Size: 1920x1080
```

---

## 🎉 TESTING COMPLETE

Once all tests pass, the application is ready for:
- ✅ User acceptance testing (UAT)
- ✅ Performance testing
- ✅ Security audit
- ✅ Production deployment

---

**Happy Testing! 🧪🌳**
