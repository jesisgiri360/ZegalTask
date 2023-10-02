import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SocketGatewayService } from "../Socket-Gateway/socket-gateway.service";
export declare class RabbitMqConsumerService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private socketGatewayService;
    private connection;
    private channelWrapper;
    constructor(configService: ConfigService, socketGatewayService: SocketGatewayService);
    onModuleInit(): Promise<void>;
    private initializeRabbitMQ;
    private createChannel;
    handleMessage(message: any): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
