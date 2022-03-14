import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lux-app-header-next-nav-menu-item',
  templateUrl: './lux-app-header-next-nav-menu-item.component.html',
})
export class LuxAppHeaderNextNavMenuItemComponent {
  @Input() luxLabel: string;
  @Input() luxDisabled: boolean;
  @Input() luxTagId: string;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
