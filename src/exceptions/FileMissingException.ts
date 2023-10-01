import { HttpException } from "@nestjs/common";

export default class FileMissingException {
  getMessage(): string {
    return "File is a required field.";
  }

  getStatus(): number {
    return 422;
  }
  public getCode(): number {
    return 422;
  }

  getSource(): string | string[] {
    return "";
  }

  getDescription(): string {
    return "File is required filed.Please make sure file exists on a request";
  }
}
