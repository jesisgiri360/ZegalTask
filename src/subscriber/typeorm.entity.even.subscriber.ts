import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { AsyncContext } from "@utils/context";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
@Injectable()
export class TypeORMEntityEvenSubscriber implements EntitySubscriberInterface {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  @Inject(AsyncContext)
  private readonly ac: AsyncContext<string, any>;
  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    let userId: null;
    const asyncContext = this.ac.checkValid();
    if (asyncContext) userId = this.ac.get("userId");

    if (userId) {
      event.entity.createdBy = userId;
      event.entity.updatedBy = userId;
    }

    if (event?.entity?.createdAt) event.entity.createdAt = new Date();
    if (event?.entity?.updatedAt) event.entity.updatedAt = new Date();
    console.log(` INSERT HOOK `);
  }
  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    let userId: null;
    const asyncContext = this.ac.checkValid();
    if (asyncContext) userId = this.ac.get("userId");

    if (userId) {
      event.entity.updatedBy = userId ? userId : null;
    }

    // if (event?.entity?.createdAt) event.entity.createdAt = new Date();
    if (event?.entity?.updatedAt) event.entity.updatedAt = new Date();
    console.log(` UPDATE HOOK `);
  }
}
