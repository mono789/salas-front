import React, { useState } from "react";

interface FiltersProps {
  softwareFilter: string;
  selectedDate: string;
  selectedTime: string;
  selectedSoftware: string[];
  selectedImplements: string[];
  showKeywordSection: boolean;
  showDateSection: boolean;
  showSoftwareSection: boolean;
  showImplementSection: boolean;
  toggleSection: (section: string) => void;
  handleSoftwareChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSoftwareCheckboxChange: (software: string) => void;
  handleImplementChange: (implement: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  softwareFilter,
  selectedDate,
  selectedTime,
  selectedSoftware,
  selectedImplements,
  showKeywordSection,
  showDateSection,
  showSoftwareSection,
  showImplementSection,
  toggleSection,
  handleSoftwareChange,
  handleDateChange,
  handleTimeChange,
  handleSoftwareCheckboxChange,
  handleImplementChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Botón para mostrar/ocultar filtros en móviles */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full py-3 text-base font-semibold text-gray-900 dark:text-white focus:outline-none flex items-center justify-center rounded-lg h-12"
      >
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      {/* Contenedor de filtros: oculto en móvil si showFilters es falso */}
      <div className={`${showFilters ? "block" : "hidden"} md:block`}>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filtrado por:</h2>

        {/* Filtro por palabra clave */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          <button
            onClick={() => toggleSection("keyword")}
            className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            <span>Palabra clave</span>
            <svg
              className={`w-5 h-5 transition-transform ${showKeywordSection ? "transform rotate-180" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showKeywordSection && (
            <div className="mt-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                type="text"
                placeholder="Ingrese una palabra clave"
                value={softwareFilter}
                onChange={handleSoftwareChange}
              />
            </div>
          )}
        </div>

        {/* Filtro de fecha y hora */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          <button
            onClick={() => toggleSection("date")}
            className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            <span>Fecha y Hora</span>
            <svg
              className={`w-5 h-5 transition-transform ${showDateSection ? "transform rotate-180" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showDateSection && (
            <div className="mt-2 space-y-2">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Fecha:</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hora:</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  value={selectedTime}
                  onChange={handleTimeChange}
                />
              </div>
            </div>
          )}
        </div>

        {/* Filtro de Software */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          <button
            onClick={() => toggleSection("software")}
            className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            <span>Software</span>
            <svg
              className={`w-5 h-5 transition-transform ${showSoftwareSection ? "transform rotate-180" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showSoftwareSection && (
            <div className="mt-2 space-y-2">
              {["Photoshop", "Zoom", "Office"].map((software) => (
                <label key={software} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    checked={selectedSoftware.includes(software)}
                    onChange={() => handleSoftwareCheckboxChange(software)}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{software}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtro de Implementos */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          <button
            onClick={() => toggleSection("implement")}
            className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            <span>Implementos</span>
            <svg
              className={`w-5 h-5 transition-transform ${showImplementSection ? "transform rotate-180" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showImplementSection && (
            <div className="mt-2 space-y-2">
              {["Proyector", "Pizarra", "Sistema de Sonido"].map((implement) => (
                <label key={implement} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    checked={selectedImplements.includes(implement)}
                    onChange={() => handleImplementChange(implement)}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{implement}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
