import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import amqp from "amqp-connection-manager";
import { IAmqpConnectionManager } from "amqp-connection-manager/dist/esm/AmqpConnectionManager";

@Injectable()
export class RabbitMqService implements OnModuleDestroy {
  private connection: IAmqpConnectionManager;
  private channelWrapper;
  private messageCounter: number = 0;
  private startTime: number;

  constructor(private configService: ConfigService) {
    this.initializeRabbitMQ();
  }

  private initializeRabbitMQ() {
    const config = this.configService.get("dataSource.rabbitMQ");
    const CONN_URL = `amqp://${config.user}:${config.password}@${config.host}`;

    this.connection = amqp.connect([CONN_URL], {
      heartbeatIntervalInSeconds: 30,
    });

    this.connection.on("connect", () => {
      console.log("Connected to RabbitMQ!");
      this.createChannel();
      this.startTime = Date.now();
      this.publishMessages(20); // Start publishing messages at a rate of 20 per second
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
      },
    });
  }

  async publishToQueue(data: any) {
    const message = {
      message: await this.generateRandomMessage(),
      timestamp: new Date().toISOString(),
      priority: Math.floor(Math.random() * 10) + 1,
      ...data,
    };

    await this.channelWrapper.sendToQueue("zegal-task", message);
    this.messageCounter++;

    if (this.messageCounter === 20) {
      const elapsedTime = Date.now() - this.startTime;
      console.log(elapsedTime, "-------------------->>>>>>>>>>>>>");
    }
  }

  async generateRandomMessage() {
    const phrases = [
      "Hello, World!",
      "This is a test message.",
      "Random message content.",
      "NestJS RabbitMQ publisher is awesome!",
      "Don't forget to subscribe to our channel.",
      // Add more phrases here
    ];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }

  async publishMessages(rate: number) {
    const intervalMs = 1000 / rate;

    while (true) {
      await this.publishToQueue({});
      await this.sleep(intervalMs);
    }
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async onModuleDestroy() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
