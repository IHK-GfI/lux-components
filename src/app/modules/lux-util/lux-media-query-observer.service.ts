import { Injectable, OnDestroy } from '@angular/core';
import { LuxConsoleService } from './lux-console.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable()
export class LuxMediaQueryObserverService implements OnDestroy {
  protected _mediaQueryChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');
  protected _subscriptions: Subscription[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private logger: LuxConsoleService) {
    this.addQuerySubscription(Breakpoints.XSmall, 'xs');
    this.addQuerySubscription(Breakpoints.Small, 'sm');
    this.addQuerySubscription(Breakpoints.Medium, 'md');
    this.addQuerySubscription(Breakpoints.Large, 'lg');
    this.addQuerySubscription(Breakpoints.XLarge, 'xl');
  }

  public get activeMediaQuery() {
    return this._mediaQueryChanged.getValue();
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this._mediaQueryChanged.complete();
  }

  public getMediaQueryChangedAsObservable(): Observable<string> {
    return this._mediaQueryChanged.asObservable();
  }

  public isSmaller(query: string): boolean {
    return this.sizeAsNumber(this._mediaQueryChanged.getValue()) - this.sizeAsNumber(query) < 0;
  }

  public isSmallerOrEqual(query: string): boolean {
    return this.sizeAsNumber(this._mediaQueryChanged.getValue()) - this.sizeAsNumber(query) <= 0;
  }

  public isGreater(query: string): boolean {
    return this.sizeAsNumber(this._mediaQueryChanged.getValue()) - this.sizeAsNumber(query) > 0;
  }

  public isGreaterOrEqual(query: string): boolean {
    return this.sizeAsNumber(this._mediaQueryChanged.getValue()) - this.sizeAsNumber(query) >= 0;
  }

  private sizeAsNumber(query: string): number {
    switch (query) {
      case 'xs':
        return 1;
      case 'sm':
        return 2;
      case 'md':
        return 3;
      case 'lg':
        return 4;
      case 'xl':
        return 5;
      default:
        return 0;
    }
  }

  public isXS(): boolean {
    return this.activeMediaQuery === 'xs';
  }

  public isSM(): boolean {
    return this.activeMediaQuery === 'sm';
  }

  public isMD(): boolean {
    return this.activeMediaQuery === 'md';
  }

  public isLG(): boolean {
    return this.activeMediaQuery === 'lg';
  }

  public isXL(): boolean {
    return this.activeMediaQuery === 'xl';
  }

  private addQuerySubscription(breakpoint: any, breakpointString: string) {
    this._subscriptions.push(
      this.breakpointObserver.observe([breakpoint]).subscribe((state: BreakpointState) => {
        if (state.matches) {
          this._mediaQueryChanged.next(breakpointString);
          this.logger.log(`MediaQuery [${this.activeMediaQuery}] activated.`);
        }
      })
    );
  }
}
