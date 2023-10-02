"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFormatter = exports.format = void 0;
const validation_exception_1 = require("../exceptions/validation.exception");
function format(errors) {
    let data = {};
    errors.forEach((error) => {
        var _a;
        const response = {};
        if ((_a = error === null || error === void 0 ? void 0 : error.children) === null || _a === void 0 ? void 0 : _a.length) {
            response[error.property] = format(error.children);
        }
        else {
            response[error.property] = Object.entries(error.constraints).map(([key, value]) => {
                return value;
            });
        }
        data = Object.assign(Object.assign({}, data), response);
    });
    return data;
}
exports.format = format;
function ErrorFormatter(errors) {
    throw new validation_exception_1.ValidationException(format(errors));
}
exports.ErrorFormatter = ErrorFormatter;
//# sourceMappingURL=error-formatter.js.map