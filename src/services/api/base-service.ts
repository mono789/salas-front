import { RequestMethod } from "@/models/enums";
import { BASIC_HEADER, TOKEN_TYPE } from "@/utils/constants/api.constants";
import { LocalStorageService } from "../localstorage/local-storage.service";
import { LOCAL_USER_KEY } from "@/utils/constants/local-storage.constants";
import { AuthenticationResponse } from "@/models/authentication";
import { RequestHeaders } from "./service.types";

const api_url = process.env.NEXT_PUBLIC_API_URL;

/**Gets token from local storage and sets it as bearer token*/
export function authorizedHeaders(): RequestHeaders {
    const user =
        LocalStorageService.getItem<AuthenticationResponse>(LOCAL_USER_KEY);
    if (!user) return BASIC_HEADER;
    return {
        ...BASIC_HEADER,
        Authorization: `${TOKEN_TYPE} ${user.token}`,
    };
}

/**
 * This is a fetch wrapper to make easier request process, instead of
 * build a fetch from zero every time putting the complete url and headers.
 * This function receives just the enpoint and method, if you want,
 * also receives headers and a body
 * */
export function service<Request>(
    endpoint: string,
    method: RequestMethod,
    headers?: RequestHeaders,
    requestBody?: Request,
) {
    const body: string = JSON.stringify(requestBody);
    return fetch(`${api_url}${endpoint}`, { method, headers, body });
}
