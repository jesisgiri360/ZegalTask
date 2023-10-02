"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class LmsException extends common_1.HttpException {
    constructor(status, message, error, logObject, description) {
        super(message, status);
        this.message = message;
        this.description = description;
        this.error = error;
        this.logObject = logObject;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.message;
    }
    getErrorStack() {
        return this.error;
    }
    getDescription() {
        return this.description;
    }
    getLogObject() {
        return this.logObject;
    }
}
exports.default = LmsException;
//# sourceMappingURL=LmsException.js.map