/**
 * Listing Aggregate Tests
 */

import { Listing, ListingStatus } from '../aggregates/Listing';
import { Money } from '../value-objects/Money';

describe('Listing Aggregate', () => {
  const validListingProps = {
    sellerId: 'seller-123',
    speciesId: 'species-456',
    title: 'Beautiful Oak Tree',
    description:
      'A beautiful oak tree that will grow tall and strong, perfect for your backyard and will provide shade for decades.',
    basePrice: Money.create(99.99),
    inventory: 10,
  };

  describe('create', () => {
    it('should create a listing in DRAFT status', () => {
      const listing = Listing.create(validListingProps);

      expect(listing.status).toBe(ListingStatus.DRAFT);
      expect(listing.inventory).toBe(10);
      expect(listing.viewCount).toBe(0);
      expect(listing.id).toBeDefined();
      expect(listing.publishedAt).toBeUndefined();
    });

    it('should emit ListingCreated domain event', () => {
      const listing = Listing.create(validListingProps);

      const events = listing.getDomainEvents();

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('ListingCreated');
      expect(events[0].data.listingId).toBe(listing.id);
    });

    it('should throw error if title is too short', () => {
      expect(() => {
        Listing.create({
          ...validListingProps,
          title: 'Short',
        });
      }).toThrow('Title must be at least 10 characters');
    });

    it('should throw error if title is too long', () => {
      const longTitle = 'A'.repeat(201);

      expect(() => {
        Listing.create({
          ...validListingProps,
          title: longTitle,
        });
      }).toThrow('Title cannot exceed 200 characters');
    });

    it('should throw error if description is too short', () => {
      expect(() => {
        Listing.create({
          ...validListingProps,
          description: 'Too short',
        });
      }).toThrow('Description must be at least 50 characters');
    });

    it('should throw error if base price is zero', () => {
      expect(() => {
        Listing.create({
          ...validListingProps,
          basePrice: Money.zero(),
        });
      }).toThrow('Base price must be greater than zero');
    });

    it('should throw error if inventory is negative', () => {
      expect(() => {
        Listing.create({
          ...validListingProps,
          inventory: -1,
        });
      }).toThrow('Inventory cannot be negative');
    });
  });

  describe('publish', () => {
    it('should change status to ACTIVE', () => {
      const listing = Listing.create(validListingProps);

      listing.publish();

      expect(listing.status).toBe(ListingStatus.ACTIVE);
      expect(listing.publishedAt).toBeDefined();
    });

    it('should emit ListingPublished domain event', () => {
      const listing = Listing.create(validListingProps);

      listing.clearDomainEvents(); // Clear creation event
      listing.publish();

      const events = listing.getDomainEvents();

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('ListingPublished');
    });

    it('should throw error if inventory is zero', () => {
      const listing = Listing.create({
        ...validListingProps,
        inventory: 0,
      });

      expect(() => listing.publish()).toThrow(
        'Cannot publish listing with zero inventory'
      );
    });

    it('should throw error if already published', () => {
      const listing = Listing.create(validListingProps);
      listing.publish();

      expect(() => listing.publish()).toThrow('Only draft listings can be published');
    });
  });

  describe('updatePrice', () => {
    it('should update the base price', () => {
      const listing = Listing.create(validListingProps);
      const newPrice = Money.create(149.99);

      listing.updatePrice(newPrice);

      expect(listing.basePrice.equals(newPrice)).toBe(true);
    });

    it('should emit ListingPriceUpdated event', () => {
      const listing = Listing.create(validListingProps);
      listing.clearDomainEvents();

      const newPrice = Money.create(149.99);
      listing.updatePrice(newPrice);

      const events = listing.getDomainEvents();

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('ListingPriceUpdated');
      expect(events[0].data.newPrice).toBe(149.99);
    });

    it('should throw error if new price is zero', () => {
      const listing = Listing.create(validListingProps);

      expect(() => listing.updatePrice(Money.zero())).toThrow(
        'Price must be greater than zero'
      );
    });
  });

  describe('inventory management', () => {
    it('should decrease inventory', () => {
      const listing = Listing.create(validListingProps);

      listing.decreaseInventory(3);

      expect(listing.inventory).toBe(7);
    });

    it('should increase inventory', () => {
      const listing = Listing.create(validListingProps);

      listing.increaseInventory(5);

      expect(listing.inventory).toBe(15);
    });

    it('should throw error when decreasing by more than available', () => {
      const listing = Listing.create({
        ...validListingProps,
        inventory: 5,
      });

      expect(() => listing.decreaseInventory(10)).toThrow('Insufficient inventory');
    });

    it('should mark as SOLD_OUT when inventory reaches zero', () => {
      const listing = Listing.create({
        ...validListingProps,
        inventory: 5,
      });

      listing.publish();
      listing.clearDomainEvents();
      listing.decreaseInventory(5);

      expect(listing.status).toBe(ListingStatus.SOLD_OUT);
      expect(listing.inventory).toBe(0);

      const events = listing.getDomainEvents();
      expect(events.some((e) => e.type === 'ListingSoldOut')).toBe(true);
    });

    it('should reactivate when inventory is added to sold out listing', () => {
      const listing = Listing.create({
        ...validListingProps,
        inventory: 1,
      });

      listing.publish();
      listing.decreaseInventory(1); // Now SOLD_OUT

      listing.increaseInventory(5);

      expect(listing.status).toBe(ListingStatus.ACTIVE);
      expect(listing.inventory).toBe(5);
    });
  });

  describe('flag', () => {
    it('should flag the listing with a reason', () => {
      const listing = Listing.create(validListingProps);

      listing.flag('Suspected fraud');

      expect(listing.status).toBe(ListingStatus.FLAGGED);
    });

    it('should emit ListingFlagged event', () => {
      const listing = Listing.create(validListingProps);
      listing.clearDomainEvents();

      listing.flag('Policy violation');

      const events = listing.getDomainEvents();

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('ListingFlagged');
      expect(events[0].data.reason).toBe('Policy violation');
    });

    it('should throw error if reason is empty', () => {
      const listing = Listing.create(validListingProps);

      expect(() => listing.flag('')).toThrow('Flag reason is required');
    });
  });

  describe('archive', () => {
    it('should archive the listing', () => {
      const listing = Listing.create(validListingProps);

      listing.archive();

      expect(listing.status).toBe(ListingStatus.ARCHIVED);
    });

    it('should emit ListingArchived event', () => {
      const listing = Listing.create(validListingProps);
      listing.clearDomainEvents();

      listing.archive();

      const events = listing.getDomainEvents();

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('ListingArchived');
    });
  });

  describe('availability checks', () => {
    it('should be available when ACTIVE with inventory', () => {
      const listing = Listing.create(validListingProps);
      listing.publish();

      expect(listing.isAvailable()).toBe(true);
    });

    it('should not be available when DRAFT', () => {
      const listing = Listing.create(validListingProps);

      expect(listing.isAvailable()).toBe(false);
    });

    it('should not be available when SOLD_OUT', () => {
      const listing = Listing.create({
        ...validListingProps,
        inventory: 1,
      });
      listing.publish();
      listing.decreaseInventory(1);

      expect(listing.isAvailable()).toBe(false);
    });

    it('should be visible when ACTIVE or SOLD_OUT', () => {
      const listing = Listing.create(validListingProps);
      listing.publish();

      expect(listing.isVisible()).toBe(true);

      listing.updateInventory(0);

      expect(listing.isVisible()).toBe(true); // Still visible even when sold out
    });
  });

  describe('view count', () => {
    it('should increment view count', () => {
      const listing = Listing.create(validListingProps);

      listing.incrementViewCount();
      listing.incrementViewCount();

      expect(listing.viewCount).toBe(2);
    });
  });
});
