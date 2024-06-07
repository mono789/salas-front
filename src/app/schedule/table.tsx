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
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            6:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            7:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            8:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            9:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            10:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            11:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            12:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            13:00
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {(() => {
                          const status = getStatusData();
                          return (
                            <div
                              className={`inline px-3 py-1 text-sm font-normal rounded-full ${status.classes}`}
                            >
                              {status.text}
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
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
