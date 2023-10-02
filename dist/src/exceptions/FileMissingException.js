"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileMissingException {
    getMessage() {
        return "File is a required field.";
    }
    getStatus() {
        return 422;
    }
    getCode() {
        return 422;
    }
    getSource() {
        return "";
    }
    getDescription() {
        return "File is required filed.Please make sure file exists on a request";
    }
}
exports.default = FileMissingException;
//# sourceMappingURL=FileMissingException.js.map