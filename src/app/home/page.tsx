"use client";

import RoomCard from "@/components/RoomCard";
import React, { useState } from "react";

const roomsData = [
  { blockNumber: "Bloque 20", roomNumber: "20-331" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
];

const Page = () => {
  const [menuAvanzado, useMenuAvanzado] = useState(false);
  const [selectedOptions, useSelectedOptions] = useState(Array<string>);

  const useToggleMenuAvanzado = () => {
    useMenuAvanzado(!menuAvanzado);
  };

  const useAddSelectedOptions = (htmlElement) => {
    const newList = selectedOptions.slice();

    if (newList.includes(htmlElement.target.id)) {
      const index = newList.indexOf(htmlElement.target.id);
      newList.splice(index, 1);
    } else {
      newList.push(htmlElement.target.id);
    }
    useSelectedOptions(newList);
    console.log(newList);
  };

  return (
    <div>
      <div className="flex flex-col justify-start p-3">
        <div className="w-full mt-4">
          <input
            className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            placeholder="Filtro más importante"
          />

          <div className="flex justify-between my-1.5">
            {
              // Botón para desplegar el menú avanzado del filtro
            }
            <button
              x-cloak="true"
              className="m-2 text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
              onClick={useToggleMenuAvanzado}
            >
              <svg
                x-show="!isOpen"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
            {
              // TODO: Los botones de filtros son candidatos para volverlos componente
            }
            <button
              id="salones-libres"
              className={`p-2 bg-lime-500 dark:bg-teal-950 ${
                selectedOptions.includes("salones-libres")
                  ? "opacity-100"
                  : "opacity-70"
              } border-2 rounded-md`}
              onClick={useAddSelectedOptions}
            >
              Salones libres
            </button>
            <button
              id="salones-ocupados"
              className={`p-2 bg-lime-500 dark:bg-teal-950 ${
                selectedOptions.includes("salones-ocupados")
                  ? "opacity-100"
                  : "opacity-70"
              } duration-100 dark:bg-teal-950 border-2 rounded-md`}
              onClick={useAddSelectedOptions}
            >
              Salones ocupados
            </button>
          </div>
          {menuAvanzado ? ( // También rediseñar esto
            <div>menú avanzado</div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 lg:py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {roomsData.map((room, index) => (
                  <div
                    key={index}
                    className="flex justify-center lg:w-1/4 md:w-1/2 p-4 w-full"
                  >
                    <RoomCard
                      blockNumber={room.blockNumber}
                      roomNumber={room.roomNumber}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
