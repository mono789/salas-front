export type RequestMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export interface Methods {
    get: RequestMethod;
    post: RequestMethod;
    delete: RequestMethod;
    put: RequestMethod;
    patch: RequestMethod;
}


export type RequestHeaders = Record<string, string>;

