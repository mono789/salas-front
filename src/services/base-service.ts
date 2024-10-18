import { RequestMethod } from "@/models/enums";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export type RequestHeaders = Record<string, string>;

export function service<Request, Response>(
    endpoint: string,
    method: RequestMethod,
    headers: RequestHeaders,
    requestBody?: Request,
){ 
    const body: string = JSON.stringify(requestBody)
    console.log(`${api_url}${endpoint}`, {method, headers, body})
    return fetch(`${api_url}${endpoint}`, {method, headers, body});
}
