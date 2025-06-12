// src/crypto/rsa.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RSAService implements OnModuleInit {
  private readonly keyDir = process.env.KEYS_DIR || path.join(__dirname, '../../../keys');
  private readonly keySize = 2048;

  private getPrivateKeyPath(userId: string) {
    return path.join(this.keyDir, `${userId}.private.pem`);
  }

  private getPublicKeyPath(userId: string) {
    return path.join(this.keyDir, `${userId}.public.pem`);
  }

  onModuleInit() {
    if (!fs.existsSync(this.keyDir)) {
      fs.mkdirSync(this.keyDir);
    }
  }

  generateKeyPair(userId: string) {
    const privateKeyPath = this.getPrivateKeyPath(userId);
    const publicKeyPath = this.getPublicKeyPath(userId);

    if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) return;

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: this.keySize,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });

    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
  }

  getPublicKey(userId: string): string {
    return fs.readFileSync(this.getPublicKeyPath(userId), 'utf8');
  }

  getPrivateKey(userId: string): string {
    return fs.readFileSync(this.getPrivateKeyPath(userId), 'utf8');
  }

  encryptAESKeyWithPublicKey(aesKey: Buffer, publicKey: string): string {
    const encrypted = crypto.publicEncrypt(publicKey, aesKey);
    return encrypted.toString('base64');
  }

  decryptAESKeyWithPrivateKey(encryptedAESKey: string, privateKey: string): Buffer {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedAESKey, 'base64'));
  }
}
