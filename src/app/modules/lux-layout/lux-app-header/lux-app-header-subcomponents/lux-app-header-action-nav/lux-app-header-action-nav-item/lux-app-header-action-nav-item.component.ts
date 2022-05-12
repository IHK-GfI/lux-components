import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { LuxActionColorType } from "../../../../../lux-action/lux-action-model/lux-action-component-base.class";
import { LuxAppHeaderActionNavItemCustomComponent } from "./lux-app-header-action-nav-item-custom.component";

@Component({
  selector: 'lux-app-header-action-nav-item',
  templateUrl: './lux-app-header-action-nav-item.component.html',
  styleUrls: ['./lux-app-header-action-nav-item.component.scss']
})
export class LuxAppHeaderActionNavItemComponent {
  @Input() luxLabel: string;
  @Input() luxIconName: string;
  @Input() luxColor: LuxActionColorType;
  @Input() luxDisabled: boolean;
  @Input() luxTagId: string;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild(LuxAppHeaderActionNavItemCustomComponent) customComponent: LuxAppHeaderActionNavItemCustomComponent;

  constructor() {}
}
