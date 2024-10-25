import { Methods } from "@/services/api/service.types";

export const TOKEN_TYPE = "Bearer";

export const DEFAULT_API_URL =
    "https://arquimedes.udea.edu.co:8091/salasinfo/v1";

export const AUTHENTICATION_ENDPOINT = "/auth";
export const USERS_ENDPOINT = "/users";
export const ROOMS_ENDPOINT = "/rooms";
export const RESERVATIONS_ENDPOINT = "/reservations";

export const METHOD: Methods = {
    get: "GET",
    put: "PUT",
    post: "POST",
    patch: "PATCH",
    delete: "DELETE",
};

export const BASIC_HEADER = {
    "Content-Type": "application/json",
};
