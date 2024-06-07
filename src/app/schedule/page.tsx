import Footer from "@/app/components/home/footer";
import Navbar from "@/app/components/home/navbar";
import React from "react";
import Table from "./table";
import Description from "./description";

const Index = () => {
  return (
    <div>
      <Navbar />
      <div className="justify-center" style={{ display: 'flex' }}>
        <Table />
        <Description />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
