import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { ILuxChipSelected } from '../lux-chips-model/lux-chip-selected.interface';

@Component({
  selector: 'lux-chip-group',
  template: ''
})
export class LuxChipGroupComponent implements OnInit {
  private _luxColor: ThemePalette = 'primary';

  @ContentChild(TemplateRef, { static: false }) tempRef: TemplateRef<any>;

  @Output() luxChipClicked = new EventEmitter<number>();
  @Output() luxChipAdded = new EventEmitter<string>();
  @Output() luxChipRemoved = new EventEmitter<number>();
  @Output() luxChipSelected = new EventEmitter<ILuxChipSelected>();

  @Input() luxLabels: string[] = [];
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

  add(label: string) {
    this.luxLabels.push(label);
    this.luxChipAdded.emit(label);
  }

  remove(index: number) {
    this.luxChipRemoved.emit(index);
    this.luxLabels.splice(index, 1);
  }

  click(index: number) {
    this.luxChipClicked.emit(index);
  }

  select(selected: boolean, index: number) {
    this.luxChipSelected.emit({ index, selected });
  }
}
