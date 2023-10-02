"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionHandler = void 0;
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("../exceptions/validation.exception");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const FileMissingException_1 = require("../exceptions/FileMissingException");
const CONSTANTS_1 = require("../config/CONSTANTS");
const logger_1 = require("../logger");
let HttpExceptionHandler = class HttpExceptionHandler {
    constructor() { }
    async catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const request = host.switchToHttp().getRequest();
        try {
            const errorObj = {
                status: 500,
                success: false,
                message: "Something Went Wrong!",
                description: null,
            };
            if (exception instanceof typeorm_1.TypeORMError) {
                errorObj.message = "Something Went Wrong!";
                errorObj.status = 500;
                errorObj.description = exception.message;
            }
            if (exception instanceof common_1.UnauthorizedException) {
                errorObj.message = CONSTANTS_1.MessageEnum.UNAUTHORIZED_ACCESS;
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof common_1.ForbiddenException) {
                errorObj.message = CONSTANTS_1.MessageEnum.FORBIDDEN;
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof common_1.NotFoundException) {
                errorObj.message = "Route Not Found";
                errorObj.description = exception.message;
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof common_1.BadRequestException) {
                errorObj.message = "Bad Request";
                errorObj.description = exception.message;
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof validation_exception_1.ValidationException) {
                errorObj.message = exception.getResponse().toString();
                errorObj.description = exception.getErrors();
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof common_1.RequestTimeoutException) {
                errorObj.message = "Bad Request";
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof common_1.MethodNotAllowedException) {
                errorObj.message = "Bad Request";
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof common_1.UnsupportedMediaTypeException) {
                errorObj.message = "Bad Request";
                errorObj.status = exception.getStatus();
            }
            if (exception instanceof FileMissingException_1.default) {
                errorObj.message = exception.getMessage();
                errorObj.status = exception.getStatus();
                errorObj.description = exception.getDescription();
            }
            if (exception instanceof jsonwebtoken_1.TokenExpiredError) {
                errorObj.message = "Token expired.";
                errorObj.status = 401;
                errorObj.description =
                    "Please Login Again or get a new token from refresh token.";
            }
            if (exception.status === 404) {
                errorObj.message = "Route Not Found";
                errorObj.status = 404;
                errorObj.description = request.url;
            }
            logger_1.default.error(errorObj.message, {
                req: request,
                body: request.body,
                errorObj: errorObj,
                stack: exception.stack,
                res: response,
            });
            if (!response.headersSent)
                return response.status(errorObj.status).json(errorObj).send();
        }
        catch (ex) {
            logger_1.default.error(ex.message, {
                req: request,
                body: request.body,
                stack: exception.stack,
                res: response,
            });
        }
    }
};
HttpExceptionHandler = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [])
], HttpExceptionHandler);
exports.HttpExceptionHandler = HttpExceptionHandler;
//# sourceMappingURL=HttpExceptionHandler.js.map