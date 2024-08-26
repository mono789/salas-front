import Link from "next/link";
import React from "react";

const Page = () => {
  return (

    
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/bottom.png')`,
      }}
    >
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white bg-opacity-30 backdrop-blur-lg border border-gray-300 rounded-lg shadow-md">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="../assets/pc-icon.svg"
              alt=""
            />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-900 dark:text-gray-200">
            SalasInfo
          </h3>

          <p className="mt-1 text-center text-gray-700 dark:text-gray-400">
            Inicia sesión o crea una cuenta
          </p>

          <form>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white bg-opacity-50 backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Correo electrónico"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white bg-opacity-50 backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Contraseña"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-gray-500"
              >
                ¿Olvidaste tu contraseña?
              </a>

              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-700 dark:text-gray-200">
            ¿No tienes una cuenta?{" "}
          </span>

          <Link
            href="/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Page;
