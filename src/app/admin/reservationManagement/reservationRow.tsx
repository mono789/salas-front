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
  return (
    <div className="grid grid-cols-subgrid col-span-9 gap-x-1 justify-items-center items-center dark:bg-gray-900 px-4 py-4 text-sm font-medium border-t border-dashed">
      <div>{reservation.sala}</div>
      <div>{reservation.activity}</div>
      <div>{reservation.description}</div>
      <div>{reservation.status}</div>
      <div>{reservation.date}</div>
      <div>{reservation.startTime}</div>
      <div>{reservation.endTime}</div>
      <div>{reservation.user}</div>
      <div className="flex items-center gap-x-6">
        {reservation.status === "pendiente" ? (
          <>
            <button className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
              Aceptar
            </button>
            <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
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
