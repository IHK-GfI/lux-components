import { Pipe, PipeTransform } from '@angular/core';

export const day = 'Tagen',
  week = 'Wochen',
  month = 'Monaten',
  year = 'Jahren';
export const today = 'Heute',
  yesterday = 'Gestern',
  tomorrow = 'Morgen';
export const prefixFuture = 'in',
  prefixPast = 'vor';

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const timeDeltas = [
  { name: year, days: 672, dayUnit: 336 },
  { name: month, days: 56, dayUnit: 28 },
  { name: week, days: 14, dayUnit: 7 },
  { name: day, days: 2, dayUnit: 1 }
];

export const timeDeltasRelative = [
  { name: tomorrow, days: 1 },
  { name: yesterday, days: -1 },
  { name: today, days: 0 }
];

@Pipe({
  name: 'luxRelativeTimestamp'
})
export class LuxRelativeTimestampPipe implements PipeTransform {
  transform(timestamp: number, defaultText: string = '', prefix?: string): string {
    if (!timestamp) {
      return defaultText;
    }

    const now = new Date();
    const then = new Date(timestamp);

    const delta = this.calcDiff(now, then);
    let timeName = null;

    for (const timeDelta of timeDeltas) {
      const tempDelta = delta < 0 ? delta * -1 : delta;

      if (tempDelta >= timeDelta.days) {
        if (!prefix) {
          prefix = delta < 0 ? prefixPast : prefixFuture;
        }

        let timeUnits = timeDelta.name === day ? tempDelta : Math.floor(tempDelta / timeDelta.dayUnit);
        timeUnits *= timeUnits < 0 ? -1 : 1;
        timeName = `${prefix} ${timeUnits} ${timeDelta.name}`;
        break;
      }
    }

    if (timeName === null) {
      for (const timeDelta of timeDeltasRelative) {
        if (delta === timeDelta.days) {
          timeName = timeDelta.name;
          break;
        }
      }
    }
    return timeName;
  }

  private calcDiff(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  }
}
