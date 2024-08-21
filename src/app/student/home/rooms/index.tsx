import React from "react";
import Room from "../room";

const roomsData = [
  { blockNumber: "Bloque 20", roomNumber: "20-234" },
  { blockNumber: "Bloque 20", roomNumber: "20-238" },
  { blockNumber: "Bloque 20", roomNumber: "20-329" },
  { blockNumber: "Bloque 20", roomNumber: "20-331" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
  { blockNumber: "Bloque 20", roomNumber: "20-337" },
  { blockNumber: "Bloque 20", roomNumber: "20-339" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },
  { blockNumber: "Bloque 20", roomNumber: "20-337" },
];

const Index = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {roomsData.map((room, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Room
                  blockNumber={room.blockNumber}
                  roomNumber={room.roomNumber}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
