// src/app.module.ts
import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga .env globalmente
    ChatModule,
    CryptoModule, // Aunque ya está en ChatModule, puedes mantenerlo aquí también
  ],
})
export class AppModule {}
