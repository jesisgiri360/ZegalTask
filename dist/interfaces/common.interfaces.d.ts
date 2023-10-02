export declare enum RequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum CustomerStatus {
    INPROGRESS = "inprogress",
    SUBMITTED = "submitted",
    COMPLETED = "completed",
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class FetchTokenData {
    userName: string;
    password: string;
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
export declare enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export declare enum SettlementProcess {
    PUBLISHED = "PUBLISHED",
    CONSUMED = "CONSUMED",
    CBS_CHECK_BALANCE = "CHECK_CBS_BALANCE",
    CBS_LOGIN = "CBS_LOGIN",
    CBS_PAYMENT_CHARGE = "CBS_PAYMENT_CHARGE",
    LMS_PAYMENT_REQUEST = "LMS_PAYMENT_CHARGE"
}
export interface TokenDataToSave {
    customerCode: string;
    tranUserId: number;
    status: number;
}
export declare class PaginationInterface {
    page?: number;
    size?: number;
    sort?: string;
    searchBy?: string;
    searchValue?: string;
}
export declare class PaginationParams {
    limit: number;
    offset: number;
    sortVal?: string;
}
export declare class CommonIdentity {
    issueAuthorityTypeName: string;
    identityTypeId: number;
    docTypeId: number;
    issueAuthorityTypeCode: string;
    issueOfficeTypeCode: number;
    issueOfficeTypeName: string;
    issueAuthorityName: string;
    identityNo: string;
    issueDate: Date;
    expiryDate: Date;
}
