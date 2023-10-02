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
exports.RabbitMqService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amqp_connection_manager_1 = require("amqp-connection-manager");
let RabbitMqService = class RabbitMqService {
    constructor(configService) {
        this.configService = configService;
        this.messageCounter = 0;
        this.initializeRabbitMQ();
    }
    initializeRabbitMQ() {
        const config = this.configService.get("dataSource.rabbitMQ");
        const CONN_URL = `amqp://${config.user}:${config.password}@${config.host}`;
        this.connection = amqp_connection_manager_1.default.connect([CONN_URL], {
            heartbeatIntervalInSeconds: 30,
        });
        this.connection.on("connect", () => {
            console.log("Connected to RabbitMQ!");
            this.createChannel();
            this.startTime = Date.now();
            this.publishMessages(20);
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
            },
        });
    }
    async publishToQueue(data) {
        const message = Object.assign({ message: await this.generateRandomMessage(), timestamp: new Date().toISOString(), priority: Math.floor(Math.random() * 10) + 1 }, data);
        await this.channelWrapper.sendToQueue("zegal-task", message);
        this.messageCounter++;
        if (this.messageCounter === 20) {
            const elapsedTime = Date.now() - this.startTime;
            console.log(elapsedTime, "-------------------->>>>>>>>>>>>>");
        }
    }
    async generateRandomMessage() {
        const phrases = [
            "Hello, World!",
            "This is a test message.",
            "Random message content.",
            "NestJS RabbitMQ publisher is awesome!",
            "Don't forget to subscribe to our channel.",
        ];
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }
    async publishMessages(rate) {
        const intervalMs = 1000 / rate;
        while (true) {
            await this.publishToQueue({});
            await this.sleep(intervalMs);
        }
    }
    async sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async onModuleDestroy() {
        await this.channelWrapper.close();
        await this.connection.close();
    }
};
RabbitMqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RabbitMqService);
exports.RabbitMqService = RabbitMqService;
//# sourceMappingURL=rabbit.mq.producer.service.js.map