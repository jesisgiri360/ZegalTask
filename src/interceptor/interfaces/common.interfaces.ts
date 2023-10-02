import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
// import { ToBoolean } from "@decorator/transform.decorator";

export class FetchTokenData {
  @IsNotEmpty()
  @IsString()
  userName: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
export interface RequestOptions {
  method: string;
  url: string;
  data: any;
  header?: {
    [key: string]: string;
  };
}
export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface TokenData {
  username: string;
  sub: number;
  sessionId: string;
  partnerId: number;
  twoFactorAuthenticated: boolean;
}

export interface TokenDataToSave {
  partnerId: number;
}

export class PaginationInterface {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  size?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(["desc", "asc"])
  sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchValue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @ToBoolean()
  isActive?: boolean;
}

export class PaginationParams {
  @IsInt()
  limit: number;
  @IsInt()
  offset: number;
  @IsString()
  @IsOptional()
  sortVal?: string;
}

export interface LoanCalculatorResponse {
  interestSum: number;
  capitalSum: number;
  sum: number;
  tenure: number;
}
