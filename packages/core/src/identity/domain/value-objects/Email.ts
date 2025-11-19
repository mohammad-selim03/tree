import { z } from 'zod';

export class Email {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static create(email: string): Email {
        const schema = z.string().email();
        const result = schema.safeParse(email);

        if (!result.success) {
            throw new Error('Invalid email format');
        }

        return new Email(email);
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: Email): boolean {
        return this.value === other.value;
    }
}
