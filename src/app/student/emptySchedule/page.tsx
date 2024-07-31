import Footer from "@/app/student/home/footer";
import Navbar from "@/app/student/home/navbar";
import React from "react";
import Table from "./table";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <h2 className="text-center mb-4 mt-8 text-lg font-semibold">
          ¡Hola estudiante! Haz clic en el horario que se acomode a tus
          necesidades para ver a detalle la sala que esté libre.
        </h2>
        <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 px-4">
          <Table />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
