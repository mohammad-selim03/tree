/**
 * Get User Profile Use Case
 * 
 * Retrieves authenticated user's profile information.
 */

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserResponseDTO } from '../dtos/AuthDTO';

export class GetUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserResponseDTO> {
    // 1. Find user by ID
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // 2. Return user profile
    return {
      id: user.id,
      email: user.email.getValue(),
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
