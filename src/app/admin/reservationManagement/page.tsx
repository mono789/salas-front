import React from "react";
import AdminReserva from "./management";
import Navbar from "@/app/student/home/navbar";
import Footer from "@/app/student/home/footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <AdminReserva />
      <Footer />
    </div>
  );
};

export default Page;
