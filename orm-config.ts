// import configuration from "./src/config/configuration";
// import connection from "./src/config/database.config";
// import { ConfigService } from "@nestjs/config";

// const config = configuration();
// const configService: ConfigService = new ConfigService<
//   Record<string, unknown>,
//   false
// >(config);

// let dbConfiguration = connection();
// dbConfiguration = {
//   ...dbConfiguration,
//   // entities:[__dirname+'src/cored]',
//   subscribers: [__dirname + "/src/subscriber/*.{ts,js}"],
//   migrations: [__dirname + "/src/migrations/*.{ts,js}"],
//   cli: {
//     entitiesDir: "src/core",
//     migrationsDir: "src/migrations",
//     subscribersDir: "src/subscriber",
//   },
// };
// export default dbConfiguration;
