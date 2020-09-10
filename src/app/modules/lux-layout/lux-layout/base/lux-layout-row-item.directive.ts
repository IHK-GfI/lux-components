import { Directive, Input, TemplateRef } from '@angular/core';
import { LuxLayoutRowItemConfig } from './lux-layout-row-item-config';

@Directive({
  selector: '[luxLayoutRowItem]'
})
export class LuxLayoutRowItemDirective {
  _luxLayoutRowItem = new LuxLayoutRowItemConfig({ colSpan: 1, empty: false });

  @Input()
  get luxLayoutRowItem() {
    return this._luxLayoutRowItem;
  }

  set luxLayoutRowItem(partial: Partial<LuxLayoutRowItemConfig>) {
    Object.assign(this._luxLayoutRowItem, partial);
  }

  constructor(public templateRef: TemplateRef<any>) {}
}
