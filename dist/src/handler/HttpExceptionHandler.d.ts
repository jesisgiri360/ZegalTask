import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class HttpExceptionHandler implements ExceptionFilter {
    constructor();
    catch(exception: any, host: ArgumentsHost): Promise<any>;
}
