"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const path = require("path");
const logger_1 = require("./logger");
async function bootstrap() {
    global.rootPath = path.resolve(__dirname);
    global.systemBase = path.resolve(__dirname, "../../");
    const NODE_ENV = process.env.NODE_ENV || "development";
    console.log({ NODE_ENV });
    if (["production", "prod"].includes(NODE_ENV)) {
        console.log = () => { };
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
        logger: NODE_ENV === "development"
            ? ["log", "error", "warn", "debug", "verbose"]
            : ["error", "warn"],
    });
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("http.port");
    app.enableVersioning({
        defaultVersion: "1",
        prefix: "v",
        type: common_1.VersioningType.URI,
    });
    app.setGlobalPrefix("api");
    app.useStaticAssets((0, path_1.join)(__dirname, "/config/resources/assets"), {
        prefix: "/assets/",
    });
    if (["development", "dev", "staging", "uat"].includes(NODE_ENV)) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Zegal Task ")
            .setDescription("Zegal Task")
            .setVersion("1.0")
            .addBearerAuth()
            .addTag("Zegal Task")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("docs", app, document);
    }
    console.log(port);
    const server = await app.listen(port);
}
bootstrap()
    .then(() => console.info("************STARTED*************"))
    .catch((err) => {
    logger_1.default.error(err.message);
});
//# sourceMappingURL=main.js.map