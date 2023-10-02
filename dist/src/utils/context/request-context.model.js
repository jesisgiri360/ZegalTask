"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncContext = void 0;
class AsyncContext {
    constructor(als) {
        this.als = als;
        this[_a] = "[object AsyncContext]";
    }
    getStore() {
        const store = this.als.getStore();
        if (store === undefined) {
            throw new Error("AsyncContext was not registered, call .register() or .registerCallback() before calling this method!");
        }
        return store;
    }
    checkValid() {
        const store = this.als.getStore();
        if (store === undefined)
            return false;
        return true;
    }
    clear() {
        return this.getStore().clear();
    }
    delete(key) {
        return this.getStore().delete(key);
    }
    forEach(callbackfn, thisArg) {
        return this.getStore().forEach(callbackfn, thisArg);
    }
    get(key) {
        return this.getStore().get(key);
    }
    has(key) {
        return this.getStore().has(key);
    }
    set(key, value) {
        this.getStore().set(key, value);
        return this;
    }
    get size() {
        return this.getStore().size;
    }
    entries() {
        return this.getStore().entries();
    }
    keys() {
        return this.getStore().keys();
    }
    values() {
        return this.getStore().values();
    }
    [Symbol.iterator]() {
        return this.getStore()[Symbol.iterator]();
    }
    register() {
        this.als.enterWith(new Map());
    }
    registerCallback(callback, ...args) {
        return this.als.run(new Map(), callback, ...args);
    }
    unregister() {
        this.als.disable();
    }
}
exports.AsyncContext = AsyncContext;
_a = Symbol.toStringTag;
//# sourceMappingURL=request-context.model.js.map