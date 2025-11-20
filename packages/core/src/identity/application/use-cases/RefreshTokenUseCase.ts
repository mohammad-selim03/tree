/**
 * Refresh Token Use Case
 * 
 * Handles token refresh logic.
 * Validates refresh token and issues new access/refresh token pair.
 */

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { TokenService } from '../../domain/services/TokenService';
import { RefreshTokenDTO, AuthResponseDTO } from '../dtos/AuthDTO';

export class RefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: TokenService
  ) {}

  async execute(dto: RefreshTokenDTO): Promise<AuthResponseDTO> {
    // 1. Verify refresh token
    const payload = this.tokenService.verifyRefreshToken(dto.refreshToken);

    // 2. Find user
    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 3. Generate new token pair
    const tokens = this.tokenService.refreshTokens(
      dto.refreshToken,
      user.email.getValue(),
      user.role
    );

    // 4. Return response
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
