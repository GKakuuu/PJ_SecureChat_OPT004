import { Injectable } from '@nestjs/common';
import { AESService } from '../crypto/aes.service';
import { RSAService } from '../crypto/rsa.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly aesService: AESService,
    private readonly rsaService: RSAService,
  ) {}

  sendMessage(message: string, toUserId: string): {
    encryptedMessage: string;
    iv: string;
    encryptedAESKey: string;
  } {
    // Generar clave AES
    const aesKey = this.aesService.generateKey();

    // Cifrar mensaje con AES
    const { iv, encryptedData } = this.aesService.encrypt(message, aesKey);

    // Obtener clave pública RSA del destinatario
    const publicKey = this.rsaService.getPublicKey(toUserId);

    // Cifrar clave AES con RSA
    const encryptedAESKey = this.rsaService.encryptAESKeyWithPublicKey(aesKey, publicKey);

    return {
      encryptedMessage: encryptedData,
      iv,
      encryptedAESKey,
    };
  }

  receiveMessage(
    fromUserId: string,
    encryptedMessage: string,
    encryptedAESKey: string,
    iv: string,
  ): string {
    // Obtener clave privada RSA del receptor (asumimos fromUserId es el receptor aquí)
    const privateKey = this.rsaService.getPrivateKey(fromUserId);

    // Descifrar clave AES con clave privada RSA
    const aesKey = this.rsaService.decryptAESKeyWithPrivateKey(encryptedAESKey, privateKey);

    // Descifrar mensaje con AES
    const decryptedMessage = this.aesService.decrypt(encryptedMessage, aesKey, iv);

    return decryptedMessage;
  }
}
