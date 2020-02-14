import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { LuxActionComponentBaseClass } from '../../lux-action-model/lux-action-component-base.class';

// @dynamic Erklärung steht in der Datei "lux-decorators.ts".
@Component({
  selector: 'lux-menu-item',
  template: ''
})
export class LuxMenuItemComponent extends LuxActionComponentBaseClass {
  @ViewChild(TemplateRef, { static: false }) templateRef: TemplateRef<any>;

  @Output() luxHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() luxHideLabelIfExtendedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() luxAlwaysVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  _luxAlwaysVisible: boolean = true;
  _luxHideLabelIfExtended: boolean = false;
  _luxHidden: boolean = false;

  // Wird vom LuxMenuComponent mit dem berechneten Breitenwert belegt
  width: number = 0;
  // Wird vom LuxMenuComponent mit dem passenden Zustand belegt
  extended: boolean = false;

  get luxAlwaysVisible() {
    return this._luxAlwaysVisible;
  }

  @Input() set luxAlwaysVisible(value: boolean) {
    this._luxAlwaysVisible = value;

    this.luxAlwaysVisibleChange.emit(value);
  }

  get luxHideLabelIfExtended() {
    return this._luxHideLabelIfExtended;
  }

  @Input() set luxHideLabelIfExtended(value: boolean) {
    this._luxHideLabelIfExtended = value;

    this.luxHideLabelIfExtendedChange.emit(value);
  }

  get luxHidden() {
    return this._luxHidden;
  }

  @Input() set luxHidden(value: boolean) {
    this._luxHidden = value;

    this.luxHiddenChange.emit(value);
  }

  constructor() {
    super();
  }

  clicked($event: any) {
    this.luxClicked.emit($event);
  }
}
