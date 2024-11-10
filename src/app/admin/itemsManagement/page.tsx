"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit, Plus, Search } from 'lucide-react'
import ApplicationService from "@/services/api/application.service"
import ImplementService from "@/services/api/implement.service"
import { ApplicationResponse } from "@/models/application"
import { ImplementResponse } from "@/models/implement"

type ItemType = ApplicationResponse | ImplementResponse
type TabType = 'implements' | 'software'

export default function Component() {
  const [activeTab, setActiveTab] = useState<TabType>('implements')
  const [editingItem, setEditingItem] = useState<ItemType | null>(null)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [implement, setImplements] = useState<ImplementResponse[]>([])
  const [software, setSoftware] = useState<ApplicationResponse[]>([])

  useEffect(() => {
    fetchItems(activeTab)
  }, [activeTab])

  const fetchItems = async (tab: TabType) => {
    setIsLoading(true)
    try {
      const service = tab === 'implements' ? ImplementService : ApplicationService
      const response = await service.getAll()
      if (!response.ok) {
        throw new Error(`Error fetching ${tab}`)
      }
      const data = await response.json()
      if (tab === 'implements') {
        setImplements(data)
      } else {
        setSoftware(data)
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: ItemType) => {
    setEditingItem(item)
  }

  const handleDelete = async (id: number) => {
    try {
      const service = activeTab === 'implements' ? ImplementService : ApplicationService
      const response = await service.delete(id)
      if (!response.ok) {
        throw new Error(`Error deleting ${activeTab}`)
      }
      await fetchItems(activeTab)
    } catch (error) {
      console.error(`Error deleting ${activeTab}:`, error)
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingItem) {
      try {
        const service = activeTab === 'implements' ? ImplementService : ApplicationService
        const response = await service.update(editingItem.id, { name: editingItem.name })
        if (!response.ok) {
          throw new Error(`Error updating ${activeTab}`)
        }
        await fetchItems(activeTab)
        setEditingItem(null)
      } catch (error) {
        console.error(`Error updating ${activeTab}:`, error)
      }
    }
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newItemName) {
      try {
        const service = activeTab === 'implements' ? ImplementService : ApplicationService
        const response = await service.save({ name: newItemName })
        if (!response.ok) {
          throw new Error(`Error adding ${activeTab}`)
        }
        await fetchItems(activeTab)
        setNewItemName("")
        setIsAddingItem(false)
      } catch (error) {
        console.error(`Error adding ${activeTab}:`, error)
      }
    }
  }

  const filteredItems = (activeTab === 'implements' ? implement : software).filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
            ¡Hola! En esta sección puedes gestionar los implementos y software
          </h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {['implements', 'software'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 px-6 text-sm font-medium text-center ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab as TabType)}
            >
              {tab === 'implements' ? 'Implementos' : 'Software'}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {activeTab === 'implements' ? 'Implementos Disponibles:' : 'Software Disponibles:'}
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-48">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <button 
                onClick={() => setIsAddingItem(true)}
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <Plus size={18} className="mr-2" />
                Añadir
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate mb-2" title={item.name}>
                    {item.name}
                  </span>
                  <div className="flex justify-end">
                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(editingItem || isAddingItem) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full m-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {isAddingItem ? 'Añadir' : 'Editar'} {activeTab === 'implements' ? 'Implemento' : 'Software'}
            </h2>
            <form onSubmit={isAddingItem ? handleAdd : handleSave} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={isAddingItem ? newItemName : editingItem?.name}
                  onChange={(e) => {
                    if (isAddingItem) {
                      setNewItemName(e.target.value)
                    } else {
                      setEditingItem(editingItem ? { ...editingItem, name: e.target.value } : null)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingItem(false)
                    setEditingItem(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  {isAddingItem ? 'Añadir' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}