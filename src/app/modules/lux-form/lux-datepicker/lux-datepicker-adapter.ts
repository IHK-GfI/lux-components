import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';
import { LuxUtil } from '../../lux-util/lux-util';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

@Injectable()
export class LuxDatepickerAdapter extends NativeDateAdapter {
  // dd.MM.yyyy
  private readonly dotRegExp = new RegExp(/\d{1,2}\.\d{1,2}\.\d{4}/);

  // MM/dd/yyyy
  private readonly backslashRegExp = new RegExp(/\d{1,2}\/\d{1,2}\/\d{4}/);

  // dd-MM-yyyy
  private readonly hyphenRegExp = new RegExp(/\d{1,2}-\d{1,2}-\d{4}/);

  // yyyy-MM-dd
  private readonly hyphenRegExp_1 = new RegExp(/\d{4}-\d{1,2}-\d{1,2}/);

  format(date: Date | string, displayFormat: DateTimeFormatOptions): string {
    if (date) {
      if (displayFormat) {
        if (typeof date === 'string') {
          date = new Date(date);
        }
        return date.toLocaleDateString(this.locale, displayFormat);
      } else {
        return (date as Date).toLocaleDateString(this.locale);
      }
    } else {
      return '';
    }
  }

  parse(value: string): Date | null {
    if (value) {
      // Prüfen, ob der Wert ein ISO-String ist
      if (LuxUtil.ISO_8601_FULL.test(value)) {
        return new Date(value);
      }
      // Hat der String das Format dd.MM.YYYY ?
      if (this.dotRegExp.test(value)) {
        return this.getUTCNulled_ddMMYYYY(value, '.');
      } else if (this.backslashRegExp.test(value)) {
        return this.getUTCNulled_MMddYYY(value, '/');
      } else if (this.hyphenRegExp.test(value)) {
        return this.getUTCNulled_ddMMYYYY(value, '-');
      } else if (this.hyphenRegExp_1.test(value)) {
        return this.getUTCNulled_YYYYMMdd(value, '-');
      }
      return <any>value;
    }
    return null;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem ddMMYYYY-String erhalten.
   * @param dateString
   * @param separator
   */
  private getUTCNulled_ddMMYYYY(dateString: string, separator: string) {
    const splitDate = dateString.split(separator);
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+splitDate[2], +splitDate[1] - 1, +splitDate[0]);
    return tempDate;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem YYYYMMdd-String erhalten.
   * @param dateString
   * @param separator
   */
  private getUTCNulled_YYYYMMdd(dateString: string, separator: string) {
    const splitDate = dateString.split(separator);
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+splitDate[0], +splitDate[1] - 1, +splitDate[2]);
    return tempDate;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem MMddYYYY-String erhalten.
   * @param dateString
   * @param separator
   */
  private getUTCNulled_MMddYYY(dateString: string, separator: string) {
    const splitDate = dateString.split(separator);
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+splitDate[2], +splitDate[0] - 1, +splitDate[1]);
    return tempDate;
  }

  isValid(date: any) {
    return LuxUtil.isDate(date);
  }
}
