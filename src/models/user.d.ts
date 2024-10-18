import { Role } from "./enums";
import { RoleResponse } from "./role";

export interface UserRoleRequest {
    roleName: Role;
}

export interface UserResponse {
    id: string
    firstname: string;
    lastname: string;
    email: string;
    role: RoleResponse;
}

export interface UserRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
