import { HttpException } from "@nestjs/common";
interface LogObject {
    partnerId: number;
    requestPayload: string;
    method: string;
    requestUrl: string;
    lmsStatusCode: string;
}
export default class LmsException extends HttpException {
    private readonly description;
    private readonly error;
    private readonly logObject;
    constructor(status: number, message: string, error: any, logObject: LogObject, description?: any);
    getMessage(): string;
    getCode(): string;
    getErrorStack(): any;
    getDescription(): any;
    getLogObject(): any;
}
export {};
