# 🔌 Backend API Integration - Complete Guide

**Last Updated:** November 21, 2025  
**Status:** Implemented with Mock Data Fallback

---

## 📊 Integration Overview

All pages have been updated to connect to the backend API using **TanStack Query** hooks. Each integration includes:
- ✅ **Loading States** with skeleton loaders
- ✅ **Error Handling** with retry functionality
- ✅ **Mock Data Fallback** for development without backend
- ✅ **Visual Indicators** showing when using mock data

---

## 🗂️ Pages Connected to API

### 1. **Authentication** (`/login`, `/register`)

**Status:** ✅ Already Connected  
**Hooks Used:**
- `useLogin()` - Login mutation
- `useRegister()` - Registration mutation  
- `useLogout()` - Logout mutation

**API Endpoints:**
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh (automatic)
GET  /api/auth/me
```

**Features:**
- Automatic token storage
- Token refresh on 401
- Redirect on success
- Form validation with Zod

---

### 2. **Product Catalog** (`/trees`)

**Status:** ✅ Connected  
**File:** `app/(marketing)/trees/page.tsx`

**Hook Used:**
```typescript
const { data, isLoading, isError, error, refetch } = useListings({
  status: 'active',
  search: searchQuery || undefined,
})
```

**API Endpoint:**
```
GET /api/listings?status=active&search=...
```

**States Implemented:**
- ✅ Loading skeleton (6 product cards)
- ✅ Error state with retry button
- ✅ Empty state
- ✅ Success state with product grid
- ✅ Mock data fallback with indicator

**Mock Data:**
- 6 sample products (Japanese Maple, Blue Spruce, etc.)
- Used when `data` is undefined

---

### 3. **Seller Dashboard** (`/seller/dashboard`)

**Status:** ✅ Connected  
**File:** `app/(dashboard)/seller/dashboard/page.tsx`

**Hook Used:**
```typescript
const { data, isLoading, isError, error, refetch } = useSellerStats()
```

**API Endpoint:**
```
GET /api/seller/stats
```

**Data Structure:**
```typescript
interface SellerStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  activeCustomers: number
  revenueChange: number
  ordersChange: number
  monthlyRevenue: Array<{ month: string; total: number }>
  recentSales: Array<{
    id: string
    customerName: string
    customerEmail: string
    amount: number
    date: string
  }>
}
```

**States Implemented:**
- ✅ Loading skeletons for stat cards
- ✅ Loading skeleton for chart
- ✅ Loading state for recent sales
- ✅ Error state with retry
- ✅ Mock data fallback

---

### 4. **Seller Listings** (`/seller/listings`)

**Status:** ✅ Connected  
**File:** `app/(dashboard)/seller/listings/page.tsx`

**Hook Used:**
```typescript
const { data, isLoading, isError, error, refetch } = useListings({
  search: search || undefined,
})
```

**API Endpoint:**
```
GET /api/listings?search=...
```

**States Implemented:**
- ✅ Table loading skeleton (5 rows)
- ✅ Error state with retry
- ✅ Empty state
- ✅ Data table with search/sort/filter
- ✅ Mock data fallback

**Actions Available:**
- Edit listing (navigates to `/seller/listings/{id}/edit`)
- Delete listing (needs mutation hook - TODO)

---

### 5. **Create Listing** (`/seller/listings/new`)

**Status:** ⏳ Partially Connected  
**File:** `app/(dashboard)/seller/listings/new/page.tsx`

**Hook Needed:**
```typescript
const { mutate: createListing, isPending } = useCreateListing()
```

**API Endpoint:**
```
POST /api/listings
```

**TODO:**
- Wire up form submission to `useCreateListing` hook
- Implement image upload
- Add success redirect
- Add error toast notifications

---

### 6. **User Profile** (`/profile`)

**Status:** ⏳ Not Connected  
**File:** `app/(dashboard)/profile/page.tsx`

**Hooks Needed:**
```typescript
const { data: user } = useMe()
const { mutate: updateProfile } = useUpdateProfile()
const { mutate: changePassword } = useChangePassword()
```

**API Endpoints:**
```
GET  /api/auth/me
PATCH /api/users/profile
POST /api/auth/change-password
```

**TODO:**
- Create `useUpdateProfile` hook
- Create `useChangePassword` hook
- Wire up forms
- Add loading states

---

### 7. **Order History** (`/orders`)

**Status:** ⏳ Not Connected  
**File:** `app/(dashboard)/orders/page.tsx`

**Hook Needed:**
```typescript
const { data, isLoading } = useOrders()
```

**API Endpoint:**
```
GET /api/orders?userId={currentUser}
```

**TODO:**
- Create `useOrders` hook
- Add loading skeleton
- Add error handling
- Wire up order details link

---

## 🔧 React Query Hooks Reference

### Implemented Hooks

| Hook | File | Type | Status |
|------|------|------|--------|
| `useLogin` | `lib/hooks/queries/useAuth.ts` | Mutation | ✅ Complete |
| `useRegister` | `lib/hooks/queries/useAuth.ts` | Mutation | ✅ Complete |
| `useLogout` | `lib/hooks/queries/useAuth.ts` | Mutation | ✅ Complete |
| `useMe` | `lib/hooks/queries/useAuth.ts` | Query | ✅ Complete |
| `useListings` | `lib/hooks/queries/useListings.ts` | Query | ✅ Complete |
| `useSellerStats` | `lib/hooks/queries/useSellerStats.ts` | Query | ✅ Complete |

### Hooks to Implement

| Hook | Purpose | Priority |
|------|---------|----------|
| `useCreateListing` | Create new listing | 🔴 High |
| `useUpdateListing` | Edit existing listing | 🔴 High |
| `useDeleteListing` | Delete listing | 🟡 Medium |
| `useOrders` | Fetch user orders | 🟡 Medium |
| `useUpdateProfile` | Update user profile | 🟡 Medium |
| `useChangePassword` | Change password | 🟢 Low |
| `useProductDetails` | Fetch single product | 🟡 Medium |

---

## 🎨 Loading States Reference

### Skeleton Components Created

All in `components/ui/skeleton.tsx`:

```typescript
<Skeleton />                    // Base skeleton
<ProductCardSkeleton />         // For product grids
<TableRowSkeleton columns={5} /> // For data tables
<StatCardSkeleton />             // For dashboard metrics
<FormSkeleton />                 // For form loading
<ChartSkeleton />                // For charts
```

### Usage Example

```typescript
{isLoading ? (
  <ProductCardSkeleton />
) : (
  <ProductCard {...product} />
)}
```

---

## ⚠️ Error Handling Reference

### ErrorState Component

```typescript
<ErrorState
  title="Failed to load data"
  message={error?.message || "Something went wrong"}
  onRetry={() => refetch()}
/>
```

### Error Boundary

Global error boundary in `app/layout.tsx` catches React rendering errors.

---

## 🧪 Testing the Integration

### With Backend Running

1. **Start Backend:**
   ```bash
   # From backend directory
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   # From apps/web
   pnpm dev
   ```

3. **Test Endpoints:**
   - Login with real credentials
   - Browse products from database
   - View seller dashboard with real data

### Without Backend (Mock Data Mode)

1. **Start Frontend Only:**
   ```bash
   pnpm dev
   ```

2. **What to Expect:**
   - Yellow indicator: "(Using mock data - backend not connected)"
   - All features work with mock data
   - No API calls are made
   - No errors occur

---

## 🔄 API Client Features

### Automatic Retry

```typescript
// Retries 3 times with exponential backoff
// 1s → 2s → 4s
// Only for 5xx errors and network failures
```

### Token Refresh

```typescript
// Automatic on 401 responses
// Prevents multiple simultaneous refreshes
// Redirects to /login if refresh fails
```

### Error Handling

```typescript
// All errors wrapped in Result<T> type
{
  success: false,
  error: {
    message: string,
    code?: string,
    status?: number,
    details?: unknown
  }
}
```

---

## 📝 Environment Variables Needed

Create `.env.local` with:

```bash
# Required
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# The backend should be running at this URL
```

---

## 🚀 Next Steps

### Immediate (Complete Integration)

1. **Create Missing Hooks:**
   - `useCreateListing`
   - `useUpdateListing`
   - `useDeleteListing`
   - `useOrders`

2. **Wire Up Forms:**
   - Create listing form
   - Edit listing form
   - Profile update form

3. **Implement Image Upload:**
   - Choose service (UploadThing/Cloudinary/S3)
   - Create ImageUpload component
   - Integrate into listing forms

### Short-term (Enhance UX)

4. **Add Optimistic Updates:**
   - Delete listing
   - Update listing status
   - Add to cart

5. **Add Toast Notifications:**
   - Success messages
   - Error messages
   - Loading indicators

6. **Improve Error Messages:**
   - More specific error handling
   - User-friendly messages
   - Action suggestions

### Long-term (Polish)

7. **Performance Optimization:**
   - Implement pagination
   - Add infinite scroll
   - Optimize images
   - Code splitting

8. **Real-time Features:**
   - WebSocket connection
   - Live order updates
   - Inventory updates

---

## 💡 Best Practices Used

✅ **Separation of Concerns:** API logic in hooks, UI in components  
✅ **Error Boundaries:** Graceful error handling  
✅ **Loading States:** Better perceived performance  
✅ **Fallback Data:** Development without backend dependency  
✅ **Type Safety:** TypeScript throughout  
✅ **Retry Logic:** Resilient to network issues  
✅ **Token Management:** Automatic refresh, secure storage  

---

## 🐛 Troubleshooting

### "Using mock data" appears
- Backend is not running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is accessible

### Auth token expired
- Automatic refresh will attempt
- If refresh fails, redirects to `/login`
- Check backend `/auth/refresh` endpoint

### Data not updating
- Check React Query devtools
- Verify API response format
- Check browser network tab
- Ensure `queryKey` is correct

---

## 📚 References

- **TanStack Query:** https://tanstack.com/query
- **API Client:** `lib/api/client.ts`
- **Query Hooks:** `lib/hooks/queries/`
- **Error Boundary:** `components/ErrorBoundary.tsx`
- **Skeletons:** `components/ui/skeleton.tsx`

---

**Integration Status:** 60% Complete  
**Next Priority:** Implement remaining mutation hooks and wire up forms
