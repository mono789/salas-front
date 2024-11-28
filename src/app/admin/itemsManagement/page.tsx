"use client"

import { useState, useEffect } from "react"
import { Plus, Search, LayoutGrid, List } from 'lucide-react'
import ApplicationService from "@/services/api/application.service"
import ImplementService from "@/services/api/implement.service"
import { ApplicationResponse } from "@/models/application"
import { ImplementResponse } from "@/models/implement"
import ResourceModal from "@/components/modals/ResourceModal"
import { ActionButtons } from "@/components/ActionButtons"
import { RestrictionResponse } from "@/models/restriction"
import RestrictionService from "@/services/api/restriction.service"

type ItemType = ApplicationResponse | ImplementResponse | RestrictionResponse
type TabType = 'implements' | 'software' | 'restrictions'
type ViewType = 'grid' | 'list'


export default function Component() {
  const [activeTab, setActiveTab] = useState<TabType>('implements')
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    initialData?: { name: string };
    item?: ItemType;
  }>({
    isOpen: false,
    mode: 'add'
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [implement, setImplements] = useState<ImplementResponse[]>([])
  const [software, setSoftware] = useState<ApplicationResponse[]>([])
  const [restrictions, setRestrictions] = useState<RestrictionResponse[]>([])
  const [viewType, setViewType] = useState<ViewType>('grid')

  useEffect(() => {
    fetchItems(activeTab)
  }, [activeTab])

  const fetchItems = async (tab: TabType) => {
    setIsLoading(true)
    try {
      if (tab === 'restrictions') {
        const response = await RestrictionService.getAll()
        if (!response.ok) {
          throw new Error(`Error fetching restrictions`)
        }
        const data = await response.json()
        setRestrictions(data)
      } else {
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
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: ItemType) => {
    setModalData({
      isOpen: true,
      mode: 'edit',
      initialData: { 
        name: 'description' in item ? (item as RestrictionResponse).description : item.name 
      },
      item
    })
  }

  const handleDelete = async (id: number) => {
    try {
      if (activeTab === 'restrictions') {
        setRestrictions(restrictions.filter(item => item.id !== id))
      } else {
        const service = activeTab === 'implements' ? ImplementService : ApplicationService
        const response = await service.delete(id)
        if (!response.ok) {
          throw new Error(`Error deleting ${activeTab}`)
        }
        await fetchItems(activeTab)
      }
    } catch (error) {
      console.error(`Error deleting ${activeTab}:`, error)
    }
  }

  const handleSubmit = async (formData: { name: string }) => {
    try {
      if (modalData.mode === 'edit' && modalData.item) {
        if (activeTab === 'restrictions') {
          const restrictionService = RestrictionService
          const response = await restrictionService.update(modalData.item.id, { description: formData.name })
          if (!response.ok) {
            throw new Error(`Error updating restrictions`)
          }
        } else {
          const service = activeTab === 'implements' ? ImplementService : ApplicationService
          const response = await service.update(modalData.item.id, formData)
          if (!response.ok) {
            throw new Error(`Error updating ${activeTab}`)
          }
        }
      } else {
        if (activeTab === 'restrictions') {
          const restrictionService = RestrictionService
          const response = await restrictionService.save({ description: formData.name })
          if (!response.ok) {
            throw new Error(`Error adding restrictions`)
          }
        } else {
          const service = activeTab === 'implements' ? ImplementService : ApplicationService
          const response = await service.save(formData)
          if (!response.ok) {
            throw new Error(`Error adding ${activeTab}`)
          }
        }
      }
      await fetchItems(activeTab)
      setModalData({ isOpen: false, mode: 'add' })
    } catch (error) {
      console.error(`Error submitting ${activeTab}:`, error)
    }
  }

  const getItems = () => {
    switch (activeTab) {
      case 'implements':
        return implement
      case 'software':
        return software
      case 'restrictions':
        return restrictions
      default:
        return []
    }
  }

  const filteredItems = getItems().filter(
    item => {
      if ('description' in item) {
        return (item as RestrictionResponse).description.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return (item as (ApplicationResponse | ImplementResponse)).name.toLowerCase().includes(searchQuery.toLowerCase())
    }
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Recursos</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
            <button
              onClick={() => setModalData({ isOpen: true, mode: 'add' })}
              className="inline-flex items-center px-5 py-2 rounded-md text-sm font-medium transition-colors duration-150 bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Añadir</span>
            </button>
            
              <button
                onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {viewType === 'grid' ? <List size={24} /> : <LayoutGrid size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categorías</h2>
                  <ul>
                    {['implements', 'software', 'restrictions'].map((tab) => (
                      <li key={tab}>
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-150 ${
                            activeTab === tab
                              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setActiveTab(tab as TabType)}
                        >
                          {tab === 'implements' ? 'Implementos' : tab === 'software' ? 'Software' : 'Restricciones'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : (
                    viewType === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                          <div key={item.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{'description' in item ? item.description : item.name}</h3>
                              <div className="flex justify-end mt-4">
                                <ActionButtons 
                                  onEdit={() => handleEdit(item)} 
                                  onDelete={() => handleDelete(item.id)} 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredItems.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{'description' in item ? item.description : item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <ActionButtons 
                                    onEdit={() => handleEdit(item)} 
                                    onDelete={() => handleDelete(item.id)} 
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResourceModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ isOpen: false, mode: 'add' })}
        onSubmit={handleSubmit}
        initialData={modalData.initialData}
        type={activeTab}
        mode={modalData.mode}
      />
    </div>
  )
}