import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

export class SuccessResponse {
  @Inject(CACHE_MANAGER) private cacheManager: Cache;
  private data: JSON | number;
  private message: string;
  private source: string;

  constructor(data: JSON | number, message: string, source?: string) {
    this.data = data;
    this.message = message;
    this.source = source;
  }

  responseOk() {
    // this.message = '';
    // return this.SUCCESS;
  }
}

// export const SuccessResponse = (
//   status: number,
//   data: JSON | number,
//   message: string,
//   source: string | null,
//   description: string,
// ): SuccessResponseImp => {
//   const SUCCESS: SuccessResponseImp = new SuccessResponseImp();
//   SUCCESS.source = source;
//   SUCCESS.status = status;
//   SUCCESS.success = true;
//   SUCCESS.message = message;
//   SUCCESS.data = data;
//   SUCCESS.description = description;
//
//   return SUCCESS;
// };

// export const ErrorResponse = (
//   status: number,
//   message: string,
//   description: string | Array<any>,
// ): ErrorResponseImp => {
//   const ERROR: ErrorResponseImp = new ErrorResponseImp(message, description);
//   ERROR.status = status;
//   ERROR.success = false;
//   return ERROR;
// };
