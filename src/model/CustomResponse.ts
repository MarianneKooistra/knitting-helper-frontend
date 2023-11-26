export interface CustomResponse<T> {
    timeStamp: Date;
    statusCode: number;
    status: string;
    message: string;
    data: { [k in keyof T] : T[k] };
}