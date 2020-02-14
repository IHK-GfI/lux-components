import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaInvalid]'
})
export class LuxAriaInvalidDirective extends LuxAriaBase {
  _luxAriaInvalid: string;

  @Input() luxAriaInvalidSelector: string;

  @Input()
  get luxAriaInvalid() {
    return this._luxAriaInvalid;
  }

  set luxAriaInvalid(invalid: string) {
    this._luxAriaInvalid = invalid;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-invalid');
  }

  getSelector(): string {
    return this.luxAriaInvalidSelector;
  }

  getValue(): string {
    return this._luxAriaInvalid;
  }
}
