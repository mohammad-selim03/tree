/**
 * Identity Module Exports
 * 
 * Exports all identity/authentication related components.
 */

// Domain - Entities
export { User, UserRole, type UserProps } from './domain/entities/User';

// Domain - Value Objects
export { Email } from './domain/value-objects/Email';
export { Password } from './domain/value-objects/Password';
export { AccessToken, type AccessTokenPayload } from './domain/value-objects/AccessToken';
export { RefreshToken, type RefreshTokenPayload } from './domain/value-objects/RefreshToken';

// Domain - Services
export { TokenService, type TokenPair } from './domain/services/TokenService';

// Domain - Repositories
export { type IUserRepository } from './domain/repositories/IUserRepository';

// Infrastructure - Repositories
export { PrismaUserRepository } from './infrastructure/repositories/PrismaUserRepository';

// Application - DTOs
export {
  type RegisterUserDTO,
  type LoginUserDTO,
  type RefreshTokenDTO,
  type AuthResponseDTO,
  type UserResponseDTO,
  type TokensDTO,
} from './application/dtos/AuthDTO';

// Application - Use Cases
export { RegisterUserUseCase } from './application/use-cases/RegisterUserUseCase';
export { LoginUserUseCase } from './application/use-cases/LoginUserUseCase';
export { RefreshTokenUseCase } from './application/use-cases/RefreshTokenUseCase';
export { GetUserProfileUseCase } from './application/use-cases/GetUserProfileUseCase';
