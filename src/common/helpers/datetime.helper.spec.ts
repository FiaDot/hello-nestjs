import { DateTimeHelper } from './datetime.helper';

describe('DateTimeHelper', () => {
  it('get_utc_string success', () => {
    expect(DateTimeHelper.get_utc_string()).toBeDefined();
  });

  it('get_sec_to_time_string success', () => {
    expect(DateTimeHelper.get_sec_to_time_string(121)).toEqual('00:02:01');
  });
});
