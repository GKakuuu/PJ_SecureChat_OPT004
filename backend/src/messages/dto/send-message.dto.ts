import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'user2' })
  @IsString()
  to: string;

  @ApiProperty({ example: 'Hola, ¿cómo estás?' })
  @IsString()
  message: string;
}
