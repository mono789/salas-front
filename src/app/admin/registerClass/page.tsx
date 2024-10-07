import React from "react";
import Form from "./form";
import RoomDescription from "@/components/description";

const Page = () => {
  return (
    <div>
      <div className="flex justify-center items-start">
        <Form />
        <RoomDescription
          nombre="dummy"
          restricciones="ninguna"
          nEquipos="20"
          implementos="dummy"
          os="Windows"
          software="Word"
        />
      </div>
    </div>
  );
};

export default Page;
