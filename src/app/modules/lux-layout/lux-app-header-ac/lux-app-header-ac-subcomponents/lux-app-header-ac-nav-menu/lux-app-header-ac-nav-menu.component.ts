import { Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../../../lux-util/lux-media-query-observer.service';
import { LuxMenuItemComponent } from '../../../../lux-action/lux-menu/lux-menu-subcomponents/lux-menu-item.component';

@Component({
  selector: 'lux-app-header-ac-nav-menu',
  templateUrl: './lux-app-header-ac-nav-menu.component.html',
})
export class LuxAppHeaderAcNavMenuComponent implements OnDestroy {

  @ContentChildren(LuxMenuItemComponent) menuItemComponents!: QueryList<LuxMenuItemComponent>;
  @Input() luxNavMenuMaximumExtended = 0;

  mobileView: boolean;
  subscription: Subscription;
  selectedItem = -1;

  constructor(private queryService: LuxMediaQueryObserverService) {
    this.mobileView = this.queryService.activeMediaQuery === 'xs' ||  this.queryService.activeMediaQuery === 'sm';
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navItemClicked(event: Event, navItemIndex: number){
    this.selectedItem = navItemIndex;
    this.menuItemComponents.toArray()[this.selectedItem].clicked(event);
  }
}
