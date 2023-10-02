import { ConfigService } from "@nestjs/config";
export interface RabbitMqConfig {
    user: string;
    password: string;
    host: string;
    port: number;
    queue: string;
}
export interface RabbitMqConfigOption {
    urls: string[];
    queue: string;
    queueOptions: object;
    noAck: boolean;
    persistent: boolean;
}
export declare const rabbitMqConfigOption: (configService: ConfigService, queueName: string) => RabbitMqConfigOption;
