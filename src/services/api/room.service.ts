import { RoomFilter, RoomRequest } from "@/models/room";
import { METHOD, ROOMS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base.service";

const RoomService = {
  getAll: function ({
    implement,
    restriction,
    software,
    computerAmount,
  }: RoomFilter) {
    // Build Filter Params
    let endpoint = `${ROOMS_ENDPOINT}?`;
    if (implement) endpoint = `${endpoint}implement=${implement}`;
    if (restriction) endpoint = `${endpoint}&restriction=${restriction}`;
    if (software) endpoint = `${endpoint}&software=${software}`;
    if (computerAmount)
      endpoint = `${endpoint}&computerAmount=${computerAmount}`;
    // Make request
    return service(endpoint, METHOD.get, authorizedHeaders());
  },

  getOne: function (id: number) {
    return service(`${ROOMS_ENDPOINT}/${id}`, METHOD.get, authorizedHeaders());
  },

  save: function (room: RoomRequest) {
    return service(ROOMS_ENDPOINT, METHOD.post, authorizedHeaders(), room);
  },

  update: function (id: number, room: RoomRequest) {
    return service(
      `${ROOMS_ENDPOINT}/${id}`,
      METHOD.put,
      authorizedHeaders(),
      room,
    );
  },

  delete: function (id: number) {
    return service(
      `${ROOMS_ENDPOINT}/${id}`,
      METHOD.delete,
      authorizedHeaders(),
    );
  },

  getSchedule: function (id: number) {
    return service(
      `${ROOMS_ENDPOINT}/${id}/schedule`,
      METHOD.get,
      authorizedHeaders(),
    );
  },

  getFreeRoom: function (date?: string) {
    let endpoint = `${ROOMS_ENDPOINT}/free`;
    if (date) endpoint = endpoint + `?date=${date}`;
    return service(endpoint, METHOD.get, authorizedHeaders());
  },
};

export default RoomService;
