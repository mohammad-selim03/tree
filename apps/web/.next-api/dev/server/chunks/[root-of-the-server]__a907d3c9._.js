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
"[project]/packages/core/src/identity/domain/value-objects/Email.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Email",
    ()=>Email
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
class Email {
    value;
    constructor(value){
        this.value = value;
    }
    static create(email) {
        const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email();
        const result = schema.safeParse(email);
        if (!result.success) {
            throw new Error('Invalid email format');
        }
        return new Email(email);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/packages/core/src/identity/domain/value-objects/Password.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Password Value Object
 * 
 * Encapsulates password validation and hashing logic.
 * Ensures passwords meet security requirements.
 */ __turbopack_context__.s([
    "Password",
    ()=>Password
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@2.4.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
class Password {
    hashedValue;
    static SALT_ROUNDS = 12;
    static MIN_LENGTH = 8;
    constructor(hashedValue){
        this.hashedValue = hashedValue;
    }
    /**
   * Create a Password from plaintext (for registration/password change)
   */ static async create(plaintext) {
        Password.validate(plaintext);
        const hashed = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(plaintext, Password.SALT_ROUNDS);
        return new Password(hashed);
    }
    /**
   * Reconstitute a Password from a hash (from database)
   */ static fromHash(hash) {
        if (!hash || hash.length === 0) {
            throw new Error('Password hash cannot be empty');
        }
        return new Password(hash);
    }
    /**
   * Validate plaintext password meets requirements
   */ static validate(plaintext) {
        if (!plaintext || plaintext.length === 0) {
            throw new Error('Password cannot be empty');
        }
        if (plaintext.length < Password.MIN_LENGTH) {
            throw new Error(`Password must be at least ${Password.MIN_LENGTH} characters`);
        }
        if (plaintext.length > 128) {
            throw new Error('Password cannot exceed 128 characters');
        }
        // Must contain at least one uppercase letter
        if (!/[A-Z]/.test(plaintext)) {
            throw new Error('Password must contain at least one uppercase letter');
        }
        // Must contain at least one lowercase letter
        if (!/[a-z]/.test(plaintext)) {
            throw new Error('Password must contain at least one lowercase letter');
        }
        // Must contain at least one number
        if (!/[0-9]/.test(plaintext)) {
            throw new Error('Password must contain at least one number');
        }
        // Check for common weak passwords
        const weakPasswords = [
            'Password123',
            'Admin123',
            'Welcome123'
        ];
        if (weakPasswords.includes(plaintext)) {
            throw new Error('Password is too common, please choose a stronger password');
        }
    }
    /**
   * Compare plaintext password with hashed password
   */ async compare(plaintext) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$2$2e$4$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(plaintext, this.hashedValue);
    }
    /**
   * Get the hashed value (for persistence)
   */ getHashedValue() {
        return this.hashedValue;
    }
}
}),
"[project]/packages/core/src/identity/application/use-cases/LoginUserUseCase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Login User Use Case
 * 
 * Handles user authentication with email/password.
 * Verifies credentials and returns authentication tokens.
 */ __turbopack_context__.s([
    "LoginUserUseCase",
    ()=>LoginUserUseCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$Email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/Email.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$Password$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/Password.ts [app-route] (ecmascript)");
;
;
class LoginUserUseCase {
    userRepository;
    tokenService;
    constructor(userRepository, tokenService){
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async execute(dto) {
        // 1. Validate and create email value object
        const email = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$Email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Email"].create(dto.email);
        // 2. Find user by email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // 3. Verify password
        const userProps = user.getProps();
        const password = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$Password$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Password"].fromHash(userProps.passwordHash);
        const isValidPassword = await password.compare(dto.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }
        // 4. Generate authentication tokens
        const tokens = this.tokenService.generateTokenPair(user.id, user.email.getValue(), user.role);
        // 5. Return response
        return {
            user: {
                id: user.id,
                email: user.email.getValue(),
                role: user.role,
                createdAt: user.createdAt.toISOString()
            },
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                expiresIn: 900
            }
        };
    }
}
}),
"[project]/packages/core/src/identity/domain/entities/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>User,
    "UserRole",
    ()=>UserRole
]);
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["BUYER"] = "BUYER";
    UserRole["SELLER"] = "SELLER";
    UserRole["ADMIN"] = "ADMIN";
    return UserRole;
}({});
class User {
    props;
    constructor(props){
        this.props = props;
    }
    static create(props) {
        return new User(props);
    }
    /**
     * Reconstitute a User from persistence (database)
     */ static reconstitute(props) {
        return new User(props);
    }
    get id() {
        return this.props.id;
    }
    get email() {
        return this.props.email;
    }
    get role() {
        return this.props.role;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    isAdmin() {
        return this.props.role === "ADMIN";
    }
    isSeller() {
        return this.props.role === "SELLER";
    }
    isBuyer() {
        return this.props.role === "BUYER";
    }
    /**
     * Allow accessing props for persistence (used by repositories)
     */ getProps() {
        return {
            ...this.props
        };
    }
}
}),
"[project]/packages/core/src/identity/infrastructure/repositories/PrismaUserRepository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prisma User Repository Implementation
 * 
 * Implements IUserRepository using Prisma ORM.
 */ __turbopack_context__.s([
    "PrismaUserRepository",
    ()=>PrismaUserRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$entities$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/entities/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$Email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/value-objects/Email.ts [app-route] (ecmascript)");
;
;
class PrismaUserRepository {
    prisma;
    constructor(prisma){
        this.prisma = prisma;
    }
    async findById(id) {
        const data = await this.prisma.user.findUnique({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async findByEmail(email) {
        const data = await this.prisma.user.findUnique({
            where: {
                email: email.getValue(),
                deletedAt: null
            }
        });
        if (!data) return null;
        return this.toDomain(data);
    }
    async save(user) {
        const data = this.toPersistence(user);
        await this.prisma.user.upsert({
            where: {
                id: user.id
            },
            create: data,
            update: {
                email: data.email,
                passwordHash: data.passwordHash,
                role: data.role,
                profile: data.profile,
                updatedAt: data.updatedAt
            }
        });
    }
    async delete(id) {
        await this.prisma.user.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async existsByEmail(email) {
        const count = await this.prisma.user.count({
            where: {
                email: email.getValue(),
                deletedAt: null
            }
        });
        return count > 0;
    }
    async findByRole(role) {
        const data = await this.prisma.user.findMany({
            where: {
                role: role,
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data.map((d)=>this.toDomain(d));
    }
    async count() {
        return this.prisma.user.count({
            where: {
                deletedAt: null
            }
        });
    }
    /**
   * Convert Prisma model to Domain entity
   */ toDomain(data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$entities$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].reconstitute({
            id: data.id,
            email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$value$2d$objects$2f$Email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Email"].create(data.email),
            passwordHash: data.passwordHash,
            role: data.role,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }
    /**
   * Convert Domain entity to Prisma model data
   */ toPersistence(user) {
        const props = user.getProps();
        return {
            id: user.id,
            email: user.email.getValue(),
            passwordHash: props.passwordHash,
            role: user.role,
            profile: null,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}
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
"[project]/apps/web/app/api/v1/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Login API Route
 * 
 * POST /api/v1/auth/login
 */ __turbopack_context__.s([
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/database/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$application$2f$use$2d$cases$2f$LoginUserUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/application/use-cases/LoginUserUseCase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$infrastructure$2f$repositories$2f$PrismaUserRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/infrastructure/repositories/PrismaUserRepository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$services$2f$TokenService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/identity/domain/services/TokenService.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const LoginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('Invalid email format'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Password is required')
});
async function OPTIONS() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200
    });
}
async function POST(request) {
    try {
        // 1. Parse and validate request body
        const body = await request.json();
        const validatedData = LoginSchema.parse(body);
        // 2. Initialize dependencies
        const userRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$infrastructure$2f$repositories$2f$PrismaUserRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaUserRepository"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]);
        const tokenService = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$domain$2f$services$2f$TokenService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TokenService"]();
        const useCase = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$identity$2f$application$2f$use$2d$cases$2f$LoginUserUseCase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoginUserUseCase"](userRepository, tokenService);
        // 3. Execute use case
        const result = await useCase.execute(validatedData);
        // 4. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result,
            message: 'Login successful'
        }, {
            status: 200
        });
    } catch (error) {
        // Handle validation errors
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Validation failed',
                details: error.errors
            }, {
                status: 400
            });
        }
        // Handle business logic errors
        if (error instanceof Error) {
            // Don't reveal whether email or password was wrong (security)
            if (error.message.includes('Invalid email or password')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid email or password'
                }, {
                    status: 401
                } // Unauthorized
                );
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 400
            });
        }
        // Unknown error
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a907d3c9._.js.map