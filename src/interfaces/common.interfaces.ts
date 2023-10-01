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
import { ToBoolean } from "@decorator/transform.decorator";

export enum Status {
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum RequestStatus {
  SUBMITTED = "submitted",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum BatchStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum ProductSetupApprovalStatus {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum ApprovalTemplateName {
  ACCOUNT_TEMPLATE = "account-template",
  USER_TEMPLATE = "user-template",
  PRODUCT_TEMPLATE = "product-template",
}

export enum Priority {
  HIGH = "high",
  LOW = "low",
}
export enum BugStatus {
  TODO = "TODO",
  ACKNOWLEDGED = "ACKNOWLEDGED",
  INVALID = "INVALID",
  FAIL = "FAIL",
  RESOLVED = "RESOLVED",
}
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
  sub: number;
  empCode: number;
}
export interface RequestInfoData {
  ip: string;
  useragent: string;
}
export interface GetUserAgentData {
  ip: string;
  browser: string;
  os: string;
  device: string;
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
  @ToBoolean()
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
