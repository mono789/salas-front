"use client"

import RoomCard from "@/components/RoomCard";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { RoomResponse } from "@/models/room";
import RoomService from "@/services/api/room.service";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [rooms, setRooms] = useState<Array<RoomResponse>>([]);
  const [filteredRooms, setFilteredRooms] = useState<Array<RoomResponse>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Existing state variables for filters...
  const [softwareFilter, setSoftwareFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [selectedImplements, setSelectedImplements] = useState<string[]>([]);
  const [showKeywordSection, setShowKeywordSection] = useState(false);
  const [showDateSection, setShowDateSection] = useState(false);
  const [showSoftwareSection, setShowSoftwareSection] = useState(false);
  const [showImplementSection, setShowImplementSection] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let softwareFilterValue = '';
        if (selectedSoftware.length > 0 || softwareFilter.trim()) {
          const filters = [...selectedSoftware];
          if (softwareFilter.trim()) {
            filters.push(softwareFilter.trim());
          }
          softwareFilterValue = filters.join(',');
        }
  
        const baseFilters = {
          implement: selectedImplements.length ? selectedImplements.join(",") : undefined,
          software: softwareFilterValue || undefined,
        };
  
        const allRoomsResponse = await RoomService.getAll(baseFilters);
        let filteredRooms: Array<RoomResponse> = await allRoomsResponse.json();
  
        if (selectedDate && selectedTime) {
          const dateTimeFilter = `${selectedDate}T${selectedTime}`;
          const freeRoomsResponse = await RoomService.getFreeRoom(dateTimeFilter);
          const freeRooms: Array<RoomResponse> = await freeRoomsResponse.json();
          
          const freeRoomIds = new Set(freeRooms.map(room => room.id));
          filteredRooms = filteredRooms.filter(room => freeRoomIds.has(room.id));
        }
  
        setRooms(filteredRooms);
        setFilteredRooms(filteredRooms);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error al obtener las salas:", error);
      }
    };
  
    fetchRooms();
  }, [softwareFilter, selectedDate, selectedTime, selectedImplements, selectedSoftware]);
  

  // Pagination logica
  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Existing event handler methods...
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

          {/* Contenido principal - Grid de salas */}
          <div className="flex-1">
            <div className="text-gray-700 dark:text-gray-300 text-center mb-6 p-4 text-xl font-semibold rounded-lg bg-white dark:bg-gray-800">
              ¡Bienvenido! Encuentra la sala que mejor se adapte a tus necesidades y disponibilidad.
            </div>
            {/* Mostrar mensaje si no hay salas */}
            {paginatedRooms.length === 0 ? (
              <div className="text-center text-gray-500 text-xl">
                No se encontraron salas que coincidan con tus filtros.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {paginatedRooms.map((room) => (
                    <div key={room.id} className="flex justify-center">
                      <RoomCard room={room} />
                    </div>
                  ))}
                </div>

                {/* Componente de Paginación */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;