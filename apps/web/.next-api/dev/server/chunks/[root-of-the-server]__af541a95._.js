module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/packages/database/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: [
        'query',
        'error',
        'warn'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/packages/core/src/identity/domain/value-objects/AccessToken.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AccessToken Value Object
 * 
 * Encapsulates JWT access token logic.
 * Short-lived token for API authentication (15 minutes).
 */ __turbopack_context__.s([
    "AccessToken",
    ()=>AccessToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
class AccessToken {
    token;
    static EXPIRY = '15m';
    static SECRET = process.env.JWT_ACCESS_SECRET || 'default-access-secret-change-in-production';
    constructor(token){
        this.token = token;
    }
    /**
   * Generate a new access token
   */ static generate(payload) {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, AccessToken.SECRET, {
            expiresIn: AccessToken.EXPIRY,
            issuer: 'treeverse-api',
            audience: 'treeverse-client'
        });
        return new AccessToken(token);
    }
    /**
   * Verify and decode an access token
   */ static verify(token) {
        try {
            const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, AccessToken.SECRET, {
                issuer: 'treeverse-api',
                audience: 'treeverse-client'
            });
            return decoded;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                throw new Error('Access token has expired');
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].JsonWebTokenError) {
                throw new Error('Invalid access token');
            }
            throw new Error('Access token verification failed');
        }
    }
    /**
   * Create from existing token string (for verification)
   */ static fromString(token) {
        // Verify the token is valid before creating the value object
        AccessToken.verify(token);
        return new AccessToken(token);
    }
    /**
   * Get the token string
   */ getValue() {
        return this.token;
    }
    /**
   * Check if token is expired
   */ isExpired() {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(this.token, AccessToken.SECRET);
            return false;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                return true;
            }
            return false;
        }
    }
}
}),
"[project]/packages/core/src/identity/domain/value-objects/RefreshToken.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * RefreshToken Value Object
 * 
 * Encapsulates JWT refresh token logic.
 * Long-lived token for obtaining new access tokens (7 days).
 */ __turbopack_context__.s([
    "RefreshToken",
    ()=>RefreshToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
class RefreshToken {
    token;
    static EXPIRY = '7d';
    static SECRET = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-change-in-production';
    constructor(token){
        this.token = token;
    }
    /**
   * Generate a new refresh token
   */ static generate(userId) {
        const tokenId = RefreshToken.generateTokenId();
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId,
            tokenId
        }, RefreshToken.SECRET, {
            expiresIn: RefreshToken.EXPIRY,
            issuer: 'treeverse-api',
            audience: 'treeverse-client'
        });
        return new RefreshToken(token);
    }
    /**
   * Verify and decode a refresh token
   */ static verify(token) {
        try {
            const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, RefreshToken.SECRET, {
                issuer: 'treeverse-api',
                audience: 'treeverse-client'
            });
            return decoded;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                throw new Error('Refresh token has expired');
            }
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].JsonWebTokenError) {
                throw new Error('Invalid refresh token');
            }
            throw new Error('Refresh token verification failed');
        }
    }
    /**
   * Create from existing token string (for verification)
   */ static fromString(token) {
        // Verify the token is valid before creating the value object
        RefreshToken.verify(token);
        return new RefreshToken(token);
    }
    /**
   * Generate a unique token ID for tracking/revocation
   */ static generateTokenId() {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString('hex');
    }
    /**
   * Get the token string
   */ getValue() {
        return this.token;
    }
    /**
   * Get the token ID from the token
   */ getTokenId() {
        const payload = RefreshToken.verify(this.token);
        return payload.tokenId;
    }
    /**
   * Get the user ID from the token
   */ getUserId() {
        const payload = RefreshToken.verify(this.token);
        return payload.userId;
    }
    /**
   * Check if token is expired
   */ isExpired() {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(this.token, RefreshToken.SECRET);
            return false;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].TokenExpiredError) {
                return true;
            }
            return false;
        }
    }
}
}),
"[project]/packages/core/src/identity/domain/services/TokenService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TokenService
 * 
 * Domain service for managing authentication tokens.
 * Handles token generation, verification, and refresh.
 */ __turbopack_context__.s([
    "TokenService",
    ()=>TokenService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$AccessToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/AccessToken.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/RefreshToken.ts [app-route] (ecmascript)");
;
;
class TokenService {
    /**
   * Generate a new token pair (access + refresh)
   */ generateTokenPair(userId, email, role) {
        const accessTokenPayload = {
            userId,
            email,
            role
        };
        const accessToken = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$AccessToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessToken"].generate(accessTokenPayload);
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshToken"].generate(userId);
        return {
            accessToken: accessToken.getValue(),
            refreshToken: refreshToken.getValue()
        };
    }
    /**
   * Verify an access token
   */ verifyAccessToken(token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$AccessToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessToken"].verify(token);
    }
    /**
   * Verify a refresh token
   */ verifyRefreshToken(token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshToken"].verify(token);
    }
    /**
   * Refresh tokens - generate new pair from valid refresh token
   */ refreshTokens(refreshTokenString, email, role) {
        // Verify the refresh token
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$RefreshToken$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshToken"].fromString(refreshTokenString);
        const userId = refreshToken.getUserId();
        // Generate new token pair
        return this.generateTokenPair(userId, email, role);
    }
    /**
   * Extract token from Authorization header
   */ extractTokenFromHeader(authHeader) {
        if (!authHeader) {
            return null;
        }
        // Expected format: "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }
        return parts[1];
    }
}
}),
"[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Authentication Middleware
 * 
 * Verifies JWT tokens and attaches user information to requests.
 */ __turbopack_context__.s([
    "authenticateRequest",
    ()=>authenticateRequest,
    "requireAdmin",
    ()=>requireAdmin,
    "requireAuthenticated",
    ()=>requireAuthenticated,
    "requireRole",
    ()=>requireRole,
    "requireSeller",
    ()=>requireSeller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$services$2f$TokenService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/services/TokenService.ts [app-route] (ecmascript)");
;
async function authenticateRequest(request) {
    const tokenService = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$services$2f$TokenService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TokenService"]();
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = tokenService.extractTokenFromHeader(authHeader);
    if (!token) {
        throw new Error('No authentication token provided');
    }
    // Verify token
    try {
        const payload = tokenService.verifyAccessToken(token);
        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
        throw new Error('Authentication failed');
    }
}
function requireRole(allowedRoles) {
    return async (request)=>{
        const user = await authenticateRequest(request);
        if (!allowedRoles.includes(user.role)) {
            throw new Error(`Forbidden: Requires one of the following roles: ${allowedRoles.join(', ')}`);
        }
        return user;
    };
}
const requireAdmin = requireRole([
    'ADMIN'
]);
const requireSeller = requireRole([
    'SELLER',
    'ADMIN'
]);
const requireAuthenticated = authenticateRequest;
}),
"[project]/apps/web/app/api/v1/listings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/database/src/index.ts [app-route] (ecmascript) <locals>");
(()=>{
    const e = new Error("Cannot find module '@repo/core/marketplace/application/use-cases/CreateListingUseCase.js'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@repo/core/marketplace/application/use-cases/SearchListingsUseCase.js'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@repo/core/marketplace/infrastructure/repositories/PrismaListingRepository.js'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@repo/core/marketplace/infrastructure/repositories/PrismaSellerRepository.js'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
// Validation Schemas
const CreateListingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    speciesId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid species ID format'),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10, 'Title must be at least 10 characters').max(200, 'Title cannot exceed 200 characters'),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(50, 'Description must be at least 50 characters'),
    basePrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive('Price must be positive'),
    inventory: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0, 'Inventory cannot be negative'),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({}).optional()
});
const SearchListingsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    speciesId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    sellerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'DRAFT',
        'ACTIVE',
        'SOLD_OUT',
        'FLAGGED',
        'ARCHIVED'
    ]).optional(),
    minPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional(),
    maxPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional(),
    searchTerm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(100).optional()
});
async function POST(request) {
    try {
        // 1. Authenticate and check role
        const authenticatedUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireSeller"])(request);
        // 2. Parse and validate request body
        const body = await request.json();
        const validatedData = CreateListingSchema.parse(body);
        // 3. Initialize repositories and use case
        const listingRepository = new PrismaListingRepository(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const sellerRepository = new PrismaSellerRepository(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const useCase = new CreateListingUseCase(listingRepository, sellerRepository);
        // 4. Execute use case with authenticated user's ID
        const result = await useCase.execute({
            ...validatedData,
            sellerId: authenticatedUser.userId
        });
        // 5. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result,
            message: 'Listing created successfully'
        }, {
            status: 201
        });
    } catch (error) {
        // Handle authentication errors
        if (error instanceof Error && error.message.includes('Authentication')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 401
            });
        }
        return handleError(error);
    }
}
async function GET(request) {
    try {
        // 1. Parse query parameters
        const searchParams = request.nextUrl.searchParams;
        const queryData = {
            speciesId: searchParams.get('speciesId') || undefined,
            sellerId: searchParams.get('sellerId') || undefined,
            status: searchParams.get('status')?.toUpperCase() || undefined,
            minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : undefined,
            maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : undefined,
            searchTerm: searchParams.get('searchTerm') || undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined,
            pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : undefined
        };
        // 2. Validate query parameters
        const validatedData = SearchListingsSchema.parse(queryData);
        // 3. Initialize repository and use case
        const listingRepository = new PrismaListingRepository(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const useCase = new SearchListingsUseCase(listingRepository);
        // 4. Execute use case
        const result = await useCase.execute(validatedData);
        // 5. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(error);
    }
}
/**
 * Centralized error handler
 */ function handleError(error) {
    // Validation errors (Zod)
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Validation failed',
            details: error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message
                }))
        }, {
            status: 400
        });
    }
    // Business logic errors
    if (error instanceof Error) {
        // Check for specific error messages
        if (error.message.includes('not found')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 404
            });
        }
        if (error.message.includes('Only verified sellers')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 403
            });
        }
        // Generic business error
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 400
        });
    }
    // Unknown error
    console.error('Unexpected error:', error);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: 'Internal server error'
    }, {
        status: 500
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__af541a95._.js.map