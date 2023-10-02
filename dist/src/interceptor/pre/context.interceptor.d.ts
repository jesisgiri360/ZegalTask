import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { AsyncContext } from "../../utils/context";
export declare class ContextInterceptor implements NestInterceptor {
    private readonly ac;
    constructor(ac: AsyncContext<string, any>);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
