"use client";
import RoomDescription from "@/components/description";
import ReservationModal from "@/components/modals/ReservationModal";
import RegisterClassModal from "@/components/modals/RegisterClassModal";

import { RoomScheduleResponse, SpecificRoomResponse } from "@/models/room";
import RoomService from "@/services/api/room.service";
import { useEffect, useState } from "react";
import { LocalStorageService } from "@/services/localstorage/local-storage.service";
import UserService from "@/services/api/user.service";
import { UserResponse } from "@/models/user";

const Page = ({ params }: any) => {
  const { sala } = params;
  const [room, setRoom] = useState<SpecificRoomResponse>();
  const [schedule, setSchedule] = useState<RoomScheduleResponse>();
  const [openReservationModal, setOpenReservationModal] =
    useState<boolean>(false);
  const [openRegisterClassModal, setOpenRegisterClassModal] =
  useState<boolean>(false);
  const [userData, setUserData] = useState<UserResponse>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = LocalStorageService.getItem("user") as UserResponse;
        console.log("OLD USER DATA: ", userData);
  
        if (storedUser?.id) {
          // Si hay un usuario almacenado con ID, obtenemos la información del usuario
          const userResponse = await UserService.getOne(storedUser.id).then((response) => response.json());
          const role = userResponse.role.roleName;
          setUserData(userResponse);
          console.log("NEW DATA:", userData);
          console.log("USER RESPONSE: ", userResponse);
        } else {
          setUserData(storedUser);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
  
    fetchUser();
    // La lista de dependencias está vacía para que el efecto solo se ejecute una vez al montar
  }, []);
  

  useEffect(() => {
    RoomService.getOne(sala)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((fetchedRoom?: SpecificRoomResponse) => {
        if (fetchedRoom) setRoom(fetchedRoom);
      });

    RoomService.getSchedule(sala)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((fetchedSchedule?: RoomScheduleResponse) => {
        if (fetchedSchedule) setSchedule(fetchedSchedule);
        // TODO: Create Reservation view
      });
  }, []);

  return (
    <div className="flex flex-col justify-around place-items-center md:flex-row p-3">
      <RoomDescription
        room={room}
        onReservationButtonClick={() =>
          setOpenReservationModal(!openReservationModal)
        }
        userData={userData}
        onRegisterClassButtonClick={() =>
          setOpenRegisterClassModal(!openRegisterClassModal)}
      />
      <ReservationModal
        opened={openReservationModal}
        setOpened={setOpenReservationModal}
        saveReservation={(res) => {}}
        room={room}
        userData={userData}
      ></ReservationModal>
      <RegisterClassModal
        opened={openRegisterClassModal}
        setOpened={setOpenRegisterClassModal}
        saveReservation={(res) => {}}
        room={room}
        userData={userData}
      ></RegisterClassModal>
      <div className="flex flex-col place-items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-5 md:ml-5 p-2">
        {schedule ? (
          <>
            <h2 className="font-bold">Horario y Disponibilidad</h2>
            {/* 
        Se maneja un grid para representarlo, las celdas de Horas tienen la mitad de la longitud de las demás.
        Supongo yo que se puede obtener la disponibilidad y relacionar los días con las horas. Para posteriormente juntarlas en una fila
        Este componente de fila debería poder integrarse en el grid sin invonvenientes.
        */}
            <div className="grid grid-cols-7 col-span-5 gap-2 place-items-center">
              <div>Horas</div>
              <div className="col-span-2">Hoy</div>
              <div className="col-span-2">Mañana</div>
              <div className="col-span-2">Seleccionar fecha</div>
              <div>6am</div>
              <button className="bg-lime-500 dark:bg-teal-900 col-span-2 text-center rounded-full px-2">
                Libre
              </button>
              <button className="bg-orange-500 col-span-2 text-center rounded-full px-2">
                Ocupado
              </button>
              <button className="bg-amber-500 col-span-2 text-center rounded-full px-2">
                Reservado
              </button>
              <div>7am</div>
              <div className="bg-lime-500 dark:bg-teal-900 col-span-2 text-center rounded-full px-2">
                Libre
              </div>
              <div className="bg-orange-500 col-span-2 text-center rounded-full px-2">
                Ocupado
              </div>
              <div className="bg-amber-500 col-span-2 text-center rounded-full px-2">
                Reservado
              </div>
              <div>8am</div>
              <div className="bg-lime-500 dark:bg-teal-900 col-span-2 text-center rounded-full px-2">
                Libre
              </div>
              <div className="bg-orange-500 col-span-2 text-center rounded-full px-2">
                Ocupado
              </div>
              <div className="bg-amber-500 col-span-2 text-center rounded-full px-2">
                Reservado
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Page;
