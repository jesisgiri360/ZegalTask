import { Module } from "@nestjs/common";
import { ChatGatewayService } from "./chat-gateway.service";
import { AuthModule } from "../auth/auth.module";
import { PgDatabaseServiceModule } from "../pg-pool/pg.module";

@Module({
  imports: [AuthModule, PgDatabaseServiceModule],
  controllers: [],
  providers: [ChatGatewayService],
  exports: [ChatGatewayService],
})
export class ChatGatewayModule {}
