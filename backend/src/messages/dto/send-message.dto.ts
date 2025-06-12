import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ example: 'user-b', description: 'ID del receptor' })
  @IsString()
  to: string;

  @ApiProperty({ example: 'Hola, ¿cómo estás?', description: 'Mensaje plano a enviar' })
  @IsString()
  message: string;
}
