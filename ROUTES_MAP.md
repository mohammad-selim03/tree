# 🗺️ TreeVerse Application Routes - Complete Map

## 🌐 Public Routes (No Authentication Required)

### Marketing Pages
```
/                           → Home page (existing)
/trees                      → Product catalog (grid view with filters) ✅ PHASE 2
/trees/[id]                 → Product details page (existing)
/cart                       → Shopping cart (existing)
/checkout                   → Checkout flow (existing)
```

### Authentication
```
/login                      → Login form (existing)
/register                   → Registration form with role selection (existing)
```

---

## 🔐 Protected Routes (Authentication Required)

### User Dashboard
```
/profile                    → User profile settings ✅ PHASE 2
/orders                     → Order history ✅ PHASE 2
/orders/[id]                → Individual order details (TODO: Phase 3)
```

---

## 🏪 Seller Dashboard (Role: SELLER Required)

### Dashboard & Analytics
```
/seller/dashboard           → Dashboard overview with charts ✅ PHASE 2
                             - Revenue metrics
                             - Bar chart (monthly sales)
                             - Recent sales list
```

### Listing Management
```
/seller/listings            → All listings table ✅ PHASE 2
                             - Search/filter/sort
                             - Status management
                             - Quick actions

/seller/listings/new        → Create new listing form ✅ PHASE 2
                             - Multi-section form
                             - Image upload (mock)
                             - Validation

/seller/listings/[id]/edit  → Edit existing listing (TODO: Phase 3)
```

### Orders & Fulfillment
```
/seller/orders              → Seller order management (TODO: Phase 3)
/seller/orders/[id]         → Order details & fulfillment (TODO: Phase 3)
```

### Settings
```
/seller/settings            → Seller account settings (TODO: Phase 3)
```

---

## 📋 Route Protection Summary

| Route Pattern              | Auth Required | Role Required | Status       |
|---------------------------|---------------|---------------|--------------|
| `/`                       | ❌ No         | -             | ✅ Complete  |
| `/trees`                  | ❌ No         | -             | ✅ Complete  |
| `/trees/[id]`             | ❌ No         | -             | ✅ Complete  |
| `/cart`                   | ❌ No*        | -             | ✅ Complete  |
| `/checkout`               | ✅ Yes        | -             | ✅ Complete  |
| `/login`                  | ❌ No         | -             | ✅ Complete  |
| `/register`               | ❌ No         | -             | ✅ Complete  |
| `/profile`                | ✅ Yes        | -             | ✅ Complete  |
| `/orders`                 | ✅ Yes        | -             | ✅ Complete  |
| `/seller/dashboard`       | ✅ Yes        | SELLER        | ✅ Complete  |
| `/seller/listings`        | ✅ Yes        | SELLER        | ✅ Complete  |
| `/seller/listings/new`    | ✅ Yes        | SELLER        | ✅ Complete  |

*Cart accessible without auth, but prompts login at checkout

---

## 🧭 Navigation Structure

### Public Navigation (Navbar)
```
┌─────────────────────────────────────────────────┐
│ 🌳 TreeVerse    [Home] [Browse] [Cart 🛒(2)]   │
│                        [Login] [Sign Up]  or    │
│                        [👤 Profile Menu ▼]      │
└─────────────────────────────────────────────────┘
```

### Seller Sidebar Navigation
```
┌──────────────────────┐
│ 🌳 TreeVerse         │
├──────────────────────┤
│ 📊 Dashboard         │ → /seller/dashboard
│ 📝 Listings          │ → /seller/listings
│ 📦 Orders            │ → /seller/orders (Phase 3)
│ ⚙️  Settings         │ → /seller/settings (Phase 3)
├──────────────────────┤
│ 👤 John Doe          │
│    View Profile      │
│    Logout            │
└──────────────────────┘
```

### User Profile Dropdown
```
┌──────────────────────┐
│ 👤 John Doe          │
│    john@email.com    │
├──────────────────────┤
│ Profile Settings     │ → /profile
│ My Orders            │ → /orders
│ Seller Dashboard     │ → /seller/dashboard (if SELLER)
│ Logout               │
└──────────────────────┘
```

---

## 🔀 Redirect Logic

### Authentication Redirects
```typescript
// Not logged in → Login
/profile           → /login?redirect=/profile
/orders            → /login?redirect=/orders
/checkout          → /login?redirect=/checkout
/seller/*          → /login?redirect=/seller/dashboard

// Logged in as BUYER trying to access seller routes
/seller/*          → /login?redirect=/seller/dashboard
                     (with error: "Seller access required")

// Logged in → Can't access auth pages
/login             → / (home)
/register          → / (home)
```

### Post-Login Redirects
```typescript
// After login, redirect based on:
1. URL param:  ?redirect=/seller/dashboard → /seller/dashboard
2. User role:  SELLER → /seller/dashboard
3. Default:    BUYER  → /trees
```

---

## 📱 Responsive Behavior

### Desktop (≥768px)
- Full sidebar visible
- Filters shown in sidebar
- Multi-column grid layouts

### Tablet (640-768px)
- Collapsible sidebar
- 2-column product grid
- Filters in sidebar

### Mobile (<640px)
- Hamburger menu for sidebar
- Filters in Sheet (slide-in drawer)
- Single-column layouts
- Bottom navigation bar (optional)

---

## 🎨 Layout Variations

### Marketing Layout `(marketing)`
```
┌─────────────────────────────────┐
│ Navbar (global)                 │
├─────────────────────────────────┤
│                                 │
│ Page Content                    │
│ (full width, container)         │
│                                 │
├─────────────────────────────────┤
│ Footer (optional)               │
└─────────────────────────────────┘
```

### Auth Layout `(auth)`
```
┌─────────────────────────────────┐
│ [Centered gradient background]  │
│                                 │
│     ┌─────────────────┐         │
│     │  Auth Card      │         │
│     │  (Login/Signup) │         │
│     └─────────────────┘         │
│                                 │
└─────────────────────────────────┘
```

### Dashboard Layout `(dashboard)/seller`
```
┌───────┬─────────────────────────┐
│       │ Page Content            │
│ Side  │ (max-w-6xl, padding)    │
│ bar   │                         │
│       │                         │
│ Nav   │                         │
└───────┴─────────────────────────┘
```

---

## 🚀 Quick Testing URLs

Copy-paste these to test each page:

```bash
# Public pages
http://localhost:3000/
http://localhost:3000/trees
http://localhost:3000/trees/1
http://localhost:3000/cart
http://localhost:3000/checkout

# Auth
http://localhost:3000/login
http://localhost:3000/register

# User dashboard
http://localhost:3000/profile
http://localhost:3000/orders

# Seller dashboard
http://localhost:3000/seller/dashboard
http://localhost:3000/seller/listings
http://localhost:3000/seller/listings/new
```

---

## 📊 Route Usage Analytics (To Implement)

Track these metrics per route:
- Page views
- Bounce rate
- Conversion rate (for catalog/checkout)
- Time on page
- User flow (where do users go next?)

---

This map provides a complete overview of the application's routing structure. All ✅ marked routes are fully implemented and ready for testing!
