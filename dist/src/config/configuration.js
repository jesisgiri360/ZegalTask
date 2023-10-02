"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = require("js-yaml");
const path_1 = require("path");
const dotenv = require("dotenv");
dotenv.config();
const YAML_CONFIG_FILENAME = "config.yaml";
const YAML_CONFIG_TEST = "config-test.yaml";
exports.default = () => {
    return yaml.load((0, fs_1.readFileSync)((0, path_1.join)(process.env.CONFIG_FILE_PATH
        ? process.env.CONFIG_FILE_PATH
        : __dirname + "/resources", process.env.NODE_ENV === "test"
        ? YAML_CONFIG_TEST
        : YAML_CONFIG_FILENAME), "utf8"));
};
//# sourceMappingURL=configuration.js.map