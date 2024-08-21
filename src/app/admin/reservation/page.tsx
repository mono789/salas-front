import React from "react";
import Navbar from "../../student/home/navbar";
import Footer from "../../student/home/footer";
import Description from "./description";
import Form from "./form";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover bg-center py-8 flex justify-center items-start"
        style={{
          backgroundImage: "url('/assets/bottom.png')",
        }}
      >
        <Form />
        <Description />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
