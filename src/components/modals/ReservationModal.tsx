"use client";
import { ReservationRequest } from "@/models/reservation";
import BaseModal from "./BaseModal";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  DEFAULT_HOURS,
  DEFAULT_RESERVATION_END_HOURS,
  DEFAULT_RESERVATION_FORM_DATA,
  SUNDAYS_NOT_ALLOWED_MESSAGE,
  UTC_SUNDAY_VALUE,
} from "@/utils/constants/component.constants";
import { getDateRightNow } from "@/utils/helpers.utils";

type ReservationModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  saveReservation: (reservation: ReservationRequest) => void;
};

function ReservationModal({
  opened,
  setOpened,
  saveReservation,
}: ReservationModalProps) {
  // States
  const [reservation, setReservation] = useState<ReservationRequest>(
    DEFAULT_RESERVATION_FORM_DATA,
  );
  const [endsAtOptions, setEndsAtOptions] = useState<Array<string>>(
    DEFAULT_RESERVATION_END_HOURS,
  );

  // Form handle data
  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setReservation({ ...reservation, [id]: value });
  }

  function handleChangeDateInput(event: ChangeEvent<HTMLInputElement>) {
    const date = new Date(event.target.value);
    const { id, value } = event.target;
    if (date.getUTCDay() === UTC_SUNDAY_VALUE) {
      event.preventDefault();
      event.target.value = "";
      alert(SUNDAYS_NOT_ALLOWED_MESSAGE); // TODO: Handle this in a better way
    }
    setReservation({ ...reservation, [id]: value });
  }

  function handleChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { id, value } = event.target;
    console.log(id, value);
  }

  function handleCloseClick() {
    setOpened(false);
  }

  function handleOnFormSumbit(event: FormEvent) {
    event.preventDefault();
    saveReservation(reservation);
  }

  return (
    <BaseModal open={opened}>
      <form className="flex flex-col gap-5" onSubmit={handleOnFormSumbit}>
        <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          Nueva Reserva
        </h3>

        <div>
          <label htmlFor="activityName">Nombre de la Actividad</label>
          <input
            id="activityName"
            className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Actividad"
            aria-label="Activity"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="activityDescription">Descripción</label>
          <input
            id="activityDescription"
            className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Descripción"
            aria-label="Description"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="date">Día</label>
          <input
            id="date"
            className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="date"
            min={getDateRightNow()}
            placeholder="yyyy-mm-dd"
            aria-label="date"
            onChange={handleChangeDateInput}
          />
        </div>
        <div>
          <label htmlFor="startsAt">Hora de Inicio</label>
          <select
            id="startsAt"
            className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            aria-label="startHour"
            onChange={(e) => {
              const index = DEFAULT_HOURS.findIndex(
                (hour) => hour == e.target.value,
              );
              setEndsAtOptions(DEFAULT_HOURS.slice(index));
              handleChangeSelect(e);
            }}
          >
            {DEFAULT_HOURS.slice(0, DEFAULT_HOURS.length - 1).map(
              (hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <label htmlFor="endsAt">Hora de Término</label>
          <select
            id="endsAt"
            className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            aria-label="endHour"
            onChange={handleChangeSelect}
          >
            {endsAtOptions.map((hour, index) => (
              <option key={index} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
          Guardar reserva
        </button>
      </form>
      <button
        className="w-full my-2 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-green-600 focus:outline-none"
        onClick={() => handleCloseClick()}
      >
        Cerrar
      </button>
    </BaseModal>
  );
}

export default ReservationModal;
