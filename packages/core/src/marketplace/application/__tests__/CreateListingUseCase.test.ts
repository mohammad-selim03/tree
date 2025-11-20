/**
 * CreateListingUseCase Tests
 */

import { CreateListingUseCase } from '../use-cases/CreateListingUseCase';
import { IListingRepository } from '../../domain/repositories/IListingRepository';
import { ISellerRepository } from '../../domain/repositories/ISellerRepository';
import { Seller } from '../../domain/entities/Seller';
import { Listing } from '../../domain/aggregates/Listing';

// Mock repositories
class MockListingRepository implements Partial<IListingRepository> {
  async save(listing: Listing): Promise<void> {
    return Promise.resolve();
  }
}

class MockSellerRepository implements Partial<ISellerRepository> {
  private sellers: Map<string, Seller> = new Map();

  addSeller(seller: Seller) {
    this.sellers.set(seller.id, seller);
  }

  async findById(id: string): Promise<Seller | null> {
    return Promise.resolve(this.sellers.get(id) || null);
  }
}

describe('CreateListingUseCase', () => {
  let useCase: CreateListingUseCase;
  let listingRepo: MockListingRepository;
  let sellerRepo: MockSellerRepository;

  beforeEach(() => {
    listingRepo = new MockListingRepository();
    sellerRepo = new MockSellerRepository();
    useCase = new CreateListingUseCase(
      listingRepo as unknown as IListingRepository,
      sellerRepo as unknown as ISellerRepository
    );
  });

  const validDTO = {
    sellerId: 'seller-123',
    speciesId: 'species-456',
    title: 'Beautiful Oak Tree',
    description:
      'A magnificent oak tree that will provide shade for decades to come. Perfect for landscaping.',
    basePrice: 299.99,
    inventory: 10,
  };

  describe('execute', () => {
    it('should create a listing successfully', async () => {
      // Setup: Create and add verified seller
      const seller = Seller.create({
        id: 'seller-123',
        userId: 'user-456',
        businessName: 'Green Nursery',
      });
      seller.verify();
      sellerRepo.addSeller(seller);

      // Act
      const result = await useCase.execute(validDTO);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.title).toBe('Beautiful Oak Tree');
      expect(result.basePrice).toBe(299.99);
      expect(result.status).toBe('DRAFT');
      expect(result.inventory).toBe(10);
    });

    it('should throw error if seller not found', async () => {
      await expect(useCase.execute(validDTO)).rejects.toThrow('Seller not found');
    });

    it('should throw error if seller not verified', async () => {
      // Setup: Create unverified seller
      const seller = Seller.create({
        id: 'seller-123',
        userId: 'user-456',
        businessName: 'Green Nursery',
      });
      sellerRepo.addSeller(seller);

      await expect(useCase.execute(validDTO)).rejects.toThrow(
        'Only verified sellers can create listings'
      );
    });

    it('should return DTO with correct currency', async () => {
      const seller = Seller.create({
        id: 'seller-123',
        userId: 'user-456',
        businessName: 'Green Nursery',
      });
      seller.verify();
      sellerRepo.addSeller(seller);

      const result = await useCase.execute(validDTO);

      expect(result.currency).toBe('USD');
    });

    it('should handle metadata', async () => {
      const seller = Seller.create({
        id: 'seller-123',
        userId: 'user-456',
        businessName: 'Green Nursery',
      });
      seller.verify();
      sellerRepo.addSeller(seller);

      const dtoWithMetadata = {
        ...validDTO,
        metadata: { tags: ['organic', 'native'], featured: true },
      };

      const result = await useCase.execute(dtoWithMetadata);

      expect(result.metadata).toEqual({ tags: ['organic', 'native'], featured: true });
    });
  });
});
