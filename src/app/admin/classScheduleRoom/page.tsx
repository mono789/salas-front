import Navbar from "@/app/student/home/navbar";
import React from "react";
import Calendar from "./calendar";


const Page = () => {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover bg-center py-8"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <h2 className="text-center text-lg mb-4 font-bold">
          ¡Hola admin! Conoce a detalle el horario de clases de cada sala.
        </h2>
        <Calendar />
      </div>

    </div>
  );
};

export default Page;
