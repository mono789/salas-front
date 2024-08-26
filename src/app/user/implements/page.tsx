import Sidebar from "@/app/student/home/sidebar";
import React from "react";
import List from "./list";


const Page = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="bg-cover bg-center py-8"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url('/assets/bottom.png')",
          }}
        >
          <div style={{ textAlign: "justify" }}>
            <h2 className="text-center mb-4 mt-8 text-lg font-semibold">
              ¡Hola usuario! Selecciona los implementos que necesitas que estén
              disponibles en la sala.
            </h2>
            <List />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Page;
