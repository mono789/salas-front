import React from "react";

const Form = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-xl font-semibold title-font mb-5">
              Gestión de horarios de clase
            </h2>
            <div className="relative mb-4">
              <label className="text-gray-700 dark:text-gray-200 text-sm">
                Nombre de la clase
              </label>
              <input
                id="class-name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="relative mb-4">
              <label className="text-gray-700 dark:text-gray-200 text-sm">
                Docente
              </label>
              <input
                id="teacher"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="relative mb-4">
              <label className="text-gray-700 dark:text-gray-200 text-sm">
                Día de la semana
              </label>
              <select
                id="day"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
              >
                <option value="monday">Lunes</option>
                <option value="tuesday">Martes</option>
                <option value="wednesday">Miércoles</option>
                <option value="thursday">Jueves</option>
                <option value="friday">Viernes</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="text-gray-700 dark:text-gray-200 text-sm">
                  Hora de inicio
                </label>
                <input
                  id="start-time"
                  type="time"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                />
              </div>
              <div className="relative">
                <label className="text-gray-700 dark:text-gray-200 text-sm">
                  Hora de finalización
                </label>
                <input
                  id="end-time"
                  type="time"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
                Registrar clase
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;