import { AsyncContext } from "./utils/context";
export declare class AppService {
    private readonly asyncContext;
    constructor(asyncContext: AsyncContext<string, string>);
    ping(): string;
    getHello(): string;
}
