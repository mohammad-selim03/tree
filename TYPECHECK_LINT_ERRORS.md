# TypeScript & Linting Errors Report

**Generated:** 2025-11-23  
**Status:** ❌ Multiple errors found

## Summary

The codebase has TypeScript errors primarily related to:
1. **Next.js 15+ Breaking Changes** - `params` in route handlers
2. **Missing type declarations** for core modules
3. **TokenService import issues**

---

## 🔴 Critical Issues

### 1. Next.js 15+ Route Handler `params` Breaking Change

**Issue:** In Next.js 15+, route parameters (`params`) are now asynchronous and return a `Promise`. All dynamic route handlers need to be updated.

**Error Message:**
```
Type '(request: NextRequest, { params }: { params: { id: string; }; }) => Promise<...>'
is not assignable to type 
'(request: NextRequest, context: { params: Promise<{ id: string; }> }) => ...'
```

**Affected Files:**
- ✗ `app/api/v1/listings/[id]/route.ts` (3 handlers: GET, PATCH, DELETE)
- ✗ `app/api/v1/listings/[id]/publish/route.ts` (POST handler)
- ✗ `app/api/v1/orders/[id]/cancel/route.ts` (POST handler)
- ✗ `app/api/v1/orders/[id]/route.ts` (GET handler)
- ✗ `app/api/v1/orders/[id]/ship/route.ts` (POST handler)

**Current Pattern (Incorrect):**
```typescript
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }  // ❌ Wrong in Next.js 15+
) {
  const id = params.id;  // ❌ params is now a Promise
  // ...
}
```

**Required Fix:**
```typescript
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ✅ Correct
) {
  const { id } = await params;  // ✅ Must await params
  // ...
}
```

---

### 2. TokenService Missing Type Declarations

**Issue:** Import from `@repo/core/identity/domain/services/TokenService` is missing proper type declarations.

**Affected Files:**
- ✗ `lib/middleware/auth.ts` (line 8)

**Possible Solutions:**
1. Ensure `@repo/core` package has proper TypeScript exports
2. Check if `TokenService` is properly exported from the index
3. Verify tsconfig paths are correctly configured

---

### 3. Payment Webhook Route Issues

**Affected Files:**
- ✗ `app/api/v1/payments/webhook/route.ts` (line 10)
- ✗ `app/api/v1/payments/create-intent/route.ts` (line 10)

**Likely Cause:** Missing or incorrect type declarations for payment-related use cases

---

## 📋 Affected Route Handlers Summary

| Route | Handlers | Status |
|-------|----------|--------|
| `/api/v1/listings/[id]` | GET, PATCH, DELETE | ❌ needs params fix |
| `/api/v1/listings/[id]/publish` | POST | ❌ needs params fix |
| `/api/v1/orders/[id]` | GET | ❌ needs params fix |
| `/api/v1/orders/[id]/cancel` | POST | ❌ needs params fix |
| `/api/v1/orders/[id]/ship` | POST | ❌ needs params fix |
| `/api/v1/payments/create-intent` | POST | ❌ type declaration issue |
| `/api/v1/payments/webhook` | POST | ❌ type declaration issue |

---

## 🔨 Fix Plan

### Phase 1: Fix Next.js 15+ Route Handler Params (HIGH PRIORITY)

**Files to update: 7 route handlers**

For each dynamic route handler:
1. Change params type from `{ params: { id: string } }` to `{ params: Promise<{ id: string }> }`
2. Add `await params` wherever params is accessed
3. Update variable destructuring: `const { id } = await params`

**Example fix for `/app/api/v1/orders/[id]/cancel/route.ts`:**
```diff
 export async function POST(
   request: NextRequest,
-  { params }: { params: { id: string } }
+  { params }: { params: Promise<{ id: string }> }
 ) {
   try {
     const user = await requireAuthenticated(request);
     const body = await request.json();
     const validatedData = CancelOrderSchema.parse(body);
+    const { id } = await params;
     
     const orderRepository = new PrismaOrderRepository(prisma);
     const listingRepository = new PrismaListingRepository(prisma);
     const useCase = new CancelOrderUseCase(orderRepository, listingRepository);
     
-    const result = await useCase.execute(params.id, user.userId, validatedData.reason);
+    const result = await useCase.execute(id, user.userId, validatedData.reason);
```

### Phase 2: Fix Core Package Type Exports (MEDIUM PRIORITY)

1. Check `packages/core/src/index.ts` to ensure all services are exported
2. Verify `packages/core/tsconfig.json` has proper compilation settings
3. Run `pnpm build` in core package to regenerate type declarations
4. Check that `packages/core/package.json` has proper exports configuration

### Phase 3: Run Verification (IMMEDIATE AFTER FIXES)

```bash
# Run typecheck
pnpm check-types

# Run lint
pnpm lint

# Run build to ensure everything compiles
pnpm build
```

---

## 🎯 Next Steps

1. **Fix all route handler params** (7 files)
2. **Verify core package exports**
3. **Re-run typecheck and lint**
4. **Document any remaining issues**
5. **Run full build test**

---

## 📚 References

- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [TypeScript in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
