import { Role } from './role';

export class Employee {
    id!: string;
    title!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    address!:string;
    role!: Role;
    isDeleting: boolean = false;
}