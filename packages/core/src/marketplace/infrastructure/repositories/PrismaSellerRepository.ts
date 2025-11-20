/**
 * Prisma Seller Repository Implementation
 * 
 * Implements ISellerRepository using Prisma ORM.
 */

import { PrismaClient } from '@repo/database';
import { ISellerRepository } from '../../domain/repositories/ISellerRepository';
import { Seller } from '../../domain/entities/Seller';

export class PrismaSellerRepository implements ISellerRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Seller | null> {
    const data = await this.prisma.seller.findUnique({
      where: { id, deletedAt: null },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByUserId(userId: string): Promise<Seller | null> {
    const data = await this.prisma.seller.findUnique({
      where: { userId, deletedAt: null },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByStripeAccountId(stripeAccountId: string): Promise<Seller | null> {
    const data = await this.prisma.seller.findFirst({
      where: { 
        stripeAccountId,
        deletedAt: null,
      },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findVerified(): Promise<Seller[]> {
    const data = await this.prisma.seller.findMany({
      where: { 
        verified: true,
        deletedAt: null,
      },
      orderBy: { rating: 'desc' },
    });

    return data.map(d => this.toDomain(d));
  }

  async findByMinimumRating(rating: number): Promise<Seller[]> {
    const data = await this.prisma.seller.findMany({
      where: { 
        rating: { gte: rating },
        deletedAt: null,
      },
      orderBy: { rating: 'desc' },
    });

    return data.map(d => this.toDomain(d));
  }

  async save(seller: Seller): Promise<void> {
    const data = this.toPersistence(seller);

    await this.prisma.seller.upsert({
      where: { id: seller.id },
      create: data,
      update: {
        businessName: data.businessName,
        verified: data.verified,
        rating: data.rating,
        storefront: data.storefront,
        stripeAccountId: data.stripeAccountId,
        updatedAt: data.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.seller.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async count(): Promise<number> {
    return this.prisma.seller.count({
      where: { deletedAt: null },
    });
  }

  /**
   * Convert Prisma model to Domain entity
   */
  private toDomain(data: any): Seller {
    return Seller.reconstitute({
      id: data.id,
      userId: data.userId,
      businessName: data.businessName,
      verified: data.verified,
      rating: data.rating,
      storefront: data.storefront as object | undefined,
      stripeAccountId: data.stripeAccountId ?? undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  /**
   * Convert Domain entity to Prisma model data
   */
  private toPersistence(seller: Seller): any {
    return {
      id: seller.id,
      userId: seller.userId,
      businessName: seller.businessName,
      verified: seller.verified,
      rating: seller.rating,
      storefront: seller.storefront ?? null,
      stripeAccountId: seller.stripeAccountId ?? null,
      createdAt: seller.createdAt,
      updatedAt: seller.updatedAt,
    };
  }
}
