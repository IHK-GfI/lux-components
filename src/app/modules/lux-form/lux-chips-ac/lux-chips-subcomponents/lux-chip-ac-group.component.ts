import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';

@Component({
  selector: 'lux-chip-ac-group',
  template: ''
})
export class LuxChipAcGroupComponent {
  private _luxColor: LuxThemePalette = 'primary';

  @ContentChild(TemplateRef) tempRef?: TemplateRef<any>;

  @Output() luxChipClicked = new EventEmitter<number>();
  @Output() luxChipAdded = new EventEmitter<string>();
  @Output() luxChipRemoved = new EventEmitter<number>();

  @Input() luxLabels: string[] = [];
  @Input() luxDisabled = false;
  @Input() luxRemovable = true;

  get luxColor(): LuxThemePalette {
    return this._luxColor;
  }

  @Input() set luxColor(color: LuxThemePalette) {
    if (color !== 'primary' && color !== 'accent' && color !== 'warn') {
      color = undefined;
    }
    this._luxColor = color;
  }

  constructor() {}

  add(label: string) {
    if (!this.luxLabels) {
      this.luxLabels = [];
    }

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
}
