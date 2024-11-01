"use client";

import React, { useEffect, useState } from "react";
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
          status="Pendiente"
          date="Octubre 28"
          startTime="10am"
          endTime="3pm"
          user="Dummy acevedo"
        />
        {reservations.map((reservation) => (
          <ReservationRow
            key={reservation.id}
            id={reservation.id}
            sala={reservation.room.roomNum}
            activity={reservation.activityName}
            description={reservation.activityDescription}
            status={reservation.reservationState.state}
            date={reservation.startsAt}
            startTime={reservation.startsAt}
            endTime={reservation.endsAt}
            user={reservation.user.email}
          />
        ))}
      </Table>

      {/*<Management />*/}
    </div>
  );
};

export default Page;
