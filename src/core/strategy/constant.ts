import { ConfigService } from "@nestjs/config";
import configuration from "src/config/configuration";

const config = configuration();
const configService: ConfigService = new ConfigService<
  Record<string, unknown>,
  false
>(config);

export const jwtConstants = {
  token:
    configService?.get("jwtConstants.secretToken") ||
    "q3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaSgUkXp2s5v8y/B?E(H+MbQeTh",
  RefreshToken:
    configService?.get("jwtConstants.refreshToken") ||
    "refreshTOken_kjfbakhfba8ihjknfoahfohwnbetiyhweoarhbnflanl====abigsabf*bfdkjja7anjdf2",
};
