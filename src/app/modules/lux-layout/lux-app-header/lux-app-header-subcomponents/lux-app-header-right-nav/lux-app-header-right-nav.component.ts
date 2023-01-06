import { Component, ContentChildren, QueryList } from '@angular/core';
import { LuxMenuItemComponent } from '../../../../lux-action/lux-menu/lux-menu-subcomponents/lux-menu-item.component';

@Component({
  selector: 'lux-app-header-right-nav',
  template: ''
})
export class LuxAppHeaderRightNavComponent {
  @ContentChildren(LuxMenuItemComponent) menuItemComponents!: QueryList<LuxMenuItemComponent>;

  constructor() {}
}
