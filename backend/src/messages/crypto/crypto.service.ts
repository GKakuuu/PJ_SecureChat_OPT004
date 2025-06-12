import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  // 🔐 Generar clave AES-256
  generateAESKey(): Buffer {
    return crypto.randomBytes(32); // 256 bits
  }

  encryptWithAES(message: string, key: Buffer): { iv: string; encryptedData: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
    return {
      iv: iv.toString('base64'),
      encryptedData: encrypted.toString('base64'),
    };
  }

  decryptWithAES(encryptedData: string, key: Buffer, iv: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, 'base64')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }

  // 🔐 Claves RSA simuladas en memoria (puedes reemplazar con persistencia luego)
  private rsaKeys: Record<string, crypto.KeyPairKeyObjectResult> = {};

  generateRSAKeyPair(userId: string) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });
    this.rsaKeys[userId] = { publicKey, privateKey };
  }

  getPublicKey(userId: string): crypto.KeyObject {
    return this.rsaKeys[userId]?.publicKey;
  }

  getPrivateKey(userId: string): crypto.KeyObject {
    return this.rsaKeys[userId]?.privateKey;
  }

  encryptAESKeyWithPublicKey(aesKey: Buffer, publicKey: crypto.KeyObject): string {
    return crypto.publicEncrypt(publicKey, aesKey).toString('base64');
  }

  decryptAESKeyWithPrivateKey(encryptedAESKey: string, privateKey: crypto.KeyObject): Buffer {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedAESKey, 'base64'));
  }
}
