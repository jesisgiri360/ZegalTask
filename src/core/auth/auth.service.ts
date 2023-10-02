import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../strategy/constant";
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // async verifyToken(token: string): Promise<any> {
  //   try {
  //     // decode header by passing in options (useful for when you need `kid` to verify a JWT):
  //     const decodedHeader = await jwt_decode(token, { header: true });
  //     const publicKey = await getKey(decodedHeader);
  //     const payload = await this.jwtService.verify(token, {
  //       publicKey: publicKey,
  //     });
  //     return payload;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
}
