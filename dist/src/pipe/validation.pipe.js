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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const classTransformer = require("class-transformer");
const classValidator = require("class-validator");
const lodash_1 = require("lodash");
const error_formatter_1 = require("../utils/error-formatter");
let ViewValidationPipe = class ViewValidationPipe {
    constructor(options) {
        options = Object.assign({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        }, options || {});
        const { transform, disableErrorMessages } = options, validatorOptions = __rest(options, ["transform", "disableErrorMessages"]);
        this.isTransformEnabled = !!transform;
        this.validatorOptions = validatorOptions;
        this.isDetailedOutputDisabled = disableErrorMessages;
    }
    async transform(value, metadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metadata)) {
            return value;
        }
        const entity = classTransformer.plainToClass(metatype, this.toEmptyIfNil(value));
        const errors = await classValidator.validate(entity, this.validatorOptions);
        if (errors.length > 0) {
            (0, error_formatter_1.ErrorFormatter)(errors);
        }
        return this.isTransformEnabled
            ? entity
            : Object.keys(this.validatorOptions).length > 0
                ? classTransformer.classToPlain(entity)
                : value;
    }
    toValidate(metadata) {
        const { metatype, type } = metadata;
        if (type === "custom") {
            return false;
        }
        const types = [String, Boolean, Number, Array, Object];
        return !types.some((t) => metatype === t) && !(0, lodash_1.isNil)(metatype);
    }
    toEmptyIfNil(value) {
        return (0, lodash_1.isNil)(value) ? {} : value;
    }
};
ViewValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object])
], ViewValidationPipe);
exports.ViewValidationPipe = ViewValidationPipe;
//# sourceMappingURL=validation.pipe.js.map