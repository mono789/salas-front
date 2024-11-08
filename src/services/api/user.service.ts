import { METHOD, USERS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base.service";
import { UserRoleRequest } from "@/models/user";

const UserService = {
  getAll: function () {
    return service(USERS_ENDPOINT, METHOD.get, authorizedHeaders());
  },

  getOne: function (id: string) {
    return service(`${USERS_ENDPOINT}/${id}`, METHOD.get, authorizedHeaders());
  },

  updateRole: function (id: string, role: UserRoleRequest) {
    return service(`${USERS_ENDPOINT}/${id}`, METHOD.put, authorizedHeaders(), role);
  },
};

export default UserService;
