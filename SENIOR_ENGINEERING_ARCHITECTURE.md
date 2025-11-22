# 🏗️ TreeVerse Frontend Architecture & Engineering Standards

## 🎯 Senior Engineering Principles

This document outlines the architectural decisions, patterns, and standards that guide our implementation of the TreeVerse frontend. Every decision is made with production-readiness, scalability, and maintainability in mind.

---

## 📐 1. Architectural Patterns

### 1.1 Clean Architecture & Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Pages     │  │  Components  │  │   Layouts    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Hooks     │  │    Stores    │  │   Contexts   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Types     │  │  Validation  │  │   Business   │     │
│  │              │  │   (Zod)      │  │    Logic     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  API Client  │  │   Storage    │  │   External   │     │
│  │              │  │              │  │   Services   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

**Key Principles:**
- **Dependency Rule**: Dependencies point inward only
- **Domain Independence**: Business logic doesn't depend on frameworks
- **Testability**: Each layer can be tested independently
- **Replaceability**: Infrastructure can be swapped without affecting domain

---

## 📁 2. Project Structure (Enterprise-Grade)

```typescript
apps/web/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx          # Auth-specific layout
│   │
│   ├── (marketing)/            # Public route group
│   │   ├── trees/
│   │   ├── species/
│   │   └── layout.tsx          # Marketing layout
│   │
│   ├── (dashboard)/            # Protected route group
│   │   ├── seller/
│   │   │   ├── dashboard/
│   │   │   ├── listings/
│   │   │   ├── orders/
│   │   │   └── analytics/
│   │   ├── orders/
│   │   └── layout.tsx          # Dashboard layout
│   │
│   ├── api/                    # API routes
│   │   └── v1/
│   │
│   ├── layout.tsx              # Root layout
│   └── providers.tsx           # Global providers
│
├── components/                 # Reusable components
│   ├── ui/                     # Base UI components (atomic)
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── input/
│   │   └── ...
│   │
│   ├── features/               # Feature-specific components
│   │   ├── auth/
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   └── AuthGuard/
│   │   ├── products/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductList/
│   │   │   └── ProductFilters/
│   │   ├── cart/
│   │   └── checkout/
│   │
│   └── layout/                 # Layout components
│       ├── Navbar/
│       ├── Footer/
│       └── Sidebar/
│
├── lib/                        # Core utilities & infrastructure
│   ├── api/                    # API client layer
│   │   ├── client.ts           # Base HTTP client
│   │   ├── endpoints/          # API endpoint definitions
│   │   │   ├── auth.ts
│   │   │   ├── listings.ts
│   │   │   └── orders.ts
│   │   └── types/              # API type definitions
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── queries/            # TanStack Query hooks
│   │   │   ├── useListings.ts
│   │   │   ├── useOrders.ts
│   │   │   └── ...
│   │   ├── mutations/          # TanStack Mutation hooks
│   │   │   ├── useCreateListing.ts
│   │   │   └── ...
│   │   └── useAuth.ts          # Auth hook
│   │
│   ├── stores/                 # Zustand stores
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   └── uiStore.ts
│   │
│   ├── validations/            # Zod schemas
│   │   ├── auth.ts
│   │   ├── listing.ts
│   │   └── order.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── format.ts           # Formatters (date, currency, etc.)
│   │   ├── constants.ts        # App constants
│   │   └── helpers.ts          # Helper functions
│   │
│   └── middleware/             # Custom middleware
│       └── auth.ts
│
├── types/                      # Global TypeScript types
│   ├── models.ts               # Domain models
│   ├── api.ts                  # API types
│   └── index.ts
│
├── config/                     # Configuration files
│   ├── site.ts                 # Site metadata
│   ├── routes.ts               # Route constants
│   └── features.ts             # Feature flags
│
└── styles/                     # Global styles
    ├── globals.css
    └── themes/
```

**Rationale:**
- **Route Grouping**: Uses Next.js route groups for clear separation of concerns
- **Feature-Based Organization**: Components organized by feature, not by type
- **Colocation**: Tests and stories live next to components
- **Clear Boundaries**: lib/ for business logic, components/ for UI

---

## 🎨 3. Component Design Patterns

### 3.1 Component Architecture

```typescript
/**
 * Component Hierarchy:
 * 
 * 1. Atoms (ui/):
 *    - Single responsibility
 *    - No business logic
 *    - Highly reusable
 *    - Fully typed with generics
 * 
 * 2. Molecules (features/*):
 *    - Combine atoms
 *    - Feature-specific
 *    - May contain local state
 * 
 * 3. Organisms (features/*):
 *    - Complete features
 *    - Connect to stores/queries
 *    - Handle business logic
 * 
 * 4. Templates (app/*):
 *    - Page layouts
 *    - Data fetching
 *    - SEO optimization
 */

// Example: Button (Atom)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }))}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 3.2 Composition Over Inheritance

```typescript
// BAD: Inheritance
class AuthenticatedPage extends Page {
  // ...
}

// GOOD: Composition with HOC or Hooks
export default function DashboardPage() {
  useRequireAuth(); // Hook-based auth guard
  
  return <DashboardContent />;
}

// OR: Component composition
export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
```

### 3.3 Server vs Client Components Strategy

```typescript
/**
 * Server Components (Default):
 * - Data fetching
 * - Static content
 * - SEO-critical content
 * - No interactivity
 * 
 * Client Components ('use client'):
 * - User interactions
 * - Browser APIs
 * - State management
 * - Real-time updates
 */

// Server Component (default)
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id); // Server-side fetch
  
  return (
    <div>
      <ProductInfo product={product} /> {/* Server */}
      <AddToCartButton productId={product.id} /> {/* Client */}
    </div>
  );
}

// Client Component
'use client';

export function AddToCartButton({ productId }: Props) {
  const { addItem } = useCart();
  
  return <button onClick={() => addItem(productId)}>Add to Cart</button>;
}
```

---

## 🔐 4. Type Safety & Error Handling

### 4.1 Strict TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false
  }
}
```

### 4.2 Branded Types for Type Safety

```typescript
// Prevent mixing of different ID types
type UserId = string & { readonly __brand: 'UserId' };
type ProductId = string & { readonly __brand: 'ProductId' };
type OrderId = string & { readonly __brand: 'OrderId' };

function getUser(id: UserId): User { /* ... */ }
function getProduct(id: ProductId): Product { /* ... */ }

// Type error: Can't pass ProductId where UserId is expected
const user = getUser(productId); // ❌ Type error
```

### 4.3 Result Type for Error Handling

```typescript
/**
 * Result type for explicit error handling
 * Inspired by Rust's Result<T, E>
 */
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function createListing(data: CreateListingInput): Promise<Result<Listing>> {
  try {
    const listing = await api.listings.create(data);
    return { success: true, data: listing };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

// Usage with type narrowing
const result = await createListing(data);

if (result.success) {
  console.log(result.data.id); // TypeScript knows data exists
} else {
  console.error(result.error.message); // TypeScript knows error exists
}
```

### 4.4 Zod for Runtime Validation

```typescript
import { z } from 'zod';

/**
 * Schema-first approach:
 * 1. Define Zod schema
 * 2. Infer TypeScript type
 * 3. Use for both validation and typing
 */

// Schema definition
export const listingSchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters'),
  basePrice: z.number()
    .positive('Price must be positive')
    .max(1000000, 'Price exceeds maximum'),
  inventory: z.number()
    .int()
    .nonnegative('Inventory cannot be negative'),
  speciesId: z.string().uuid(),
  metadata: z.object({
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }).optional(),
});

// Infer TypeScript type from schema
export type ListingInput = z.infer<typeof listingSchema>;

// Use in forms with type safety
function CreateListingForm() {
  const form = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
  });
  
  // form.watch() is fully typed
  // form.errors are typed
}
```

---

## 🔄 5. State Management Strategy

### 5.1 State Categorization

```typescript
/**
 * State Management Decision Tree:
 * 
 * 1. Server State (TanStack Query):
 *    - Data from API
 *    - Cached, auto-refetched
 *    - Background updates
 *    Examples: Products, Orders, User profile
 * 
 * 2. Client State (Zustand):
 *    - UI state
 *    - User preferences
 *    - Shopping cart
 *    Examples: Theme, Sidebar open, Cart items
 * 
 * 3. URL State (useSearchParams):
 *    - Shareable state
 *    - Filter values
 *    - Pagination
 *    Examples: Search filters, Sort order, Page number
 * 
 * 4. Component State (useState):
 *    - Local UI state
 *    - Form inputs
 *    - Temporary state
 *    Examples: Modal open, Dropdown expanded
 */
```

### 5.2 TanStack Query Best Practices

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Query Keys Factory Pattern
 * Centralized, type-safe query keys
 */
export const queryKeys = {
  listings: {
    all: ['listings'] as const,
    lists: () => [...queryKeys.listings.all, 'list'] as const,
    list: (filters: ListingFilters) => 
      [...queryKeys.listings.lists(), { filters }] as const,
    details: () => [...queryKeys.listings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.listings.details(), id] as const,
  },
  orders: {
    all: ['orders'] as const,
    // ...
  },
} as const;

/**
 * Custom Query Hook with proper typing
 */
export function useListings(filters: ListingFilters) {
  return useQuery({
    queryKey: queryKeys.listings.list(filters),
    queryFn: () => api.listings.search(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    // Optimistic UI updates
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Optimistic Updates Pattern
 */
export function useCreateListing() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateListingInput) => api.listings.create(data),
    
    // Optimistic update
    onMutate: async (newListing) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: queryKeys.listings.lists() 
      });
      
      // Snapshot previous value
      const previous = queryClient.getQueryData(queryKeys.listings.lists());
      
      // Optimistically update
      queryClient.setQueryData(
        queryKeys.listings.lists(), 
        (old: Listing[] = []) => [...old, newListing as Listing]
      );
      
      return { previous };
    },
    
    // Rollback on error
    onError: (err, newListing, context) => {
      queryClient.setQueryData(
        queryKeys.listings.lists(), 
        context?.previous
      );
    },
    
    // Refetch on success
    onSettled: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.listings.lists() 
      });
    },
  });
}
```

### 5.3 Zustand Store Best Practices

```typescript
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Zustand Store with TypeScript, Immer, Persist, and DevTools
 */
interface CartState {
  items: CartItem[];
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  // Selectors (derived state)
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      immer((set, get) => ({
        items: [],
        
        addItem: (item) => set((state) => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            state.items.push(item);
          }
        }),
        
        removeItem: (itemId) => set((state) => {
          state.items = state.items.filter(item => item.id !== itemId);
        }),
        
        updateQuantity: (itemId, quantity) => set((state) => {
          const item = state.items.find(i => i.id === itemId);
          if (item) {
            item.quantity = quantity;
          }
        }),
        
        clearCart: () => set({ items: [] }),
        
        // Selectors
        getTotalItems: () => 
          get().items.reduce((sum, item) => sum + item.quantity, 0),
        
        getTotalPrice: () =>
          get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      })),
      {
        name: 'cart-storage',
        partialize: (state) => ({ items: state.items }), // Only persist items
      }
    ),
    { name: 'CartStore' }
  )
);

/**
 * Selector hook pattern for performance
 */
export const useCartItems = () => useCartStore(state => state.items);
export const useAddToCart = () => useCartStore(state => state.addItem);
export const useTotalItems = () => useCartStore(state => state.getTotalItems());
```

---

## 🌐 6. API Client Architecture

### 6.1 Layered API Client

```typescript
/**
 * Base HTTP Client with interceptors
 */
class HTTPClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async request<T>(
    endpoint: string,
    config?: RequestInit
  ): Promise<Result<T>> {
    try {
      // Add auth token
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config?.headers,
      };
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        headers,
      });
      
      if (!response.ok) {
        throw new APIError(response.status, await response.text());
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error('Unknown error')
      };
    }
  }
  
  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }
  
  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
  
  // ... patch, delete, etc.
}

/**
 * API Service Layer
 * Organized by domain
 */
export const api = {
  auth: {
    login: (credentials: LoginInput) => 
      client.post<AuthResponse>('/auth/login', credentials),
    
    register: (data: RegisterInput) =>
      client.post<AuthResponse>('/auth/register', data),
    
    me: () => 
      client.get<User>('/auth/me'),
  },
  
  listings: {
    search: (filters: ListingFilters) =>
      client.get<ListingSearchResponse>(`/listings?${qs.stringify(filters)}`),
    
    create: (data: CreateListingInput) =>
      client.post<Listing>('/listings', data),
    
    update: (id: string, data: UpdateListingInput) =>
      client.patch<Listing>(`/listings/${id}`, data),
    
    delete: (id: string) =>
      client.delete(`/listings/${id}`),
  },
  
  orders: {
    create: (data: CreateOrderInput) =>
      client.post<Order>('/orders', data),
    
    getHistory: (filters?: OrderFilters) =>
      client.get<Order[]>(`/orders?${qs.stringify(filters || {})}`),
  },
};
```

---

## 🧪 7. Testing Strategy

### 7.1 Testing Pyramid

```
        /\
       /E2E\         10% - Critical user flows
      /------\
     /  INT   \      30% - API integration, hooks
    /----------\
   /   UNIT     \    60% - Components, utils, business logic
  /--------------\
```

### 7.2 Component Testing

```typescript
import { render, screen, userEvent } from '@/test/utils';

/**
 * Test Utils with Providers
 */
export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </QueryClientProvider>
  );
}

/**
 * Component Test Example
 */
describe('LoginForm', () => {
  it('should submit valid credentials', async () => {
    const onSuccess = jest.fn();
    const { user } = renderWithProviders(
      <LoginForm onSuccess={onSuccess} />
    );
    
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
  
  it('should show validation errors for invalid input', async () => {
    renderWithProviders(<LoginForm />);
    
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
});
```

---

## ⚡ 8. Performance Optimization

### 8.1 Code Splitting Strategy

```typescript
/**
 * Route-based code splitting (automatic with Next.js)
 * Component-based code splitting (manual with lazy)
 */
import dynamic from 'next/dynamic';

// Lazy load heavy components
const ChartComponent = dynamic(
  () => import('@/components/features/analytics/Chart'),
  { 
    loading: () => <ChartSkeleton />,
    ssr: false, // Don't render on server if not needed
  }
);

// Lazy load modals
const CreateListingModal = dynamic(
  () => import('@/components/features/listings/CreateListingModal'),
  { ssr: false }
);
```

### 8.2 Image Optimization

```typescript
import Image from 'next/image';

/**
 * Always use Next.js Image component
 */
<Image
  src={product.imageUrl}
  alt={product.title}
  width={600}
  height={400}
  placeholder="blur"
  blurDataURL={product.blurHash}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={product.featured} // LCP optimization
/>
```

### 8.3 Memoization Strategy

```typescript
import { memo, useMemo, useCallback } from 'react';

/**
 * Memoize expensive computations
 */
function ProductList({ products }: Props) {
  const sortedProducts = useMemo(
    () => products.sort((a, b) => b.rating - a.rating),
    [products]
  );
  
  const handleAddToCart = useCallback((id: string) => {
    addToCart(id);
  }, [addToCart]);
  
  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

/**
 * Memo components that receive stable props
 */
export const ProductCard = memo(function ProductCard({ product, onAddToCart }: Props) {
  return (
    // ...
  );
});
```

---

## 🔒 9. Security Best Practices

### 9.1 XSS Prevention

```typescript
/**
 * Never use dangerouslySetInnerHTML without sanitization
 */
import DOMPurify from 'isomorphic-dompurify';

function SafeHTML({ html }: { html: string }) {
  const sanitized = useMemo(
    () => DOMPurify.sanitize(html, { 
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href']
    }),
    [html]
  );
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

### 9.2 CSRF Protection

```typescript
/**
 * Include CSRF token in mutations
 */
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: OrderInput) => {
      const csrfToken = getCsrfToken();
      
      return api.orders.create(data, {
        headers: { 'X-CSRF-Token': csrfToken }
      });
    },
  });
}
```

### 9.3 Environment Variables

```typescript
/**
 * Type-safe environment variables
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_KEY: z.string(),
  // Server-only
  API_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);

// Usage
const apiURL = env.NEXT_PUBLIC_API_URL; // Type-safe
```

---

## 📊 10. Monitoring & Observability

### 10.1 Error Boundary

```typescript
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback />;
    }
    
    return this.props.children;
  }
}
```

---

## 📝 11. Code Quality Standards

### 11.1 ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/jsx-no-leaked-render": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 11.2 File Naming Conventions

```
- Components: PascalCase (ProductCard.tsx)
- Hooks: camelCase with 'use' prefix (useAuth.ts)
- Utils: camelCase (formatCurrency.ts)
- Constants: SCREAMING_SNAKE_CASE (API_BASE_URL)
- Types: PascalCase (User.ts, ProductInput.ts)
- Tests: Match source file (ProductCard.test.tsx)
```

---

## 🚀 12. Development Workflow

### 12.1 Git Workflow

```
main (production)
  ↓
develop (integration)
  ↓
feature/* (features)
hotfix/* (urgent fixes)
```

### 12.2 Commit Convention

```
feat: Add shopping cart functionality
fix: Resolve login redirect issue
docs: Update API documentation
refactor: Simplify checkout flow
test: Add tests for ProductCard
chore: Update dependencies
perf: Optimize image loading
```

---

## ✅ 13. Definition of Done

Before marking a feature as complete:

- [ ] **Code Quality**
  - No TypeScript errors
  - No ESLint warnings
  - Passes code review
  
- [ ] **Testing**
  - Unit tests written and passing
  - Integration tests for critical paths
  - E2E tests for user flows
  
- [ ] **Performance**
  - Lighthouse score > 90
  - No console errors/warnings
  - Images optimized
  
- [ ] **Accessibility**
  - Keyboard navigable
  - Screen reader compatible
  - WCAG AA compliant
  
- [ ] **Documentation**
  - JSDoc comments for complex logic
  - README updated if needed
  - Storybook stories for components

---

## 🎯 Conclusion

This architecture ensures we build a production-ready, scalable, and maintainable application. Every decision is intentional, following industry best practices and senior-level engineering standards.

**Next Steps:**
1. Review and approve this architecture
2. Set up project structure
3. Begin implementation following these standards

Let's build something exceptional! 🚀
