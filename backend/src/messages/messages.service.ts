// src/messages/messages.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { ReceiveMessageDto } from './dto/receive-message.dto';
import { CryptoService  } from './crypto/crypto.service';
import axios from 'axios';

const userId = process.env.USER_ID || 'user1';
const peerUser = process.env.PEER_USER || 'user2';
const peerUrl = process.env.PEER_URL || 'http://localhost:3001/messages';

@Injectable()
export class MessagesService {
    constructor(private readonly crypto: CryptoService) {}

    private readonly userId = userId;
    private readonly peers = {
        [peerUser]: peerUrl,
    };

    async sendMessage(dto: SendMessageDto) {
        const peerUrl = this.peers[dto.to];
        if (!peerUrl) throw new BadRequestException('Peer desconocido');

        const aesKey = this.crypto.generateAESKey();
        const { encryptedData, iv } = this.crypto.encryptWithAES(dto.message, aesKey);

        const recipientPublicKey = this.crypto.getPublicKey(dto.to);
        if (!recipientPublicKey) throw new BadRequestException('Clave pública no encontrada');

        const encryptedAESKey = this.crypto.encryptAESKeyWithPublicKey(aesKey, recipientPublicKey);

        const payload = {
            from: this.userId,
            encryptedMessage: encryptedData,
            encryptedAESKey,
            iv,
        };

        await axios.post(`${peerUrl}/receive`, payload);
        return { status: 'Mensaje enviado correctamente' };
    }

    receiveMessage(dto: ReceiveMessageDto) {
        const privateKey = this.crypto.getPrivateKey(this.userId);
        if (!privateKey) throw new BadRequestException('Clave privada no disponible');

        const aesKey = this.crypto.decryptAESKeyWithPrivateKey(dto.encryptedAESKey, privateKey);
        const message = this.crypto.decryptWithAES(dto.encryptedMessage, aesKey, dto.iv);

        console.log(`\n🟢 Mensaje recibido de ${dto.from}:\n${message}\n`);
        return { status: 'Mensaje recibido y descifrado' };
    }
}
