import { RoomResponse } from "@/models/room";
import { ROOM_TEXT } from "./constants/component.constants";

export function mapRoomName(room: RoomResponse): string {
  let roomNum: string = `${room.building}-${room.roomNum}`;
  if (room.roomName) roomNum = `${roomNum} (${room.roomName})`;
  if (room.subRoom) roomNum = `${roomNum} ${ROOM_TEXT} ${room.subRoom}`;
  return roomNum;
}
