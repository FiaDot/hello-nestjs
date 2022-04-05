import * as moment from 'moment-timezone';

export class DateTimeHelper {
  static get_str_to_date = (str: string): Date => {
    return moment(str).utcOffset(9).toDate();
  };

  // 현재 로컬 시간 반환
  static get_now_local_date = (): Date => {
    return moment().utcOffset(9).toDate();
  };

  // 현재 UTC 시각
  static get_utc_string = (): string => {
    return moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
  };

  // 현재 날짜 시각
  static get_now_string = (): string => {
    return moment().utcOffset(9).format('YYYY-MM-DD HH:mm:ss');
  };

  // 시분초
  static get_now_time_string = (): string => {
    return moment().utcOffset(9).format('HH:mm:ss');
  };

  // 초 단위로 값 -> 시분초 반환
  static get_sec_to_time_string = (sec): string => {
    return moment().startOf('day').seconds(sec).format('HH:mm:ss');
  };

  // 랭킹을 위한 연도와 달 반환
  static get_year_month = (): string => {
    return moment().format('YYYY-MM');
  };

  // 년월일
  static get_year_month_day = (date_time): string => {
    return moment(date_time).format('YYYY-MM-DD');
  };

  static get_year_month_day_sub_day = (date_time, sub_days): string => {
    return moment(date_time).subtract(sub_days, 'd').format('YYYY-MM-DD');
  };

  // 연도와 날짜에서 몇달 전꺼 반환
  static get_year_month_sub = (sub_months): string => {
    return moment().subtract(sub_months, 'month').format('YYYY-MM');
  };

  static get_now_add_sec = (add_seconds): string => {
    const tm = moment().add(add_seconds, 's');
    return tm.format('YYYY-MM-DD HH:mm:ss');
  };

  // 이전 날짜 반환
  static get_prev_day = (sub_days = 1): string => {
    return moment().subtract(sub_days, 'd').format('YYYY-MM-DD HH:mm:ss');
  };

  // 만료됐는가?
  static is_expired_time = (date_time): boolean => {
    const chk = moment(date_time);
    const now = moment();
    const diff = chk.diff(now, 'seconds');
    //console.log(`chk:${chk} - now:${now} = ${diff}`);
    //return diff;
    return 0 >= diff;
  };

  // 남은시간 : 양수라면 남은것. 0이하라면 이미 초과
  static get_diff_sec = (date_time): number => {
    const chk = moment(date_time);
    const now = moment();
    const diff = chk.diff(now, 'seconds');
    //console.log(`chk:${chk} - now:${now} = ${diff}`);
    return diff;
  };

  // 지난 시간 시분초
  static get_diff_hhmmss = (date_time): string => {
    const chk = moment(date_time); // 로컬시간
    const now = moment(moment().utcOffset(9).format('YYYY-MM-DD HH:mm:ss'));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const t = moment(now - chk);
    return t.format('HH:mm:ss');
  };

  // 날짜 차이
  static get_diff_day = (
    old_date_time: moment.Moment,
    new_date_time: moment.Moment = moment().utcOffset(9),
  ): number => {
    const tm_old = moment(old_date_time, 'YYYY-MM-DD');
    const tm_new = moment(new_date_time, 'YYYY-MM-DD'); //.startOf('day');
    return tm_new.diff(tm_old, 'days');
  };
}
