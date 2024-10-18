import { Methods } from "@/services/service.types";

export const AUTHENTICATION_ENDPOINT = '/auth'

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
