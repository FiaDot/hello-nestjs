import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class FindAllUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: '시작 날짜',
    example: '2022-04-05 10:54:01',
    required: true,
  })
  beginDate: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: '종료 날짜',
    example: '2022-04-06 10:54:01',
    required: true,
  })
  endDate: string;
}
