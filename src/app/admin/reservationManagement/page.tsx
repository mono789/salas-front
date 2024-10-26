"use client";

import React, { useEffect, useState } from "react";
import Management from "./management";
import ReservationService from "@/services/api/reservation.service";
import { ReservationResponse } from "@/models/reservation";
import ReservationRow from "./reservationRow";
import Table from "@/components/table";

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

  const tableHeaders = [
    "Sala",
    "Actividad",
    "Descripcion",
    "Estado",
    "Fecha",
    "Hora inicio",
    "Hora fin",
    "Usuario",
    "Acciones",
  ];

  return (
    <div
      className="bg-cover bg-center py-8 px-4"
      style={{
        backgroundImage: "url('/assets/bottom.png')",
      }}
    >
      <Table tableHeaders={tableHeaders}>
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
      </Table>

      <Management />
    </div>
  );
};

export default Page;
