import React from "react";
import Navbar from "../home/navbar";
import Sidebar from "../home/sidebar";
import List from "./list";


const Page = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "justify" }}>
            <h2 className="text-center mb-4 mt-8 text-lg font-semibold">
              ¡Hola estudiante! Selecciona los programas que necesitas que
              estén instalados en la sala.
            </h2>
            <List />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Page;
