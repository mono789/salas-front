import React from "react";

const AdminReserva = () => {
  const reservations = [
    {
      room: "20-234",
      status: "aceptada",
      date: "Junio 2, 2024",
      user: {
        name: "Arthur Melo",
        email: "authurmelo@example.com",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1",
      },
    },
    {
      room: "20-238",
      status: "rechazada",
      date: "Junio 5, 2024",
      user: {
        name: "Andi Lane",
        email: "andi@example.com",
        avatar:
          "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1",
      },
    },
    {
      room: "20-329",
      status: "pendiente",
      date: "Junio 5, 2024",
      user: {
        name: "Kate Morrison",
        email: "kate@example.com",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
      },
    },
    {
      room: "20-331",
      status: "aceptada",
      date: "Junio 23, 2024",
      user: {
        name: "Candice Wu",
        email: "candice@example.com",
        avatar:
          "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3",
      },
    },
    {
      room: "20-335",
      status: "pendiente",
      date: "Julio 1, 2024",
      user: {
        name: "Orlando Diggs",
        email: "orlando@example.com",
        avatar:
          "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3",
      },
    },
  ];

  return (
    <div>
      <section className="container px-4 mx-auto max-w-5xl mt-8 mb-10">
        <h2 className="text-center text-lg mb-4 mt-4 font-bold">
          Administración de reservas
        </h2>
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Sala
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Estado
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Fecha
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Usuario
                      </th>
                      <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {reservations.map((reservation, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                          {reservation.room}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                              reservation.status === "aceptada"
                                ? "text-emerald-500 bg-emerald-100/60"
                                : reservation.status === "rechazada"
                                ? "text-red-500 bg-red-100/60"
                                : "text-gray-500 bg-gray-100/60"
                            }`}
                          >
                            {reservation.status === "aceptada" && (
                              <>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </>
                            )}
                            {reservation.status === "rechazada" && (
                              <>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 3L3 9M3 3L9 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </>
                            )}
                            {reservation.status === "pendiente" && (
                              <>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                                    stroke="#667085"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </>
                            )}
                            <h2 className="text-sm font-normal">
                              {reservation.status.charAt(0).toUpperCase() +
                                reservation.status.slice(1)}
                            </h2>
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {reservation.date}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-8 h-8 rounded-full"
                              src={reservation.user.avatar}
                              alt=""
                            />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                {reservation.user.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {reservation.user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm whitespace-nowrap">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          >
            Anterior
          </a>

          <div className="items-center hidden md:flex gap-x-3">
            <a
              href="#"
              className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
            >
              1
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              ...
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              12
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              13
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              14
            </a>
          </div>

          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          >
            Siguiente
          </a>
        </div>
      </section>
    </div>
  );
};

export default AdminReserva;
