import React from "react";
import Role from "./role";

const Page = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center py-8"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <Role />
      </div>
      
    </div>
  );
};

export default Page;
