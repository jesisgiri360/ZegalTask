import { Injectable } from "@nestjs/common";
import {
  NotificationQuery,
  PrivateChatQuery,
  TicketMessageDto,
} from "./dto/message.dto";
import { PgDatabaseService } from "../pg-pool/database.service";
import { AsyncContext } from "@utils/context";
import { TokenData } from "@interfaces/common.interfaces";
import { ChatGatewayService } from "../Chat-Gateway/chat-gateway.service";
import { ApiHelper } from "src/helpers/third-party-api-call.helper";
// import axios, { AxiosResponse } from "axios";
import { identityServer } from "@config/url";
import { hr } from "@config/CONSTANTS";
import { requestThirdPartyAPI } from "src/helpers/other.helper";

@Injectable()
export class TicketMessagingService {
  constructor(
    private readonly pgService: PgDatabaseService,
    private readonly chatGatewayService: ChatGatewayService,
    private readonly asyncContext: AsyncContext<string, any>,
    private readonly apiHelper: ApiHelper
  ) {
    this.createChatTable();
  }
  async createChatTable() {
    const threads = `CREATE TABLE IF NOT EXISTS threads (
      id SERIAL PRIMARY KEY,
      ticket_id INTEGER,
      participants INTEGER[]
  );`;
    await this.pgService.query(threads);

    const query = `CREATE TABLE IF NOT EXISTS chat_messages (
      id SERIAL PRIMARY KEY,
      ticket_id INTEGER,
      ticket_name VARCHAR(255),
      message VARCHAR(255),
      sender_id INTEGER,
      receiver_id INTEGER,
      seen BOOLEAN DEFAULT false,
      thread_id INTEGER,
      FOREIGN KEY (thread_id) REFERENCES threads(id),
      created_at TIMESTAMP,
      updated_at TIMESTAMP
  );`;
    await this.pgService.query(query);

    const chatNotification = `CREATE TABLE IF NOT EXISTS chat_notification (
      id SERIAL PRIMARY KEY,
      ticket_id INTEGER,
      ticket_name VARCHAR(255),
      message VARCHAR(255),
      sender_id INTEGER,
      receiver_id INTEGER,
      seen BOOLEAN DEFAULT false,
      created_at TIMESTAMP,
      updated_at TIMESTAMP);`;
    await this.pgService.query(chatNotification);
    return;
  }

  async addMessages(body: TicketMessageDto) {
    const createdDate = new Date();
    const updatedDate = new Date();
    const duplicateThread = `SELECT threads.id,ticket_id as "ticketId"
    FROM threads
    WHERE ticket_id =$1
    AND participants @> ARRAY[$2::integer, $3::integer];
    `;
    let threadData: any = await this.pgService.query(duplicateThread, [
      body.ticketId,
      body.senderId,
      body.receiverId,
    ]);

    if (threadData.length == 0) {
      const insertThread = `INSERT INTO threads (ticket_id, participants)
      VALUES ($1::integer, ARRAY[$2::integer, $3::integer])RETURNING * `;
      threadData = await this.pgService.query(insertThread, [
        body.ticketId,
        body.senderId,
        body.receiverId,
      ]);
    }
    const query = `INSERT INTO chat_messages (ticket_id,ticket_name, message, sender_id, receiver_id,thread_id, created_at, updated_at)
    VALUES ($1::integer, $2::varchar(255), $3::varchar(255), $4::integer, $5::integer,$6::integer, $7::timestamp, $8::timestamp)RETURNING *`;
    const res: any = await this.pgService.query(query, [
      body.ticketId,
      body.ticketName,
      body.message,
      body.senderId,
      body.receiverId,
      threadData[0].id,
      createdDate,
      updatedDate,
    ]);
    const chatNotification: any = await this.saveChatNotification(body);
    const messagedId = res[0].id;
    body["messageId"] = messagedId;
    body["createdAt"] = res[0].created_at;
    const userDetails = await this.getUserDetails(body.senderId);
    const senderDetail: any = {
      name: userDetails.name,
      id: userDetails.id,
    };
    body["senderDetails"] = senderDetail;
    delete body.senderId;
    await this.chatGatewayService.sendNotification(body);
    body["notificationId"] = chatNotification[0].id;
    //for chat notification
    await this.chatGatewayService.sendChatNotification(body);
    //for normal chat messages
    body["messageId"] = messagedId;
    return body;
  }

  async getMessagesByTicketId(id: number) {
    const tokenData: any = this.asyncContext.get("tokenData");
    const query = `         
    SELECT DISTINCT ON (t.id) cm.ticket_id,
    cm.id as "messageId",
    cm.ticket_name,
    cm.receiver_id,
    cm.sender_id,
    cm.id,
    cm.message,
    cm.seen,
    cm.created_at
   FROM threads t
  INNER JOIN chat_messages cm ON t.id = cm.thread_id
  WHERE t.ticket_id =$1
   AND (ARRAY[$2::integer] <@ t.participants)
  ORDER BY t.id,cm.created_at DESC;  `;
    let data: any = await this.pgService.query(query, [id, tokenData.emp_code]);
    let responseDetails = [];
    for (let i = 0; i < data.length; i++) {
      //for receiver side unseen count
      const unseenReceiverDataQuery = ` WITH MessageGroups AS (
        SELECT *,
               SUM(seen::int) OVER (PARTITION BY ticket_id, receiver_id, sender_id ORDER BY created_at DESC) AS group_num
        FROM chat_messages
        WHERE ticket_id = $1
          AND receiver_id =$2
          AND sender_id = $3
      )
      SELECT COUNT(*) AS "count"
      FROM MessageGroups
      WHERE seen = false
        AND group_num = 0; `;
      let unseenReceiverData: any = await this.pgService.query(
        unseenReceiverDataQuery,
        [data[i].ticket_id, data[i].receiver_id, data[i].sender_id]
      );
      // const unseenReceiverCountQuery =
      //   "select count(id) from chat_messages cm where cm.seen=false and cm.receiver_id=$1 and cm.ticket_id=$2 and cm.sender_id=$3";
      // let unseenCountReceiverData: any = await this.pgService.query(
      //   unseenReceiverCountQuery,
      //   [data[i].receiver_id, data[i].ticket_id, data[i].sender_id]
      // );

      //for sender side unseen count
      const unseenSenderDataQuery = ` WITH MessageGroups AS (
        SELECT *,
               SUM(seen::int) OVER (PARTITION BY ticket_id, receiver_id, sender_id ORDER BY created_at DESC) AS group_num
        FROM chat_messages
        WHERE ticket_id =  $1
          AND receiver_id = $2
          AND sender_id = $3
      )
      SELECT COUNT(*) AS "count"
      FROM MessageGroups
      WHERE seen = false
        AND group_num = 0; `;
      let unseenSenderData: any = await this.pgService.query(
        unseenSenderDataQuery,
        [data[i].ticket_id, data[i].sender_id, data[i].receiver_id]
      );
      // const unseenSendCountQuery =
      //   "select count(id) from chat_messages cm where cm.seen=false and cm.receiver_id=$1 and cm.ticket_id=$2 and cm.sender_id=$3";
      // let unseenCountSenderData: any = await this.pgService.query(
      //   unseenSendCountQuery,
      //   [data[i].sender_id, data[i].ticket_id, data[i].receiver_id]
      // );
      try {
        const res = await requestThirdPartyAPI(
          `${identityServer.serverUri}${hr.endPoints.users}`,
          null,
          { empCodeList: [data[i].receiver_id, data[i].sender_id] },
          "POST"
        );
        if (res.status == 200 && res.statusText == "OK") {
          const datas = {
            id: data[i].id,
            ticketId: data[i].ticket_id,
            receiver: {
              id:
                res.data.data[0]?.id == data[i].receiver_id
                  ? res.data.data[0]?.id
                  : res.data.data[1]?.id,
              name:
                res.data.data[0]?.id == data[i].receiver_id
                  ? res.data.data[0]?.name
                  : res.data.data[1]?.name,
            },
            sender: {
              id:
                res.data.data[0]?.id == data[i].sender_id
                  ? res.data.data[0]?.id
                  : res.data.data[1]?.id,
              name:
                res.data.data[0]?.id == data[i].sender_id
                  ? res.data.data[0]?.name
                  : res.data.data[1]?.name,
            },
            ticketName: data[i].ticket_name,
            message: data[i].message,
            unseenCountReceiver: unseenReceiverData[0]?.count,
            unseenCountSender: unseenSenderData[0]?.count,
            createdAt: data[i].created_at,
          };
          responseDetails.push(datas);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    return responseDetails;
  }

  async getPrivateMessages(body: PrivateChatQuery) {
    let page = body?.page || 0;
    let limit = 10;
    const tokenData: any = this.asyncContext.get("tokenData");
    const query = `    select
    cm.id,
    cm.ticket_id AS "ticketId",
    cm.message AS "message",
    cm.created_at AS "createdAt",
    cm.sender_id as "senderId"
FROM
    chat_messages cm
WHERE
    cm.ticket_id =$1
    AND ((cm.sender_id =$2 AND cm.receiver_id = $3)
        OR (cm.receiver_id =$2 AND cm.sender_id =$3))  
ORDER BY cm.created_at desc
    limit ${limit}
   offset $4 * ${limit} 
    `;
    const data: any = await this.pgService.query(query, [
      body.ticketId,
      tokenData.emp_code,
      body.receiverId,
      page,
    ]);
    let responseDetails = [];
    for (let i = 0; i < data.length; i++) {
      const userDetails = await this.getUserDetails(data[i].senderId);
      const datas = {
        id: data[i].id,
        ticketId: data[i].ticketId,
        senderDetails: {
          id: userDetails.id,
          name: userDetails.name,
        },
        ticketName: data[i].ticketName,
        message: data[i].message,
        createdAt: data[i].createdAt,
      };
      responseDetails.push(datas);
    }

    return responseDetails;
  }

  async markAsSeen(id: number) {
    const query = `UPDATE chat_messages 
    SET seen = true 
    WHERE id = $1;
    `;
    await this.pgService.query(query, [id]);
    return;
  }

  async getUserDetails(empCode: any) {
    try {
      const res = await requestThirdPartyAPI(
        `${identityServer.serverUri}${hr.endPoints.users}`,
        null,
        { empCodeList: [empCode] },
        "POST"
      );
      if (res.status == 200 && res.statusText == "OK") {
        return res.data.data[0];
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async saveChatNotification(body: TicketMessageDto) {
    const createdDate = new Date();
    const updatedDate = new Date();
    const chatNotification = `INSERT INTO chat_notification (ticket_id,ticket_name, message, sender_id, receiver_id, created_at, updated_at)
    VALUES ($1::integer, $2::varchar(255), $3::varchar(255), $4::integer, $5::integer,$6::timestamp, $7::timestamp)RETURNING *`;
    const res: any = await this.pgService.query(chatNotification, [
      body.ticketId,
      body.ticketName,
      body.message,
      body.senderId,
      body.receiverId,
      createdDate,
      updatedDate,
    ]);
    return res;
  }

  async getNotificationMessages(body: NotificationQuery) {
    const tokenData: any = this.asyncContext.get("tokenData");
    let page = body?.page || 0;
    let limit = 10;
    const query = ` WITH DistinctSenders AS (
      SELECT DISTINCT ON (sender_id,ticket_id) cn.id,
          cn.ticket_id,
          cn.ticket_name,
          cn.message,
          cn.sender_id,
          cn.receiver_id,
          cn.seen,
          cn.created_at,
          cn.updated_at
      FROM chat_notification cn
      WHERE cn.receiver_id = $1
      ORDER BY cn.sender_id,cn.ticket_id, cn.created_at DESC
  )
  SELECT *
  FROM DistinctSenders
  ORDER BY created_at DESC
 limit ${limit}
 offset $2 * ${limit} `;
    let data: any = await this.pgService.query(query, [
      tokenData.emp_code,
      page,
    ]);
    let responseDetails = [];
    for (let i = 0; i < data.length; i++) {
      const userDetails = await this.getUserDetails(data[i].sender_id);
      const datas = {
        id: data[i].id,
        ticketId: data[i].ticket_id,
        senderDetails: {
          id: userDetails.id,
          name: userDetails.name,
        },
        ticketName: data[i].ticket_name,
        seen: data[i].seen,
        message: data[i].message,
        createdAt: data[i].created_at,
      };
      responseDetails.push(datas);
    }
    return responseDetails;
  }

  async markNotificationSeen(id: number) {
    const query = `UPDATE chat_notification 
    SET seen = true 
    WHERE id = $1;
    `;
    await this.pgService.query(query, [id]);
    return;
  }

  async getNotificationCount() {
    const tokenData: any = this.asyncContext.get("tokenData");
    const query = ` WITH ranked_notifications AS (
      SELECT
          cn.id,
          cn.ticket_id,
          cn.ticket_name,
          cn.message,
          cn.sender_id,
          cn.receiver_id,
          cn.seen,
          cn.created_at,
          cn.updated_at,
          ROW_NUMBER() OVER (PARTITION BY cn.ticket_id, cn.sender_id ORDER BY cn.created_at DESC) AS row_num
      FROM chat_notification cn
      WHERE cn.receiver_id = $1
  )
  , result_set AS (
      SELECT
          id,
          ticket_id,
          ticket_name,
          message,
          sender_id,
          receiver_id,
          seen,
          created_at,
          updated_at
      FROM ranked_notifications
      WHERE row_num = 1 AND seen = false
  )
  SELECT COUNT(*) as "count"
  FROM result_set;
    `;
    const data = await this.pgService.query(query, [tokenData.emp_code]);
    return data.length ? data[0] : {};
  }
  async countTicketChats(id: number) {
    const tokenData: any = this.asyncContext.get("tokenData");
    const query = ` select count(id) from chat_messages cm where cm.seen=false and cm.receiver_id=$1 and cm.ticket_id=$2 
    `;
    const data = await this.pgService.query(query, [tokenData.emp_code, id]);
    return data.length ? data[0] : {};
  }
}
