// import { ExtractJwt, Strategy } from "passport-jwt";
// import { PassportStrategy } from "@nestjs/passport";
// import { Injectable } from "@nestjs/common";
// import { jwtConstants } from "./constant";
// import { TokenData } from "../../interfaces/common.interfaces";

// @Injectable()
// export class SystemStrategy extends PassportStrategy(
//   Strategy,
//   "system-strategy"
// ) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.SystemToken,
//     });
//   }

//   async validate(payload: any) {
//     const { iat, exp, ...data } = payload;

//     const tokenData: TokenData = { ...data };
//     return tokenData;
//   }
// }
