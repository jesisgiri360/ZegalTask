import { ConfigService } from "@nestjs/config";
import configuration from "./configuration";
const config = configuration();
const configService: ConfigService = new ConfigService<
  Record<string, unknown>,
  false
>(config);

export const MessageEnum = {
  CREATE: "M-001",
  UPDATE: "M-002",
  DELETED: "M-003",
  FETCHED: "M-004",
  ARCHIVED: "M-005",
  REMOVED: "M-006",
  UPLOADED: "M-007",
  VALIDATED: "M-008",
  SUCCESSFUL: "M-009",
  VERIFY: "M-010",
  SENT: "M-011",
  TURNON: "M-012",
  GENERATED: "M-013",
  CAPTCHA: "M-014",
  NOT_FOUND: "M-015",
  BAD_REQUEST: "M-016",
  DUPLICATE_REQUEST: "M-017",
  DUPLICATE_EXISTS: "M-018",
  EXPIRED: "M-019",
  INVAILD_DATA: "M-020",
  INVALID_STATUS_FOR_UPDATE: "M-021",
  LOGIN_ERROR: "M-022",
  TOO_MANY_REQUEST: "M-023",
  NOT_MATCH: "M-024",
  REQUIRED: "M-025",
  UNAUTHORIZED_ACCESS: "M-026",
  CANNOT_BE_SAME: "M-027",
  CANNOT_PROCEED: "M-028",
  PASSWORD_ALREADY_USED: "M-029",
  CHANGE_PASSWORD: "M-030",
  UNABLE_TO: "M-031",
  OPERATION_NOT_PERMITTED: "M-032",
  CANNOT_REMOVE: "M-033",
  FORBIDDEN: "M-034",
  ALREADY_EXISTS: "M-035",
  GRID_ALREADY_EXIST: "M-036",
  FROM_HIGHER_THAN_TO: "M-037",
  LMS_CRITERIA_NOT_MET: "M-038",
  TWOFA_CODE_UN_VERIFIED: "M-039",
  NOT_ELIGIBLE: "M-040",
  CHANGE_PRIMARY: "M-041",
  AUTH_KEY: "M-042",
  GREATER_THAN: "M-043",
  ALREADY_APPROVED: "M-044",
  ALREADY_REJECTED: "M-045",
  NO_CHANGES_DETECTED: "M-046",
  SESSION_EXPIRED: "M-047",
};

export const DEFAULTS = {
  PAGINATION: {
    page: 1,
    size: 10,
    sort: "asc",
  },
};

export const HASHING = {
  SALTROUNDS: 10,
};

export const secret_key =
  configService?.get("secretKey") ||
  "fast_loan_secret_text|@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh";

export const PG_CONNECTION = "PG_CONNECTION";

export const hr = {
  baseUrl: configService.get("dataSource.hris.hr_url"),
  endPoints: {
    users: `/api/User/getEmployeeListByEmpCode`,
    designations: `/api/Designation/list/active`,
    holidays: "/api/HolidayApi/getAllHolidaysList",
  },
};
