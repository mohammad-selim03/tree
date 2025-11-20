/**
 * ShippingAddress Value Object
 * 
 * Encapsulates shipping address information with validation.
 */

export interface ShippingAddressProps {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export class ShippingAddress {
  private readonly props: ShippingAddressProps;

  private constructor(props: ShippingAddressProps) {
    this.props = props;
  }

  public static create(props: ShippingAddressProps): ShippingAddress {
    ShippingAddress.validate(props);
    return new ShippingAddress(props);
  }

  private static validate(props: ShippingAddressProps): void {
    if (!props.fullName || props.fullName.trim().length === 0) {
      throw new Error('Full name is required');
    }

    if (props.fullName.length < 2 || props.fullName.length > 100) {
      throw new Error('Full name must be between 2 and 100 characters');
    }

    if (!props.addressLine1 || props.addressLine1.trim().length === 0) {
      throw new Error('Address line 1 is required');
    }

    if (!props.city || props.city.trim().length === 0) {
      throw new Error('City is required');
    }

    if (!props.state || props.state.trim().length === 0) {
      throw new Error('State is required');
    }

    if (!props.postalCode || props.postalCode.trim().length === 0) {
      throw new Error('Postal code is required');
    }

    // Validate postal code format (simple validation, can be enhanced)
    if (!/^[A-Z0-9\s-]{3,10}$/i.test(props.postalCode)) {
      throw new Error('Invalid postal code format');
    }

    if (!props.country || props.country.trim().length === 0) {
      throw new Error('Country is required');
    }

    // Validate country code (2-letter ISO code)
    if (!/^[A-Z]{2}$/i.test(props.country)) {
      throw new Error('Country must be a 2-letter ISO code (e.g., US, GB)');
    }

    if (!props.phoneNumber || props.phoneNumber.trim().length === 0) {
      throw new Error('Phone number is required');
    }

    // Basic phone number validation
    if (!/^[\d\s\-+()]{7,20}$/.test(props.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }
  }

  // Getters
  get fullName(): string {
    return this.props.fullName;
  }

  get addressLine1(): string {
    return this.props.addressLine1;
  }

  get addressLine2(): string | undefined {
    return this.props.addressLine2;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get country(): string {
    return this.props.country.toUpperCase();
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  /**
   * Get formatted address string
   */
  public getFormattedAddress(): string {
    const lines = [
      this.fullName,
      this.addressLine1,
      this.addressLine2,
      `${this.city}, ${this.state} ${this.postalCode}`,
      this.country,
    ].filter(Boolean);

    return lines.join('\n');
  }

  /**
   * Convert to plain object for persistence
   */
  public toObject(): ShippingAddressProps {
    return { ...this.props };
  }

  public equals(other: ShippingAddress): boolean {
    return (
      this.addressLine1 === other.addressLine1 &&
      this.city === other.city &&
      this.state === other.state &&
      this.postalCode === other.postalCode &&
      this.country === other.country
    );
  }
}
