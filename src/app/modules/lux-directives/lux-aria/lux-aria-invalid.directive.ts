import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaInvalid]'
})
export class LuxAriaInvalidDirective extends LuxAriaBase<string> {
  _luxAriaInvalid?: string;

  @Input() luxAriaInvalidSelector?: string;

  @Input()
  get luxAriaInvalid() {
    return this._luxAriaInvalid;
  }

  set luxAriaInvalid(invalid: string | undefined) {
    this._luxAriaInvalid = invalid;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-invalid');
  }

  getSelector(): string | undefined {
    return this.luxAriaInvalidSelector;
  }

  getValue(): string | undefined {
    return this._luxAriaInvalid;
  }
}
