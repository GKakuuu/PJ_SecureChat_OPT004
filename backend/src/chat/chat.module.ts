import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AESService } from 'src/crypto/aes.service';
import { RSAService } from 'src/crypto/rsa.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], // <- ¡Importante!
  controllers: [ChatController],
  providers: [ChatService, AESService, RSAService],
})
export class ChatModule {}
