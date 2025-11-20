/**
 * Money Value Object Tests
 */

import { Money } from '../value-objects/Money';

describe('Money Value Object', () => {
  describe('create', () => {
    it('should create money with valid amount and default currency', () => {
      const money = Money.create(100);

      expect(money.getAmount()).toBe(100);
      expect(money.getCurrency()).toBe('USD');
    });

    it('should create money with valid amount and custom currency', () => {
      const money = Money.create(50, 'EUR');

      expect(money.getAmount()).toBe(50);
      expect(money.getCurrency()).toBe('EUR');
    });

    it('should throw error for negative amount', () => {
      expect(() => Money.create(-10)).toThrow('Money amount cannot be negative');
    });

    it('should throw error for invalid currency code', () => {
      expect(() => Money.create(100, 'US')).toThrow('Currency must be a valid 3-letter code');
    });

    it('should convert currency to uppercase', () => {
      const money = Money.create(100, 'eur');

      expect(money.getCurrency()).toBe('EUR');
    });
  });

  describe('zero', () => {
    it('should create zero money', () => {
      const money = Money.zero();

      expect(money.getAmount()).toBe(0);
      expect(money.isZero()).toBe(true);
    });
  });

  describe('add', () => {
    it('should add two money amounts with same currency', () => {
      const money1 = Money.create(100);
      const money2 = Money.create(50);

      const result = money1.add(money2);

      expect(result.getAmount()).toBe(150);
      expect(result.getCurrency()).toBe('USD');
    });

    it('should throw error when adding different currencies', () => {
      const money1 = Money.create(100, 'USD');
      const money2 = Money.create(50, 'EUR');

      expect(() => money1.add(money2)).toThrow(
        'Cannot perform operation on different currencies'
      );
    });
  });

  describe('subtract', () => {
    it('should subtract two money amounts', () => {
      const money1 = Money.create(100);
      const money2 = Money.create(30);

      const result = money1.subtract(money2);

      expect(result.getAmount()).toBe(70);
    });

    it('should throw error when result would be negative', () => {
      const money1 = Money.create(50);
      const money2 = Money.create(100);

      expect(() => money1.subtract(money2)).toThrow(
        'Subtraction would result in negative money'
      );
    });
  });

  describe('multiply', () => {
    it('should multiply money by a factor', () => {
      const money = Money.create(50);

      const result = money.multiply(3);

      expect(result.getAmount()).toBe(150);
    });

    it('should throw error when multiplying by negative factor', () => {
      const money = Money.create(50);

      expect(() => money.multiply(-2)).toThrow(
        'Cannot multiply money by negative factor'
      );
    });
  });

  describe('divide', () => {
    it('should divide money by a divisor', () => {
      const money = Money.create(100);

      const result = money.divide(4);

      expect(result.getAmount()).toBe(25);
    });

    it('should throw error when dividing by zero', () => {
      const money = Money.create(100);

      expect(() => money.divide(0)).toThrow(
        'Cannot divide money by zero or negative number'
      );
    });
  });

  describe('comparison', () => {
    it('should compare if one money is greater than another', () => {
      const money1 = Money.create(100);
      const money2 = Money.create(50);

      expect(money1.isGreaterThan(money2)).toBe(true);
      expect(money2.isGreaterThan(money1)).toBe(false);
    });

    it('should compare if one money is less than another', () => {
      const money1 = Money.create(50);
      const money2 = Money.create(100);

      expect(money1.isLessThan(money2)).toBe(true);
      expect(money2.isLessThan(money1)).toBe(false);
    });

    it('should check equality', () => {
      const money1 = Money.create(100, 'USD');
      const money2 = Money.create(100, 'USD');
      const money3 = Money.create(100, 'EUR');

      expect(money1.equals(money2)).toBe(true);
      expect(money1.equals(money3)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should convert to string format', () => {
      const money = Money.create(99.99, 'USD');

      expect(money.toString()).toBe('USD 99.99');
    });
  });
});
