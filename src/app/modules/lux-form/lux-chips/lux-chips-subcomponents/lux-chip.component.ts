import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { ILuxChipSelected } from '../lux-chips-model/lux-chip-selected.interface';

@Component({
  selector: 'lux-chip',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class LuxChipComponent implements OnInit {
  private removeClicked: boolean = false;

  private _luxColor: ThemePalette = 'primary';

  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  @Output() luxChipRemoved = new EventEmitter<number>();
  @Output() luxChipClicked = new EventEmitter<number>();
  @Output() luxChipSelected = new EventEmitter<ILuxChipSelected>();

  @Input() luxDisabled: boolean = false;
  @Input() luxRemovable: boolean = true;
  @Input() luxSelected: boolean = true;

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

  ngOnInit() {}

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
