"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RoomResponse, SpecificRoomResponse } from "@/models/room"
import RoomService from "@/services/api/room.service"
import Pagination from "@/components/Pagination";
import RoomModal from "@/components/modals/RoomModal"
import RoomCard from "@/components/RoomCard"
import { Search } from "lucide-react";
import DeleteRoomModal from "@/components/modals/DeleteRoomModal";

export default function RoomsPage() {
  const router = useRouter()
  const [rooms, setRooms] = useState<SpecificRoomResponse[]>([])
  const [filteredRooms, setFilteredRooms] = useState<SpecificRoomResponse[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<SpecificRoomResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [roomsPerPage] = useState(9)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<SpecificRoomResponse | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchRooms()
  }, [])
  
  useEffect(() => {
    const filtered = rooms.filter((room) =>
      room.roomName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [rooms, searchText]);

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
    } 
  }

  const handleAddRoom = async (event: React.FormEvent<HTMLFormElement>, implementIds: number[], softwareIds: number[], restrictionIds: number[]) => {
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
      subRoom: parseInt(formData.get("subroom") as string) || 0,
      implementIds: implementIds,
      softwareIds: softwareIds,
      restrictionIds: restrictionIds

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

  const handleEditRoom = async (event: React.FormEvent<HTMLFormElement>, implementIds: number[], softwareIds: number[], restrictionIds: number[]) => {
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
        subRoom: parseInt(formData.get("subroom") as string) || 0,
        implementIds: implementIds,
        softwareIds: softwareIds,
        restrictionIds: restrictionIds
    };

    try {
        const response = await RoomService.update(editingRoom.id, updatedRoom);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar la sala');
        }
        await fetchRooms();
        setEditingRoom(null);
        setIsModalOpen(false);
    } catch (error) {
        console.error("Error al editar la sala:", error);
        alert(`Error al editar la sala: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDeleteRoom = (room: SpecificRoomResponse) => {
    setRoomToDelete(room);
    setDeleteModalOpen(true);
  };
  
  const confirmDeleteRoom = async () => {
    if (!roomToDelete) return;
  
    try {
      const response = await RoomService.delete(roomToDelete.id);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la sala');
      }
      await fetchRooms();
      setDeleteModalOpen(false);
      setRoomToDelete(null);
    } catch (error) {
      console.error("Error al eliminar la sala:", error);
    }
  };
  

  const handleModalSubmit = (event: React.FormEvent<HTMLFormElement>, implementIds: number[], softwareIds: number[], restrictionIds: number[]) => {
    if (editingRoom) {
      handleEditRoom(event, implementIds, softwareIds, restrictionIds);
    } else {
      handleAddRoom(event, implementIds, softwareIds, restrictionIds);
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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                />
                <Search 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={16} 
                />
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
            <RoomCard 
              key={room.id}
              room={room}
              isAdmin={true}
              onEdit={() => {
                setEditingRoom(room);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDeleteRoom(room)}
              className="w-full"
            />
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => setCurrentPage(page)} 
        />

      </div>

      <RoomModal
        open={isModalOpen || editingRoom !== null}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingRoom={editingRoom}
      />

      <DeleteRoomModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteRoom}
        roomName={roomToDelete?.roomName || ''}
      />

    </div>
  )
}