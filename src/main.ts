import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from "typeorm-transactional-cls-hooked";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ViewValidationPipe } from "src/pipe/validation.pipe";
import { VersioningType } from "@nestjs/common";
import { join } from "path";
import { URL } from "@config/url";
import * as path from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import logger from "./logger";
import * as socketIo from "socket.io";

async function bootstrap() {
  // await readVaultData();
  global.rootPath = path.resolve(__dirname);
  global.systemBase = path.resolve(__dirname, "../../");
  const NODE_ENV = process.env.NODE_ENV || "development";
  console.log({ NODE_ENV });

  if (["production", "prod"].includes(NODE_ENV)) {
    console.log = () => {};
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger:
      NODE_ENV === "development"
        ? ["log", "error", "warn", "debug", "verbose"]
        : ["error", "warn"],
  });

  app.disable("x-powered-by");
  app.enableCors(
//{
  //  origin: true,
  //  preflightContinue: true,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//    credentials: true,
//  }
);
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ViewValidationPipe({ transform: true }));
  const port = configService.get<number>("http.port");
  app.enableVersioning({
    defaultVersion: "1",
    prefix: "v",
    type: VersioningType.URI,
  });
  app.setGlobalPrefix("api");
  // app.useStaticAssets(join(__dirname, "/config/resources/assets"), {
  //   prefix: "/assets/",
  // });
  if (["development", "dev", "staging", "uat"].includes(NODE_ENV)) {
    const config = new DocumentBuilder()
      .setTitle("Tms Chat ")
      .setDescription("The tms chat")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag("tms_chat")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }
  console.log(port);
  const server = await app.listen(port);
  // const io = new socketIo.Server(server);
  // app.useWebSocketAdapter(new WsAdapter(io));

  // const messages = app.get<MessageService>(MessageService);
  // messages.initializeMasterMessageCache().then();
  // await app.startAllMicroservices();
}

bootstrap()
  .then(() => console.info("************STARTED*************"))
  .catch((err) => {
    logger.error(err.message);
  });
