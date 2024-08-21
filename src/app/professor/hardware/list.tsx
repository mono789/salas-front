"use client";
import React, { useState } from "react";

import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/mdi/search";

const List = () => {
  const tools = [
    // Procesadores
    "Intel Core i9-11900K",
    "AMD Ryzen 9 5900X",
    "Intel Core i7-11700K",
    "AMD Ryzen 7 5800X",

    // RAM
    "8GB DDR4 RAM",
    "16GB DDR4 RAM",
    "32GB DDR4 RAM",

    // Discos duros y SSDs
    "1TB SSD",
    "2TB HDD",
    "4TB HDD",
    "1TB SSD",

    // Tarjetas gráficas
    "NVIDIA GeForce RTX 3080",
    "AMD Radeon RX 6800 XT",
    "NVIDIA GeForce RTX 3070",
    "AMD Radeon RX 6700 XT",

    // Marcas
    "Apple MacBook Pro",
    "Dell XPS 13",
    "HP Spectre x360",
    "Lenovo ThinkPad",

    // Sistemas operativos
    "Windows 10 Pro",
    "Ubuntu 20.04 LTS",
    "macOS Big Sur",
    "Fedora 34",
    "Linux",
  ];

  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const handleButtonClick = (tool: string) => {
    setSelectedTools(
      (prevSelected) =>
        prevSelected.includes(tool)
          ? prevSelected.filter((t) => t !== tool) // Si ya está seleccionado, lo quita
          : [...prevSelected, tool] // Si no está seleccionado, lo añade
    );
  };

  return (
    <div className="container mx-auto p-6">
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
      <div className="flex justify-center mt-8">
        <Icon icon={searchIcon} width="30" height="30" />
      </div>
    </div>
  );
};

export default List;
