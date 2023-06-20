export enum UserRole {
    Admin = 'admin',
    Normal = 'normal',
}

export class DomainUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string;
    role: UserRole;

    constructor (id: string, firstName: string, lastName: string, email: string, role?: UserRole) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.fullName = `${firstName} ${lastName}`;
        this.role = role ?? UserRole.Normal;
    }
}