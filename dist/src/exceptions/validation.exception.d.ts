import { HttpException } from "@nestjs/common";
export declare class ValidationException extends HttpException {
    readonly errors: Record<string, string[]>;
    constructor(errors: Record<string, string[]>);
    getErrors(): Record<string, string[]>;
}
