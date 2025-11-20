/**
 * Authentication DTOs
 * 
 * Data transfer objects for authentication operations.
 */

// Request DTOs

export interface RegisterUserDTO {
  email: string;
  password: string;
  name?: string;
  role?: 'BUYER' | 'SELLER';
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

// Response DTOs

export interface AuthResponseDTO {
  user: UserResponseDTO;
  tokens: TokensDTO;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface TokensDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}
