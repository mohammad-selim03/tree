/**
 * Prisma User Repository Implementation
 * 
 * Implements IUserRepository using Prisma ORM.
 */

import { PrismaClient } from '@repo/database';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, UserRole } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/Email';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) { }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { email: email.getValue(), deletedAt: null },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async save(user: User): Promise<void> {
    const data = this.toPersistence(user);

    await this.prisma.user.upsert({
      where: { id: user.id },
      create: data,
      update: {
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        profile: data.profile,
        updatedAt: data.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: {
        email: email.getValue(),
        deletedAt: null,
      },
    });

    return count > 0;
  }

  async findByRole(role: string): Promise<User[]> {
    const data = await this.prisma.user.findMany({
      where: {
        role: role as any, // Prisma enum type handling
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  async count(): Promise<number> {
    return this.prisma.user.count({
      where: { deletedAt: null },
    });
  }

  /**
   * Convert Prisma model to Domain entity
   */
  private toDomain(data: any): User {
    return User.reconstitute({
      id: data.id,
      email: Email.create(data.email),
      passwordHash: data.passwordHash,
      role: data.role as UserRole,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  /**
   * Convert Domain entity to Prisma model data
   */
  private toPersistence(user: User): any {
    const props = user.getProps();

    return {
      id: user.id,
      email: user.email.getValue(),
      passwordHash: props.passwordHash,
      role: user.role,
      profile: null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
