import { HttpException } from "@nestjs/common";
export default class RunTimeException extends HttpException {
    private readonly source;
    private readonly description;
    constructor(status: number, message: string, source?: string | string[], description?: string);
    getMessage(): string;
    getCode(): string;
    getSource(): string | string[];
    getDescription(): string;
}
