import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TicketMessageDto {
  @IsNotEmpty()
  ticketId: number;
  @IsNotEmpty()
  @IsString()
  ticketName: string;
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  receiverId: number;
}

export class PrivateChatQuery {
  @IsNotEmpty()
  ticketId: number;

  @IsNotEmpty()
  receiverId: number;

  @IsOptional()
  page?: number;
}

export class NotificationQuery {
  @IsOptional()
  page?: number;
}
