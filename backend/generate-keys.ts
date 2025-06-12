// generate-keys.ts
import { generateKeyPairSync } from 'crypto';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import * as path from 'path';

const KEYS_DIR = path.join(__dirname, 'keys');

function generateKeys(userId: string) {
  const publicKeyPath = path.join(KEYS_DIR, `${userId}.public.pem`);
  const privateKeyPath = path.join(KEYS_DIR, `${userId}.private.pem`);

  if (existsSync(publicKeyPath) && existsSync(privateKeyPath)) {
    console.log(`🔐 Las claves para ${userId} ya existen. Omitiendo...`);
    return;
  }

  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });

  writeFileSync(publicKeyPath, publicKey);
  writeFileSync(privateKeyPath, privateKey);
  console.log(`✅ Claves generadas para ${userId}`);
}

function main() {
  if (!existsSync(KEYS_DIR)) {
    mkdirSync(KEYS_DIR);
  }

  // Agrega aquí todos los usuarios necesarios
  generateKeys('user1');
  generateKeys('user2');
}

main();
