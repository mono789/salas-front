import React from "react";

const Description = () => {
return (
    <div>
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex justify-center -mt-16 md:justify-end">
                <img
                    className="object-cover w-20 h-20 border-2 border-green-500 rounded-full dark:border-green-400"
                    alt="Computador"
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>

            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Sala 20-234
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                <h1 className="text-green-600">Restricciones:</h1> No se permite el ingreso de alimentos
                <h1 className="text-green-600">Número de equipos:</h1> 24
                <h1 className="text-green-600">Implementos:</h1> Tablero, videobeam, aire acondicionado, 24 sillas, 24 mesas
                <h1 className="text-green-600">Sistema operativo:</h1> Windows 10 / Ubuntu 20.04
                <h1 className="text-green-600">Software:</h1> Microsoft Office 2019, Visual Studio Code, Google Chrome, Mozilla Firefox, Zoom, Microsoft Teams, R Studio, Python
            </p>
        </div>
    </div>
);
};

export default Description;
