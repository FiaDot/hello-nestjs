import { ValueTransformer } from 'typeorm';
import {
  convert,
  LocalDateTime,
  nativeJs,
  ZoneId,
} from '@js-joda/core';
import '@js-joda/timezone';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return convert(entityValue).toDate();
  }

  // DB에서 읽은 Date 타입 값을 LocalDateTime으로 변환
  from(databaseValue: Date): LocalDateTime {
    // 2022-04-06T04:38:52.000Z (UTC) 형태를 -> 2022-04-06T13:38:52 (Local) 로 변환
    return LocalDateTime.from(nativeJs(databaseValue, ZoneId.of('Asia/Seoul')));
  }
}
