import { RoomResponse } from "@/models/room";
import { ROOM_TEXT } from "./constants/component.constants";

export function mapRoomName(room: RoomResponse): { mainName: string; subtitle: string } {
  const mainName = room.roomName || `Bloque ${room.building}-${room.roomNum}`;
  const subtitle = room.subRoom ? `Sala ${room.subRoom} • Bloque ${room.building}-${room.roomNum}` : `Bloque ${room.building}-${room.roomNum}`;
  return { mainName, subtitle };
}


export function getDateRightNow(): string {
  return new Date(Date.now()).toISOString().split("T")[0];
}
