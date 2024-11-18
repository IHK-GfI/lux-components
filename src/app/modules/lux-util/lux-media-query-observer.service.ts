import { Injectable, OnDestroy } from '@angular/core';
import { LuxConsoleService } from './lux-console.service';
import { BehaviorSubject, filter, Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: "root"
})
export class LuxMediaQueryObserverService implements OnDestroy {
  
  public static BREAKPOINTS_DEFAULT: string[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  public static BREAKPOINTS_ALL: string[] = ['xs', 'sm', 'md', 'lg', 'xl', 'Handset', 'Tablet', 'Web', 'HandsetPortrait', 'TabletPortrait', 'WebPortrait', 'HandsetLandscape', 'TabletLandscape', 'WebLandscape'];
  
  protected _mediaQueryChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');
  protected _mediaQueryAllChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');
  protected _subscriptions: Subscription[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private logger: LuxConsoleService) {
    this.addQuerySubscription(Breakpoints.XSmall, 'xs');
    this.addQuerySubscription(Breakpoints.Small, 'sm');
    this.addQuerySubscription(Breakpoints.Medium, 'md');
    this.addQuerySubscription(Breakpoints.Large, 'lg');
    this.addQuerySubscription(Breakpoints.XLarge, 'xl');
    this.addQuerySubscription(Breakpoints.Handset, 'Handset');
    this.addQuerySubscription(Breakpoints.Tablet, 'Tablet');
    this.addQuerySubscription(Breakpoints.Web, 'Web');
    this.addQuerySubscription(Breakpoints.HandsetPortrait, 'HandsetPortrait');
    this.addQuerySubscription(Breakpoints.TabletPortrait, 'TabletPortrait');
    this.addQuerySubscription(Breakpoints.WebPortrait, 'WebPortrait');
    this.addQuerySubscription(Breakpoints.HandsetLandscape, 'HandsetLandscape');
    this.addQuerySubscription(Breakpoints.TabletLandscape, 'TabletLandscape');
    this.addQuerySubscription(Breakpoints.WebLandscape, 'WebLandscape');
  }

  public get activeMediaQuery() {
    return this._mediaQueryChanged.getValue();
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this._mediaQueryChanged.complete();
  }

  public getMediaQueryChangedAsObservable(...breakpoints: string[]): Observable<string> {
    if (breakpoints.length === 0) {
      return this._mediaQueryChanged.asObservable();
    }
    return this._mediaQueryAllChanged.asObservable().pipe(filter((value: string) => breakpoints.includes(value)));
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
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

  public isSM(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Small);
  }

  public isMD(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Medium);
  }

  public isLG(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Large);
  }

  public isXL(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XLarge);
  }

  public isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  public isTablet(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Tablet);
  }

  public isWeb(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Web);
  }

  public isHandsetPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
  }

  public isTabletPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.TabletPortrait);
  } 

  public isWebPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.WebPortrait);
  }

  public isHandsetLandscape(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.HandsetLandscape);
  }

  public isTabletLandscape(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.TabletLandscape);
  }

  public isWebLandscape(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.WebLandscape);
  }

  private addQuerySubscription(breakpoint: string, breakpointString: string) {
    this._subscriptions.push(
      this.breakpointObserver.observe([breakpoint]).subscribe((state: BreakpointState) => {
        if (state.matches) {
          if (LuxMediaQueryObserverService.BREAKPOINTS_DEFAULT.includes(breakpointString)) {
            this._mediaQueryChanged.next(breakpointString);
          }
          this._mediaQueryAllChanged.next(breakpointString);
          this.logger.log(`MediaQuery [${breakpointString}] activated.`);
        }
      })
    );
  }
}
