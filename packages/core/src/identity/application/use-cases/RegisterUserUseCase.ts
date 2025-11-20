/**
 * Register User Use Case
 * 
 * Handles user registration with email/password.
 * Creates new user account and returns authentication tokens.
 */

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, UserRole } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/Email';
import { Password } from '../../domain/value-objects/Password';
import { TokenService } from '../../domain/services/TokenService';
import { RegisterUserDTO, AuthResponseDTO } from '../dtos/AuthDTO';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: TokenService
  ) {}

  async execute(dto: RegisterUserDTO): Promise<AuthResponseDTO> {
    // 1. Validate and create email value object
    const email = Email.create(dto.email);

    // 2. Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // 3. Hash password
    const password = await Password.create(dto.password);

    // 4. Determine user role (default to BUYER)
    const role = dto.role ? (dto.role as UserRole) : UserRole.BUYER;

    // 5. Create user entity
    const user = User.create({
      id: crypto.randomUUID(),
      email,
      passwordHash: password.getHashedValue(),
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 6. Save user to database
    await this.userRepository.save(user);

    // 7. Generate authentication tokens
    const tokens = this.tokenService.generateTokenPair(
      user.id,
      user.email.getValue(),
      user.role
    );

    // 8. Return response
    return {
      user: {
        id: user.id,
        email: user.email.getValue(),
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900, // 15 minutes in seconds
      },
    };
  }
}
