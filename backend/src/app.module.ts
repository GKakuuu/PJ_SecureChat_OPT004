// src/app.module.ts
import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    ChatModule,
    CryptoModule, // Aunque ya está en ChatModule, puedes mantenerlo aquí también
  ],
})
export class AppModule {}
