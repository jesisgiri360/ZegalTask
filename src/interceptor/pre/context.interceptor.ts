import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AsyncContext } from "../../utils/context";
import unprotectedRoute from "../../utils/unprotected.route";

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly ac: AsyncContext<string, any>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    // if (unprotectedRoute.includes(request.route.path)) return next.handle();
    // const {
    //   sub: userId,
    //   email: email,
    //   preferred_username: username,
    // } = request.user;
    this.ac.register();
    this.ac.set("userId", request?.user?.sub);
    this.ac.set("tokenData", request.user);
    return next.handle();
  }
}
