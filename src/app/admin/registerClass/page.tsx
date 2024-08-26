import React from "react";
import Description from "./description";
import Form from "./form";

const Page = () => {
  return (
    <div>
      <div className="flex justify-center items-start">
        <Form />
        <Description />
      </div>
    </div>
  );
};

export default Page;
