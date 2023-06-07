import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LuxActionComponentBaseClass } from '../../lux-action-model/lux-action-component-base.class';
import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';

// @dynamic Erklärung steht in der Datei "lux-decorators.ts".
@Component({
  selector: 'lux-menu-item',
  template: ''
})
export class LuxMenuItemComponent extends LuxActionComponentBaseClass {
  @Input() luxButtonTooltip = '';
  @Input() luxMenuTooltip = '';
  @Input() luxPrio = 0;
  @Input() luxButtonBadge?: string;
  @Input() luxButtonBadgeColor: LuxThemePalette = 'primary';

  @Output() luxHiddenChange = new EventEmitter<boolean>();
  @Output() luxHideLabelIfExtendedChange = new EventEmitter<boolean>();
  @Output() luxAlwaysVisibleChange = new EventEmitter<boolean>();

  _luxAlwaysVisible = true;
  _luxHideLabelIfExtended = false;
  _luxHidden = false;

  // Wird vom LuxMenuComponent mit dem berechneten Breitenwert belegt
  width = 0;
  // Wird vom LuxMenuComponent mit dem passenden Zustand belegt
  extended = false;

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

  @Input() luxClass?: string | string[] | Set<string> | { [klass: string]: any }; //vgl. ngClass

  constructor() {
    super();
  }

  clicked(event: Event) {
    this.luxClicked.emit(event);
  }
}
