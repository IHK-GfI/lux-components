import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../../../lux-util/lux-media-query-observer.service';
import { LuxMenuItemComponent } from '../../../../lux-action/lux-menu/lux-menu-subcomponents/lux-menu-item.component';
import { ConsoleLogger } from '@angular/compiler-cli/ngcc';

@Component({
  selector: 'lux-app-header-ac-nav-menu',
  templateUrl: './lux-app-header-ac-nav-menu.component.html',
})
export class LuxAppHeaderAcNavMenuComponent implements OnInit {

  @ContentChildren(LuxMenuItemComponent) menuItemComponents;
  @Input() luxNavMenuMaximumExtended: number;

  mobileView: boolean;
  subscription: Subscription;
  selectedItem: number;

  constructor(private queryService: LuxMediaQueryObserverService) { }

  ngOnInit(): void {
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }

  navItemClicked($event: any, navItemIndex: number){
    this.selectedItem = navItemIndex;
    this.menuItemComponents._results[this.selectedItem].clicked($event);
  }
}
