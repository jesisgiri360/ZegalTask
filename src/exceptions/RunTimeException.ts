import { HttpException } from "@nestjs/common";

export default class RunTimeException extends HttpException {
  private readonly source: string | string[];
  private readonly description: string;

  constructor(
    status: number,
    message: string,
    source?: string | string[],
    description?: string,
  ) {
    super(message, status);
    this.message = message;
    this.source = source;
    this.description = description;
  }

  getMessage(): string {
    return this.message;
  }

  public getCode(): string {
    return this.message;
  }

  getSource(): string | string[] {
    return this.source;
  }

  getDescription(): string {
    return this.description;
  }
}
