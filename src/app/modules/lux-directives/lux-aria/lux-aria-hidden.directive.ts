import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaHidden]'
})
export class LuxAriaHiddenDirective extends LuxAriaBase<boolean> {
  _luxAriaHidden: boolean;

  @Input() luxAriaHiddenSelector: string;

  @Input()
  get luxAriaHidden() {
    return this._luxAriaHidden;
  }

  set luxAriaHidden(hidden: boolean) {
    this._luxAriaHidden = hidden;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-hidden');
  }

  getSelector(): string {
    return this.luxAriaHiddenSelector;
  }

  getValue(): boolean {
    return this._luxAriaHidden;
  }
}
