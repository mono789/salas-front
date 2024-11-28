import BaseModal from "./BaseModal";
import { SpecificRoomResponse } from "@/models/room";
import MultiSelect from "../MultiSelect";
import { useRoomModal } from "../../hooks/useRoomModal";

interface RoomModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, implementIds: number[], softwareIds: number[], restrictionIds: number[]) => void;
  editingRoom: SpecificRoomResponse | null;
}

export default function RoomModal({ open, onClose, onSubmit, editingRoom }: RoomModalProps) {
  const {
    softwareOptions,
    implementOptions,
    restrictionOptions,
    selectedSoftware,
    selectedImplements,
    selectedRestrictions,
    implementSearch,
    softwareSearch,
    restrictionSearch,
    isImplementDropdownOpen,
    isSoftwareDropdownOpen,
    isRestrictionDropdownOpen,
    setImplementSearch,
    setSoftwareSearch,
    setRestrictionSearch,
    setIsImplementDropdownOpen,
    setIsSoftwareDropdownOpen,
    setIsRestrictionDropdownOpen,
    toggleImplementSelection,
    toggleSoftwareSelection,
    toggleRestrictionSelection,
    updateImplementCondition,
    updateSoftwareVersion
  } = useRoomModal(editingRoom);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(
      event, 
      selectedImplements.map(i => i.id), 
      selectedSoftware.map(s => s.id),
      selectedRestrictions.map(r => r.id)
    );
  };

  return (
    <BaseModal open={open}>
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editingRoom ? "Editar Sala" : "Agregar Sala"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre de la Sala</label>
              <input
                type="text"
                name="name"
                defaultValue={editingRoom?.roomName || ""}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Ubicación (formato: Bloque-Sala)
              </label>
              <input
                type="text"
                name="location"
                defaultValue={editingRoom ? `${editingRoom.building}-${editingRoom.roomNum}` : ""}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                required
                pattern="[A-Za-z0-9]+-[A-Za-z0-9]+"
                title="Formato: Bloque-Sala (ej: 21-101)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiSelect
              options={implementOptions}
              selectedOptions={selectedImplements}
              onToggleSelection={toggleImplementSelection}
              searchValue={implementSearch}
              onSearchChange={setImplementSearch}
              isOpen={isImplementDropdownOpen}
              onOpenChange={setIsImplementDropdownOpen}
              placeholder="Selecciona..."
              label="Implementos"
            />

            <MultiSelect
              options={softwareOptions}
              selectedOptions={selectedSoftware}
              onToggleSelection={toggleSoftwareSelection}
              searchValue={softwareSearch}
              onSearchChange={setSoftwareSearch}
              isOpen={isSoftwareDropdownOpen}
              onOpenChange={setIsSoftwareDropdownOpen}
              placeholder="Selecciona..."
              label="Software"
            />

            <MultiSelect
              options={restrictionOptions}
              selectedOptions={selectedRestrictions}
              onToggleSelection={toggleRestrictionSelection}
              searchValue={restrictionSearch}
              onSearchChange={setRestrictionSearch}
              isOpen={isRestrictionDropdownOpen}
              onOpenChange={setIsRestrictionDropdownOpen}
              placeholder="Selecciona..."
              label="Restricciones"
            />

            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Cantidad de computadores</label>
              <input
                type="number"
                name="capacity"
                defaultValue={editingRoom?.computerAmount || ""}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                required
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="overflow-hidden">
              <h3 className="text-sm font-medium mb-2">Implementos seleccionados:</h3>
              <div className="max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {selectedImplements.map((implement) => (
                    <div key={implement.id} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{implement.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleImplementSelection(implement)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Eliminar"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Estado:</span>
                        <select
                          value={implement.condition}
                          onChange={(e) => updateImplementCondition(implement.id, e.target.value as 'bueno' | 'medio' | 'malo')}
                          className="text-xs p-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24 appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label="Estado del implemento"
                        >
                          <option value="bueno">Bueno</option>
                          <option value="medio">Medio</option>
                          <option value="malo">Malo</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <h3 className="text-sm font-medium mb-2">Software seleccionados:</h3>
              <div className="max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {selectedSoftware.map((software) => (
                    <div key={software.id} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{software.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleSoftwareSelection(software)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Eliminar"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Versión:</span>
                        <input
                          type="text"
                          value={software.version}
                          onChange={(e) => updateSoftwareVersion(software.id, e.target.value)}
                          className="text-xs p-1 rounded border border-gray-200 dark:border-gray-600 bg-transparent w-10"
                          placeholder="v1.0"
                          aria-label="Versión del software"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <h3 className="text-sm font-medium mb-2">Restricciones seleccionadas:</h3>
              <div className="max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {selectedRestrictions.map((restriction) => (
                    <div key={restriction.id} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm flex justify-between items-center">
                      <span>{restriction.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleRestrictionSelection(restriction)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Eliminar"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {editingRoom ? "Actualizar" : "Agregar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
