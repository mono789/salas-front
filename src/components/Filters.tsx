import React, { useState, useEffect } from "react";
import ApplicationService from "@/services/api/application.service"
import ImplementService from "@/services/api/implement.service"
import { ApplicationResponse } from "@/models/application";
import { ImplementResponse } from "@/models/implement";
import {ChevronUp , ChevronDown} from "lucide-react";


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
  const [softwareOptions, setSoftwareOptions] = useState<ApplicationResponse[]>([]);
  const [implementOptions, setImplementOptions] = useState<ImplementResponse[]>([]);

  useEffect(() => {
    const fetchSoftwareOptions = async () => {
      try {
        const response = await ApplicationService.getAll();
        const data: ApplicationResponse[] = await response.json(); // Convertimos la respuesta a JSON
        setSoftwareOptions(data);
      } catch (error) {
        console.error("Error al obtener las opciones de software:", error);
      }
    };

    const fetchImplementOptions = async () => {
      try {
        const response = await ImplementService.getAll();
        const data: ImplementResponse[] = await response.json(); // Convertimos la respuesta a JSON
        setImplementOptions(data);
      } catch (error) {
        console.error("Error al obtener las opciones de implementos:", error);
      }
    };

    fetchSoftwareOptions();
    fetchImplementOptions();
  }, []);
  

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
          {showKeywordSection ? (
            <ChevronUp className="w-5 h-5 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform" />
          )}
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
          {showDateSection ? (
            <ChevronUp className="w-5 h-5 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform" />
          )}
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

      {/* Filtro por Software */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button
          onClick={() => toggleSection("software")}
          className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        >
          <span>Software</span>
          {showSoftwareSection ? (
            <ChevronUp className="w-5 h-5 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform" />
          )}
        </button>
        {showSoftwareSection && (
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto"> {/* max-h-40 y overflow-y-auto */}
            {softwareOptions.map((software) => (
              <label key={software.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                  checked={selectedSoftware.includes(software.name)}
                  onChange={() => handleSoftwareCheckboxChange(software.name)}
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{software.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filtro por Implementos */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button
          onClick={() => toggleSection("implement")}
          className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        >
          <span>Implementos</span>
          {showImplementSection ? (
            <ChevronUp className="w-5 h-5 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform" />
          )}
        </button>
        {showImplementSection && (
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto"> {/* max-h-40 y overflow-y-auto */}
            {implementOptions.map((implement) => (
              <label key={implement.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                  checked={selectedImplements.includes(implement.name)}
                  onChange={() => handleImplementChange(implement.name)}
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{implement.name}</span>
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
