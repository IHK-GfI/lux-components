import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { LuxThemePalette } from '../../../../../lux-util/lux-colors.enum';
import { LuxAppHeaderActionNavItemCustomComponent } from './lux-app-header-action-nav-item-custom.component';

@Component({
  selector: 'lux-app-header-action-nav-item',
  templateUrl: './lux-app-header-action-nav-item.component.html'
})
export class LuxAppHeaderActionNavItemComponent {
  @Input() luxLabel = '';
  @Input() luxIconName?: string;
  @Input() luxColor: LuxThemePalette;
  @Input() luxDisabled = false;
  @Input() luxTagId?: string;

  @Output() luxClicked = new EventEmitter<Event>();

  @ContentChild(LuxAppHeaderActionNavItemCustomComponent) customComponent?: LuxAppHeaderActionNavItemCustomComponent;

  constructor() {}
}
