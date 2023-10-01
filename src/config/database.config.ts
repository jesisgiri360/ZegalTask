import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import configuration from "./configuration";

interface redisConfig {
  host: string;
  port: number;
  password: string;
}

interface dbConfig {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  logging: boolean;
  logger: "advanced-console" | "simple-console" | "file" | "debug";
}

const redisConnection = (): redisConfig => {
  const config = configuration();
  const configService: ConfigService = new ConfigService<
    Record<string, unknown>,
    false
  >(config);
  const redis = configService.get("dataSource.redis");
  return {
    host: redis.host,
    port: redis.port,
    password: redis.password,
  };
};

const connection = (): PostgresConnectionOptions => {
  const config = configuration();
  const configService: ConfigService = new ConfigService<
    Record<string, unknown>,
    false
  >(config);
  const dbConfig = configService.get("dataSource.primary");
  const dir = __dirname;

  return {
    name: "default",
    type: "postgres",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: false,
    logger: "advanced-console",
    logging: true,
    connectTimeoutMS: 5000,
    // logNotifications: true,
    poolErrorHandler(err) {
      console.info(err);
    },
    entities: readFilesFromFolder(dir + "/../core/"),
    migrations: [dir + "/.../migrations/*.{ts,js}"],
    cli: {
      entitiesDir: "dist/src/core",
      migrationsDir: dir + "/../migrations",
    },
  };
};
const readFilesFromFolder = (
  directory: string,
  allFiles?: string[]
): string[] => {
  const files = allFiles || [];
  const filesAndFolders: string[] = fs
    .readdirSync(directory)
    .map((fileName) => {
      return path.join(directory, fileName);
    });

  filesAndFolders.forEach((file: string) => {
    if (fs.statSync(file).isDirectory()) {
      readFilesFromFolder(file, files);
    } else {
      if (file.endsWith("entity.js") || file.endsWith("entity.ts"))
        files.push(file);
    }
  });
  return files;
};
export default connection;
export { redisConnection };
