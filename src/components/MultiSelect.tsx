import { ChevronDown } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface Option {
  id: number;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedOptions: Option[];
  onToggleSelection: (option: Option) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  placeholder: string;
  label: string;
}

export default function MultiSelect({
  options,
  selectedOptions,
  onToggleSelection,
  searchValue,
  onSearchChange,
  isOpen,
  onOpenChange,
  placeholder,
  label
}: MultiSelectProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div 
        className="w-full px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 cursor-pointer flex items-center justify-between"
        onClick={() => onOpenChange(!isOpen)}
      >
        <span>{selectedOptions.length ? `${selectedOptions.length} seleccionados` : placeholder}</span>
        <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 text-base border-b focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="max-h-60 overflow-y-auto">
            {options
              .filter(option => option.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((option) => (
                <div
                  key={option.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedOptions.some(item => item.id === option.id) ? 'bg-blue-100 dark:bg-blue-800' : ''
                  }`}
                  onClick={() => onToggleSelection(option)}
                >
                  {option.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
