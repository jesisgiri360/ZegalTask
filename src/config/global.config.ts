import { Global, Module } from "@nestjs/common";
import { ApiHelper } from "src/helpers/third-party-api-call.helper";

@Global()
@Module({
  imports: [],
  providers: [ApiHelper],
  exports: [ApiHelper],
})
export class GlobalModule {}
