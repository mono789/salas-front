import { RequestMethod } from "@/models/enums";

export interface Methods {
    get: RequestMethod;
    post: RequestMethod;
    delete: RequestMethod;
    update: RequestMethod;
    patch: RequestMethod;
}
