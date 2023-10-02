"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const configuration_1 = require("./configuration");
const redisConnection = () => {
    const config = (0, configuration_1.default)();
    const configService = new config_1.ConfigService(config);
    const redis = configService.get("dataSource.redis");
    return {
        host: redis.host,
        port: redis.port,
        password: redis.password,
    };
};
exports.redisConnection = redisConnection;
const connection = () => {
    const config = (0, configuration_1.default)();
    const configService = new config_1.ConfigService(config);
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
const readFilesFromFolder = (directory, allFiles) => {
    const files = allFiles || [];
    const filesAndFolders = fs
        .readdirSync(directory)
        .map((fileName) => {
        return path.join(directory, fileName);
    });
    filesAndFolders.forEach((file) => {
        if (fs.statSync(file).isDirectory()) {
            readFilesFromFolder(file, files);
        }
        else {
            if (file.endsWith("entity.js") || file.endsWith("entity.ts"))
                files.push(file);
        }
    });
    return files;
};
exports.default = connection;
//# sourceMappingURL=database.config.js.map