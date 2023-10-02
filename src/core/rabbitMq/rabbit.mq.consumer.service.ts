import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import amqp from "amqp-connection-manager";
import { SocketGatewayService } from "../Socket-Gateway/socket-gateway.service";

@Injectable()
export class RabbitMqConsumerService implements OnModuleInit, OnModuleDestroy {
  private connection;
  private channelWrapper;

  constructor(
    private configService: ConfigService,
    private socketGatewayService: SocketGatewayService
  ) {}

  async onModuleInit() {
    this.initializeRabbitMQ();
  }

  private initializeRabbitMQ() {
    const config = this.configService.get("dataSource.rabbitMQ");
    const CONN_URL = `amqp://${config.user}:${config.password}@${config.host}`;

    this.connection = amqp.connect([CONN_URL], {
      heartbeatIntervalInSeconds: 30,
    });

    this.connection.on("connect", () => {
      console.log("Connected to RabbitMQ for consuming!");
      this.createChannel();
    });

    this.connection.on("disconnect", (err) => {
      console.error("Disconnected from RabbitMQ.", err);
    });
  }

  private createChannel() {
    this.channelWrapper = this.connection.createChannel({
      json: true,
      setup: async (channel) => {
        await channel.assertQueue("zegal-task", { durable: true });
        // Define the logic to consume messages here
        channel.consume("zegal-task", async (message) => {
          if (message) {
            await this.handleMessage(message);
          }
        });
      },
    });
  }

  async handleMessage(message) {
    const content = JSON.parse(message.content.toString());
    console.log("Received message:", content);
    // Check if the message priority is greater than or equal to 7
    if (content.priority >= 7) {
      console.log("Received message with priority >= 7:", content);
      const data = {
        message: content.message,
        timestamp: content.timestamp,
        priority: content.priority,
      };
      await this.socketGatewayService.sendNotification(data);
    } else {
      console.log("Received message with priority < 7. Ignoring:", content);
    }

    // Manually acknowledge the message
    await this.channelWrapper.ack(message);
    return;
  }

  async onModuleDestroy() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
