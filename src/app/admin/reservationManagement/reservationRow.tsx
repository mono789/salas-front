import StatusBadge from "@/components/statusBadge";
import ReservationService from "@/services/api/reservation.service";

type ReservationRowProps = {
  id: number;
  sala: string;
  activity: string;
  description: string;
  status: string;
  date: string; //TODO: Luego recibiría Date, supongo.
  startTime: string; //Lo mismo pero con Time.
  endTime: string;
  user: string;
};

const ReservationRow = (reservation: ReservationRowProps) => {
  const acceptReservationHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    ReservationService.accept(reservation.id)
      .then((response) => {
        if (response.ok) alert("Reserva aceptada");
      })
      .catch(() => alert("Hubo un problema aceptando la reserva"));
  };

  const rejectReservationHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    ReservationService.reject(reservation.id)
      .then((response) => {
        if (response.ok) alert("Reserva rechazada");
      })
      .catch(() => alert("Hubo un problema rechazando la reserva"));
  };

  return (
    <div className="grid grid-cols-subgrid col-span-9 gap-x-1 justify-items-center items-center dark:bg-gray-900 px-4 py-4 text-sm font-medium border-t border-dashed">
      <div>{reservation.sala}</div>
      <div>{reservation.activity}</div>
      <div>{reservation.description}</div>
      <StatusBadge status={reservation.status} />
      <div>{reservation.date}</div>
      <div>{reservation.startTime}</div>
      <div>{reservation.endTime}</div>
      <div>{reservation.user}</div>
      <div className="flex items-center gap-x-6">
        {reservation.status === "Pendiente" ? (
          <>
            <button
              className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
              onClick={acceptReservationHandler}
            >
              Aceptar
            </button>
            <button
              className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
              onClick={rejectReservationHandler}
            >
              Rechazar
            </button>
          </>
        ) : (
          <span className="text-gray-300">-</span>
        )}
      </div>
    </div>
  );
};

export default ReservationRow;
