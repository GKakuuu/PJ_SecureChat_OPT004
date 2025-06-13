import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from 'src/messages/dto/send-message.dto';
import { ReceiveMessageDto } from 'src/messages/dto/receive-message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar mensaje cifrado a otro usuario' })
  @ApiBody({ type: SendMessageDto })
  @ApiOkResponse({ description: 'Mensaje cifrado generado correctamente' })
  async sendMessage(@Body() dto: SendMessageDto) {
    await this.chatService.sendMessage(dto);
    return { status: 'ok', message: 'Mensaje enviado exitosamente' };
  }

  @Post('receive')
  @ApiOperation({ summary: 'Recibir y descifrar un mensaje cifrado' })
  @ApiBody({ type: ReceiveMessageDto })
  @ApiOkResponse({ description: 'Mensaje descifrado correctamente' })
  receiveMessage(@Body() body: ReceiveMessageDto) {
    const { from, encryptedMessage, encryptedAESKey, iv } = body;

    const decryptedMessage = this.chatService.receiveMessage(
      encryptedMessage,
      encryptedAESKey,
      iv,
      process.env.USER_ID!, // ID del receptor actual
    );

    return { decryptedMessage };
  }
}
