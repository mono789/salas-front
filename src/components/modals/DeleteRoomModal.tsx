import React from 'react';
import BaseModal from "./BaseModal";
import { AlertCircle } from 'lucide-react';

interface DeleteRoomModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roomName: string;
}

export default function DeleteRoomModal({ open, onClose, onConfirm, roomName }: DeleteRoomModalProps) {
  return (
    <BaseModal open={open}>
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="rounded-full bg-red-100 dark:bg-red-900 p-3">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            ¿Eliminar esta sala?
          </h2>
          
          <div className="mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Estás a punto de eliminar la siguiente sala:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                {roomName}
              </h3>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400">
              Esta acción no se puede deshacer.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sí, eliminar sala
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors duration-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}