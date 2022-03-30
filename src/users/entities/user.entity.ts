import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: '고유번호' })
  id: string;

  @ApiProperty({ description: '이메일' })
  email: string;
}
