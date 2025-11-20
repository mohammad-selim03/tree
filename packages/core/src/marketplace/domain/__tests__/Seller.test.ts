/**
 * Seller Entity Tests
 */

import { Seller } from '../entities/Seller';

describe('Seller Entity', () => {
  const validSellerProps = {
    id: 'seller-123',
    userId: 'user-456',
    businessName: 'Green Thumb Nursery',
  };

  describe('create', () => {
    it('should create a seller with default values', () => {
      const seller = Seller.create(validSellerProps);

      expect(seller.id).toBe('seller-123');
      expect(seller.userId).toBe('user-456');
      expect(seller.businessName).toBe('Green Thumb Nursery');
      expect(seller.verified).toBe(false);
      expect(seller.rating).toBe(0);
      expect(seller.stripeAccountId).toBeUndefined();
    });

    it('should throw error for business name too short', () => {
      expect(() => {
        Seller.create({
          ...validSellerProps,
          businessName: 'AB',
        });
      }).toThrow('Business name must be at least 3 characters');
    });

    it('should throw error for business name too long', () => {
      const longName = 'A'.repeat(101);

      expect(() => {
        Seller.create({
          ...validSellerProps,
          businessName: longName,
        });
      }).toThrow('Business name cannot exceed 100 characters');
    });

    it('should throw error for empty business name', () => {
      expect(() => {
        Seller.create({
          ...validSellerProps,
          businessName: '',
        });
      }).toThrow('Business name cannot be empty');
    });
  });

  describe('verify', () => {
    it('should verify the seller', () => {
      const seller = Seller.create(validSellerProps);

      seller.verify();

      expect(seller.verified).toBe(true);
    });

    it('should throw error if already verified', () => {
      const seller = Seller.create(validSellerProps);
      seller.verify();

      expect(() => seller.verify()).toThrow('Seller is already verified');
    });
  });

  describe('unverify', () => {
    it('should unverify a seller', () => {
      const seller = Seller.create(validSellerProps);
      seller.verify();

      seller.unverify();

      expect(seller.verified).toBe(false);
    });
  });

  describe('updateRating', () => {
    it('should update seller rating', () => {
      const seller = Seller.create(validSellerProps);

      seller.updateRating(4.5);

      expect(seller.rating).toBe(4.5);
    });

    it('should throw error for rating below 0', () => {
      const seller = Seller.create(validSellerProps);

      expect(() => seller.updateRating(-1)).toThrow('Rating must be between 0 and 5');
    });

    it('should throw error for rating above 5', () => {
      const seller = Seller.create(validSellerProps);

      expect(() => seller.updateRating(6)).toThrow('Rating must be between 0 and 5');
    });

    it('should allow rating of exactly 0', () => {
      const seller = Seller.create(validSellerProps);

      seller.updateRating(0);

      expect(seller.rating).toBe(0);
    });

    it('should allow rating of exactly 5', () => {
      const seller = Seller.create(validSellerProps);

      seller.updateRating(5);

      expect(seller.rating).toBe(5);
    });
  });

  describe('connectStripe', () => {
    it('should connect Stripe account', () => {
      const seller = Seller.create(validSellerProps);

      seller.connectStripe('acct_1234567890');

      expect(seller.stripeAccountId).toBe('acct_1234567890');
    });

    it('should throw error for empty Stripe account ID', () => {
      const seller = Seller.create(validSellerProps);

      expect(() => seller.connectStripe('')).toThrow('Stripe account ID is required');
    });

    it('should throw error for invalid Stripe account ID format', () => {
      const seller = Seller.create(validSellerProps);

      expect(() => seller.connectStripe('invalid-id')).toThrow(
        'Invalid Stripe account ID format'
      );
    });

    it('should accept valid Stripe account ID starting with acct_', () => {
      const seller = Seller.create(validSellerProps);

      seller.connectStripe('acct_ABC123XYZ789');

      expect(seller.stripeAccountId).toBe('acct_ABC123XYZ789');
    });
  });

  describe('disconnectStripe', () => {
    it('should disconnect Stripe account', () => {
      const seller = Seller.create(validSellerProps);
      seller.connectStripe('acct_1234567890');

      seller.disconnectStripe();

      expect(seller.stripeAccountId).toBeUndefined();
    });
  });

  describe('canAcceptPayments', () => {
    it('should return true when verified and has Stripe account', () => {
      const seller = Seller.create(validSellerProps);
      seller.verify();
      seller.connectStripe('acct_1234567890');

      expect(seller.canAcceptPayments()).toBe(true);
    });

    it('should return false when not verified', () => {
      const seller = Seller.create(validSellerProps);
      seller.connectStripe('acct_1234567890');

      expect(seller.canAcceptPayments()).toBe(false);
    });

    it('should return false when no Stripe account', () => {
      const seller = Seller.create(validSellerProps);
      seller.verify();

      expect(seller.canAcceptPayments()).toBe(false);
    });

    it('should return false when neither verified nor has Stripe account', () => {
      const seller = Seller.create(validSellerProps);

      expect(seller.canAcceptPayments()).toBe(false);
    });
  });

  describe('hasGoodStanding', () => {
    it('should return true for rating >= 3.0', () => {
      const seller = Seller.create(validSellerProps);
      seller.updateRating(3.0);

      expect(seller.hasGoodStanding()).toBe(true);
    });

    it('should return true for rating > 3.0', () => {
      const seller = Seller.create(validSellerProps);
      seller.updateRating(4.5);

      expect(seller.hasGoodStanding()).toBe(true);
    });

    it('should return false for rating < 3.0', () => {
      const seller = Seller.create(validSellerProps);
      seller.updateRating(2.9);

      expect(seller.hasGoodStanding()).toBe(false);
    });

    it('should return false for new seller with 0 rating', () => {
      const seller = Seller.create(validSellerProps);

      expect(seller.hasGoodStanding()).toBe(false);
    });
  });

  describe('updateStorefront', () => {
    it('should update storefront configuration', () => {
      const seller = Seller.create(validSellerProps);
      const storefront = {
        banner: 'https://example.com/banner.jpg',
        description: 'Best nursery in town',
        policies: { returns: '30 days' },
      };

      seller.updateStorefront(storefront);

      expect(seller.storefront).toEqual(storefront);
    });
  });

  describe('reconstitute', () => {
    it('should reconstitute a seller from persistence', () => {
      const persistedData = {
        id: 'seller-123',
        userId: 'user-456',
        businessName: 'Green Thumb Nursery',
        verified: true,
        rating: 4.5,
        stripeAccountId: 'acct_1234567890',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      };

      const seller = Seller.reconstitute(persistedData);

      expect(seller.id).toBe('seller-123');
      expect(seller.verified).toBe(true);
      expect(seller.rating).toBe(4.5);
      expect(seller.stripeAccountId).toBe('acct_1234567890');
    });
  });
});
