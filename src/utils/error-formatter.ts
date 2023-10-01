import { ValidationError } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { ValidationException } from "../exceptions/validation.exception";

export function format(errors: ValidationError[]) {
  let data: Record<string, any> = {};
  errors.forEach((error) => {
    const response: Record<string, any> = {};
    if (error?.children?.length) {
      response[error.property] = format(error.children);
    } else {
      response[error.property] = Object.entries(error.constraints).map(
        ([key, value]) => {
          return value;
        },
      );
    }
    data = { ...data, ...response };
  });
  return data;
}

export function ErrorFormatter(errors: ValidationError[]) {
  throw new ValidationException(format(errors));
}
