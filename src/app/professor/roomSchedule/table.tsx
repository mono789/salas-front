import React from "react";

const Table = () => {
  const getStatusData = () => {
    const rand = Math.random();
    if (rand > 0.66) {
      return { text: "Clase", classes: "text-red-500 bg-red-100/60" };
    } else if (rand > 0.33) {
      return { text: "Reserva", classes: "text-yellow-600 bg-yellow-100/60" };
    } else {
      return { text: "Libre", classes: "text-green-500 bg-green-100/60" };
    }
  };

  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const generateCells = () => {
    return [0, 1, 2, 3, 4, 5].map((_, index) => {
      const status = getStatusData();
      return (
        <td
          key={index}
          className="px-4 py-4 text-sm font-medium whitespace-nowrap"
        >
          <div
            className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
          >
            {status.text}
          </div>
        </td>
      );
    });
  };

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col mt-6 mb-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-max py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-max divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Hora/Día
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Lunes
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Martes
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Miércoles
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Jueves
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Viernes
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Sábado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {hours.map((hour) => (
                      <tr key={hour}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {`${hour}:00`}
                            </h2>
                          </div>
                        </td>
                        {generateCells()}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Table;
