import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ILuxChipAcSelected } from '../lux-chips-model/lux-chip-ac-selected.interface';

@Component({
  selector: 'lux-chip-ac',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class LuxChipAcComponent {
  private removeClicked = false;

  private _luxColor: ThemePalette = 'primary';

  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  @Output() luxChipRemoved = new EventEmitter<number>();
  @Output() luxChipClicked = new EventEmitter<number>();
  @Output() luxChipSelected = new EventEmitter<ILuxChipAcSelected>();

  @Input() luxDisabled = false;
  @Input() luxRemovable = true;
  @Input() luxSelected = true;

  get luxColor(): ThemePalette {
    return this._luxColor;
  }

  @Input() set luxColor(color: ThemePalette) {
    if (color !== 'primary' && color !== 'accent' && color !== 'warn') {
      color = undefined;
    }
    this._luxColor = color;
  }

  constructor() {}

  remove(index: number) {
    this.luxChipRemoved.emit(index);
    this.removeClicked = true;
  }

  click(index: number) {
    if (!this.removeClicked) {
      this.luxChipClicked.emit(index);
    }
  }

  select(selected: boolean, index: number) {
    this.luxSelected = selected;
    this.luxChipSelected.emit({ index, selected });
  }
}
