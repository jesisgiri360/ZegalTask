"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const configuration_module_1 = require("./config/configuration.module");
const core_1 = require("@nestjs/core");
const HttpExceptionHandler_1 = require("./handler/HttpExceptionHandler");
const file_to_class_converter_1 = require("./utils/file.to.class.converter");
const TransformInterceptor_1 = require("./interceptor/TransformInterceptor");
const context_1 = require("./utils/context");
const global_config_1 = require("./config/global.config");
const context_interceptor_1 = require("./interceptor/pre/context.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            global_config_1.GlobalModule,
            ...(0, file_to_class_converter_1.importClassesFromDirectories)(),
            context_1.AsyncContextModule.forRoot({ isGlobal: true }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: context_interceptor_1.ContextInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: HttpExceptionHandler_1.HttpExceptionHandler,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: TransformInterceptor_1.default,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map