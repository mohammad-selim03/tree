import { Email } from '../value-objects/Email';

export enum UserRole {
    BUYER = 'BUYER',
    SELLER = 'SELLER',
    ADMIN = 'ADMIN'
}

export interface UserProps {
    id: string;
    email: Email;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private props: UserProps;

    private constructor(props: UserProps) {
        this.props = props;
    }

    public static create(props: UserProps): User {
        return new User(props);
    }

    /**
     * Reconstitute a User from persistence (database)
     */
    public static reconstitute(props: UserProps): User {
        return new User(props);
    }

    get id(): string {
        return this.props.id;
    }

    get email(): Email {
        return this.props.email;
    }

    get role(): UserRole {
        return this.props.role;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public isAdmin(): boolean {
        return this.props.role === UserRole.ADMIN;
    }

    public isSeller(): boolean {
        return this.props.role === UserRole.SELLER;
    }

    public isBuyer(): boolean {
        return this.props.role === UserRole.BUYER;
    }

    /**
     * Allow accessing props for persistence (used by repositories)
     */
    public getProps(): UserProps {
        return { ...this.props };
    }
}
