'use client'
import React, { useState } from "react";

//añadir un icono en la parte superior derecha de la página oara buscar usando iconify
import { Icon } from '@iconify/react';
import searchIcon from '@iconify-icons/mdi/search';



const List = () => {
  // Lista de nombres de herramientas/tecnologías
  const tools = [
    "Visual Studio Code", "Android Studio", "NetBeans", "IntelliJ IDEA",
    "Java 8", "Java 17", "Java 11", "MySQL",
    "Mongo Compass", "Maria DB", "PostgreSQL", "VirtualBox",
    "PyCharm", "RStudio", "Postman", "Discord",
    "Arduino IDE", "Zoom", "Mars", "Docker",
    "Logisim", "Maven", "Windows", "Ubuntu"
  ];

  // Estado para los botones seleccionados
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // Función para manejar la selección de herramientas
  const handleButtonClick = (tool: string) => {
    setSelectedTools((prevSelected) =>
      prevSelected.includes(tool)
        ? prevSelected.filter((t) => t !== tool) // Si ya está seleccionado, lo quita
        : [...prevSelected, tool] // Si no está seleccionado, lo añade
    );
  };

  return (
    /*<div className="container mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Icon icon={searchIcon} width="30" height="30" />
      </div>*/
      <div className="grid grid-cols-4 gap-4 px-40">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(tool)}
            className={`px-4 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-80 ${
              selectedTools.includes(tool)
                ? "bg-blue-800 ring-blue-400"
                : "bg-blue-600 hover:bg-blue-500 focus:ring-blue-300"
            }`}
          >
            {tool}
          </button>
        ))}
      </div>
    //</div>
  );
};

export default List;
