import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AESService } from '../crypto/aes.service';
import { RSAService } from '../crypto/rsa.service';
import { SendMessageDto } from '../messages/dto/send-message.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly peerUrl = process.env.PEER_URL!;

  constructor(
    private readonly aesService: AESService,
    private readonly rsaService: RSAService,
    private readonly httpService: HttpService,
  ) { }

  async sendMessage(dto: SendMessageDto) {
    if (!this.peerUrl) {
      throw new Error('PEER_URL no está definido en las variables de entorno');
    }

    const aesKey = this.aesService.generateKey();
    const { iv, encryptedData } = this.aesService.encrypt(dto.message, aesKey);

    const peerPublicKey = this.rsaService.getPublicKey(dto.to);
    const encryptedAESKey = this.rsaService.encryptAESKeyWithPublicKey(aesKey, peerPublicKey);

    this.logger.log(`Enviando mensaje cifrado a ${dto.to}...`);

    await firstValueFrom(
      this.httpService.post(`${this.peerUrl}`, {
        from: process.env.USER_ID,
        encryptedMessage: encryptedData,
        encryptedAESKey,
        iv,
      }),
    );
  }


  receiveMessage(
    encryptedMessage: string,
    encryptedAESKey: string,
    iv: string,
    myUserId: string,
  ): string {
    const myPrivateKey = this.rsaService.getPrivateKey(myUserId);
    const aesKey = this.rsaService.decryptAESKeyWithPrivateKey(encryptedAESKey, myPrivateKey);
    const decryptedMessage = this.aesService.decrypt(encryptedMessage, aesKey, iv);
    return decryptedMessage;
  }
}
