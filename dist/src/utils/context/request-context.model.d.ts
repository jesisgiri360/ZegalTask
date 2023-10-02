/// <reference types="node" />
import { AsyncLocalStorage } from "async_hooks";
export declare class AsyncContext<K, V> implements Map<K, V> {
    readonly als: AsyncLocalStorage<Map<K, V>>;
    constructor(als: AsyncLocalStorage<Map<K, V>>);
    private getStore;
    checkValid(): boolean;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    get size(): number;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    [Symbol.toStringTag]: string;
    register(): void;
    registerCallback<R, TArgs extends any[]>(callback: (...args: TArgs) => R, ...args: TArgs): R;
    unregister(): void;
}
