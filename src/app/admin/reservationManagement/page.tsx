import React from "react";
import Management from "./management";
import Navbar from "@/app/student/home/navbar";


const Page = () => {
  return (
    <div
      className="bg-cover bg-center py-8"
      style={{
        backgroundImage: "url('/assets/bottom.png')",
      }}
    >
      <Navbar />

      <Management />
    </div>
  );
};

export default Page;
