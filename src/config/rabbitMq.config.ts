import { ConfigService } from "@nestjs/config";

export interface RabbitMqConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  queue: string;
}

export interface RabbitMqConfigOption {
  urls: string[];
  queue: string;
  queueOptions: object;
  noAck: boolean;
  persistent: boolean;
}

export const rabbitMqConfigOption = (
  configService: ConfigService,
  queueName: string
): RabbitMqConfigOption => {
  const config: RabbitMqConfig = configService.get("rabbitMQ");
  // console.log(configService);
  return {
    urls: [`amqp://${config.user}:${config.password}@${config.host}`],
    queue: config[queueName],
    noAck: true,
    persistent: true,
    queueOptions: {
      durable: true,
    },
  };
};
