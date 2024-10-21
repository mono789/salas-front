import { ReservationType } from "@/models/enums";
import { ReservationRequest } from "@/models/reservation";

// General
export const BUILDING_TEXT = "Bloque";
export const ROOM_TEXT = "Sala";

// Reservation Modal
export const DEFAULT_RESERVATION_FORM_DATA: ReservationRequest = {
  activityName: "",
  activityDescription: "",
  startsAt: "",
  endsAt: "",
  type: undefined,
  userId: "",
  roomId: undefined,
};

export const DEFAULT_HOURS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export const DEFAULT_RESERVATION_TYPES: Array<ReservationType> = [
  "ONCE",
  "WEEKLY",
];
