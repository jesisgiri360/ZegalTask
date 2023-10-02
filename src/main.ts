import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";
import { join } from "path";
import * as path from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import logger from "./logger";

async function bootstrap() {
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

  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>("http.port");
  app.enableVersioning({
    defaultVersion: "1",
    prefix: "v",
    type: VersioningType.URI,
  });
  app.setGlobalPrefix("api");
  app.useStaticAssets(join(__dirname, "/config/resources/assets"), {
    prefix: "/assets/",
  });
  if (["development", "dev", "staging", "uat"].includes(NODE_ENV)) {
    const config = new DocumentBuilder()
      .setTitle("Zegal Task ")
      .setDescription("Zegal Task")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag("Zegal Task")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }
  console.log(port);
  const server = await app.listen(port);
}

bootstrap()
  .then(() => console.info("************STARTED*************"))
  .catch((err) => {
    logger.error(err.message);
  });
