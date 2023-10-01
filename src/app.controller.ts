import { CACHE_MANAGER, Controller, Get, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "";
    return this.appService.getHello();
  }

  @Get("/ping")
  getPing() {
    return this.appService.ping();
  }
}
