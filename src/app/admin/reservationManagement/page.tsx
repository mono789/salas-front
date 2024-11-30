import React from "react";
import Management from "./management";

const Page = () => {
  return (
    <div
      className="bg-cover bg-center py-8"
      style={{
        backgroundImage: "url('/assets/bottom.png')",
      }}
    >
      <Management />
    </div>
  );
};

export default Page;
