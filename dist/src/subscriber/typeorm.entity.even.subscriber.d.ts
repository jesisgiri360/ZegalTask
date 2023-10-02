import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
export declare class TypeORMEntityEvenSubscriber implements EntitySubscriberInterface {
    readonly connection: Connection;
    constructor(connection: Connection);
    private readonly ac;
    beforeInsert(event: InsertEvent<any>): void;
    beforeUpdate(event: UpdateEvent<any>): void;
}
