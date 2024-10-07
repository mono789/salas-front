
import React from "react";
import Image from "next/image";

const Navbar = () => {
  
  return (
    <div>
      <nav
        x-data="{ isOpen: false }"
        className="relative bg-white shadow dark:bg-gray-900"
      >
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center md:-mx-1">
          <div className="flex items-center justify-between">
            <a href="#">
              {/*Logo DRAI*/}
              <Image
                src="https://arquimedes.udea.edu.co/drai.png"
                alt="logo DRAI"
                width={106}/* Para conservar un aspect ratio de aproximadamente 16:9*/
                height={60}
              />
            </a>
            
            <div className="flex lg:hidden">
              <button
                x-cloak="true"
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg
                  x-show="!isOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  x-show="isOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
