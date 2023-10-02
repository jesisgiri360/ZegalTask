/// <reference types="node" />
import { AsyncLocalStorage } from "async_hooks";
import { DynamicModule } from "@nestjs/common";
interface AsyncContextModuleOptions {
    isGlobal?: boolean;
    alsInstance?: AsyncLocalStorage<any>;
}
export declare class AsyncContextModule {
    static forRoot(options?: AsyncContextModuleOptions): DynamicModule;
}
export {};
