/**
 * Login User Use Case
 * 
 * Handles user authentication with email/password.
 * Verifies credentials and returns authentication tokens.
 */

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Email } from '../../domain/value-objects/Email';
import { Password } from '../../domain/value-objects/Password';
import { TokenService } from '../../domain/services/TokenService';
import { LoginUserDTO, AuthResponseDTO } from '../dtos/AuthDTO';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: TokenService
  ) {}

  async execute(dto: LoginUserDTO): Promise<AuthResponseDTO> {
    // 1. Validate and create email value object
    const email = Email.create(dto.email);

    // 2. Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // 3. Verify password
    const userProps = user.getProps();
    const password = Password.fromHash(userProps.passwordHash);
    const isValidPassword = await password.compare(dto.password);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // 4. Generate authentication tokens
    const tokens = this.tokenService.generateTokenPair(
      user.id,
      user.email.getValue(),
      user.role
    );

    // 5. Return response
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
