import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

export function ApiHeaders() {
  return applyDecorators(
    ApiHeader({
      name: "client_id",
    }),
  );
}
