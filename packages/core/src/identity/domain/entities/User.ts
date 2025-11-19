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

    get id(): string {
        return this.props.id;
    }

    get email(): Email {
        return this.props.email;
    }

    get role(): UserRole {
        return this.props.role;
    }

    public isAdmin(): boolean {
        return this.props.role === UserRole.ADMIN;
    }
}
