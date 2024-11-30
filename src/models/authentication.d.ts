import { Role } from "./enums";

// Requests

export interface AuthenticationRequest {
    email?: string;
    password?: string;
}

export interface RegisterRequest {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
}

// Responses

export interface AuthenticationResponse {
    token: string;
    role: Role;
    id: string;
}

export interface RegisterResponse {
    message: string;
}
