import { ReservationType, WeekDay } from "./enums";
import { RoomResponse } from "./room";

// Request
export interface ReservationRequest {
    activityName?: string;
    activityDescription?: string;
    startsAt?: string;
    endsAt?: string;
    type?: ReservationType;
    userId?: string;
    roomId?: number;
    day?: string;
}

/** startsAt and endsAt have a 'HH:mm' pattern*/
export interface SessionRequest {
    day?: WeekDay;
    /** format HH:mm*/
    startsAt?: string;
    /** format HH:mm*/
    endsAt?: string;
}

export interface ClassReservationRequest {
    activityName?: string;
    activityDescription?: string;
    sessions?: Array<SessionRequest>
    userId?: string;
    roomId?: number;
    semesterStartsAt?: string;
    semesterEndsAt?: string;
}

// Responses
export interface ReservationStateResponse {
    id: number;
    state: ReservationStatus;
}

export interface ReservationUserReponse {
    id: string;
    email: string;
}

export interface ReservationResponse {
    id: number;
    activityName: string;
    activityDescription: string;
    startsAt: string;
    endsAt: string;
    type: ReservationType;
    user: ReservationUserReponse;
    room: RoomResponse;
    reservationState: ReservationStateResponse;
}
