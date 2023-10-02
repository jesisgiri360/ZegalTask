import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class SocketGatewayService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    server: Server;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    sendNotification(data: any): Promise<void>;
}
