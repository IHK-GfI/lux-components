import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ComponentsOverviewNavigationService } from '../../components-overview/components-overview-navigation.service';
import { LuxMediaQueryObserverService } from '../../../modules/lux-util/lux-media-query-observer.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LuxUtil } from '../../../modules/lux-util/lux-util';

@Component({
  selector: 'example-root',
  templateUrl: './example-root.component.html',
  styleUrls: ['./example-root.component.scss']
})
export class ExampleRootComponent implements OnDestroy {
  private routerSubscription: Subscription;
  private subscription: Subscription;

  desktopView: boolean;

  @ViewChild('exampleListElement') exampleListElement!: ElementRef;

  constructor(
    private router: Router,
    public navigationService: ComponentsOverviewNavigationService,
    private mediaQueryService: LuxMediaQueryObserverService
  ) {
    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        LuxUtil.goToTop();
      }
    });

    this.desktopView = !this.mediaQueryService.isXS() && !this.mediaQueryService.isSM();

    this.subscription = this.mediaQueryService.getMediaQueryChangedAsObservable().subscribe((query) => {
      this.desktopView = !this.mediaQueryService.isXS() && !this.mediaQueryService.isSM();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    this.subscription.unsubscribe();
  }

  /**
   * Führt die Click-Funktion der Bsp-Component aus.
   * @param component
   */
  onComponentClick(component: any) {
    component.onclick();
  }
}
