# Week 2 Implementation Plan - Authentication & Authorization

**Start Date:** November 20, 2025  
**Duration:** 7 days  
**Goal:** Secure API with JWT authentication and role-based access control

---

## 📋 Week 2 Objectives

1. ✅ **Authentication System**
   - JWT-based authentication
   - Register/Login/Logout endpoints
   - Password hashing (bcrypt)
   - Refresh token mechanism

2. ✅ **Authorization System**
   - Role-Based Access Control (RBAC)
   - Middleware for route protection
   - Permission checks

3. ✅ **User Management**
   - Create user use cases
   - User profile management
   - Email verification (optional)

4. ✅ **Security Hardening**
   - Rate limiting
   - CORS configuration
   - Security headers

---

## 🗓️ Day-by-Day Breakdown

### **Day 1-2: Authentication Domain** (Nov 20-21)

#### Value Objects
- [ ] `Password` value object (hashing, validation)
- [ ] `RefreshToken` value object
- [ ] `AccessToken` value object

#### Entities
- [ ] Update `User` entity (already exists in identity context)
- [ ] Add authentication methods

#### Services
- [ ] `PasswordHashService` (bcrypt)
- [ ] `TokenService` (JWT generation/verification)

**Files to Create:** ~6 files

---

### **Day 3-4: Authentication Use Cases** (Nov 22-23)

#### Use Cases
- [ ] `RegisterUserUseCase`
- [ ] `LoginUserUseCase`
- [ ] `LogoutUserUseCase`
- [ ] `RefreshTokenUseCase`
- [ ] `GetUserProfileUseCase`

#### DTOs
- [ ] `RegisterUserDTO`
- [ ] `LoginUserDTO`
- [ ] `AuthResponseDTO`
- [ ] `UserProfileDTO`

**Files to Create:** ~10 files

---

### **Day 5: Authentication API Routes** (Nov 24)

#### API Endpoints
- [ ] `POST /api/v1/auth/register`
- [ ] `POST /api/v1/auth/login`
- [ ] `POST /api/v1/auth/logout`
- [ ] `POST /api/v1/auth/refresh`
- [ ] `GET /api/v1/auth/me`

#### Middleware
- [ ] `authMiddleware` - Verify JWT
- [ ] `roleMiddleware` - Check user roles

**Files to Create:** ~5 files

---

### **Day 6: Authorization & Security** (Nov 25)

#### Authorization
- [ ] Role-based middleware
- [ ] Permission system
- [ ] Secure existing listing endpoints

#### Security
- [ ] Rate limiting middleware
- [ ] CORS configuration
- [ ] Security headers (Helmet.js alternative)

**Files to Create:** ~4 files

---

### **Day 7: Testing & Integration** (Nov 26)

#### Tests
- [ ] Authentication use case tests
- [ ] Password hashing tests
- [ ] JWT service tests
- [ ] Auth middleware tests
- [ ] Integration tests for auth endpoints

**Files to Create:** ~6 files

---

## 📁 File Structure

```
packages/core/src/
├── identity/                      # Already exists
│   ├── domain/
│   │   ├── entities/
│   │   │   └── User.ts           # Update with auth methods
│   │   ├── value-objects/
│   │   │   ├── Email.ts          # Already exists
│   │   │   ├── Password.ts       # NEW
│   │   │   ├── AccessToken.ts    # NEW
│   │   │   └── RefreshToken.ts   # NEW
│   │   ├── services/
│   │   │   ├── PasswordHashService.ts  # NEW
│   │   │   └── TokenService.ts         # NEW
│   │   └── repositories/
│   │       └── IUserRepository.ts      # NEW
│   │
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── RegisterUserUseCase.ts  # NEW
│   │   │   ├── LoginUserUseCase.ts     # NEW
│   │   │   ├── LogoutUserUseCase.ts    # NEW
│   │   │   └── RefreshTokenUseCase.ts  # NEW
│   │   └── dtos/
│   │       ├── RegisterUserDTO.ts      # NEW
│   │       ├── LoginUserDTO.ts         # NEW
│   │       └── AuthResponseDTO.ts      # NEW
│   │
│   └── infrastructure/
│       └── repositories/
│           └── PrismaUserRepository.ts # NEW

apps/web/
├── app/api/v1/auth/
│   ├── register/route.ts          # NEW
│   ├── login/route.ts             # NEW
│   ├── logout/route.ts            # NEW
│   ├── refresh/route.ts           # NEW
│   └── me/route.ts                # NEW
│
└── lib/
    ├── middleware/
    │   ├── auth.ts                # NEW - JWT verification
    │   ├── roles.ts               # NEW - RBAC
    │   └── rateLimiter.ts         # NEW
    └── utils/
        └── apiResponse.ts         # NEW - Standardized responses
```

---

## 🔐 Authentication Flow

### **Registration Flow**
```
1. User submits: email, password, name
2. Validate email format (Email value object)
3. Hash password (PasswordHashService)
4. Create User entity
5. Save to database (Prisma)
6. Generate JWT tokens (AccessToken + RefreshToken)
7. Return tokens + user profile
```

### **Login Flow**
```
1. User submits: email, password
2. Find user by email
3. Verify password (PasswordHashService)
4. Generate JWT tokens
5. Store refresh token in database
6. Return tokens + user profile
```

### **Protected Route Flow**
```
1. Extract JWT from Authorization header
2. Verify JWT signature (TokenService)
3. Check token expiration
4. Extract user ID from payload
5. Attach user to request context
6. Proceed to route handler
```

---

## 🛡️ Security Measures

### **Password Security**
- ✅ bcrypt hashing (cost factor 12)
- ✅ Minimum 8 characters
- ✅ At least one uppercase, lowercase, number

### **JWT Security**
- ✅ RS256 algorithm (asymmetric)
- ✅ Short-lived access tokens (15 minutes)
- ✅ Long-lived refresh tokens (7 days)
- ✅ Token rotation on refresh

### **API Security**
- ✅ Rate limiting (100 requests/15 minutes per IP)
- ✅ CORS whitelist
- ✅ Security headers
- ✅ Input validation (Zod)

---

## 📊 Success Criteria

By end of Week 2, you should be able to:

```bash
# 1. Register a new user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "password": "SecurePass123!",
    "name": "John Doe",
    "role": "SELLER"
  }'

# 2. Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "password": "SecurePass123!"
  }'

# 3. Access protected endpoint
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# 4. Create listing (now requires auth)
curl -X POST http://localhost:3000/api/v1/listings \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## 🧪 Testing Plan

### **Unit Tests**
- [ ] Password value object validation
- [ ] Password hashing service
- [ ] Token generation/verification
- [ ] RegisterUserUseCase
- [ ] LoginUserUseCase

### **Integration Tests**
- [ ] Full registration flow
- [ ] Full login flow
- [ ] Protected route access
- [ ] Token refresh flow

### **Security Tests**
- [ ] Invalid credentials handling
- [ ] Expired token handling
- [ ] Rate limiting enforcement
- [ ] SQL injection protection
- [ ] XSS protection

---

## 📦 Dependencies to Add

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5"
  }
}
```

---

## 🎯 Week 2 Milestones

| Day | Milestone | Deliverable |
|-----|-----------|-------------|
| 1-2 | Auth domain complete | Password, Token value objects + services |
| 3-4 | Use cases complete | Register, Login, Logout use cases |
| 5 | API routes complete | All 5 auth endpoints working |
| 6 | Security complete | Rate limiting, RBAC, protected routes |
| 7 | Testing complete | 80%+ test coverage for auth module |

---

## 🚀 Let's Begin!

**Current Status:** Planning complete  
**Next Action:** Implement Password value object

Ready to start Week 2 implementation!
