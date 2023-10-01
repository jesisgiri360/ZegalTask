import { HttpException } from "@nestjs/common";

export class ValidationException extends HttpException {
  readonly errors: Record<string, string[]>;
  constructor(errors: Record<string, string[]>) {
    super("Cannot Process Request Body", 422);
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}
