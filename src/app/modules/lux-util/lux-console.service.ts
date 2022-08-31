/* eslint-disable no-console */
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LuxComponentsConfigService } from '../lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../lux-components-config/lux-components-config-parameters.interface';

export const noop = (): any => undefined;

@Injectable({
  providedIn: 'root'
})
export class LuxConsoleService implements OnDestroy {
  static config: LuxComponentsConfigParameters = {};

  configSubscription: Subscription;

  constructor(componentsConfigService: LuxComponentsConfigService) {
    this.configSubscription = componentsConfigService.config.subscribe((newConfig: LuxComponentsConfigParameters) => {
      LuxConsoleService.config = newConfig;
    });
  }

  /* Nicht-statische Log-Methoden, sie zeigen auch die Quelle des Logs an! */

  get log() {
    if (LuxConsoleService.isDebugMode()) {
      return console.log.bind.call(console.log, console, LuxConsoleService.logDate() + ' -');
    } else {
      return noop;
    }
  }

  get info() {
    if (LuxConsoleService.isDebugMode()) {
      return console.info.bind.call(console.info, console);
    } else {
      return noop;
    }
  }


  get warn() {
    if (LuxConsoleService.isDebugMode()) {
      return console.warn.bind.call(console.warn, console, LuxConsoleService.logDate() + ' -');
    } else {
      return noop;
    }
  }

  get error() {
    if (LuxConsoleService.isDebugMode()) {
      return console.error.bind.call(console.error, console, LuxConsoleService.logDate() + ' -');
    } else {
      return noop;
    }
  }

  get group() {
    if (LuxConsoleService.isDebugMode()) {
      return console.group.bind.call(console.group, console);
    } else {
      return noop;
    }
  }

  get groupEnd() {
    if (LuxConsoleService.isDebugMode()) {
      return console.groupEnd.bind.call(console.groupEnd, console);
    } else {
      return noop;
    }
  }

  /* Statische Log-Methoden, sie zeigen nicht die Quelle des Logs an! */

  static LOG(...args: any[]) {
    if (!LuxConsoleService.isDebugMode()) {
      return;
    }
    if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
      console.log(LuxConsoleService.logDate() + ' -', args[0]);
    } else if (args.length === 1) {
      console.log(LuxConsoleService.logDate() + ' -', args[0]);
    } else {
      console.log(LuxConsoleService.logDate() + ' - ' + this.getLogValue(args));
    }
  }

  static WARN(...args: any[]) {
    if (!LuxConsoleService.isDebugMode()) {
      return;
    }
    if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
      console.warn(LuxConsoleService.logDate() + ' -', args[0]);
    } else if (args.length === 1) {
      console.warn(LuxConsoleService.logDate() + ' -', args[0]);
    } else {
      console.warn(LuxConsoleService.logDate() + ' - ' + this.getLogValue(args));
    }
  }

  static ERROR(...args: any[]) {
    if (!LuxConsoleService.isDebugMode()) {
      return;
    }
    if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
      console.error(LuxConsoleService.logDate() + ' -', args[0]);
    } else if (args.length === 1) {
      console.error(LuxConsoleService.logDate() + ' -', args[0]);
    } else {
      console.error(LuxConsoleService.logDate() + ' - ' + this.getLogValue(args));
    }
  }

  private static logDate() {
    const now = new Date();

    const day = LuxConsoleService.checkTime(now.getDate());
    const month = LuxConsoleService.checkTime(now.getMonth() + 1);
    const year = LuxConsoleService.checkTime(now.getFullYear());
    const hours = LuxConsoleService.checkTime(now.getHours());
    const minutes = LuxConsoleService.checkTime(now.getMinutes());
    const seconds = LuxConsoleService.checkTime(now.getSeconds());

    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  private static getLogValue(...args: any[]) {
    const logValue: string[] = [];

    args.forEach(arg => {
      if (arg !== null && typeof arg === 'object') {
        arg = JSON.stringify(arg);
      }
      logValue.push(arg);
    });

    return logValue;
  }

  private static isDebugMode() {
    return LuxConsoleService.config ? LuxConsoleService.config.displayLuxConsoleLogs : !environment.production;
  }

  private static checkTime(timeUnit: number) {
    return timeUnit < 10 ? '0' + timeUnit : timeUnit;
  }

  ngOnDestroy(): void {
    this.configSubscription.unsubscribe();
  }
}
