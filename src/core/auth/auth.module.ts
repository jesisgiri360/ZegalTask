import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
// import { JwtStrategy } from "../strategy/jwt.strategy";

@Module({
  imports: [
    // TypeOrmModule.forFeature([
    //   InternalRefreshTokenRepository,
    //   InternalAccessRepository,
    //   InternalUserSessionRepository,
    // ]),
    // UsersModule,
    PassportModule.register({ defaultStrategy: "jwt-strategy" }),
    {
      ...JwtModule.register({
        signOptions: { expiresIn: "3000000s" },
      }),
      global: true,
    },
  ],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
