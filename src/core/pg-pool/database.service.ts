import configuration from "@config/configuration";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool, QueryConfig } from "pg";

const config = configuration();
const configService: ConfigService = new ConfigService<
  Record<string, unknown>,
  false
>(config);
const dbConfig = configService.get("dataSource.primary");
const dbConnection = {
  user: dbConfig.username,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
};

@Injectable()
export class PgDatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool(dbConnection);
  }

  async query<T>(queryText: string, values: any[] = []): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const queryConfig: QueryConfig = {
        text: queryText,
        values,
      };

      const result = await client.query(queryConfig);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
