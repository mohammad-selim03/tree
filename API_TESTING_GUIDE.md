# 🧪 TreeVerse API Testing - Quick Reference

## Server is Running ✅

Your error `GET /api/v1/auth/login 405` confirms the server IS running correctly!

**405 = Method Not Allowed** means the endpoint exists but you used the wrong HTTP method.

---

## ✅ Correct API Usage

### Authentication Endpoints

#### 1. Register (POST)
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "John",
    "lastName": "Doe",
    "role": "SELLER"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "test@example.com",
      "role": "SELLER"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

---

#### 2. Login (POST) ❌ NOT GET!
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

**❌ WRONG:** `GET /api/v1/auth/login` → 405 Error
**✅ CORRECT:** `POST /api/v1/auth/login` → Success

---

#### 3. Get Profile (GET with Authorization)
```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "test@example.com",
    "firstName": "John",
    "role": "SELLER"
  }
}
```

---

### Listing Endpoints

#### 4. Get All Listings (GET - Public)
```bash
curl "http://localhost:3000/api/v1/listings?page=1&limit=10"
```

---

#### 5. Create Listing (POST with Authorization)
```bash
curl -X POST http://localhost:3000/api/v1/listings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Japanese Maple",
    "speciesName": "Japanese Maple",
    "scientificName": "Acer palmatum",
    "description": "Beautiful ornamental tree with vibrant foliage",
    "price": 149.99,
    "inventory": 10,
    "height": 120,
    "diameter": 3.5,
    "age": 5,
    "category": "ORNAMENTAL"
  }'
```

---

## 🚀 Run Automated Tests

### Option 1: Quick Test (Recommended)
```bash
cd apps/web
npx tsx test-quick.ts
```

This will test:
- ✅ Health check
- ✅ User registration
- ✅ Get profile
- ✅ Get listings
- ✅ Create listing
- ✅ HTTP method validation

---

### Option 2: Comprehensive Test
```bash
cd apps/web
npx tsx test-api-comprehensive.ts
```

This runs 11 tests covering all endpoints.

---

## 🌐 Browser Testing

### Via Browser (for pages, not API):

1. **Homepage:** http://localhost:3000
2. **Login Page:** http://localhost:3000/auth/login
3. **Register Page:** http://localhost:3000/auth/register
4. **Seller Dashboard:** http://localhost:3000/seller/dashboard
5. **Product Catalog:** http://localhost:3000/trees

**Note:** These are web pages, not API endpoints. They serve HTML, not JSON.

---

## 🔍 Understanding HTTP Methods

| Method | Use Case | Example Endpoint |
|--------|----------|-----------------|
| **GET** | Retrieve data | `/api/v1/listings`, `/api/v1/auth/me` |
| **POST** | Create new data | `/api/v1/auth/login`, `/api/v1/listings` |
| **PUT** | Update entire resource | `/api/v1/listings/:id` |
| **PATCH** | Update partial resource | `/api/v1/listings/:id` |
| **DELETE** | Remove resource | `/api/v1/listings/:id` |

---

## ❌ Common Errors Explained

### 405 Method Not Allowed
**Error:** `GET /api/v1/auth/login 405`  
**Cause:** Using GET instead of POST  
**Fix:** Use `POST /api/v1/auth/login`

### 401 Unauthorized
**Error:** `GET /api/v1/auth/me 401`  
**Cause:** No auth token or invalid token  
**Fix:** Include `Authorization: Bearer <token>` header

### 400 Bad Request
**Error:** `POST /api/v1/auth/login 400`  
**Cause:** Invalid request body (validation error)  
**Fix:** Check required fields and formats

### 404 Not Found
**Error:** `GET /api/v1/auth/logins 404`  
**Cause:** Typo in URL (logins vs login)  
**Fix:** Use correct endpoint path

---

## 🧪 Testing Workflow

### Step 1: Start Server
```bash
cd c:\Users\selim\Projects\personal\tree
pnpm dev
```

### Step 2: Verify Health
```bash
curl http://localhost:3000/api/health
```

### Step 3: Run Test Script
```bash
cd apps\web
npx tsx test-quick.ts
```

### Step 4: Test in Browser
1. Open http://localhost:3000
2. Click "Login" or "Register"
3. Fill form and submit
4. Check DevTools Network tab

---

## 📊 All API Endpoints

### Public (No Auth)
- `GET /api/health` - Health check
- `GET /api/v1/listings` - Get all listings
- `GET /api/v1/listings/:id` - Get listing by ID
- `POST /api/v1/care-plans/generate` - Generate care plan

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Seller (Requires SELLER or ADMIN role)
- `POST /api/v1/listings` - Create listing
- `PUT /api/v1/listings/:id` - Update listing
- `DELETE /api/v1/listings/:id` - Delete listing
- `GET /api/v1/analytics` - Get seller analytics

### Admin (Requires ADMIN role)
- `GET /api/v1/admin/verifications` - Get all verifications
- `PATCH /api/v1/admin/verifications/:id` - Update verification

### Payments (Requires auth)
- `POST /api/v1/payments/create-intent` - Create payment intent
- `POST /api/v1/payments/webhook` - Stripe webhook (no auth)

---

## ✅ Your Next Steps

1. **Run the quick test:**
   ```bash
   cd apps\web
   npx tsx test-quick.ts
   ```

2. **Test in browser:**
   - Open http://localhost:3000
   - Register a new account
   - Login
   - Create a listing

3. **Check the manual testing guide:**
   - See `MANUAL_TESTING_GUIDE.md` for detailed browser testing

4. **Monitor the server:**
   - Watch Terminal for logs
   - Check for any errors

---

**Your server is working correctly! The 405 error was expected for GET on a POST endpoint. ✅**
