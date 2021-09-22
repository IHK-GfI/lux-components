import { Platform } from '@angular/cdk/platform';
import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { LuxUtil } from '../../lux-util/lux-util';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import { getLocaleFirstDayOfWeek } from '@angular/common';

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

  // ddMMyyyy
  private readonly noSeparatorRegExp = new RegExp(/\d{1,2}\d{1,2}\d{4}/);

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
      if (LuxUtil.isIE()) {
        // IE-Problem: Das Datum (als String) im IE enthält manchmal unsichtbare Steuerzeichen, die verhindern,
        // dass das Datum korrekt von den RegEx-Ausdrücken erkannt wird. Aus diesem Grund werden hier diese
        // unsichtbaren Steuerzeichen entfernt.
        const ieValue = LuxUtil.stringWithoutASCIIChars(value);
        if (value !== ieValue) {
          value = ieValue;
        }
      }

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
      } else if (this.noSeparatorRegExp.test(value)) {
        return this.getUTCNulled_ddMMYYYYNoSeparator(value);
      }
      return value as any;
    }
    return null;
  }

  getFirstDayOfWeek(): number {
    let startDay;
    try {
      startDay = getLocaleFirstDayOfWeek(this.locale);
    } catch (e) {
      startDay = super.getFirstDayOfWeek();
    }
    return startDay;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem ddMMYYYY-String erhalten.
   *
   * @param dateString
   * @param separator
   */
  private getUTCNulled_ddMMYYYY(dateString: string, separator: string) {
    const splitDate = dateString.split(separator);
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+splitDate[2], this.calculateMonth(+splitDate[1]), +splitDate[0]);
    return tempDate;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem ddMMYYYY-String erhalten.
   *
   * @param dateString
   */
  private getUTCNulled_ddMMYYYYNoSeparator(dateString: string) {
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+dateString.substring(4, 8), this.calculateMonth(+dateString.substring(2, 4)), +dateString.substring(0, 2));
    return tempDate;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem YYYYMMdd-String erhalten.
   *
   * @param dateString
   * @param separator
   */
  private getUTCNulled_YYYYMMdd(dateString: string, separator: string) {
    const splitDate = dateString.split(separator);
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+splitDate[0], this.calculateMonth(+splitDate[1]), +splitDate[2]);
    return tempDate;
  }

  /**
   * UTC Date mit 0-Werten für Time aus einem MMddYYYY-String erhalten.
   *
   * @param dateString
   * @param separator
   */
  private getUTCNulled_MMddYYY(dateString: string, separator: string) {
    const splitDate = dateString.split(separator);
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(+splitDate[2], this.calculateMonth(+splitDate[0]), +splitDate[1]);
    return tempDate;
  }

  isValid(date: any) {
    return LuxUtil.isDate(date) && this.isValidYear(date);
  }

  private calculateMonth(month: number) {
    let newMonth = month;

    if (month <= 0) {
      newMonth = 0;
    } else if (month >= 12) {
      newMonth = 11;
    } else {
      newMonth = month - 1;
    }

    return newMonth;
  }

  private isValidYear(date: any) {
    // Prüfen, ob das Jahr auch aus genau vier Stellen (z.B. 2020) besteht.
    // Ohne diesen Check würden auch 5- oder 6-stellige Jahreszahlen akzeptiert.
    return date.getFullYear() && date.getFullYear().toString().length === 4;
  }
}
