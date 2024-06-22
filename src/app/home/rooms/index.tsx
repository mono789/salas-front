import React from "react";
import Room from "../room";

const Index = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Room />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
