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
      setup: async function (channel) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        // Note that `this` here is the channelWrapper instance.
        await channel.assertExchange(
          "perform-settlement",
          "x-delayed-message",
          {
            durable: true,
            arguments: { "x-delayed-type": "direct" },
          }
        );
        await channel.bindQueue(
          config.CBS_PERFORM_TRANSACTION_QUEUE,
          "perform-settlement",
          "performsettlement"
        );
        return await channel.assertQueue(config.CBS_PERFORM_TRANSACTION_QUEUE, {
          durable: true,
        });
      },
    });
    let delay = 0;
    if (data?.retry) {
      delay = 900000;
    }
    const headers = { "x-delay": delay };
    await channelWrapper.publish(
      "perform-settlement",
      "performsettlement",
      { ...data },
      { headers }
    );
    await channelWrapper.close();
    await connection.close();
  }
}
