
import React from "react";
import Table from "./table";
import Description from "./description";

const Page = () => {
  return (
    <div>
      <div className="justify-center" style={{ display: "flex" }}>
        <Table />
        <Description />
      </div>
    </div>
  );
};

export default Page;
