import { ImplementRequest, ImplementResponse, ImplementFilter } from "@/models/implement";
import { METHOD, IMPLEMENTS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base.service";

const ImplementService = {
    getAll: function (filter?: ImplementFilter) {
        let endpoint = IMPLEMENTS_ENDPOINT;
        if (filter?.name) {
            endpoint = `${endpoint}?name=${filter.name}`;
        }
        return service<ImplementResponse[]>(endpoint, METHOD.get, authorizedHeaders());
    },

    getOne: function (id: number) {
        return service(`${IMPLEMENTS_ENDPOINT}/${id}`, METHOD.get, authorizedHeaders());
      },

    save: function (implement: ImplementRequest) {
        return service(IMPLEMENTS_ENDPOINT, METHOD.post, authorizedHeaders(), implement);
    },
    
    update: function (id: number, implement: ImplementRequest) {
        return service(
          `${IMPLEMENTS_ENDPOINT}/${id}`,
          METHOD.put,
          authorizedHeaders(),
          implement,
        );
    },
    
      delete: function (id: number) {
        return service(
          `${IMPLEMENTS_ENDPOINT}/${id}`,
          METHOD.delete,
          authorizedHeaders(),
        );
      },
};

export default ImplementService;