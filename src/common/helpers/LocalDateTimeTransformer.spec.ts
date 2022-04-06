import {
  convert,
  LocalDateTime,
  nativeJs,
  ZonedDateTime,
  ZoneId,
} from '@js-joda/core';
import { LocalDateTimeTransformer } from './LocalDateTimeTransformer';
import '@js-joda/timezone';

describe('LocalDateTimeTransformer', () => {
  it('js-joda usage', () => {
    const now = LocalDateTime.now();
    const after = now.plusDays(1);
    const before = now.minusDays(1);

    // console.log(now); // object
    console.log(`now=${now}, after=${after}, before=${before}`);

    const local = new LocalDateTimeTransformer();
    const date = local.to(now);

    console.log('date=');
    console.log(date);

    const toDate = convert(now).toDate();
    console.log('toDate=');
    console.log(toDate);

    const conv = LocalDateTime.from(nativeJs(new Date()));
    console.log('conv=');
    console.log(`${conv}`);

    expect(now.isBefore(after)).toBeTruthy();
    expect(now.isEqual(after)).toBeFalsy();
    expect(now.isAfter(before)).toBeTruthy();
  });

  it('js-joda utc(DB datetime field) to LocalDateTime', async () => {
    const utc = '2022-04-06T04:38:52.000Z';

    const zdtUtc = ZonedDateTime.parse(utc).toLocalDateTime();

    const arr = ZoneId.getAvailableZoneIds();
    expect(arr).toMatchObject(expect.arrayContaining(['Asia/Seoul']));

    const zn = ZoneId.of('Asia/Seoul');
    const utcWithTimeZone = ZonedDateTime.of(zdtUtc, zn); // timezone 추가
    expect(utcWithTimeZone.toString()).toEqual(
      '2022-04-06T04:38:52+09:00[Asia/Seoul]',
    );

    // UTC+0 에 해당되는 날짜시간 반환 (즉, 타임존 정보가 있어도 로컬시간으로 변환 안됨)
    const utc0 = utcWithTimeZone.toLocalDateTime().toString();
    expect(utc0).toEqual('2022-04-06T04:38:52');

    const utc2local = LocalDateTime.from(nativeJs(new Date(utc)));
    console.log(`UTC to LocalDateTime=${utc2local}`);
    expect(utc2local.toString()).toEqual('2022-04-06T13:38:52');
  });

  it.skip('to success', () => {
    const tm = new LocalDateTimeTransformer();
    // TODO : impl
  });

  it.skip('from success', () => {
    const tm = new LocalDateTimeTransformer();
    // TODO : impl
  });
});
