import {
    AuthenticationRequest,
    RegisterRequest,
} from "@/models/authentication";
import { service } from "./base.service";
import {
    AUTHENTICATION_ENDPOINT,
    BASIC_HEADER,
    METHOD,
} from "@/utils/constants/api.constants";

const AuthenticationService = {
    register: function(user: RegisterRequest) {
        return service(
            `${AUTHENTICATION_ENDPOINT}/register`,
            METHOD.post,
            BASIC_HEADER,
            user,
        );
    },
    login: function(user: AuthenticationRequest) {
        return service(
            `${AUTHENTICATION_ENDPOINT}/login`,
            METHOD.post,
            BASIC_HEADER,
            user,
        );
    },
};

export default AuthenticationService;
