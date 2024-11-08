import { Role } from "./enums";
import { RoleResponse } from "./role";

// Request

export interface UserRoleRequest {
    roleName: Role;
}

export interface UserRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

// Response

export interface UserResponse {
    id: string
    firstname: string;
    lastname: string;
    email: string;
    role: RoleResponse;
}
