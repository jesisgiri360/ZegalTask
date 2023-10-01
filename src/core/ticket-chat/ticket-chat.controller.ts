import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  NotificationQuery,
  PrivateChatQuery,
  TicketMessageDto,
} from "./dto/message.dto";
import { TicketMessagingService } from "./ticket-chat.service";

@ApiBearerAuth()
@Controller("/ticket-chat")
@UseGuards(JwtAuthGuard)
export class TicketChatMessageController {
  constructor(
    private readonly ticketMessagingService: TicketMessagingService
  ) {}
  @ApiTags("Post messages")
  @ApiBearerAuth()
  @Post("/message")
  async postMessage(@Body() body: TicketMessageDto) {
    console.log(body);
    return await this.ticketMessagingService.addMessages(body);
  }

  @ApiTags("Get messages by ticket id")
  @ApiBearerAuth()
  @Get("/messages/:id")
  async getMessageByTicketId(@Param("id") id: number) {
    return await this.ticketMessagingService.getMessagesByTicketId(id);
  }

  @ApiTags("Get Private chat history")
  @ApiBearerAuth()
  @Get("/private")
  async getPrivateMessages(@Query() data: PrivateChatQuery) {
    return await this.ticketMessagingService.getPrivateMessages(data);
  }

  @ApiTags("Mark as seen")
  @ApiBearerAuth()
  @Post("/message/seen/:id")
  async markAsSeen(@Param("id") id: number) {
    return await this.ticketMessagingService.markAsSeen(id);
  }

  @ApiTags("Get all notification of user")
  @ApiBearerAuth()
  @Get("/notifications")
  async getNotificationMessages(@Query() body: NotificationQuery) {
    return await this.ticketMessagingService.getNotificationMessages(body);
  }

  @ApiTags("Mark as seen notification")
  @ApiBearerAuth()
  @Get("/notifications/seen/:id")
  async seenNotificationMessages(@Param("id") id: number) {
    return await this.ticketMessagingService.markNotificationSeen(id);
  }

  @ApiTags("Notification count")
  @ApiBearerAuth()
  @Get("/notifications/count")
  async countNotification() {
    return await this.ticketMessagingService.getNotificationCount();
  }

  @ApiTags("Chat message count by ticket id")
  @ApiBearerAuth()
  @Get("/count/:id")
  async countTicketChat(@Param("id") id: number) {
    return await this.ticketMessagingService.countTicketChats(id);
  }
}
