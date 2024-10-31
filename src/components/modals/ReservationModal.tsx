"use client";
import { ReservationRequest } from "@/models/reservation";
import ReservationService from "@/services/api/reservation.service";
import { ReservationResponse } from "@/models/reservation";
import BaseModal from "./BaseModal";
import { Title } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  DEFAULT_HOURS,
  DEFAULT_RESERVATION_FORM_DATA,
  DEFAULT_RESERVATION_TYPES
} from "@/utils/constants/component.constants";
import {SpecificRoomResponse } from "@/models/room";
import { LocalStorageService } from "@/services/localstorage/local-storage.service";

interface UserData {
  id: string;
  token: string;
  role: string;
}

type ReservationModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  saveReservation: (reservation: ReservationRequest) => void;
  room?: SpecificRoomResponse;
};

function ReservationModal({
  opened,
  setOpened,
  saveReservation,
  room,
}: ReservationModalProps) {
  const [reservation, setReservation] = useState<ReservationRequest>(
    DEFAULT_RESERVATION_FORM_DATA,
  );
  const userData: UserData | undefined = LocalStorageService.getItem('user') as UserData | undefined;
  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setReservation({ ...reservation, [id]: value });
  }

  function handleChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { id, value } = event.target;
    console.log(`Cambiando ${id} a ${value}`);
    setReservation((prevReservation) => ({
      ...prevReservation,
      [id]: value,
    }));
  }

  function handleCloseClick() {
    setOpened(false);
  }

  function handleOnFormSumbit(event: FormEvent) {
    event.preventDefault();
    reservation.roomId = room?.id;
    reservation.userId= userData?.id;
    reservation.type = DEFAULT_RESERVATION_TYPES[0];
    reservation.startsAt= reservation.day+' '+ reservation.startsAt;
    reservation.endsAt= reservation.day+' '+ reservation.endsAt;
    console.log("RESERVATION: ",reservation);
    ReservationService.save(reservation).then((response) => {
      if (response.ok) return response.json();
  });
    saveReservation(reservation);
  }

  return (
    <BaseModal open={opened}>
      <form onSubmit={handleOnFormSumbit}>
        <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          Nueva Reserva
        </h3>

        <label htmlFor="activityName">Actividad</label>
        <input
          id="activityName"
          className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Nombre de la actividad"
          aria-label="Activity Name"
          onChange={handleChangeInput}
        />

        <label htmlFor="activityDescription">Descripción</label>
        <input
          id="activityDescription"
          className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Descripción"
          aria-label="Description"
          onChange={handleChangeInput}
        />

        <label htmlFor="day">Día</label>
        <input
          id="day"
          className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          type="date"
          placeholder="Día"
          aria-label="Day"
          onChange={handleChangeInput}
        />

        <label htmlFor="startsAt">Hora de Inicio</label>
        <select
          id="startsAt"
          className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="startsAt"
          onChange={handleChangeSelect}
        >
          {DEFAULT_HOURS.slice(0, DEFAULT_HOURS.length - 1).map(
            (hour, index) => (
              <option key={index} value={hour}>
                {hour}
              </option>
            ),
          )}
        </select>

        <label htmlFor="endsAt">Hora de Término</label>
        <select
          id="endsAt"
          className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="endsAt"
          onChange={handleChangeSelect}
        >
          {DEFAULT_HOURS.slice(1).map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
          Guardar reserva
        </button>
      </form>
      <button
        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-green-600 focus:outline-none"
        onClick={() => handleCloseClick()}
      >
        Cerrar
      </button>
    </BaseModal>
  );
}

export default ReservationModal;
