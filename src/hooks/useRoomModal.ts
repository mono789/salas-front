import { useState, useEffect } from 'react';
import { SpecificRoomResponse } from "@/models/room";
import ApplicationService from "@/services/api/application.service";
import ImplementService from "@/services/api/implement.service";
import RestrictionService from "@/services/api/restriction.service";

interface Option {
  id: number;
  name: string;
}

interface ImplementWithCondition extends Option {
  condition: 'bueno' | 'medio' | 'malo';
}

interface SoftwareWithVersion extends Option {
  version: string;
}

export function useRoomModal(editingRoom: SpecificRoomResponse | null) {
  const [softwareOptions, setSoftwareOptions] = useState<Option[]>([]);
  const [implementOptions, setImplementOptions] = useState<Option[]>([]);
  const [restrictionOptions, setRestrictionOptions] = useState<Option[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareWithVersion[]>([]);
  const [selectedImplements, setSelectedImplements] = useState<ImplementWithCondition[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<Option[]>([]);
  const [implementSearch, setImplementSearch] = useState("");
  const [softwareSearch, setSoftwareSearch] = useState("");
  const [restrictionSearch, setRestrictionSearch] = useState("");
  const [isImplementDropdownOpen, setIsImplementDropdownOpen] = useState(false);
  const [isSoftwareDropdownOpen, setIsSoftwareDropdownOpen] = useState(false);
  const [isRestrictionDropdownOpen, setIsRestrictionDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchSoftwareOptions = async () => {
      try {
        const response = await ApplicationService.getAll();
        const data = await response.json();
        setSoftwareOptions(data);
      } catch (error) {
        console.error("Error al obtener las opciones de software:", error);
      }
    };

    const fetchImplementOptions = async () => {
      try {
        const response = await ImplementService.getAll();
        const data = await response.json();
        setImplementOptions(data);
      } catch (error) {
        console.error("Error al obtener las opciones de implementos:", error);
      }
    };

    const fetchRestrictionOptions = async () => {
      try {
        const response = await RestrictionService.getAll();
        const data = await response.json();
        const mappedRestrictions = data.map((restriction: { id: number; description: string }) => ({
          id: restriction.id,
          name: restriction.description,
        }));
        setRestrictionOptions(mappedRestrictions);
      } catch (error) {
        console.error("Error al obtener las restricciones:", error);
      }
    };

    fetchSoftwareOptions();
    fetchImplementOptions();
    fetchRestrictionOptions();
  }, []);

  useEffect(() => {
    if (editingRoom) {
      const implementsFromRoom = editingRoom.implements?.map(imp => ({
        id: imp.id,
        name: imp.name,
        condition: 'bueno' as 'bueno' | 'medio' | 'malo'
      })) || [];

      const softwareFromRoom = editingRoom.software?.map(sw => ({
        id: sw.id,
        name: sw.name,
        version: '1.0'
      })) || [];

      setSelectedImplements(implementsFromRoom);
      setSelectedSoftware(softwareFromRoom);
    } else {
      setSelectedImplements([]);
      setSelectedSoftware([]);
      setSelectedRestrictions([]);
    }
  }, [editingRoom]);

  const toggleImplementSelection = (option: Option) => {
    setSelectedImplements(prev => 
      prev.some(item => item.id === option.id) 
        ? prev.filter(item => item.id !== option.id) 
        : [...prev, { ...option, condition: 'bueno' }]
    );
  };

  const toggleSoftwareSelection = (option: Option) => {
    setSelectedSoftware(prev => 
      prev.some(item => item.id === option.id) 
        ? prev.filter(item => item.id !== option.id) 
        : [...prev, { ...option, version: '1.0' }]
    );
  };

  const toggleRestrictionSelection = (option: Option) => {
    setSelectedRestrictions(prev => 
      prev.some(item => item.id === option.id) 
        ? prev.filter(item => item.id !== option.id) 
        : [...prev, option]
    );
  };

  const updateImplementCondition = (id: number, condition: 'bueno' | 'medio' | 'malo') => {
    setSelectedImplements(prev => 
      prev.map(item => item.id === id ? { ...item, condition } : item)
    );
  };

  const updateSoftwareVersion = (id: number, version: string) => {
    setSelectedSoftware(prev => 
      prev.map(item => item.id === id ? { ...item, version } : item)
    );
  };

  return {
    softwareOptions,
    implementOptions,
    restrictionOptions,
    selectedSoftware,
    selectedImplements,
    selectedRestrictions,
    implementSearch,
    setImplementSearch,
    softwareSearch,
    setSoftwareSearch,
    restrictionSearch,
    setRestrictionSearch,
    isImplementDropdownOpen,
    setIsImplementDropdownOpen,
    isSoftwareDropdownOpen,
    setIsSoftwareDropdownOpen,
    isRestrictionDropdownOpen,
    setIsRestrictionDropdownOpen,
    toggleImplementSelection,
    toggleSoftwareSelection,
    toggleRestrictionSelection,
    updateImplementCondition,
    updateSoftwareVersion
  };
}
