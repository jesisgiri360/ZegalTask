import { Injectable } from "@nestjs/common";
import { AsyncContext } from "./utils/context";
import RunTimeException from "./exceptions/RunTimeException";

@Injectable()
export class AppService {
  constructor(private readonly asyncContext: AsyncContext<string, string>) {}

  ping() {
    console.log("ping pong ding dong");
    return "Pong!";
  }

  getHello(): string {
    // const userId = this.asyncContext.get('userId');
    return "Hello World!";
  }
}
