"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        super("Cannot Process Request Body", 422);
        this.errors = errors;
    }
    getErrors() {
        return this.errors;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map