// src/crypto/crypto.module.ts
import { Module } from '@nestjs/common';
import { AESService } from './aes.service';
import { RSAService } from './rsa.service';

@Module({
  providers: [AESService, RSAService],
  exports: [AESService, RSAService], // 👈 Exportamos los servicios
})
export class CryptoModule {}
