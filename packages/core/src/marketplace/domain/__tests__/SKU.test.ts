/**
 * SKU Value Object Tests
 */

import { SKU } from '../value-objects/SKU';

describe('SKU Value Object', () => {
  describe('create', () => {
    it('should create SKU with valid value', () => {
      const sku = SKU.create('ABC-123-XYZ');

      expect(sku.getValue()).toBe('ABC-123-XYZ');
    });

    it('should convert to uppercase', () => {
      const sku = SKU.create('abc-123-xyz');

      expect(sku.getValue()).toBe('ABC-123-XYZ');
    });

    it('should trim whitespace', () => {
      const sku = SKU.create('  ABC-123  ');

      expect(sku.getValue()).toBe('ABC-123');
    });

    it('should throw error for empty SKU', () => {
      expect(() => SKU.create('')).toThrow('SKU cannot be empty');
    });

    it('should throw error for whitespace-only SKU', () => {
      expect(() => SKU.create('   ')).toThrow('SKU cannot be empty');
    });

    it('should throw error for SKU too short', () => {
      expect(() => SKU.create('AB')).toThrow('SKU must be at least 3 characters');
    });

    it('should throw error for SKU too long', () => {
      const longSKU = 'A'.repeat(51);

      expect(() => SKU.create(longSKU)).toThrow('SKU cannot exceed 50 characters');
    });

    it('should throw error for invalid characters', () => {
      expect(() => SKU.create('ABC@123')).toThrow(
        'SKU can only contain uppercase letters, numbers, and hyphens'
      );
    });

    it('should allow alphanumeric and hyphens', () => {
      const sku = SKU.create('ABC-123-DEF-456');

      expect(sku.getValue()).toBe('ABC-123-DEF-456');
    });

    it('should allow numbers only', () => {
      const sku = SKU.create('123456');

      expect(sku.getValue()).toBe('123456');
    });

    it('should allow letters only', () => {
      const sku = SKU.create('ABCDEF');

      expect(sku.getValue()).toBe('ABCDEF');
    });
  });

  describe('generate', () => {
    it('should generate SKU from seller and product IDs', () => {
      const sku = SKU.generate('seller-12345678', 'product-87654321');

      const value = sku.getValue();

      expect(value).toContain('SELL'); // First 4 chars of seller ID
      expect(value).toContain('PROD'); // First 4 chars of product ID
      expect(value.split('-').length).toBeGreaterThanOrEqual(3);
    });

    it('should generate SKU with variant suffix', () => {
      const sku = SKU.generate('seller-12345678', 'product-87654321', 'large');

      const value = sku.getValue();

      expect(value).toContain('LARGE');
    });

    it('should generate unique SKUs', () => {
      const sku1 = SKU.generate('seller-123', 'product-456');
      const sku2 = SKU.generate('seller-123', 'product-456');

      expect(sku1.getValue()).not.toBe(sku2.getValue());
    });
  });

  describe('generateRandom', () => {
    it('should generate random SKU', () => {
      const sku = SKU.generateRandom();

      expect(sku.getValue()).toContain('SKU-');
      expect(sku.getValue().length).toBeGreaterThan(10);
    });

    it('should generate unique random SKUs', () => {
      const sku1 = SKU.generateRandom();
      const sku2 = SKU.generateRandom();

      expect(sku1.getValue()).not.toBe(sku2.getValue());
    });
  });

  describe('equals', () => {
    it('should return true for equal SKUs', () => {
      const sku1 = SKU.create('ABC-123');
      const sku2 = SKU.create('ABC-123');

      expect(sku1.equals(sku2)).toBe(true);
    });

    it('should return false for different SKUs', () => {
      const sku1 = SKU.create('ABC-123');
      const sku2 = SKU.create('DEF-456');

      expect(sku1.equals(sku2)).toBe(false);
    });

    it('should be case-insensitive', () => {
      const sku1 = SKU.create('abc-123');
      const sku2 = SKU.create('ABC-123');

      expect(sku1.equals(sku2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('should return string value', () => {
      const sku = SKU.create('ABC-123');

      expect(sku.toString()).toBe('ABC-123');
    });
  });
});
