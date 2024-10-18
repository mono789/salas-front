import { Methods } from "@/services/api/service.types";

export const TOKEN_TYPE = 'Bearer'

export const AUTHENTICATION_ENDPOINT = '/auth'
export const USERS_ENDPOINT = '/users'
export const ROOMS_ENDPOINT = '/rooms'
export const RESERVATIONS_ENDPOINT = '/reservations'

export const METHOD: Methods = {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    update: "UPDATE",
    patch: "PATCH",
};

export const BASIC_HEADER = {
    "Content-Type": "application/json",
};
