import { SpecificRoomResponse } from "@/models/room";
import { mapRoomName } from "@/utils/map.utils";
import React from "react";
import { UserResponse } from "@/models/user";


type RoomDescriptionProps = {
  room?: SpecificRoomResponse;
  onReservationButtonClick: () => void;
  userData?: UserResponse; 
  onRegisterClassButtonClick?: () => void;
};

const RoomDescription = ({
  room,
  onReservationButtonClick,
  userData,
  onRegisterClassButtonClick
}: RoomDescriptionProps) => {
  return (
    <>
      {room ? (
        <div>
          <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex justify-center -mt-16 md:justify-end">
              <img
                className="object-cover w-20 h-20 border-2 border-green-500 rounded-full dark:border-green-400"
                alt="Computador"
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>

            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
              {mapRoomName(room)}
            </h2>

            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              <div>
                <h1 className="text-green-600">Restricciones:</h1>
                {room.restrictions.map((restriction) => {
                  return (
                    <span key={restriction.id}>{restriction.description}</span>
                  );
                })}
              </div>
              <div className="mt-2">
                <h1 className="text-green-600">Número de equipos:</h1>
                <span>{room.computerAmount}</span>
              </div>
              <div className="mt-2">
                <h1 className="text-green-600">Implementos:</h1>
                {room.implements.map((implement) => {
                  return (
                    <span key={implement.id}>
                      {implement.name} - {implement.state}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="mt-2">
              <h1 className="text-green-600">Software:</h1>
              {room.software.map((application) => {
                return (
                  <span key={application.id}>
                    {application.name} - {application.version}
                  </span>
                );
              })}
            </div>
            <div className="flex justify-start gap-4 mt-5 mb-3">
              <button
                onClick={onReservationButtonClick}
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Generar reserva
              </button>
              {userData?.role.roleName === "ADMIN" && (
                <button
                  onClick={onRegisterClassButtonClick}
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Registrar clase
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default RoomDescription;
