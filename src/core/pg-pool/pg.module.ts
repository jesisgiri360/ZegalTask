import { Module } from "@nestjs/common";
import { PgDatabaseService } from "./database.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PgDatabaseService],
  exports: [PgDatabaseService],
})
export class PgDatabaseServiceModule {}
