import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SocketGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log(`Socket server initialized`);
  }

  // @SubscribeMessage("chatMessage")
  // eventHandlers(@MessageBody() data: string) {
  //   console.log(data);
  //   this.server.sockets.emit("chatMessage", `${data} ${Date()}`);
  // }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
  async sendNotification(data: any) {
    this.server.sockets.emit(`zegal-task`, data);
    return;
  }
}
