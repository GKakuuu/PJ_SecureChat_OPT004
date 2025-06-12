import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AESService } from '../crypto/aes.service';
import { RSAService } from '../crypto/rsa.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, AESService, RSAService],
  exports: [ChatService],
})
export class ChatModule {}
