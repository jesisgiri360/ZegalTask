import { Module } from "@nestjs/common";
import { SocketGatewayService } from "./socket-gateway.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [SocketGatewayService],
  exports: [SocketGatewayService],
})
export class SocketGatewayModule {}
