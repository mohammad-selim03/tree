/**
 * Prisma Listing Repository Implementation
 * 
 * Implements IListingRepository using Prisma ORM.
 * Handles mapping between domain entities and database models.
 */

import { PrismaClient } from '@repo/database';
import { IListingRepository, ListingSearchFilters, ListingSearchResult } from '../../domain/repositories/IListingRepository';
import { Listing, ListingStatus } from '../../domain/aggregates/Listing';
import { Money } from '../../domain/value-objects/Money';

export class PrismaListingRepository implements IListingRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Listing | null> {
    const data = await this.prisma.listing.findUnique({
      where: { id, deletedAt: null },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByIds(ids: string[]): Promise<Listing[]> {
    const data = await this.prisma.listing.findMany({
      where: { 
        id: { in: ids },
        deletedAt: null,
      },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  async findBySellerId(sellerId: string): Promise<Listing[]> {
    const data = await this.prisma.listing.findMany({
      where: { 
        sellerId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  async findBySpeciesId(speciesId: string): Promise<Listing[]> {
    const data = await this.prisma.listing.findMany({
      where: { 
        speciesId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  async search(filters: ListingSearchFilters): Promise<ListingSearchResult> {
    const where: any = { deletedAt: null };

    if (filters.speciesId) {
      where.speciesId = filters.speciesId;
    }

    if (filters.sellerId) {
      where.sellerId = filters.sellerId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.basePrice = {};
      if (filters.minPrice !== undefined) {
        where.basePrice.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.basePrice.lte = filters.maxPrice;
      }
    }

    if (filters.searchTerm) {
      where.OR = [
        { title: { contains: filters.searchTerm, mode: 'insensitive' } },
        { description: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }

    const limit = filters.limit ?? 20;
    const offset = filters.offset ?? 0;

    const [data, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { 
          publishedAt: { sort: 'desc', nulls: 'last' },
        },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      listings: data.map((d: any) => this.toDomain(d)),
      total,
      limit,
      offset,
    };
  }

  async save(listing: Listing): Promise<void> {
    const data = this.toPersistence(listing);

    await this.prisma.listing.upsert({
      where: { id: listing.id },
      create: data,
      update: {
        title: data.title,
        description: data.description,
        basePrice: data.basePrice,
        inventory: data.inventory,
        status: data.status,
        viewCount: data.viewCount,
        metadata: data.metadata,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
      },
    });

    // In a real implementation, you would also persist domain events here
    // For now, we'll just clear them
    listing.clearDomainEvents();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.listing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async count(status?: string): Promise<number> {
    const where: any = { deletedAt: null };
    
    if (status) {
      where.status = status;
    }

    return this.prisma.listing.count({ where });
  }

  async findNeedingAttention(): Promise<Listing[]> {
    const data = await this.prisma.listing.findMany({
      where: {
        deletedAt: null,
        OR: [
          { status: 'FLAGGED' },
          { status: 'SOLD_OUT' },
          {
            status: 'ACTIVE',
            inventory: { lte: 5 }, // Low inventory warning
          },
        ],
      },
      orderBy: { updatedAt: 'desc' },
    });

    return data.map((d: any) => this.toDomain(d));
  }

  /**
   * Convert Prisma model to Domain entity
   */
  private toDomain(data: any): Listing {
    return Listing.reconstitute({
      id: data.id,
      sellerId: data.sellerId,
      speciesId: data.speciesId,
      title: data.title,
      description: data.description,
      basePrice: Money.create(Number(data.basePrice), 'USD'),
      inventory: data.inventory,
      status: data.status as ListingStatus,
      viewCount: data.viewCount,
      metadata: data.metadata as object | undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      publishedAt: data.publishedAt ?? undefined,
    });
  }

  /**
   * Convert Domain entity to Prisma model data
   */
  private toPersistence(listing: Listing): any {
    return {
      id: listing.id,
      sellerId: listing.sellerId,
      speciesId: listing.speciesId,
      title: listing.title,
      description: listing.description,
      basePrice: listing.basePrice.getAmount(),
      inventory: listing.inventory,
      status: listing.status,
      viewCount: listing.viewCount,
      metadata: listing.metadata ?? null,
      publishedAt: listing.publishedAt ?? null,
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
    };
  }
}
