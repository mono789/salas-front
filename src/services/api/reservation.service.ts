import { METHOD, RESERVATIONS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base-service";
import {
  ClassReservationRequest,
  ReservationRequest,
} from "@/models/reservation";

const ReservationService = {
  getAll: function () {
    return service(RESERVATIONS_ENDPOINT, METHOD.get, authorizedHeaders());
  },

  save: function (reservation: ReservationRequest) {
    return service(
      RESERVATIONS_ENDPOINT,
      METHOD.post,
      authorizedHeaders(),
      reservation,
    );
  },

  saveClass: function (reservationClass: ClassReservationRequest) {
    return service(
      `${RESERVATIONS_ENDPOINT}/class`,
      METHOD.post,
      authorizedHeaders(),
      reservationClass,
    );
  },

  reject: function (id: number) {
    return service(
      `${RESERVATIONS_ENDPOINT}/${id}/reject`,
      METHOD.patch,
      authorizedHeaders(),
    );
  },

  accept: function (id: number) {
    return service(
      `${RESERVATIONS_ENDPOINT}/${id}/accept`,
      METHOD.patch,
      authorizedHeaders(),
    );
  },

  getRejected: function () {
    return service(
      `${RESERVATIONS_ENDPOINT}/rejected`,
      METHOD.get,
      authorizedHeaders(),
    );
  },

  getPending: function () {
    return service(
      `${RESERVATIONS_ENDPOINT}/pending`,
      METHOD.get,
      authorizedHeaders(),
    );
  },

  getAccepted: function () {
    return service(
      `${RESERVATIONS_ENDPOINT}/accepted`,
      METHOD.get,
      authorizedHeaders(),
    );
  },
};

export default ReservationService;
