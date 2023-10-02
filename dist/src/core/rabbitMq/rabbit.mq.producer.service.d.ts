import { OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class RabbitMqService implements OnModuleDestroy {
    private configService;
    private connection;
    private channelWrapper;
    private messageCounter;
    private startTime;
    constructor(configService: ConfigService);
    private initializeRabbitMQ;
    private createChannel;
    publishToQueue(data: any): Promise<void>;
    generateRandomMessage(): Promise<string>;
    publishMessages(rate: number): Promise<void>;
    private sleep;
    onModuleDestroy(): Promise<void>;
}
