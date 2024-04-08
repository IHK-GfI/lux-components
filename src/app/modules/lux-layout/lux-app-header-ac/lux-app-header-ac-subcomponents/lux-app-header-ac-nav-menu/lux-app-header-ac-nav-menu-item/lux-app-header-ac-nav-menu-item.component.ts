import { Component, Input } from '@angular/core';
import { LuxMenuItemComponent } from '../../../../../lux-action/lux-menu/lux-menu-subcomponents/lux-menu-item.component';
import { LuxThemePalette } from '../../../../../lux-util/lux-colors.enum';
@Component({
  selector: 'lux-app-header-ac-nav-menu-item',
  template: `<ng-content></ng-content>`
})
export class LuxAppHeaderAcNavMenuItemComponent extends LuxMenuItemComponent {
  @Input() luxSelected = false;
  @Input() luxButtonBadgeColor: LuxThemePalette = 'primary';

  constructor() {
    super();
  }
}
