import { RegisterRequest, RegisterResponse } from "@/models/authentication";
import {
    ExceptionResponse,
    ValidationExceptionResponse,
} from "@/models/exception";
import { service } from "./base-service";
import {
    AUTHENTICATION_ENDPOINT,
    BASIC_HEADER,
    METHOD,
} from "@/utils/constants/service.constants";

export const AuthenticationService = {
    register: async function(user: RegisterRequest) {
        return await service(
            `${AUTHENTICATION_ENDPOINT}/register`,
            METHOD.post,
            BASIC_HEADER,
            user,
        );
    },
};
