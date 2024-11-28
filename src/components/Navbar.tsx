'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";
import { Briefcase, Clock } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  return (
    <nav className="relative bg-white shadow dark:bg-gray-900">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/salasinfo/home" className="flex-shrink-0">
              <Image
                src="https://arquimedes.udea.edu.co/drai.png"
                alt="logo DRAI"
                width={106}
                height={60}
                className="h-12 w-auto"
              />
            </a>
          </div>

        
          <div className="hidden md:flex items-center space-x-6"> 
          <button>
            <a
              onClick={() => router.push('/admin/roomManagement')}
              className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-400 transition duration-150 ease-in-out"
            >
              <Briefcase className="w-3 h-3" /> 
              <span className="text-base font-semibold">Gestión de Salas</span> 
            </a>
          </button>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-400 transition duration-150 ease-in-out"
            >
              <Clock className="w-3 h-3" />
              <span className="text-base font-semibold">Reservas Pendientes</span> 
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;