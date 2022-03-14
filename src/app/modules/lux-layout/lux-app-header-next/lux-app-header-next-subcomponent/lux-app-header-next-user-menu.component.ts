import { Component, ContentChildren } from '@angular/core';
import { LuxMenuItemComponent } from '../../../lux-action/lux-menu/lux-menu-subcomponents/lux-menu-item.component';

@Component({
  selector: 'lux-app-header-next-user-menu',
  template: ''
})
export class LuxAppHeaderNextUserMenuComponent {
  @ContentChildren(LuxMenuItemComponent) menuItemComponents;

  constructor() {}
}
