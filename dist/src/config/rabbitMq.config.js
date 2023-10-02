"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMqConfigOption = void 0;
const rabbitMqConfigOption = (configService, queueName) => {
    const config = configService.get("rabbitMQ");
    return {
        urls: [`amqp://${config.user}:${config.password}@${config.host}`],
        queue: config[queueName],
        noAck: true,
        persistent: true,
        queueOptions: {
            durable: true,
        },
    };
};
exports.rabbitMqConfigOption = rabbitMqConfigOption;
//# sourceMappingURL=rabbitMq.config.js.map