import { Module } from "@nestjs/common";
import { RabbitMqService } from "./rabbit.mq.producer.service";
import { RabbitMqConsumerService } from "./rabbit.mq.consumer.service";
import { SocketGatewayModule } from "../Socket-Gateway/socket-gateway.module";

@Module({
  imports: [SocketGatewayModule],
  controllers: [],
  providers: [RabbitMqService, RabbitMqConsumerService],
  exports: [RabbitMqService, RabbitMqConsumerService],
})
export class RabbitMqModule {}
