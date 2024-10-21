export interface ExceptionResponse {
    statusCode: number;
    status: string;
    message: string;
    timestamp: string;
}

export interface ValidationExceptionResponse {
    statusCode: number;
    status: string;
    message: string;
    timestamp: string;
    errors: Array<string>;
}
