import { Type } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum CustomerStatus {
  INPROGRESS = "inprogress",
  SUBMITTED = "submitted",
  COMPLETED = "completed",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
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

export enum SettlementProcess {
  PUBLISHED = "PUBLISHED",
  CONSUMED = "CONSUMED",
  CBS_CHECK_BALANCE = "CHECK_CBS_BALANCE",
  CBS_LOGIN = "CBS_LOGIN",
  CBS_PAYMENT_CHARGE = "CBS_PAYMENT_CHARGE",
  LMS_PAYMENT_REQUEST = "LMS_PAYMENT_CHARGE",
}

export interface TokenDataToSave {
  customerCode: string;
  tranUserId: number;
  status: number;
}

export class PaginationInterface {
  @IsOptional()
  page?: number;

  @IsOptional()
  size?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  searchBy?: string;

  @IsOptional()
  @IsString()
  searchValue?: string;
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

export class CommonIdentity {
  @IsOptional()
  issueAuthorityTypeName: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  identityTypeId: number;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  docTypeId: number;
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  issueAuthorityTypeCode: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  issueOfficeTypeCode: number;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  issueOfficeTypeName: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  issueAuthorityName: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  identityNo: string;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  issueDate: Date;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiryDate: Date;
}
