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
export declare class PaginationInterface {
    page?: number;
    size?: number;
    sort?: string;
    searchBy?: string;
    searchValue?: string;
    isActive?: boolean;
}
export declare class PaginationParams {
    limit: number;
    offset: number;
    sortVal?: string;
}
export interface LoanCalculatorResponse {
    interestSum: number;
    capitalSum: number;
    sum: number;
    tenure: number;
}
