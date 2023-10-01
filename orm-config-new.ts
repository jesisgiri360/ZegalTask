import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";
import { Inject } from "@nestjs/common";

interface dbConfig {
  host: string;
  username: string;
  password: string;
  dbname: string;
  port: number;
  logging: boolean;
  logger: "advanced-console" | "simple-console" | "file" | "debug";
}

const connection = (
  configService: ConfigService
): PostgresConnectionOptions => {
  const dbConfig = configService.get("datasource.primary");
  return {
    name: "default",
    type: "postgres",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.dbname,
    synchronize: false,
    logging: dbConfig.logging,
    logger: dbConfig.logger,
    entities: [
      __dirname + "/src/core/**/*.entity.{ts,js}",
      __dirname + "/src/core/**/**/*.entity.{ts,js}",
    ],
    subscribers: [__dirname + "/src/subscriber/*.{ts,js}"],
    migrations: [__dirname + "/database/migrations/*.{ts,js}"],
    cli: {
      entitiesDir: "src/core",
      migrationsDir: "database/migrations",
      subscribersDir: "src/subscriber",
    },
  };
};

export default connection;
