# 🚀 Quick Start Guide - Week 1 Implementation

## ⚡ Getting Started (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
cd packages/database
npx prisma generate
cd ../..
```

### 3. Start Database
```bash
docker-compose up -d
```

### 4. Push Database Schema
```bash
cd packages/database
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```

Your API is now running at: **http://localhost:3000**

---

## 🧪 Test the API

### Create a Test Seller (Manual - via Prisma Studio)
```bash
cd packages/database
npx prisma studio
```

Then create a Seller record:
- **id:** `550e8400-e29b-41d4-a716-446655440000`
- **userId:** (any UUID)
- **businessName:** `Test Nursery`
- **verified:** ` true`
- **rating:** `4.5`

Also create a Species record:
- **id:** `6ba7b810-9dad-11d1-80b4-00c04fd430c8`
- **scientificName:** `Quercus robur`
- **commonName:** `English Oak`
- **family:** `Fagaceae`

### Create a Listing (via API)
```bash
curl -X POST http://localhost:3000/api/v1/listings \
  -H "Content-Type: application/json" \
  -d '{
    "sellerId": "550e8400-e29b-41d4-a716-446655440000",
    "speciesId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "title": "Beautiful Oak Tree",
    "description": "A magnificent oak tree that has been carefully grown for 5 years. Perfect for landscaping projects and provides excellent shade.",
    "basePrice": 299.99,
    "inventory": 10
  }'
```

### Search Listings
```bash
curl "http://localhost:3000/api/v1/listings"
```

---

## 🧪 Run Tests
```bash
npm test
```

---

## 📁 Project Structure

```
tree/
├── apps/
│   └── web/
│       └── app/
│           └── api/
│               └── v1/
│                   └── listings/          # API routes
│                       ├── route.ts        # POST, GET
│                       └── [id]/
│                           ├── route.ts    # GET, PUT, DELETE
│                           └── publish/
│                               └── route.ts # POST
│
└── packages/
    └── core/
        └── src/
            └── marketplace/
                ├── domain/                 # Business logic
                │   ├── aggregates/
                │   │   └── Listing.ts     # Aggregate root
                │   ├── entities/
                │   │   └── Seller.ts
                │   ├── value-objects/
                │   │   ├── Money.ts
                │   │   └── SKU.ts
                │   └── repositories/       # Interfaces
                │
                ├── infrastructure/         # Prisma implementation
                │   └── repositories/
                │
                └── application/            # Use cases
                    ├── use-cases/
                    └── dtos/
```

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/listings` | Create a new listing |
| GET | `/api/v1/listings` | Search listings (with filters) |
| GET | `/api/v1/listings/:id` | Get single listing |
| PUT | `/api/v1/listings/:id` | Update listing |
| DELETE | `/api/v1/listings/:id` | Delete listing |
| POST | `/api/v1/listings/:id/publish` | Publish listing |

---

## 🐛 Troubleshooting

### "Cannot find module '@repo/core'"
```bash
# Build the core package
cd packages/core
npm run build
```

### "Prisma Client not generated"
```bash
cd packages/database
npx prisma generate
```

### "Database connection error"
```bash
# Check if Docker is running
docker ps

# Restart Docker containers
docker-compose down
docker-compose up -d
```

### "Port 3000 already in use"
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

---

## 📖 Next Steps

Continue with **Week 2** implementation:
1. Authentication (JWT)
2. Authorization (RBAC)
3. Seller management APIs
4. Integration tests
5. Error logging

---

**Happy coding! 🎉**
