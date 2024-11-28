import { ApplicationRequest, ApplicationResponse, ApplicationFilter } from "@/models/application";
import { METHOD, APPLICATIONS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base.service";

const ApplicationService = {
    getAll: function (filter?: ApplicationFilter) {
        let endpoint = APPLICATIONS_ENDPOINT;
        if (filter?.name) {
            endpoint = `${endpoint}?name=${filter.name}`;
        }
        return service<ApplicationResponse[]>(endpoint, METHOD.get, authorizedHeaders());
    },

    getOne: function (id: number) {
        return service(`${APPLICATIONS_ENDPOINT}/${id}`, METHOD.get, authorizedHeaders());
      },

    save: function (application: ApplicationRequest) {
        return service(APPLICATIONS_ENDPOINT, METHOD.post, authorizedHeaders(), application);
    },
    
    update: function (id: number, application: ApplicationRequest) {
        return service(
          `${APPLICATIONS_ENDPOINT}/${id}`,
          METHOD.put,
          authorizedHeaders(),
          application,
        );
    },
    
      delete: function (id: number) {
        return service(
          `${APPLICATIONS_ENDPOINT}/${id}`,
          METHOD.delete,
          authorizedHeaders(),
        );
      },
};

export default ApplicationService;