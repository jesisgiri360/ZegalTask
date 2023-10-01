import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constant";
import { TokenData } from "../../interfaces/common.interfaces";
import * as jwksRsa from "jwks-rsa";
import { passportJwtSecret } from "jwks-rsa";
import { identityServer } from "@config/url";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-strategy") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        jwksUri: identityServer.jwksUri,
      }),
    });
  }

  async validate(payload: any) {
    const tokenData: TokenData = { ...payload };
    return tokenData;
  }
}
