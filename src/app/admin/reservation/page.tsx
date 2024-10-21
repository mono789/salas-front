"use client";
import React from "react";
import Form from "./form";
import RoomDescription from "@/components/description";
import { SpecificRoomResponse } from "@/models/room";

/* TODO: Esta página puede que tenga más uso en el área de usuario. En las rutas regulares de salasinfo.
/  Podría tener uso en las rutas de las salas, para generar la reserva de las mismas.*/

const room: SpecificRoomResponse = {
  id: 1,
  computerAmount: 1,
  building: "20",
  roomNum: "20",
  roomName: "Sala de recreo",
  software: [{ id: 1, name: "Krita", version: "2.0.0" }],
  restrictions: [{ id: 1, description: "No se puede caminar en las mesas" }],
  implements: [
    { id: 1, name: "Tablero", state: "Más dañado que baño público" },
  ],
};

const Page = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center py-8 flex justify-center items-start"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <Form />
        <RoomDescription
          room={room}
          onReservationButtonClick={() => console.log("ola")}
        />
      </div>
    </div>
  );
};

export default Page;
