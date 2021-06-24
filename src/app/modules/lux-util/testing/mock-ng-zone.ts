import { EventEmitter, Injectable, NgZone } from '@angular/core';

@Injectable()
export class MockNgZone extends NgZone {
  onStable: EventEmitter<any> = new EventEmitter(false);

  constructor() {
    super({ enableLongStackTrace: false });
  }

  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
    return fn();
  }

  runOutsideAngular<T>(fn: (...args: any[]) => T): T {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}
