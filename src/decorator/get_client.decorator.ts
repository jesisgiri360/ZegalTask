import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import RunTimeException from "src/exceptions/RunTimeException";
import { getManager } from "typeorm";

export const GetClient = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const clientId: string = request.headers.client_id;
  },
);
