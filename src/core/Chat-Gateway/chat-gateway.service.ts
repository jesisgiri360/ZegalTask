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
import { AuthService } from "../auth/auth.service";
import { PgDatabaseService } from "../pg-pool/database.service";
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly authService: AuthService,
    private readonly pgService: PgDatabaseService
  ) {}
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
    const token = client.handshake.query.token as string;

    if (!token) {
      console.log("Token not provided");
      // No token provided, reject the connection
      client.emit("error", "No token provided");
      client.disconnect();
      return;
    }

    try {
      const payload = await this.authService.verifyToken(token);
      if (!payload) {
        client.emit("error", "Token not verified!!!");
        client.disconnect();
        return;
      }
      // Authentication successful, continue handling the connection
      console.log(`Authenticated user: ${payload.emp_code}`);
    } catch (error) {
      // Invalid token, disconnect the client
      client.disconnect();
    }
    console.log(`Connected ${client.id}`);
  }
  async sendNotification(data: any) {
    this.server.sockets.emit(`${data.receiverId}`, data);
    this.server.sockets.emit(`inbox-${data.receiverId}`, data);
    return;
  }

  async sendChatNotification(data: any) {
    this.server.sockets.emit(`chat-notification-${data.receiverId}`, data);
    //   const query = ` WITH ranked_notifications AS (
    //     SELECT
    //         cn.id,
    //         cn.ticket_id,
    //         cn.ticket_name,
    //         cn.message,
    //         cn.sender_id,
    //         cn.receiver_id,
    //         cn.seen,
    //         cn.created_at,
    //         cn.updated_at,
    //         ROW_NUMBER() OVER (PARTITION BY cn.ticket_id, cn.sender_id ORDER BY cn.created_at DESC) AS row_num
    //     FROM chat_notification cn
    //     WHERE cn.receiver_id = $1
    // )
    // , result_set AS (
    //     SELECT
    //         id,
    //         ticket_id,
    //         ticket_name,
    //         message,
    //         sender_id,
    //         receiver_id,
    //         seen,
    //         created_at,
    //         updated_at
    //     FROM ranked_notifications
    //     WHERE row_num = 1 AND seen = false
    // )
    // SELECT COUNT(*) as "count"
    // FROM result_set;
    //   `;
    //   const recentCount: any = await this.pgService.query(query, [
    //     data.receiverId,
    //   ]);
    //   this.server.sockets.emit(
    //     `notification-count-${data.receiverId}`,
    //     recentCount[0].count
    //   );
    return;
  }
}
