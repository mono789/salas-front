"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/mdi/search";

const List = () => {
  const implementsList = [
    "Aire acondicionado",
    "Video beam",
    "Tablero",
    "Marcadores",
    "Pantallas",
    "Sillas",
    "Mesas",
    "Proyector",
    "Sonido",
    "Conexión Wi-Fi",
    "Cámaras",
  ];

  const [selectedImplements, setSelectedImplements] = useState<string[]>([]);

  const handleButtonClick = (implement: string) => {
    setSelectedImplements(
      (prevSelected) =>
        prevSelected.includes(implement)
          ? prevSelected.filter((t) => t !== implement) // Si ya está seleccionado, lo quita
          : [...prevSelected, implement] // Si no está seleccionado, lo añade
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-4 px-40">
        {implementsList.map((implement, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(implement)}
            className={`px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-80 ${
              selectedImplements.includes(implement)
                ? "bg-blue-800 ring-blue-400"
                : "bg-blue-600 hover:bg-blue-500 focus:ring-blue-300"
            }`}
          >
            {implement}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Icon icon={searchIcon} width="30" height="30" />
      </div>
    </div>
  );
};

export default List;
