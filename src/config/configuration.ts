import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config();

const environment = process.env.NODE_ENV || "development";

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("CONFIG_FILE_PATH", process.env.CONFIG_FILE_PATH);
console.log("environment", environment);

const YAML_CONFIG_FILENAME =
  process.env.CONFIG_FILE_PATH || environment === "production"
    ? "config.yaml"
    : `config.${environment}.yaml`;

const YAML_CONFIG_TEST = "config-test.yaml";

export default () => {
  return yaml.load(
    readFileSync(
      join(
        process.env.CONFIG_FILE_PATH
          ? process.env.CONFIG_FILE_PATH
          : __dirname + "/resources",
        process.env.NODE_ENV === "test"
          ? YAML_CONFIG_TEST
          : YAML_CONFIG_FILENAME
      ),
      "utf8"
    )
  ) as Record<string, any>;
};
