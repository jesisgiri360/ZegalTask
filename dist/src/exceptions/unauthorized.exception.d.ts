import RunTimeException from "./RunTimeException";
export declare class CustomUnauthorizedException extends RunTimeException {
    constructor(status?: number, message?: string);
}
