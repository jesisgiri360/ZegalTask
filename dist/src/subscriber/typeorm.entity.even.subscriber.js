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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMEntityEvenSubscriber = void 0;
const typeorm_1 = require("typeorm");
const context_1 = require("../utils/context");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let TypeORMEntityEvenSubscriber = class TypeORMEntityEvenSubscriber {
    constructor(connection) {
        this.connection = connection;
        connection.subscribers.push(this);
    }
    beforeInsert(event) {
        var _a, _b;
        let userId;
        const asyncContext = this.ac.checkValid();
        if (asyncContext)
            userId = this.ac.get("userId");
        if (userId) {
            event.entity.createdBy = userId;
            event.entity.updatedBy = userId;
        }
        if ((_a = event === null || event === void 0 ? void 0 : event.entity) === null || _a === void 0 ? void 0 : _a.createdAt)
            event.entity.createdAt = new Date();
        if ((_b = event === null || event === void 0 ? void 0 : event.entity) === null || _b === void 0 ? void 0 : _b.updatedAt)
            event.entity.updatedAt = new Date();
        console.log(` INSERT HOOK `);
    }
    beforeUpdate(event) {
        var _a;
        let userId;
        const asyncContext = this.ac.checkValid();
        if (asyncContext)
            userId = this.ac.get("userId");
        if (userId) {
            event.entity.updatedBy = userId ? userId : null;
        }
        if ((_a = event === null || event === void 0 ? void 0 : event.entity) === null || _a === void 0 ? void 0 : _a.updatedAt)
            event.entity.updatedAt = new Date();
        console.log(` UPDATE HOOK `);
    }
};
__decorate([
    (0, common_1.Inject)(context_1.AsyncContext),
    __metadata("design:type", context_1.AsyncContext)
], TypeORMEntityEvenSubscriber.prototype, "ac", void 0);
TypeORMEntityEvenSubscriber = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], TypeORMEntityEvenSubscriber);
exports.TypeORMEntityEvenSubscriber = TypeORMEntityEvenSubscriber;
//# sourceMappingURL=typeorm.entity.even.subscriber.js.map