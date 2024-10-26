"use client";

import React, { useEffect, useState } from "react";
import Management from "./management";
import ReservationService from "@/services/api/reservation.service";
import { ReservationResponse } from "@/models/reservation";
import ReservationRow from "./reservationRow";

const Page = () => {
  const [reservations, setReservations] = useState<Array<ReservationResponse>>(
    []
  );

  useEffect(() => {
    ReservationService.getAll()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((fetchedReservations?: Array<ReservationResponse>) => {
        if (fetchedReservations) setReservations(fetchedReservations);
      });
  }, []);

  console.log(reservations);

  return (
    <div
      className="bg-cover bg-center py-8 px-4"
      style={{
        backgroundImage: "url('/assets/bottom.png')",
      }}
    >
      <div className="grid grid-cols-9 justify-items-center items-center bg-gray-50 dark:bg-gray-800 border">
        <div>Sala</div>
        <div>Actividad</div>
        <div>Descripcion</div>
        <div>Estado</div>
        <div>Fecha</div>
        <div>Hora inicio</div>
        <div>Hora fin</div>
        <div>Usuario</div>
        <div>Acciones</div>
        <ReservationRow
          id={1}
          sala="20-234"
          activity="clase"
          description="practica de análisis 2"
          status="pendiente"
          date="Octubre 28"
          startTime="10am"
          endTime="3pm"
          user="Dummy acevedo"
        />
        <ReservationRow
          id={2}
          sala="20-238"
          activity="seminario"
          description="esas cosas del jefe de sistemas"
          status="aprobada"
          date="Octubre 30"
          startTime="6pm"
          endTime="8pm"
          user="Dummy Santamaria"
        />
      </div>

      <Management />
    </div>
  );
};

export default Page;
