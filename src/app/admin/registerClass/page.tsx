"use client";
import React from "react";
import Form from "./form";
import RoomDescription from "@/components/description";
import { RoomResponse, SpecificRoomResponse } from "@/models/room";

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
      <div className="flex justify-center items-start">
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
