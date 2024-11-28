import { RoomResponse, SpecificRoomResponse } from "@/models/room";
import { mapRoomName } from "@/utils/helpers.utils";
import { Monitor, Edit, Trash2, Users, Laptop, Coffee, AlertTriangle, ChevronDown, ChevronUp, Plus, Minus, ThumbsUp, AlertCircle, ThumbsDown } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RoomService from "@/services/api/room.service";
import ReservationModal from "@/components/modals/ReservationModal";
import RegisterClassModal from "@/components/modals/RegisterClassModal";
import { LocalStorageService } from "@/services/localstorage/local-storage.service";
import UserService from "@/services/api/user.service";
import { UserResponse } from "@/models/user";

interface RoomProps {
  room: RoomResponse;
  isAdmin?: boolean;
  onEdit?: (room: SpecificRoomResponse) => void;
  onDelete?: (id: number) => void;
  className?: string;
}

const ROOM_PATH = "/home/room?id=";

export default function RoomCard({ room, isAdmin = false, onEdit, onDelete, className = "" }: RoomProps) {
  const router = useRouter();
  const [roomDetails, setRoomDetails] = useState<SpecificRoomResponse | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    software: false,
    implements: false,
    restrictions: false,
  });
  const [openReservationModal, setOpenReservationModal] = useState(false);
  const [openRegisterClassModal, setOpenRegisterClassModal] = useState(false);
  const [userData, setUserData] = useState<UserResponse>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = LocalStorageService.getItem("user") as UserResponse;
  
        if (storedUser?.id) {
          const userResponse = await UserService.getOne(storedUser.id).then((response) => response.json());
          setUserData(userResponse);
        } else {
          setUserData(storedUser);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await RoomService.getOne(room.id);
        if (!response.ok) throw new Error('Error fetching room details');
        const details = await response.json();
        setRoomDetails(details);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [room.id]);

  if (!roomDetails) {
    return (
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 animate-pulse">
        <div className="h-40"></div>
      </div>
    );
  }

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`${ROOM_PATH}${room.id}`);
  };

  const toggleSection = (section: 'software' | 'implements' | 'restrictions') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'bueno':
        return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'medio':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'malo':
        return <ThumbsDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const renderList = (items: any[], icon: React.ReactNode, limit: number, section: 'software' | 'implements' | 'restrictions') => {
    const isExpanded = expandedSections[section];
    const displayItems = isExpanded ? items : items.slice(0, limit);
    const propertyName = section === 'restrictions' ? 'description' : 'name';

    return (
      <>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
          {displayItems.map((item, index) => (
            <li key={item.id || index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="flex-shrink-0">{icon}</span>
                <span className="truncate">{item[propertyName]}</span>
              </div>
              <div className="flex items-center space-x-2">
                {section === 'implements' && (
                  <span title={item.status}>
                    {getStatusIcon(item.status)}
                  </span>
                )}
                {section === 'software' && (
                  <span 
                    className="text-xs text-gray-600 dark:text-gray-400" 
                    title={`Versión ${item.version}`}
                  >
                    v{item.version}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        {items.length > limit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSection(section);
            }}
            className="mt-1 text-xs text-blue-500 flex items-center"
          >
            {isExpanded ? <Minus className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
            {isExpanded ? "Ver menos" : `+${items.length - limit} más`}
          </button>
        )}
      </>
    );
  };

  return (
    <div
      className={`w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[36rem]' : 'max-h-24'
      } ${className}`}
      onClick={handleCardClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {mapRoomName(room).mainName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mapRoomName(room).subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Monitor className="w-4 h-4 mr-1" />
              {roomDetails.computerAmount}
            </span>
            {isAdmin ? (
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(roomDetails);
                  }}
                  className="p-1 text-gray-600 hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400"
                  aria-label="Edit room"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(room.id);
                  }}
                  className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                  aria-label="Delete room"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleCardClick}
                className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label={isExpanded ? "Collapse room details" : "Expand room details"}
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Software</h3>
                {renderList(roomDetails.software.map(s => ({...s, version: '1.0'})), <Laptop className="w-3 h-3 mr-1 text-green-500" />, 3, 'software')}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Implementos</h3>
                {renderList(roomDetails.implements.map(i => ({...i, status: ['bueno', 'medio', 'malo'][Math.floor(Math.random() * 3)]})), null, 3, 'implements')}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Restricciones</h3>
              {renderList(roomDetails.restrictions, <AlertTriangle className="w-3 h-3 mr-1 text-yellow-500" />, 2, 'restrictions')}
            </div>
            {!isAdmin && (
              <div className="flex w-full mt-3 space-x-2">
                <button
                  onClick={() => setOpenReservationModal(true)}
                  className="flex-1 bg-blue-600 text-sm text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Crear Reservar
                </button>
                {userData?.role.roleName === "ADMIN" && (
                  <button
                    onClick={() => setOpenRegisterClassModal(true)}
                    className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Registrar Clases
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <RegisterClassModal
        opened={openRegisterClassModal}
        setOpened={setOpenRegisterClassModal}
        saveReservation={(res) => {}}
        room={roomDetails}
        userData={userData}
      />

      <ReservationModal
        opened={openReservationModal}
        setOpened={setOpenReservationModal}
        saveReservation={(res) => {}}
        room={roomDetails}
        userData={userData}
      />

    </div>
    

  );
}

