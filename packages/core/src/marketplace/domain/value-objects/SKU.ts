/**
 * SKU (Stock Keeping Unit) Value Object
 * 
 * Represents a unique identifier for inventory items.
 * Ensures SKU format is valid and provides generation utilities.
 */

export class SKU {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): SKU {
    if (!value || value.trim().length === 0) {
      throw new Error('SKU cannot be empty');
    }
    
    if (value.length < 3) {
      throw new Error('SKU must be at least 3 characters');
    }

    if (value.length > 50) {
      throw new Error('SKU cannot exceed 50 characters');
    }

    // Allow alphanumeric and hyphens only
    if (!/^[A-Z0-9-]+$/.test(value)) {
      throw new Error('SKU can only contain uppercase letters, numbers, and hyphens');
    }

    return new SKU(value.toUpperCase().trim());
  }

  /**
   * Generate a SKU based on seller and product identifiers
   */
  public static generate(sellerId: string, productId: string, variantSuffix?: string): SKU {
    const timestamp = Date.now().toString(36).toUpperCase();
    const sellerPart = sellerId.substring(0, 4).toUpperCase();
    const productPart = productId.substring(0, 4).toUpperCase();
    
    let skuValue = `${sellerPart}-${productPart}-${timestamp}`;
    
    if (variantSuffix) {
      skuValue += `-${variantSuffix.toUpperCase()}`;
    }
    
    return new SKU(skuValue);
  }

  /**
   * Generate a random SKU
   */
  public static generateRandom(): SKU {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    return new SKU(`SKU-${randomPart}-${timestamp}`);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: SKU): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
