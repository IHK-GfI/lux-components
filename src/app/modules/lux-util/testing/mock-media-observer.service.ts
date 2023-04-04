import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MockMediaObserverService implements OnDestroy {
  mediaQueryChanged: BehaviorSubject<string> = new BehaviorSubject<string>('md');

  constructor() {}

  ngOnDestroy() {
    this.mediaQueryChanged.complete();
  }

  public getMediaQueryChangedAsObservable(): Observable<string> {
    return this.mediaQueryChanged.asObservable();
  }
}
