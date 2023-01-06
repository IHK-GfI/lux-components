import { ConsoleLogger } from '@angular/compiler-cli/ngcc';
import { Component, ContentChildren, ContentChild, Input, OnDestroy, Output, QueryList, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../../../lux-util/lux-media-query-observer.service';
import { LuxAppHeaderAcNavMenuItemComponent } from './lux-app-header-ac-nav-menu-item/lux-app-header-ac-nav-menu-item.component';

@Component({
  selector: 'lux-app-header-ac-nav-menu',
  templateUrl: './lux-app-header-ac-nav-menu.component.html',
})
export class LuxAppHeaderAcNavMenuComponent implements OnDestroy {

  @ContentChildren(LuxAppHeaderAcNavMenuItemComponent) menuItemComponents!: QueryList<LuxAppHeaderAcNavMenuItemComponent>;

  @Input() luxNavMenuMaximumExtended = 5;

  mobileView: boolean;
  subscription: Subscription;
  navMenuOpened=false;

  constructor(private queryService: LuxMediaQueryObserverService) {
    this.mobileView = this.queryService.activeMediaQuery === 'xs' ||  this.queryService.activeMediaQuery === 'sm';
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navMenuItemClicked(navItem: LuxAppHeaderAcNavMenuItemComponent, event: Event){
    navItem.clicked(event);
  }

  toggleMenuOpend(){
    this.navMenuOpened=!this.navMenuOpened;
    console.log('navmenutoggle', this.navMenuOpened)
  }
  onNavMenuOpend(){
    this.navMenuOpened = true;
    console.log('navmenuopen', this.navMenuOpened)
  }
  onNavMenuClosed(){
    this.navMenuOpened = false;
    console.log('navmenuclose', this.navMenuOpened)
  }
}
