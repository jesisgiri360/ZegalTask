import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
interface redisConfig {
    host: string;
    port: number;
    password: string;
}
declare const redisConnection: () => redisConfig;
declare const connection: () => PostgresConnectionOptions;
export default connection;
export { redisConnection };
