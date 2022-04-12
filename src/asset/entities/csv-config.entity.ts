import { ApiProperty } from '@nestjs/swagger';

export class CsvConfig {
  @ApiProperty({ description: '디버깅용 설명' })
  debug: string;

  @ApiProperty({ description: '고유키' })
  id: string;

  @ApiProperty({ description: '값' })
  value: string | number;
}
