import { HttpException } from "@nestjs/common";
import RunTimeException from "./RunTimeException";

export class CustomUnauthorizedException extends RunTimeException {
  constructor(status = 400, message = "loginError") {
    super(status, message);
  }
}
