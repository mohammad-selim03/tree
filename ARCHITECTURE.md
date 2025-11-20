# Architecture Documentation

**Project:** TreeVerse E-Commerce Platform  
**Type:** Full-Stack Monorepo  
**Status:** Production-Ready

---

## 🏗️ Overall Architecture

### **Monorepo Structure (Turborepo)**

```
tree/
├── apps/                   # Applications
│   ├── web/               # Next.js web app (Frontend + Backend API)
│   └── docs/              # Documentation site
│
├── packages/              # Shared packages
│   ├── core/              # Business logic (Backend)
│   ├── database/          # Prisma schema & migrations
│   ├── ui/                # Shared UI components
│   ├── typescript-config/ # Shared TypeScript configs
│   └── eslint-config/     # Shared ESLint configs
```

---

## 🎯 Architecture Patterns

### **1. Backend: Clean Architecture + DDD**

We follow **Hexagonal Architecture** (Ports & Adapters) combined with **Domain-Driven Design**:

```
┌─────────────────────────────────────────────────────┐
│                API Layer (Next.js)                  │
│  apps/web/app/api/v1/*                             │
│  - REST endpoints                                   │
│  - Authentication middleware                        │
│  - Request validation (Zod)                         │
└────────────────────┬────────────────────────────────┘
                     ↓
┌────────────────────▼────────────────────────────────┐
│           Application Layer (Use Cases)             │
│  packages/core/src/*/application/                   │
│  - Use case orchestration                           │
│  - DTOs (Data Transfer Objects)                     │
│  - Application-specific logic                       │
└────────────────────┬────────────────────────────────┘
                     ↓
┌────────────────────▼────────────────────────────────┐
│              Domain Layer (Core)                    │
│  packages/core/src/*/domain/                        │
│  - Entities & Aggregates                            │
│  - Value Objects                                    │
│  - Domain Services                                  │
│  - Business Rules                                   │
│  - Domain Events                                    │
└────────────────────┬────────────────────────────────┘
                     ↓
┌────────────────────▼────────────────────────────────┐
│         Infrastructure Layer (Adapters)             │
│  packages/core/src/*/infrastructure/                │
│  - Prisma repositories                              │
│  - External services (Stripe, Email)                │
│  - Database access                                  │
└─────────────────────────────────────────────────────┘
```

### **2. Frontend: Next.js App Router**

We use **Next.js 14+ App Router** with:
- **Server Components** by default
- **Client Components** when needed (interactivity)
- **Server Actions** for mutations
- **Route Handlers** for API endpoints

```
apps/web/app/
├── (marketing)/          # Marketing pages (no auth needed)
│   ├── page.tsx         # Homepage
│   ├── about/           # About us
│   └── layout.tsx       # Marketing layout
│
├── (shop)/              # Shop pages (browsing)
│   ├── trees/           # Product catalog
│   ├── tree/[id]/       # Product details
│   └── layout.tsx       # Shop layout
│
├── (dashboard)/         # User dashboard (auth required)
│   ├── profile/         # User profile
│   ├── orders/          # Order history
│   └── layout.tsx       # Dashboard layout
│
├── (seller)/            # Seller dashboard (seller role)
│   ├── listings/        # Manage listings
│   ├── orders/          # Seller orders
│   └── layout.tsx       # Seller layout
│
└── api/                 # API routes (backend)
    └── v1/              # API version 1
```

---

## 📦 Bounded Contexts (DDD)

### **1. Identity Context**
**Purpose:** User management, authentication, authorization

**Components:**
- Entities: `User`
- Value Objects: `Email`, `Password`, `AccessToken`, `RefreshToken`
- Services: `TokenService`
- Use Cases: `RegisterUser`, `LoginUser`, `RefreshToken`

**Location:** `packages/core/src/identity/`

---

### **2. Marketplace Context**
**Purpose:** Product catalog, seller management

**Components:**
- Aggregates: `Listing`
- Entities: `Seller`
- Value Objects: `Money`, `SKU`
- Use Cases: `CreateListing`, `SearchListings`, `PublishListing`

**Location:** `packages/core/src/marketplace/`

---

### **3. Orders Context**
**Purpose:** Order lifecycle management

**Components:**
- Aggregates: `Order`
- Entities: `OrderItem`
- Value Objects: `OrderNumber`, `ShippingAddress`
- Use Cases: `CreateOrder`, `ShipOrder`, `CancelOrder`

**Location:** `packages/core/src/orders/`

---

### **4. Payments Context**
**Purpose:** Payment processing, Stripe integration

**Components:**
- Entities: `Payment`
- Services: `StripePaymentService`
- Use Cases: `CreatePaymentIntent`, `ProcessWebhook`

**Location:** `packages/core/src/payments/`

---

## 🔄 Data Flow

### **Typical Request Flow:**

```
1. User Request
   ↓
2. Next.js API Route (apps/web/app/api/v1/*)
   ↓
3. Authentication Middleware (if protected)
   ↓
4. Input Validation (Zod)
   ↓
5. Use Case Execution (packages/core/*/application/use-cases/)
   ↓
6. Domain Logic (packages/core/*/domain/)
   ↓
7. Repository (packages/core/*/infrastructure/repositories/)
   ↓
8. Prisma ORM (packages/database/)
   ↓
9. PostgreSQL Database
   ↓
10. Response DTO
   ↓
11. JSON Response to Client
```

---

## 🎨 Design Patterns Used

### **Architectural Patterns:**
- ✅ **Clean Architecture** - Separation of concerns
- ✅ **Hexagonal Architecture** - Ports & Adapters
- ✅ **Domain-Driven Design** - Business logic focus
- ✅ **CQRS (Light)** - Separate read/write models
- ✅ **Event-Driven** - Domain events for cross-context communication

### **Design Patterns:**
- ✅ **Repository Pattern** - Data access abstraction
- ✅ **Factory Pattern** - Object creation (e.g., `Order.create()`)
- ✅ **Value Object Pattern** - Immutable domain values
- ✅ **Aggregate Pattern** - Transaction boundaries
- ✅ **Use Case Pattern** - Application logic orchestration
- ✅ **DTO Pattern** - Data transfer between layers
- ✅ **Middleware Pattern** - Request processing pipeline

---

## 🔐 Security Architecture

### **Authentication Flow:**
```
1. User Login → JWT Access Token (15 min) + Refresh Token (7 days)
2. Protected Request → Middleware validates JWT
3. Token Expired → Use Refresh Token to get new Access Token
4. Refresh Expired → User must login again
```

### **Authorization:**
- **Role-Based Access Control (RBAC)**: BUYER, SELLER, ADMIN
- **Resource-Level Checks**: User can only access their own resources
- **Middleware**: `requireAuthenticated`, `requireSeller`, `requireAdmin`

---

## 📊 Technology Stack

### **Frontend:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules / Tailwind (optional)
- **State Management:** React Server Components + Context API
- **Forms:** React Hook Form + Zod validation

### **Backend:**
- **API:** Next.js API Routes
- **Language:** TypeScript
- **Validation:** Zod
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Password:** bcrypt
- **Payments:** Stripe

### **Infrastructure:**
- **Monorepo:** Turborepo
- **Testing:** Jest
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Deployment:** Vercel / Railway / AWS / Self-hosted

---

## 🎯 Key Principles

### **SOLID Principles:**
- ✅ **Single Responsibility** - Each class has one job
- ✅ **Open/Closed** - Open for extension, closed for modification
- ✅ **Liskov Substitution** - Interfaces are substitutable
- ✅ **Interface Segregation** - Specific interfaces
- ✅ **Dependency Inversion** - Depend on abstractions

### **DDD Principles:**
- ✅ **Ubiquitous Language** - Shared terminology
- ✅ **Bounded Contexts** - Clear boundaries
- ✅ **Aggregates** - Consistency boundaries
- ✅ **Domain Events** - Cross-context communication
- ✅ **Value Objects** - Immutable, side-effect-free

---

## 🚀 Scalability Considerations

### **Current Architecture Supports:**
- ✅ Horizontal scaling (stateless API)
- ✅ Database read replicas (Prisma supports)
- ✅ Caching layer (Redis can be added)
- ✅ CDN for static assets
- ✅ Microservices migration (bounded contexts ready)
- ✅ Event sourcing (domain events foundation)

---

## 📈 Future Enhancements

### **Potential Additions:**
- **API Gateway** - For multiple frontends
- **Message Queue** - RabbitMQ/Kafka for async processing
- **Caching** - Redis for performance
- **Search** - Elasticsearch for advanced search
- **Analytics** - Event streaming for analytics
- **Monitoring** - Sentry, DataDog for observability

---

## 🎓 Architecture Summary

**We are following:**

1. **Clean Architecture** (Robert C. Martin)
   - Concentric circles of dependencies
   - Business logic independent of frameworks
   - Testable design

2. **Hexagonal Architecture** (Alistair Cockburn)
   - Ports (interfaces) and Adapters (implementations)
   - Core domain isolated from external concerns

3. **Domain-Driven Design** (Eric Evans)
   - Bounded contexts
   - Ubiquitous language
   - Aggregates and entities
   - Domain events

4. **Next.js App Router** (Frontend)
   - Server Components first
   - File-based routing
   - API routes for backend

**Result:** A highly maintainable, scalable, and testable e-commerce platform with clear separation of concerns and business logic at the center.

---

**This is an enterprise-grade architecture suitable for production use!** ✅
