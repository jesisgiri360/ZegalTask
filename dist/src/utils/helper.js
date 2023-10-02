"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyValue = void 0;
const slugify_1 = require("slugify");
const slugifyValue = (value) => {
    return (0, slugify_1.default)(value, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
    });
};
exports.slugifyValue = slugifyValue;
//# sourceMappingURL=helper.js.map