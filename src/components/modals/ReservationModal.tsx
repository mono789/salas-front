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

  function handleOnFormSubmit(event: FormEvent) {
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
    <>
      <BaseModal open={opened}>
        <form onSubmit={handleOnFormSubmit} className="p-4">
          <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white text-center">
            Nueva Reserva
          </h3>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
          <label htmlFor="activityName" className="block mb-1 font-medium">
              Actividad
            </label>
          <input
            id="activityName"
            className="block w-full px-4 py-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Nombre de la actividad"
            aria-label="Activity Name"
          onChange={handleChangeInput}
          />
          </div>

          <div className="mb-4">
          <label htmlFor="activityDescription" className="block mb-1 font-medium">
              Descripción
            </label>
          <input
            id="activityDescription"
            className="block w-full px-4 py-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Descripción"
            aria-label="Description"
          onChange={handleChangeInput}
          />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="day" className="block mb-1 font-medium">
                Día
              </label>
              <input
                id="day"
                type="date"
                className="block w-full px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg dark:bg-gray-800"
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label htmlFor="startsAt" className="block mb-1 font-medium">
                Hora inicio
              </label>
              <select
                id="startsAt"
                className="block w-full px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg dark:bg-gray-800"
                onChange={handleChangeSelect}
                value={reservation.startsAt || ""}
              >
                <option value="" disabled>
                  Selecciona una hora de inicio
                </option>
                {DEFAULT_HOURS.slice(0, -1).map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="endsAt" className="block mb-1 font-medium">
                Hora fin
              </label>
              <select
                id="endsAt"
                className="block w-full px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg dark:bg-gray-800"
                onChange={handleChangeSelect}
                value={reservation.endsAt || ""}
              >
                <option value="" disabled>
                  Selecciona una hora de término
                </option>
                {DEFAULT_HOURS.slice(1).map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button type="submit" className="px-8 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 font-medium">
              Guardar reserva
            </button>
            <button
              type="button"
              className="px-8 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 font-medium"
              onClick={handleCloseClick}
            >
              Cerrar
            </button>
          </div>
        </form>
      </BaseModal>


      {showConfirmationModal && createdReservation && (
  <BaseModal open={showConfirmationModal}>
    <h3 className="mt-2 text-xl font-semibold text-center text-gray-800 dark:text-white md:mt-0">
      RESERVA GENERADA
    </h3>
    <hr className="my-2" />
    <div className="text-center">
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Estado reserva:</h2>
        <p>{createdReservation.reservationState.state}</p>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Actividad:</h2>
        <p>{createdReservation.activityName}</p>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Descripción:</h2>
        <p>{createdReservation.activityDescription}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Inicio:</h2>
        <p>{createdReservation.startsAt}</p>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Fin:</h2>
        <p>{createdReservation.endsAt}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Sala:</h2>
        <p>
          {'Bloque ' +
            `${room?.building ? room.building + '-' : ''}${room?.roomNum ?? ''}${
              room?.subRoom && room.subRoom !== 0 ? ' Subsala ' + room.subRoom : ''
            }${room?.roomName ? ' ' + room.roomName : ''}`}
        </p>
      </div>
      <hr className="my-2" />
      <button
      className="px-8 py-2.5 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
      onClick={handleFinishClick}
    >
      Finalizar
    </button>
    </div>
    
  </BaseModal>
)}
    </>
  );
}

export default ReservationModal;
