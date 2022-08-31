import { LuxRelativeTimestampPipe } from './lux-relative-timestamp.pipe';

const hour = 3600000;
const day = hour * 24;
const week = day * 7;
const month = week * 4;
const year = month * 12;

describe('LuxRelativeTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new LuxRelativeTimestampPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show default text', () => {
    const pipe = new LuxRelativeTimestampPipe();
    expect(pipe.transform(null as any, 'Keine Zeit')).toEqual('Keine Zeit');
  });

  it('should show correct future times', () => {
    const pipe = new LuxRelativeTimestampPipe();
    const now = new Date();

    let timestamp = now.getTime() + hour;
    expect(pipe.transform(timestamp)).toEqual('Heute');

    timestamp = now.getTime() + day;
    expect(pipe.transform(timestamp)).toEqual('Morgen');

    const tomorrowEvening = new Date();
    tomorrowEvening.setDate(tomorrowEvening.getDate() + 1);
    tomorrowEvening.setHours(23, 59);
    expect(pipe.transform(tomorrowEvening.getTime())).toEqual('Morgen');

    timestamp = now.getTime() + day * 6 + hour;
    expect(pipe.transform(timestamp)).toEqual('in 6 Tagen');

    timestamp = now.getTime() + week;
    expect(pipe.transform(timestamp)).toEqual('in 7 Tagen');

    timestamp = now.getTime() + day * 13;
    expect(pipe.transform(timestamp)).toEqual('in 13 Tagen');

    timestamp = now.getTime() + week * 2;
    expect(pipe.transform(timestamp)).toEqual('in 2 Wochen');

    timestamp = now.getTime() + month;
    expect(pipe.transform(timestamp)).toEqual('in 4 Wochen');

    timestamp = now.getTime() + week * 7;
    expect(pipe.transform(timestamp)).toEqual('in 7 Wochen');

    timestamp = now.getTime() + week * 8;
    expect(pipe.transform(timestamp)).toEqual('in 2 Monaten');

    timestamp = now.getTime() + year;
    expect(pipe.transform(timestamp)).toEqual('in 12 Monaten');

    timestamp = now.getTime() + 23 * month;
    expect(pipe.transform(timestamp)).toEqual('in 23 Monaten');

    timestamp = now.getTime() + year * 2;
    expect(pipe.transform(timestamp)).toEqual('in 2 Jahren');
  });

  it('should show correct past times', () => {
    const pipe = new LuxRelativeTimestampPipe();
    const now = new Date();

    let timestamp = now.getTime() - hour;
    expect(pipe.transform(timestamp)).toEqual('Heute');

    timestamp = now.getTime() - day;
    expect(pipe.transform(timestamp)).toEqual('Gestern');

    const yesterdayEvening = new Date();
    yesterdayEvening.setDate(yesterdayEvening.getDate() - 1);
    yesterdayEvening.setHours(23, 59);

    expect(pipe.transform(yesterdayEvening.getTime())).toEqual('Gestern');

    timestamp = now.getTime() - day * 6;
    expect(pipe.transform(timestamp)).toEqual('vor 6 Tagen');

    timestamp = now.getTime() - week;
    expect(pipe.transform(timestamp)).toEqual('vor 7 Tagen');

    timestamp = now.getTime() - day * 13;
    expect(pipe.transform(timestamp)).toEqual('vor 13 Tagen');

    timestamp = now.getTime() - week * 2;
    expect(pipe.transform(timestamp)).toEqual('vor 2 Wochen');

    timestamp = now.getTime() - month;
    expect(pipe.transform(timestamp)).toEqual('vor 4 Wochen');

    timestamp = now.getTime() - week * 7;
    expect(pipe.transform(timestamp)).toEqual('vor 7 Wochen');

    timestamp = now.getTime() - week * 8;
    expect(pipe.transform(timestamp)).toEqual('vor 2 Monaten');

    timestamp = now.getTime() - year;
    expect(pipe.transform(timestamp)).toEqual('vor 12 Monaten');

    timestamp = now.getTime() - 23 * month;
    expect(pipe.transform(timestamp)).toEqual('vor 23 Monaten');

    timestamp = now.getTime() - year * 2;
    expect(pipe.transform(timestamp)).toEqual('vor 2 Jahren');
  });

  it('should show correct prefix', () => {
    const pipe = new LuxRelativeTimestampPipe();
    const now = new Date();

    let timestamp;
    timestamp = now.getTime() - day * 6;
    expect(pipe.transform(timestamp, '', 'seit')).toEqual('seit 6 Tagen');

    timestamp = now.getTime() - week;
    expect(pipe.transform(timestamp, '', 'seit')).toEqual('seit 7 Tagen');
  });
});
