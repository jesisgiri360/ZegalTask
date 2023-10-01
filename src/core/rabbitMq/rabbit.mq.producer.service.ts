// import amqp, { Options, Replies } from "amqplib";

import { Controller, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import amqp from "amqp-connection-manager";
import { IAmqpConnectionManager } from "amqp-connection-manager/dist/esm/AmqpConnectionManager";
@Injectable()
export class RabbitMqService {
  constructor(private configService: ConfigService) {}

  async publishToQueue(queueName: string, data: any) {
    const config = this.configService.get("rabbitMQ");
    const CONN_URL = `amqp://${config.user}:${config.password}@${config.host}`;
    const connection: IAmqpConnectionManager = amqp.connect(CONN_URL, {
      heartbeatIntervalInSeconds: 30,
    });
    connection.on("connect", function () {
      console.log("Connected!");
    });
    connection.on("disconnect", function (err) {
      console.log("Disconnected.", err);
    });
    let channelWrapper = connection.createChannel({
      json: true,
      setup: async (channel) => {
        await channel.assertQueue(queueName, { durable: true });
      },
    });

    // Generate a random message
    const randomMessage = this.generateRandomMessage();

    const message = {
      message: randomMessage,
      timestamp: new Date().toISOString(),
      priority: Math.floor(Math.random() * 10) + 1,
      ...data,
    };

    await channelWrapper.sendToQueue(queueName, message);

    await channelWrapper.close();
  }

  async generateRandomMessage() {
    // Replace this with your random phrase generation logic
    const phrases = [
      "Hello, World!",
      "This is a test message.",
      "Random message content.",
    ];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }

  async publishMessages(rate: number) {
    const intervalMs = 1000 / rate;

    while (true) {
      await this.publishToQueue("zegal-task", {});
      await this.sleep(intervalMs);
    }
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
