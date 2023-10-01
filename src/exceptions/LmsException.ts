import { HttpException } from "@nestjs/common";

interface LogObject {
  partnerId: number;
  requestPayload: string;
  method: string;
  requestUrl: string;
  lmsStatusCode: string;
}
export default class LmsException extends HttpException {
  private readonly description: string;
  private readonly error: string;
  private readonly logObject: LogObject;

  constructor(
    status: number,
    message: string,
    error: any,
    logObject: LogObject,
    description?: any,
  ) {
    super(message, status);
    this.message = message;
    this.description = description;
    this.error = error;
    this.logObject = logObject;
  }

  getMessage(): string {
    return this.message;
  }

  public getCode(): string {
    return this.message;
  }

  getErrorStack(): any {
    return this.error;
  }
  getDescription(): any {
    return this.description;
  }
  getLogObject(): any {
    return this.logObject;
  }
}
