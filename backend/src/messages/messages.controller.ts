import { Controller, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ReceiveMessageDto } from './dto/receive-message.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Mensajes')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar mensaje cifrado' })
  @ApiResponse({ status: 200, description: 'Mensaje enviado correctamente' })
  send(@Body() dto: SendMessageDto) {
    return this.messagesService.sendMessage(dto);
  }

  @Post('receive')
  @ApiOperation({ summary: 'Recibir y descifrar mensaje' })
  @ApiResponse({ status: 200, description: 'Mensaje recibido y descifrado' })
  receive(@Body() dto: ReceiveMessageDto) {
    return this.messagesService.receiveMessage(dto);
  }
}
