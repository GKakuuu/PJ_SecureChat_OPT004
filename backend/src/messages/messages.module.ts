import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CryptoService } from './crypto/crypto.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, CryptoService],
})
export class MessagesModule {}
