import { ValueTransformer } from 'typeorm';
import { convert, LocalDateTime, nativeJs, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    if (undefined !== entityValue) {
      return convert(entityValue).toDate();
    }
  }

  // DB에서 읽은 Date 타입 값을 LocalDateTime으로 변환
  from(databaseValue: any): LocalDateTime | undefined {
    if (null === databaseValue) {
      return undefined;
    }

    try {
      // 2022-04-06T04:38:52.000Z (UTC) 형태를 -> 2022-04-06T13:38:52 (Local) 로 변환
      return LocalDateTime.from(
        nativeJs(databaseValue, ZoneId.of('Asia/Seoul')),
      );
    } catch (e) {
      // entity 에 default: null 일 경우 from 2번 호출됨. (버그로 추정)
      // Date 타입, LocalDateTime 타입 순서로 한번씩
      // from=
      // 2022-04-06T08:28:39.000Z
      // from=
      // LocalDateTime {
      //   _date: LocalDate { _year: 2022, _month: 4, _day: 6 },
      //   _time: LocalTime { _hour: 17, _minute: 28, _second: 39, _nano: 0 }
      // }
      return databaseValue;
    }
  }
}
