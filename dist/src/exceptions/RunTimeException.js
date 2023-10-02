"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class RunTimeException extends common_1.HttpException {
    constructor(status, message, source, description) {
        super(message, status);
        this.message = message;
        this.source = source;
        this.description = description;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.message;
    }
    getSource() {
        return this.source;
    }
    getDescription() {
        return this.description;
    }
}
exports.default = RunTimeException;
//# sourceMappingURL=RunTimeException.js.map