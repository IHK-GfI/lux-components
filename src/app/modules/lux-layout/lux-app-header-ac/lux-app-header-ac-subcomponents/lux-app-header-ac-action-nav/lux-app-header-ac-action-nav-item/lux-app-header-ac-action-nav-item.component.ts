import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { LuxThemePalette } from '../../../../../lux-util/lux-colors.enum';
import { LuxAppHeaderAcActionNavItemCustomComponent } from "./lux-app-header-ac-action-nav-item-custom.component";

@Component({
  selector: 'lux-app-header-ac-action-nav-item',
  templateUrl: './lux-app-header-ac-action-nav-item.component.html',
  styleUrls: ['./lux-app-header-ac-action-nav-item.component.scss']
})
export class LuxAppHeaderAcActionNavItemComponent {
  @Input() luxLabel = '';
  @Input() luxIconName?: string;
  @Input() luxColor: LuxThemePalette;
  @Input() luxDisabled = false;
  @Input() luxTagId?: string;

  @Output() luxClicked = new EventEmitter<Event>();

  @ContentChild(LuxAppHeaderAcActionNavItemCustomComponent) customComponent?: LuxAppHeaderAcActionNavItemCustomComponent;

  constructor() {}
}
