"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncContextModule = void 0;
const async_hooks_1 = require("async_hooks");
const request_context_model_1 = require("./request-context.model");
class AsyncContextModule {
    static forRoot(options) {
        var _a, _b;
        const isGlobal = (_a = options === null || options === void 0 ? void 0 : options.isGlobal) !== null && _a !== void 0 ? _a : true;
        const alsInstance = (_b = options === null || options === void 0 ? void 0 : options.alsInstance) !== null && _b !== void 0 ? _b : new async_hooks_1.AsyncLocalStorage();
        return {
            module: AsyncContextModule,
            global: isGlobal,
            providers: [
                { provide: request_context_model_1.AsyncContext, useValue: new request_context_model_1.AsyncContext(alsInstance) },
            ],
            exports: [request_context_model_1.AsyncContext],
        };
    }
}
exports.AsyncContextModule = AsyncContextModule;
//# sourceMappingURL=request-context.module.js.map