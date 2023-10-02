import {
  CACHE_MANAGER,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cache } from "cache-manager";
import * as util from "util";
import { MESSAGES } from "src/utils/messages/messages";
import { Reflector } from "@nestjs/core";

export interface Response<T> {
  data: T;
}

@Injectable()
export default class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const message = this.reflector.get<string>("message", context.getHandler());
    const source = this.reflector.get<string>("source", context.getHandler());
    const responseMessageTemplate = message && MESSAGES.SUCCESS[message];
    return next.handle().pipe(
      map((data) => {
        let responseMessage = responseMessageTemplate
          ? responseMessageTemplate
          : "Operation Executed Successfully";
        if (source && responseMessageTemplate)
          responseMessage = util.format(responseMessageTemplate, ...source);
        return {
          status: 200,
          success: true,
          message: responseMessage,
          data,
          servedBy: ".............",
        };
      })
    );
  }
}
