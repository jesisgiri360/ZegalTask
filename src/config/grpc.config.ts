import { ConfigService } from "@nestjs/config";
import { join } from "path";

export interface GrpcConfigOptions {
  url: string;
  package: string;
  protoPath: string;
}
export interface GrpcConfig {
  host: string;
  port: number;
  package: string;
}

export const grpcConfigOptions = (
  configService: ConfigService
): GrpcConfigOptions => {
  const config: GrpcConfig = configService.get("grpc.primary");
  return {
    url: `${config.host}:${config.port}`,
    package: config.package,
    protoPath: join(global.rootPath, `proto/${config.package}.proto`),
  };
};

export const remoteServiceOptions = (
  configService: ConfigService
): GrpcConfigOptions => {
  const grpcConfig: GrpcConfig = configService.get("grpc");
  const httpConfig: GrpcConfig = configService.get("http");

  return {
    url: `${httpConfig.host}:${grpcConfig.port}`,
    package: grpcConfig.package,
    protoPath: join(global.rootPath, `proto/${grpcConfig.package}.proto`),
  };
};
