"use client";
import { ClassReservationRequest, SessionRequest } from "@/models/reservation";
import { UserResponse } from "@/models/user";

import ReservationService from "@/services/api/reservation.service";
import UserService from "@/services/api/user.service";

import { ReservationResponse } from "@/models/reservation";
import BaseModal from "./BaseModal";
import { Title } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
  DEFAULT_HOURS,
  DEFAULT_RESERVATION_FORM_DATA,
  DEFAULT_RESERVATION_TYPES
} from "@/utils/constants/component.constants";
import {SpecificRoomResponse } from "@/models/room";
import { LocalStorageService } from "@/services/localstorage/local-storage.service";
import { useRouter } from "next/navigation";
import { ReservationType, WeekDay } from "@/models/enums";
import { start } from "repl";

type RegisterClassModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  saveReservation: (reservation: ClassReservationRequest) => void;
  room?: SpecificRoomResponse;
  userData?: UserResponse;
};

function RegisterClassModal({ opened, setOpened, room, userData }: RegisterClassModalProps) {
  const router = useRouter();
  const [classReservation, setClassReservation] = useState<ClassReservationRequest>(DEFAULT_RESERVATION_FORM_DATA);
  const [error, setError] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [createdReservation, setCreatedReservation] = useState<ReservationResponse>();
  const [userRole, setUserRole] = useState<string>("");
  const [sessions, setSessions] = useState<SessionRequest[]>([]); // Estado para las sesiones registradas
  const [day, setDay] = useState<WeekDay | undefined>(undefined);
  const [startsAt, setStartsAt] = useState<string>("");
  const [endsAt, setEndsAt] = useState<string>("");
  const [semesterEndsAt, setSemesterEndsAt] = useState<string>("");
  const [semesterStartsAt, setSemesterStartsAt] = useState<string>("");
  const [activityName, setActivityName] = useState<string>("");
  const [activityDescription, setActivityDescription] = useState<string>("");
  const weekDayMap: Record<WeekDay, string> = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado"
};

  function handleCloseClick() {
    setOpened(false);
  }

  function handleCleanClick() {
    setSessions([]);
  }

  function handleAddClass() {
    console.log("RESERVATION: ",classReservation)
    if (sessions.length === 0) {
      setError("Todos los campos son obligatorios");
      return;
    }

    classReservation.roomId = room?.id;
    classReservation.userId = userData?.id;
    classReservation.sessions= sessions;
    classReservation.semesterStartsAt = semesterStartsAt;
    classReservation.semesterEndsAt = semesterEndsAt;
    classReservation.activityName = activityName;
    classReservation.activityDescription = activityDescription;
    handleSaveClass();
  }

  //si la reserva se creó correctamente y presiona finalizar, se redirige al home dependiendo del role
  function handleFinishClick() {
    if (userData?.role.roleName) {
      const path = userData?.role.roleName === "ADMIN" ? "/admin" : "/home";
      router.push(path);
    }
  }

  function handleAddSession() {
  
    // Crear una nueva sesión y agregarla al estado de sesiones
    const newSession: SessionRequest = {
      day: day,
      startsAt: startsAt,
      endsAt: endsAt,
    };
  
    setSessions((prevSessions) => [...prevSessions, newSession]); // Agrega la nueva sesión
    setError(""); // Limpiar el mensaje de error, si lo hubiera
    console.log("SESSIONS: ", sessions);
  }

  const handleSaveClass = async () => {
    console.log("NEW RESERVATION: ",classReservation)
    try {
      const response = await ReservationService.saveClass(classReservation);
  
      if (!response.ok) {
        // Extrae el mensaje de error de la respuesta
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la reserva.");
      }
  
      const data: ReservationResponse = await response.json();
      setCreatedReservation(data);
      console.log("Created: ",createdReservation);
      console.log("DATA: ", data);
      setError(""); // Limpia el error si la reserva fue exitosa
      setShowConfirmationModal(true); // Muestra el modal de confirmación
      setOpened(false); // Cierra el modal de reserva
  
    } catch (error: any) {
      setCreatedReservation(undefined);
      classReservation.semesterStartsAt='';
      classReservation.semesterEndsAt=''; // Limpia los datos de reserva en caso de error
      setError(error.message); // Establece el mensaje de error específico del backend
    }
    console.log("Created: ",createdReservation);

  };
  



  return (
    <>
      <BaseModal open={opened}>
      <div className="bg-gray-100 p-6 overflow-y-auto max-h-85">
            <h2 className="text-gray-900 text-xl font-semibold title-font mb-5">
              Gestión de horarios de clase
            </h2>
            <div className="relative mb-4">
              <label >
                Nombre de la clase
              </label>
              <input
                id="class-name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                onChange={(e) => setActivityName(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label >
                Docente
              </label>
              <input
                id="teacher"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                onChange={(e) => setActivityDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="relative mb-4">
              <label htmlFor="day">Inicio semestre</label>
              <input
                id="day"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                onChange={(e) => setSemesterStartsAt(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="day">Fin semestre</label>
              <input
                id="day"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                onChange={(e) => setSemesterEndsAt(e.target.value)}
              />
            </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <label >
                Día
              </label>
              <select
                id="day"
                value={day || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                onChange={(e) => setDay(e.target.value as WeekDay)}>
                <option value="" disabled>
                    Selecciona un día
                </option>
                {Object.entries(weekDayMap).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select> 
            </div>
              <div className="relative">
              <label htmlFor="startsAt">Hora inicio</label>
                <select
                id="startsAt"
                className="block w-full px-4 py-2 mt-2 placeholder-gray-400 border border-gray-200 rounded-lg dark:bg-gray-800"
                onChange={(e) => setStartsAt(e.target.value)}
                value={startsAt || ""}
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
              <div className="relative">
              <label htmlFor="endsAt">Hora Fin</label>
              <select
                id="endsAt"
                className="block w-full px-4 py-2 mt-2 placeholder-gray-400 border border-gray-200 rounded-lg dark:bg-gray-800 overflow-y-auto"
                onChange={(e) => setEndsAt(e.target.value)}
                value={endsAt || ""}
                style={{ maxHeight: '150px', overflowY: 'auto' }} 
              >
                <option value="" disabled>
                  Fin
                </option>
                {DEFAULT_HOURS.slice(0, -1).map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleAddSession}>
                Agregar sesión
              </button>
              <button
              type="button"
              className="px-8 py-2.5 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={handleCloseClick}
            >
              Cerrar
            </button>
            </div>
        </div>
        {/* Tabla de sesiones registradas */}
        {sessions.length > 0 && (
          <div >
            <div className="overflow-y-auto max-h-40">
            <table className="w-full mt-6 border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Día</th>
                  <th className="px-4 py-2">Hora de Inicio</th>
                  <th className="px-4 py-2">Hora de Finalización</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">{weekDayMap[session.day as WeekDay]} {/* Conversión a valor */}</td>
                    <td className="px-4 py-2 border">{session.startsAt}</td>
                    <td className="px-4 py-2 border">{session.endsAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="flex justify-center gap-4 mt-6"> {/* Cambia gap a justify-between para más espacio */}
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                onClick={handleAddClass}
              >
                Registrar clases
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={handleCleanClick}
              >
                Limpiar
              </button>
            </div>
          </div>
          
        )}
      </BaseModal>

      {console.log("createdReservation", createdReservation)}

      {createdReservation && showConfirmationModal && (
  <BaseModal open={showConfirmationModal}>
    <h3 className="mt-2 text-xl font-semibold text-center text-gray-800 dark:text-white md:mt-0">
      CLASE GENERADA
    </h3>
    <hr className="my-2" />
    <div className="text-center">
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Nombre clase:</h2>
        <p>{activityName}</p>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Docente:</h2>
        <p>{activityDescription}</p>
      </div>
      <hr className="my-2" />
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Inicio semestre:</h2>
        <p>{semesterStartsAt}</p>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold mr-2">Fin semestre:</h2>
        <p>{semesterEndsAt}</p>
      </div>
      <hr className="my-2" />
      <div>
        <h2>Reservas</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
            <th className="py-3 px-6 text-left">Inicio</th>
              <th className="py-3 px-6 text-left">Fin</th>
              <th className="py-3 px-6 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Array.isArray(createdReservation) && createdReservation.map((reservation: ReservationResponse) => (
              <tr key={reservation.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2 border">{reservation.startsAt}</td>
                <td className="px-4 py-2 border">{reservation.endsAt}</td>
                <td className="px-4 py-2 border">{reservation.reservationState.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
export default RegisterClassModal;
