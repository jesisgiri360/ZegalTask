export declare const MessageEnum: {
    CREATE: string;
    UPDATE: string;
    DELETED: string;
    FETCHED: string;
    ARCHIVED: string;
    REMOVED: string;
    UPLOADED: string;
    VALIDATED: string;
    SUCCESSFUL: string;
    VERIFY: string;
    SENT: string;
    TURNON: string;
    GENERATED: string;
    CAPTCHA: string;
    NOT_FOUND: string;
    BAD_REQUEST: string;
    DUPLICATE_REQUEST: string;
    DUPLICATE_EXISTS: string;
    EXPIRED: string;
    INVAILD_DATA: string;
    INVALID_STATUS_FOR_UPDATE: string;
    LOGIN_ERROR: string;
    TOO_MANY_REQUEST: string;
    NOT_MATCH: string;
    REQUIRED: string;
    UNAUTHORIZED_ACCESS: string;
    CANNOT_BE_SAME: string;
    CANNOT_PROCEED: string;
    PASSWORD_ALREADY_USED: string;
    CHANGE_PASSWORD: string;
    UNABLE_TO: string;
    OPERATION_NOT_PERMITTED: string;
    CANNOT_REMOVE: string;
    FORBIDDEN: string;
    ALREADY_EXISTS: string;
    GRID_ALREADY_EXIST: string;
    FROM_HIGHER_THAN_TO: string;
    LMS_CRITERIA_NOT_MET: string;
    TWOFA_CODE_UN_VERIFIED: string;
    NOT_ELIGIBLE: string;
    CHANGE_PRIMARY: string;
    AUTH_KEY: string;
    GREATER_THAN: string;
    ALREADY_APPROVED: string;
    ALREADY_REJECTED: string;
    NO_CHANGES_DETECTED: string;
    SESSION_EXPIRED: string;
};
export declare const DEFAULTS: {
    PAGINATION: {
        page: number;
        size: number;
        sort: string;
    };
};
export declare const HASHING: {
    SALTROUNDS: number;
};
export declare const secret_key: any;
export declare const PG_CONNECTION = "PG_CONNECTION";
export declare const hr: {
    baseUrl: any;
    endPoints: {
        users: string;
        designations: string;
        holidays: string;
    };
};
