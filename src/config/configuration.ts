import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config();

const YAML_CONFIG_FILENAME = "config.yaml";

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
