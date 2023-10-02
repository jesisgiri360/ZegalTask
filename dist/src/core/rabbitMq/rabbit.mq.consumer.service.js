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
exports.RabbitMqConsumerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amqp_connection_manager_1 = require("amqp-connection-manager");
const socket_gateway_service_1 = require("../Socket-Gateway/socket-gateway.service");
let RabbitMqConsumerService = class RabbitMqConsumerService {
    constructor(configService, socketGatewayService) {
        this.configService = configService;
        this.socketGatewayService = socketGatewayService;
    }
    async onModuleInit() {
        this.initializeRabbitMQ();
    }
    initializeRabbitMQ() {
        const config = this.configService.get("dataSource.rabbitMQ");
        const CONN_URL = `amqp://${config.user}:${config.password}@${config.host}`;
        this.connection = amqp_connection_manager_1.default.connect([CONN_URL], {
            heartbeatIntervalInSeconds: 30,
        });
        this.connection.on("connect", () => {
            console.log("Connected to RabbitMQ for consuming!");
            this.createChannel();
        });
        this.connection.on("disconnect", (err) => {
            console.error("Disconnected from RabbitMQ.", err);
        });
    }
    createChannel() {
        this.channelWrapper = this.connection.createChannel({
            json: true,
            setup: async (channel) => {
                await channel.assertQueue("zegal-task", { durable: true });
                channel.consume("zegal-task", async (message) => {
                    if (message) {
                        await this.handleMessage(message);
                    }
                });
            },
        });
    }
    async handleMessage(message) {
        const content = JSON.parse(message.content.toString());
        console.log("Received message:", content);
        if (content.priority >= 7) {
            console.log("Received message with priority >= 7:", content);
            const data = {
                message: content.message,
                timestamp: content.timestamp,
                priority: content.priority,
            };
            await this.socketGatewayService.sendNotification(data);
        }
        else {
            console.log("Received message with priority < 7. Ignoring:", content);
        }
        await this.channelWrapper.ack(message);
        return;
    }
    async onModuleDestroy() {
        await this.channelWrapper.close();
        await this.connection.close();
    }
};
RabbitMqConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        socket_gateway_service_1.SocketGatewayService])
], RabbitMqConsumerService);
exports.RabbitMqConsumerService = RabbitMqConsumerService;
//# sourceMappingURL=rabbit.mq.consumer.service.js.map