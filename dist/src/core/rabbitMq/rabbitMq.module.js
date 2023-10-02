"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqModule = void 0;
const common_1 = require("@nestjs/common");
const rabbit_mq_producer_service_1 = require("./rabbit.mq.producer.service");
const rabbit_mq_consumer_service_1 = require("./rabbit.mq.consumer.service");
const socket_gateway_module_1 = require("../Socket-Gateway/socket-gateway.module");
let RabbitMqModule = class RabbitMqModule {
};
RabbitMqModule = __decorate([
    (0, common_1.Module)({
        imports: [socket_gateway_module_1.SocketGatewayModule],
        controllers: [],
        providers: [rabbit_mq_producer_service_1.RabbitMqService, rabbit_mq_consumer_service_1.RabbitMqConsumerService],
        exports: [rabbit_mq_producer_service_1.RabbitMqService, rabbit_mq_consumer_service_1.RabbitMqConsumerService],
    })
], RabbitMqModule);
exports.RabbitMqModule = RabbitMqModule;
//# sourceMappingURL=rabbitMq.module.js.map