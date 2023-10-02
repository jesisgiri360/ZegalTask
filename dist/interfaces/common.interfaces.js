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
exports.CommonIdentity = exports.PaginationParams = exports.PaginationInterface = exports.SettlementProcess = exports.RequestMethod = exports.FetchTokenData = exports.CustomerStatus = exports.RequestStatus = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["PENDING"] = "pending";
    RequestStatus["APPROVED"] = "approved";
    RequestStatus["REJECTED"] = "rejected";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var CustomerStatus;
(function (CustomerStatus) {
    CustomerStatus["INPROGRESS"] = "inprogress";
    CustomerStatus["SUBMITTED"] = "submitted";
    CustomerStatus["COMPLETED"] = "completed";
    CustomerStatus["PENDING"] = "pending";
    CustomerStatus["APPROVED"] = "approved";
    CustomerStatus["REJECTED"] = "rejected";
})(CustomerStatus = exports.CustomerStatus || (exports.CustomerStatus = {}));
class FetchTokenData {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FetchTokenData.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FetchTokenData.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FetchTokenData.prototype, "clientId", void 0);
exports.FetchTokenData = FetchTokenData;
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["DELETE"] = "DELETE";
    RequestMethod["PATCH"] = "PATCH";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
var SettlementProcess;
(function (SettlementProcess) {
    SettlementProcess["PUBLISHED"] = "PUBLISHED";
    SettlementProcess["CONSUMED"] = "CONSUMED";
    SettlementProcess["CBS_CHECK_BALANCE"] = "CHECK_CBS_BALANCE";
    SettlementProcess["CBS_LOGIN"] = "CBS_LOGIN";
    SettlementProcess["CBS_PAYMENT_CHARGE"] = "CBS_PAYMENT_CHARGE";
    SettlementProcess["LMS_PAYMENT_REQUEST"] = "LMS_PAYMENT_CHARGE";
})(SettlementProcess = exports.SettlementProcess || (exports.SettlementProcess = {}));
class PaginationInterface {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationInterface.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationInterface.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationInterface.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationInterface.prototype, "searchBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationInterface.prototype, "searchValue", void 0);
exports.PaginationInterface = PaginationInterface;
class PaginationParams {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PaginationParams.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PaginationParams.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationParams.prototype, "sortVal", void 0);
exports.PaginationParams = PaginationParams;
class CommonIdentity {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommonIdentity.prototype, "issueAuthorityTypeName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CommonIdentity.prototype, "identityTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CommonIdentity.prototype, "docTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5),
    __metadata("design:type", String)
], CommonIdentity.prototype, "issueAuthorityTypeCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CommonIdentity.prototype, "issueOfficeTypeCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CommonIdentity.prototype, "issueOfficeTypeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CommonIdentity.prototype, "issueAuthorityName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CommonIdentity.prototype, "identityNo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CommonIdentity.prototype, "issueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CommonIdentity.prototype, "expiryDate", void 0);
exports.CommonIdentity = CommonIdentity;
//# sourceMappingURL=common.interfaces.js.map