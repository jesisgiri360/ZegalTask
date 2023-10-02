export declare class SuccessResponse {
    private cacheManager;
    private data;
    private message;
    private source;
    constructor(data: JSON | number, message: string, source?: string);
    responseOk(): void;
}
