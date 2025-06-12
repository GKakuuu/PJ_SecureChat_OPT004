// src/crypto/aes.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AESService {
  generateKey(): Buffer {
    return crypto.randomBytes(32); // 256 bits
  }

  encrypt(message: string, key: Buffer): { iv: string; encryptedData: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
    return {
      iv: iv.toString('base64'),
      encryptedData: encrypted.toString('base64'),
    };
  }

  decrypt(encryptedData: string, key: Buffer, iv: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, 'base64')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }
}
