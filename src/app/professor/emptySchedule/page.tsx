import React from "react";
import Table from "./table";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-grow flex flex-col justify-center items-center bg-cover bg-center py-8"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <h2 className="text-center mb-4 mt-4 text-lg font-semibold">
          ¡Hola docente! Haz clic en el horario que se acomode a sus necesidades
          para ver a detalle la sala que esté libre.
        </h2>
        <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 px-4">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Page;
