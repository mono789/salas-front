"use client";
import React from "react";
import Form from "./form";
import RoomDescription from "@/components/description";
import { SpecificRoomResponse } from "@/models/room";
import Page from '../../home/room/[sala]/page';

/* TODO: Esta página puede que tenga más uso en el área de usuario. En las rutas regulares de salasinfo.
/  Podría tener uso en las rutas de las salas, para generar la reserva de las mismas.*/

const RoomReservation = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center py-8 flex justify-center items-start"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <Page />
      </div>
    </div>
  );
};

export default RoomReservation;
