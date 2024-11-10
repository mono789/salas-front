// src/components/rooms/RoomModal.tsx
import BaseModal from "./BaseModal";
import { SpecificRoomResponse } from "@/models/room"

interface RoomModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  editingRoom: SpecificRoomResponse | null
}

export default function RoomModal({ open, onClose, onSubmit, editingRoom }: RoomModalProps) {
  return (
    <BaseModal open={open}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">
          {editingRoom ? "Editar Sala" : "Agregar Sala"}
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-base font-medium">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              defaultValue={editingRoom?.roomName || ""}
              className="w-full px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-base font-medium">
              Ubicación (formato: Bloque-Sala)
            </label>
            <input
              type="text"
              name="location"
              defaultValue={editingRoom ? `${editingRoom.building}-${editingRoom.roomNum}` : ""}
              className="w-full px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              required
              pattern="[A-Za-z0-9]+-[A-Za-z0-9]+"
              title="Formato: Bloque-Sala (ej: A-101)"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-base font-medium">
              Cantidad de computadores
            </label>
            <input
              type="number"
              name="capacity"
              defaultValue={editingRoom?.computerAmount || ""}
              className="w-full px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              required
              min="1"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-base text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-base rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {editingRoom ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  )
}