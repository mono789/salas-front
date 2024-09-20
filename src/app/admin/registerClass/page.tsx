import React from "react";
import Form from "./form";
import RoomDescription from "@/components/description";

const Page = () => {
  return (
    <div>
      <div className="flex justify-center items-start">
        <Form />
        <RoomDescription></RoomDescription>
      </div>
    </div>
  );
};

export default Page;
