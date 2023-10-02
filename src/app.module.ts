import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigurationModule } from "./config/configuration.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import Connection, { redisConnection } from "./config/database.config.js";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionHandler } from "./handler/HttpExceptionHandler";
import { importClassesFromDirectories } from "./utils/file.to.class.converter";
import TransformInterceptor from "./interceptor/TransformInterceptor";
import { AsyncContextModule } from "./utils/context";
import configuration from "./config/configuration";
import { GlobalModule } from "./config/global.config";
import { ContextInterceptor } from "@interceptor/pre/context.interceptor";

@Module({
  imports: [
    ConfigurationModule,
    // TypeOrmModule.forRoot({
    //   ...Connection(),
    // }),
    GlobalModule,
    ...importClassesFromDirectories(),
    AsyncContextModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
