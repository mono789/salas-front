import { ApplicationResponse } from "./application";
import { ReservationType } from "./enums";
import { ImplementResponse } from "./implement";
import { RestrictionResponse } from "./restriction";

// Requests

export interface RoomRequest {
    computerAmount?: number;
    building?: string;
    roomNum?: string;
    roomName?: string;
    subRoom?: number;
}

// Responses
export interface RoomResponse {
    id: number;
    computerAmount: number;
    building: string;
    roomNum: string;
    roomName?: string;
    subRoom?: number;
}

export interface SpecificRoomResponse {
    id: number;
    computerAmount: number;
    building: string;
    roomNum: string;
    roomName?: string;
    subRoom?: number;
    software: Array<ApplicationResponse>;
    restrictions: Array<RestrictionResponse>;
    implements: Array<ImplementResponse>;
}

export interface RoomScheduleResponse {
    id: number;
    activityName: string;
    activityDescription: string;
    startsAt: string;
    endsAt: string;
    type: ReservationType;
}

export interface RoomFilter {
    implement?: string;
    restriction?: string;
    software?: string;
    computerAmount?: number;
}
