import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lux-app-header-action-nav-item',
  templateUrl: './lux-app-header-action-nav-item.component.html',
  styleUrls: ['./lux-app-header-action-nav-item.component.scss']
})
export class LuxAppHeaderActionNavItemComponent {
  @Input() luxLabel: string;
  @Input() luxIconName: string;
  @Input() luxColor: string;
  @Input() luxDisabled: boolean;
  @Input() luxTagId: string;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
