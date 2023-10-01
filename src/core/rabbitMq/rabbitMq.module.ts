import { Module } from "@nestjs/common";
import { TicketChatMessageController } from "./ticket-chat.controller";
import { PgDatabaseServiceModule } from "../pg-pool/pg.module";
import { ChatGatewayModule } from "../Chat-Gateway/chat-gateway.module";

@Module({
  imports: [PgDatabaseServiceModule, ChatGatewayModule],
  controllers: [TicketChatMessageController],
  providers: [],
  exports: [],
})
export class RabbitMqModule {}
