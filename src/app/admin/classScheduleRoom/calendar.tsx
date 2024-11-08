"use client";
import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ScheduleView = () => {
  const [selectedRoom, setSelectedRoom] = useState("20-238");
  const [date, setDate] = useState<Date | null>(new Date());

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.target.value);
  };

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (Array.isArray(value)) {
      setDate(value[0]); // Si es un rango de fechas, usa la primera fecha
    } else {
      setDate(value);
    }
  };

  const getSpanishDay = (date: Date): string => {
    const daysInSpanish = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    return daysInSpanish[date.getDay()];
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="text-gray-600 body-font">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg border border-gray-300 rounded-lg p-8 flex flex-col shadow-lg">
          <h2 className="text-gray-900 text-xl font-semibold title-font mb-5">
            Horario de clases semestrales
          </h2>
          <div className="flex items-start mb-4">
            <div className="relative w-4/5 mr-6">
              <label className="text-gray-700 dark:text-gray-200 text-sm">
                Selecciona la sala
              </label>
              <select
                id="room-selector"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                value={selectedRoom}
                onChange={handleRoomChange}
              >
                <option value="20-234">20-234</option>
                <option value="20-238">20-238</option>
                <option value="20-329">20-329</option>
                <option value="20-331">20-331</option>
                <option value="20-335">20-335</option>
                <option value="20-337">20-337</option>
                <option value="20-339">20-339</option>
              </select>
            </div>
            <div className="relative w-4/5 ml-4">
              <label className="text-gray-700 dark:text-gray-200 text-sm">
                Selecciona la fecha
              </label>
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="border border-gray-200 rounded-md"
                locale="es-ES" 
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-gray-900 text-lg font-semibold title-font mb-3">
              Horario para la sala {selectedRoom} el{" "}
              {date
                ? `${getSpanishDay(date)} ${date.toLocaleDateString("es-ES")}`
                : "Selecciona una fecha"}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-md">
                <h4 className="text-gray-900 text-md font-medium">
                  Formación ciudadana
                </h4>
                <p className="text-gray-700">Docente: John Doe</p>
                <p className="text-gray-700">Hora de inicio: 8:00 AM</p>
                <p className="text-gray-700">Hora de finalización: 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleView;
