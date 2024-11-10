"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RoomResponse, SpecificRoomResponse } from "@/models/room"
import RoomService from "@/services/api/room.service"
import { Trash2, Edit, Monitor } from 'lucide-react'
import RoomModal from "@/components/modals/RoomModal"

export default function RoomsPage() {
  const router = useRouter()
  const [rooms, setRooms] = useState<SpecificRoomResponse[]>([])
  const [filteredRooms, setFilteredRooms] = useState<SpecificRoomResponse[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<SpecificRoomResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [roomsPerPage] = useState(9)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await RoomService.getAll({})
      if (!response.ok) {
        throw new Error('Error fetching rooms')
      }
      const basicRooms: RoomResponse[] = await response.json()
      
      const detailedRooms = await Promise.all(
        basicRooms.map(async (room) => {
          const detailResponse = await RoomService.getOne(room.id)
          if (!detailResponse.ok) {
            throw new Error(`Error fetching room ${room.id}`)
          }
          return detailResponse.json()
        })
      )
      
      setRooms(detailedRooms)
      setFilteredRooms(detailedRooms)
    } catch (error) {
      console.error("Error fetching rooms:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const location = (formData.get("location") as string).trim();
    if (!location.includes('-')) {
        alert("Formato de ubicación inválido. Debe ser en formato XX-XXX (ejemplo: 21-120)");
        return;
    }

    const [building, roomNum] = location.split('-');

    if (!/^\d+$/.test(roomNum)) {
        alert("El número de sala debe ser un valor numérico");
        return;
    }

    const newRoom = {
        roomId: location,
        computerAmount: parseInt(formData.get("capacity") as string),
        building,
        roomNum,
        roomName: formData.get("name") as string,
        subRoom: parseInt(formData.get("subroom") as string) || 0
    };

    try {
        const response = await RoomService.save(newRoom);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al guardar la sala');
        }
        await fetchRooms();
        setIsModalOpen(false);
    } catch (error) {
        console.error("Error al agregar la sala:", error);
        alert(`Error al agregar la sala: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleEditRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingRoom) return;

    const formData = new FormData(event.currentTarget);
    const location = (formData.get("location") as string).trim();

    if (!location.includes('-')) {
        alert("Formato de ubicación inválido. Debe ser en formato XX-XXX (ejemplo: 21-120)");
        return;
    }

    const [building, roomNum] = location.split('-');

    if (!/^\d+$/.test(roomNum)) {
        alert("El número de sala debe ser un valor numérico");
        return;
    }

    const updatedRoom = {
        roomId: location,
        computerAmount: parseInt(formData.get("capacity") as string),
        building,
        roomNum,
        roomName: formData.get("name") as string,
        subRoom: parseInt(formData.get("subroom") as string) || 0
    };

    try {
        const response = await RoomService.update(editingRoom.id, updatedRoom);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar la sala');
        }
        await fetchRooms();
        setEditingRoom(null);
    } catch (error) {
        console.error("Error al editar la sala:", error);
        alert(`Error al editar la sala: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDeleteRoom = async (id: number) => {
    try {
      const roomDetails = await RoomService.getOne(id);
      if (!roomDetails.ok) {
        throw new Error('Error al obtener detalles de la sala');
      }

      const response = await RoomService.delete(id);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la sala');
      }
      await fetchRooms();
    } catch (error) {
      console.error("Error al eliminar la sala:", error);
    }
  };

  const handleModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (editingRoom) {
      handleEditRoom(event);
    } else {
      handleAddRoom(event);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const indexOfLastRoom = currentPage * roomsPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-14 h-14 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Cargando salas...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-800 p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center md:text-left">
              Gestión de Salas
            </h1>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar salas..."
                  className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2 bg-blue-600 text-white text-base rounded-md font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Añadir Sala
              </button>
              <button
                onClick={() => router.push('/admin/itemsManagement')}
                className="px-5 py-2 bg-gray-200 text-gray-700 text-base rounded-md font-semibold shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Gestión
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentRooms.map(room => (
            <div key={room.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{room.roomName}</h2>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    {`${room.building}-${room.roomNum}`}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-6 h-6 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Capacidad</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{room.computerAmount} computadores</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Software</h3>
                      <ul className="space-y-2">
                        {room.software.slice(0, 3).map((app) => (
                          <li key={app.id} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {app.name}
                          </li>
                        ))}
                        {room.software.length > 3 && (
                          <li className="text-sm text-blue-500">+{room.software.length - 3} más</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Implementos</h3>
                      <ul className="space-y-2">
                        {room.implements.slice(0, 3).map((implement) => (
                          <li key={implement.id} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {implement.name}
                          </li>
                        ))}
                        {room.implements.length > 3 && (
                          <li className="text-sm text-blue-500">+{room.implements.length - 3} más</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end space-x-3">
              <button
                onClick={() => setEditingRoom(room)}
                className="w-8 h-8 flex items-center justify-center text-gray-900 dark:text-white rounded-full hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-yellow-50 transition-colors duration-300"
                aria-label="Editar"
              >
                <Edit size={19} />
              </button>
              <button
                onClick={() => handleDeleteRoom(room.id)}
                className="w-8 h-8 flex items-center justify-center text-gray-900 dark:text-white rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-50 transition-colors duration-300"
                aria-label="Eliminar"
              >
                <Trash2 size={20} />
              </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 px-4 py-2 rounded-md text-lg ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <RoomModal
        open={isModalOpen || editingRoom !== null}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingRoom={editingRoom}
      />
    </div>
  )
}