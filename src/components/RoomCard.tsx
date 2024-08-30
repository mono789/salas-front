import Image from "next/image";
import React from "react";

interface RoomProps {
  blockNumber: string;
  roomNumber: string;
}

const RoomCard: React.FC<RoomProps> = ({ blockNumber, roomNumber }) => {
  return (
    <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <Image
        className="object-cover w-full h-56"
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="computador"
        width={170}
        height={150}
      />
      <div className="py-5 text-center">
        <a
          href="#"
          className="block text-xl font-bold text-gray-800 dark:text-white"
          tabIndex={parseInt("0")}
          role="link"
        >
          {blockNumber}
        </a>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          {roomNumber}
        </span>
      </div>
    </div>
  );
};

export default RoomCard;
