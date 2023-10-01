import { ConfigService } from "@nestjs/config";
import configuration from "./configuration";
const config = configuration();
const configService: ConfigService = new ConfigService<
  Record<string, unknown>,
  false
>(config);
export const URL = {
  C: {},
};

export const identityServer = {
  serverUri: configService.get("dataSource.hris.IDENTITY_SERVER"),
  issuer: `${process.env.ISSUER}`,
  jwksUri: configService.get("dataSource.hris.jwksuri"),
  authorization_endpoint: `${process.env.AUTHORIZATION_ENDPOINT}`,
};
