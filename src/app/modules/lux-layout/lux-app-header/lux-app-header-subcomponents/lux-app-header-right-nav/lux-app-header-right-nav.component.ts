import { Component, ContentChildren, OnInit } from '@angular/core';
import { LuxMenuItemComponent } from '../../../../lux-action/lux-menu/lux-menu-subcomponents/lux-menu-item.component';

@Component({
  selector: 'lux-app-header-right-nav',
  template: ''
})
export class LuxAppHeaderRightNavComponent implements OnInit {
  @ContentChildren(LuxMenuItemComponent) menuItemComponents;

  constructor() {}

  ngOnInit() {}
}
