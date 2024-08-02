import React from "react";
import Navbar from "@/app/student/home/navbar";
import Footer from "@/app/student/home/footer";
import Role from "./role";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover bg-center py-8"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <Role />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
