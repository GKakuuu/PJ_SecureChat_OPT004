// src/messages/messages.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ReceiveMessageDto } from './dto/receive-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  send(@Body() body: SendMessageDto) {
    const encrypted = this.messagesService.encryptMessage(body.to, body.message);
    return {
      to: body.to,
      ...encrypted,
    };
  }

  @Post('receive')
  receive(@Body() body: ReceiveMessageDto) {
    const receiverId = 'user-b'; // ⚠️ Simulación (usuario que recibe)
    const message = this.messagesService.decryptMessage(
      body.from,
      body.encryptedMessage,
      body.encryptedAESKey,
      body.iv,
      receiverId,
    );
    return {
      from: body.from,
      message,
    };
  }
}
