import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class VerifyDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  @ApiProperty({
    description: '플랫폼 제공 User ID',
    example: 'em123', // default: "string" 해당 타입이 들어감
    required: false, // default: false
  })
  platformUID: string;
}
