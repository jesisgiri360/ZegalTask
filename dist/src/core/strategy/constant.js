"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
const config_1 = require("@nestjs/config");
const configuration_1 = require("../../config/configuration");
const config = (0, configuration_1.default)();
const configService = new config_1.ConfigService(config);
exports.jwtConstants = {
    token: (configService === null || configService === void 0 ? void 0 : configService.get("jwtConstants.secretToken")) ||
        "q3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaSgUkXp2s5v8y/B?E(H+MbQeTh",
    RefreshToken: (configService === null || configService === void 0 ? void 0 : configService.get("jwtConstants.refreshToken")) ||
        "refreshTOken_kjfbakhfba8ihjknfoahfohwnbetiyhweoarhbnflanl====abigsabf*bfdkjja7anjdf2",
};
//# sourceMappingURL=constant.js.map