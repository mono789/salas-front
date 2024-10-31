import { RoomResponse } from "@/models/room";
import { BUILDING_TEXT } from "@/utils/constants/component.constants";
import { mapRoomName } from "@/utils/map.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface RoomProps {
  room: RoomResponse;
}

const ROOM_PATH = "/home/room/";

const RoomCard: React.FC<RoomProps> = ({ room }) => {
  const router = useRouter();
  return (
    <div
      className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 cursor-pointer"
      onClick={() => router.push(`${ROOM_PATH}${room.id}`)}
    >
      <Image
        className="object-cover w-full h-56"
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="computador"
        width={170}
        height={150}
      />
      <div className="py-5 text-center">
        <span
          className="block text-xl font-bold text-gray-800 dark:text-white"
          tabIndex={parseInt("0")}
        >
          {BUILDING_TEXT} {room.building}
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          {mapRoomName(room)}
        </span>
      </div>
    </div>
  );
};

export default RoomCard;
