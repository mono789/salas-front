import { Edit, Trash2 } from 'lucide-react'

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  size?: number;
}

export const ActionButtons = ({ onEdit, onDelete, size = 18 }: ActionButtonsProps) => (
  <>
    <button 
      onClick={onEdit} 
      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
    >
      <Edit size={size} />
    </button>
    <button 
      onClick={onDelete} 
      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
    >
      <Trash2 size={size} />
    </button>
  </>
)