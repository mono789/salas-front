import Footer from "@/app/student/home/footer";
import Navbar from "@/app/student/home/navbar";
import React from "react";
import Table from "./table";
import Description from "./description";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="justify-center" style={{ display: "flex" }}>
        <Table />
        <Description />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
