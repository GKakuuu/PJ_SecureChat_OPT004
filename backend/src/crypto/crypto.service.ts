// src/crypto/crypto.service.ts
import { Injectable } from '@nestjs/common';
import { AESService } from './aes.service';
import { RSAService } from './rsa.service';

@Injectable()
export class CryptoService {
  constructor(
    private readonly aesService: AESService,
    private readonly rsaService: RSAService,
  ) {}

  encryptMessage(senderId: string, receiverId: string, message: string) {
    // Generar clave AES
    const aesKey = this.aesService.generateKey();

    // Cifrar el mensaje con AES
    const { iv, encryptedData } = this.aesService.encrypt(message, aesKey);

    // Obtener clave pública del receptor
    const receiverPublicKey = this.rsaService.getPublicKey(receiverId);

    // Cifrar clave AES con RSA
    const encryptedKey = this.rsaService.encryptAESKeyWithPublicKey(aesKey, receiverPublicKey);

    return {
      encryptedMessage: encryptedData,
      encryptedAESKey: encryptedKey,
      iv,
    };
  }

  decryptMessage(receiverId: string, encryptedAESKey: string, iv: string, encryptedMessage: string): string {
    const privateKey = this.rsaService.getPrivateKey(receiverId);
    const aesKey = this.rsaService.decryptAESKeyWithPrivateKey(encryptedAESKey, privateKey);
    return this.aesService.decrypt(encryptedMessage, aesKey, iv);
  }
}
