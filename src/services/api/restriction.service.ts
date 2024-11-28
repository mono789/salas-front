import { RestrictionRequest, RestrictionResponse, RestrictionFilter } from "@/models/restriction";
import { METHOD, RESTRICTIONS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base.service";

const RestrictionService = {
    getAll: function (filter?: RestrictionFilter) {
        let endpoint = RESTRICTIONS_ENDPOINT;
        if (filter?.description) {
            endpoint = `${endpoint}?description=${filter.description}`;
        }
        return service<RestrictionResponse[]>(endpoint, METHOD.get, authorizedHeaders());
    },

    getOne: function (id: number) {
        return service(`${RESTRICTIONS_ENDPOINT}/${id}`, METHOD.get, authorizedHeaders());
      },

    save: function (restriction: RestrictionRequest) {
        return service(RESTRICTIONS_ENDPOINT, METHOD.post, authorizedHeaders(), restriction);
    },
    
    update: function (id: number, restriction: RestrictionRequest) {
        return service(
          `${RESTRICTIONS_ENDPOINT}/${id}`,
          METHOD.put,
          authorizedHeaders(),
          restriction,
        );
    },
    
      delete: function (id: number) {
        return service(
          `${RESTRICTIONS_ENDPOINT}/${id}`,
          METHOD.delete,
          authorizedHeaders(),
        );
      },
};

export default RestrictionService;