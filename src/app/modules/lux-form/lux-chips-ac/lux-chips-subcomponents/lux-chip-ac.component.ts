import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';
import { LuxUtil } from '../../../lux-util/lux-util';
import { ILuxChipAcSelected } from '../lux-chips-model/lux-chip-ac-selected.interface';

@Component({
  selector: 'lux-chip-ac',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class LuxChipAcComponent implements AfterViewInit{
  private removeClicked = false;

  private _luxColor: LuxThemePalette = 'primary';

  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;

  @Output() luxChipRemoved = new EventEmitter<number>();
  @Output() luxChipClicked = new EventEmitter<number>();
  @Output() luxChipSelected = new EventEmitter<ILuxChipAcSelected>();

  @Input() luxDisabled = false;
  @Input() luxRemovable = true;
  @Input() luxSelected = true;

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

  ngAfterViewInit() {
    LuxUtil.assertNonNull('templateRef', this.templateRef);
  }

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
