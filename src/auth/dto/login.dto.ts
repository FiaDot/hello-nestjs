import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  @ApiProperty({
    description: '플랫폼 제공 User ID',
    example: 'em123', // default: "string" 해당 타입이 들어감
    required: true, // default: false
  })
  platformUID: string;
}
