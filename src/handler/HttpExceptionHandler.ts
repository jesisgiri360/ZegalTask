import {
  ArgumentsHost,
  BadRequestException,
  CACHE_MANAGER,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Inject,
  MethodNotAllowedException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
  UnsupportedMediaTypeException,
} from "@nestjs/common";
import * as util from "util";
import { Cache } from "cache-manager";
import { ValidationException } from "../exceptions/validation.exception";
import { Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { TypeORMError } from "typeorm";
import FileMissingException from "src/exceptions/FileMissingException";
import { MessageEnum } from "../config/CONSTANTS";
import logger from "src/logger";
@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async catch(exception: any, host: ArgumentsHost): Promise<any> {
    const response: Response = host.switchToHttp().getResponse();
    const request: Request = host.switchToHttp().getRequest();
    try {
      const errorObj = {
        status: 500,
        success: false,
        message: "Something Went Wrong!",
        description: null,
      };

      if (exception instanceof TypeORMError) {
        errorObj.message = "Something Went Wrong!";
        errorObj.status = 500;
        errorObj.description = exception.message;
      }
      if (exception instanceof UnauthorizedException) {
        errorObj.message = MessageEnum.UNAUTHORIZED_ACCESS;
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof ForbiddenException) {
        errorObj.message = MessageEnum.FORBIDDEN;
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof NotFoundException) {
        errorObj.message = "Route Not Found";
        errorObj.description = exception.message;
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof BadRequestException) {
        errorObj.message = "Bad Request";
        errorObj.description = exception.message;
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof ValidationException) {
        errorObj.message = exception.getResponse().toString();
        errorObj.description = exception.getErrors();
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof RequestTimeoutException) {
        errorObj.message = "Bad Request";
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof MethodNotAllowedException) {
        errorObj.message = "Bad Request";
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof UnsupportedMediaTypeException) {
        errorObj.message = "Bad Request";
        errorObj.status = exception.getStatus();
      }
      if (exception instanceof FileMissingException) {
        errorObj.message = exception.getMessage();
        errorObj.status = exception.getStatus();
        errorObj.description = exception.getDescription();
      }
      if (exception instanceof TokenExpiredError) {
        errorObj.message = "Token expired.";
        errorObj.status = 401;
        errorObj.description =
          "Please Login Again or get a new token from refresh token.";
      }
      const message = await this.cacheManager.get(
        exception?.message?.toUpperCase()
      );

      const source =
        message && typeof exception.getSource === "function"
          ? exception.getSource()
          : null;

      errorObj.message =
        message && source
          ? util.format(message, ...(Array.isArray(source) ? source : [source]))
          : message || exception.message;

      errorObj.description =
        exception.description || errorObj.description || null;

      errorObj.status = exception.status || errorObj.status;

      if (exception.status === 404) {
        errorObj.message = "Route Not Found";
        errorObj.status = 404;
        errorObj.description = request.url;
      }

      logger.error(errorObj.message, {
        req: request,
        body: request.body,
        errorObj: errorObj,
        stack: exception.stack,
        res: response,
      });

      if (!response.headersSent)
        return response.status(errorObj.status).json(errorObj).send();
    } catch (ex) {
      logger.error(ex.message, {
        req: request,
        body: request.body,
        stack: exception.stack,
        res: response,
      });
    }
  }
}
