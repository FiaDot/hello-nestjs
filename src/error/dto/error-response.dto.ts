import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: '에러 코드',
    example: '422',
  })
  statusCode: number;

  @ApiProperty({
    description: '메시지',
    example: '이미 존재하는 사용자 입니다.',
  })
  message: string;

  @ApiProperty({
    description: '에러',
    example: 'Unprocessable Entity',
  })
  error: string;
}
