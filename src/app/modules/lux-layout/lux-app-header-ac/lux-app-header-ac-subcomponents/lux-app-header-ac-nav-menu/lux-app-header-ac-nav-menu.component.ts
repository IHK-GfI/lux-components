import { Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../../../lux-util/lux-media-query-observer.service';
import { LuxAppHeaderAcNavMenuItemComponent } from './lux-app-header-ac-nav-menu-item/lux-app-header-ac-nav-menu-item.component';

@Component({
  selector: 'lux-app-header-ac-nav-menu',
  templateUrl: './lux-app-header-ac-nav-menu.component.html'
})
export class LuxAppHeaderAcNavMenuComponent implements OnDestroy {
  @ContentChildren(LuxAppHeaderAcNavMenuItemComponent) menuItemComponents!: QueryList<LuxAppHeaderAcNavMenuItemComponent>;

  @Input() luxNavMenuMaximumExtended = 5;

  mobileView: boolean;
  subscription: Subscription;
  navMenuOpened = false;

  constructor(private queryService: LuxMediaQueryObserverService) {
    this.mobileView = this.queryService.activeMediaQuery === 'xs' || this.queryService.activeMediaQuery === 'sm';
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe((query) => {
      this.mobileView = query === 'xs' || query === 'sm';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navMenuItemClicked(navItem: LuxAppHeaderAcNavMenuItemComponent, event: Event) {
    navItem.clicked(event);
  }

  onNavMenuOpend() {
    this.navMenuOpened = true;
  }
  onNavMenuClosed() {
    this.navMenuOpened = false;
  }
}
