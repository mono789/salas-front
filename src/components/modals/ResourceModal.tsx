import { useState, useEffect } from "react";
import { X } from "lucide-react";
import BaseModal from "./BaseModal";

interface FormData {
  name: string;
}

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: FormData;
  type: 'implements' | 'software' | 'restrictions';
  mode: 'add' | 'edit';
}

export default function ResourceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  type,
  mode
}: ResourceModalProps) {
  const [formData, setFormData] = useState<FormData>({ name: '' });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '' });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ name: '' });
  };

  const getTitle = () => {
    const action = mode === 'add' ? 'Añadir' : 'Editar';
    const resource = type === 'implements' ? 'Implemento' : 
                    type === 'software' ? 'Software' : 'Restricción';
    return `${action} ${resource}`;
  };

  return (
    <BaseModal open={isOpen}>
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold">
          {getTitle()}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {mode === 'add' ? 'Añadir' : 'Guardar'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}