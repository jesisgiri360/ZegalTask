"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomUnauthorizedException = void 0;
const RunTimeException_1 = require("./RunTimeException");
class CustomUnauthorizedException extends RunTimeException_1.default {
    constructor(status = 400, message = "loginError") {
        super(status, message);
    }
}
exports.CustomUnauthorizedException = CustomUnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map