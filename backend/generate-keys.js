"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// generate-keys.ts
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var path = require("path");
var dotenv = require("dotenv");
dotenv.config();
var KEYS_DIR = path.join(__dirname, 'keys');
function generateKeys(userId) {
    var publicKeyPath = path.join(KEYS_DIR, "".concat(userId, ".public.pem"));
    var privateKeyPath = path.join(KEYS_DIR, "".concat(userId, ".private.pem"));
    if ((0, fs_1.existsSync)(publicKeyPath) && (0, fs_1.existsSync)(privateKeyPath)) {
        console.log("\uD83D\uDD10 Las claves para ".concat(userId, " ya existen. Omitiendo..."));
        return;
    }
    var _a = (0, crypto_1.generateKeyPairSync)('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    }), publicKey = _a.publicKey, privateKey = _a.privateKey;
    (0, fs_1.writeFileSync)(publicKeyPath, publicKey);
    (0, fs_1.writeFileSync)(privateKeyPath, privateKey);
    console.log("\u2705 Claves generadas para ".concat(userId));
}
function main() {
    if (!(0, fs_1.existsSync)(KEYS_DIR)) {
        (0, fs_1.mkdirSync)(KEYS_DIR);
    }
    var userId = process.env.USER_ID;
    if (!userId) {
        console.error('❌ La variable de entorno USER_ID no está definida.');
        process.exit(1);
    }
    generateKeys(userId);
}
main();
