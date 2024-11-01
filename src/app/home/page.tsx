"use client"

import RoomCard from "@/components/RoomCard";
import Filters from "@/components/Filters";
import { RoomResponse } from "@/models/room";
import RoomService from "@/services/api/room.service";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [rooms, setRooms] = useState<Array<RoomResponse>>([]);
  const [softwareFilter, setSoftwareFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [selectedImplements, setSelectedImplements] = useState<string[]>([]);
  const [showKeywordSection, setShowKeywordSection] = useState(true);
  const [showDateSection, setShowDateSection] = useState(true);
  const [showSoftwareSection, setShowSoftwareSection] = useState(true);
  const [showImplementSection, setShowImplementSection] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Filtrar por software en palabra clave y en checkboxes
        let softwareFilterValue = '';
        if (selectedSoftware.length > 0 || softwareFilter.trim()) {
          const filters = [...selectedSoftware];
          if (softwareFilter.trim()) filters.push(softwareFilter);
          softwareFilterValue = filters.join(',');
        }
  
        // Definir filtros base
        const filters = {
          implement: selectedImplements.length ? selectedImplements.join(",") : undefined,
          software: softwareFilterValue || undefined,
        };
  
        // Si se seleccionó fecha y hora, usa getFreeRoom, de lo contrario, usa getAll
        let response;
        if (selectedDate && selectedTime) {
          // Llama a getFreeRoom con la fecha seleccionada
          const dateTimeFilter = `${selectedDate}T${selectedTime}`;
          response = await RoomService.getFreeRoom(dateTimeFilter);
        } else {
          response = await RoomService.getAll(filters);
        }
  
        const fetchedRooms: Array<RoomResponse> = await response.json();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Error al obtener las salas:", error);
      }
    };
  
    fetchRooms();
  }, [softwareFilter, selectedDate, selectedTime, selectedImplements, selectedSoftware]);
  

  const handleSoftwareChange = (event: React.ChangeEvent<HTMLInputElement>) => setSoftwareFilter(event.target.value);
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(event.target.value);
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedTime(event.target.value);
  const handleSoftwareCheckboxChange = (software: string) => {
    setSelectedSoftware((prev) => (prev.includes(software) ? prev.filter((item) => item !== software) : [...prev, software]));
  };
  const handleImplementChange = (implement: string) => {
    setSelectedImplements((prev) => (prev.includes(implement) ? prev.filter((item) => item !== implement) : [...prev, implement]));
  };
  const toggleSection = (section: string) => {
    if (section === "keyword") setShowKeywordSection((prev) => !prev);
    if (section === "date") setShowDateSection((prev) => !prev);
    if (section === "software") setShowSoftwareSection((prev) => !prev);
    if (section === "implement") setShowImplementSection((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar de filtros */}
          <div className="w-full md:w-64 flex-shrink-0">
            
            <Filters
              softwareFilter={softwareFilter}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedSoftware={selectedSoftware}
              selectedImplements={selectedImplements}
              showKeywordSection={showKeywordSection}
              showDateSection={showDateSection}
              showSoftwareSection={showSoftwareSection}
              showImplementSection={showImplementSection}
              toggleSection={toggleSection}
              handleSoftwareChange={handleSoftwareChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              handleSoftwareCheckboxChange={handleSoftwareCheckboxChange}
              handleImplementChange={handleImplementChange}
            />
          </div>

          {/* Contenido principal - Grid de habitaciones */}
          <div className="flex-1">
          <div className="text-gray-700 dark:text-gray-300 text-center mb-6 p-4 text-xl font-semibold rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800">
  ¡Bienvenido! Encuentra la sala que mejor se adapte a tus necesidades y disponibilidad.
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {Array.isArray(rooms) && rooms.map((room) => (
              <div key={room.id} className="flex justify-center">
                <RoomCard room={room} />
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
