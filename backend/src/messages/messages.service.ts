// src/messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { AESService } from '../crypto/aes.service';
import { RSAService } from '../crypto/rsa.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly aesService: AESService,
    private readonly rsaService: RSAService,
  ) {}

  encryptMessage(to: string, plainText: string) {
    const aesKey = this.aesService.generateKey();
    const { encryptedData, iv } = this.aesService.encrypt(plainText, aesKey);
    const publicKey = this.rsaService.getPublicKey(to);
    const encryptedAESKey = this.rsaService.encryptAESKeyWithPublicKey(aesKey, publicKey);

    return {
      encryptedMessage: encryptedData,
      encryptedAESKey,
      iv,
    };
  }

  decryptMessage(from: string, encryptedMessage: string, encryptedAESKey: string, iv: string, receiverId: string) {
    const privateKey = this.rsaService.getPrivateKey(receiverId);
    const aesKey = this.rsaService.decryptAESKeyWithPrivateKey(encryptedAESKey, privateKey);
    return this.aesService.decrypt(encryptedMessage, aesKey, iv);
  }
}
