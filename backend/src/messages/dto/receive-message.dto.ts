import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReceiveMessageDto {
  @ApiProperty({ example: 'user1' })
  @IsString()
  from: string;

  @ApiProperty({ example: 'ENCRYPTED_MESSAGE_BASE64' })
  @IsString()
  encryptedMessage: string;

  @ApiProperty({ example: 'ENCRYPTED_AES_KEY_BASE64' })
  @IsString()
  encryptedAESKey: string;

  @ApiProperty({ example: 'IV_BASE64' })
  @IsString()
  iv: string;
}
