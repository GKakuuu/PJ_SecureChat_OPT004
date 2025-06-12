import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReceiveMessageDto {
  @ApiProperty({ example: 'user-a', description: 'ID del remitente' })
  @IsString()
  from: string;

  @ApiProperty({ example: 'Base64EncryptedMessage', description: 'Mensaje cifrado en base64' })
  @IsString()
  encryptedMessage: string;

  @ApiProperty({ example: 'Base64EncryptedAESKey', description: 'Clave AES cifrada con RSA (base64)' })
  @IsString()
  encryptedAESKey: string;

  @ApiProperty({ example: 'IVBase64', description: 'IV del cifrado AES (base64)' })
  @IsString()
  iv: string;
}
