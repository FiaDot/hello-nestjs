import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '이름',
    example: '김초롱', // default: "string" 해당 타입이 들어감
    required: true, // default: false
  })
  name: string;

  @ApiProperty({ description: '이메일' })
  email: string;
}
