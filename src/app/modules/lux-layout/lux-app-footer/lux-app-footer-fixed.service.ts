import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Injectable({
  providedIn: 'root'
})
export class LuxAppFooterFixedService implements OnDestroy {

  private fixedModeSubject = new BehaviorSubject<boolean>(true);

  subscriptions: Subscription[] = [];

  constructor(private configService: LuxComponentsConfigService, private mediaQueryService: LuxMediaQueryObserverService) {
    this.updateFixedMode();

    this.subscriptions.push(this.configService.config.subscribe(() => {
      this.updateFixedMode();
    }));

    this.subscriptions.push(this.mediaQueryService.getMediaQueryChangedAsObservable(...LuxMediaQueryObserverService.BREAKPOINTS_ALL).subscribe(() => {
      this.updateFixedMode();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  get fixedMode(): boolean {
    return this.fixedModeSubject.getValue();
  }

  get fixedModeAsObservable(): Observable<boolean> {
    return this.fixedModeSubject.asObservable();
  }

  private updateFixedMode() {
    const fixedDesktopConfig = !!this.configService.currentConfig.appFooter?.fixedDesktop;
    const fixedMobileConfig = !!this.configService.currentConfig.appFooter?.fixedMobile;
    const isMobile = this.mediaQueryService.isHandset();
    const isDesktop = !isMobile;

    const isFixedDesktop = (fixedDesktopConfig && isDesktop);
    const isFixedMobile = (fixedMobileConfig && isMobile);
    const newFixedMode = isFixedDesktop || isFixedMobile;

    if (this.fixedMode !== newFixedMode) {
      this.fixedModeSubject.next(newFixedMode);
    }
  }
}
