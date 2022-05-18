import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaRequired]'
})
export class LuxAriaRequiredDirective extends LuxAriaBase<boolean> {
  _luxAriaRequired: boolean;

  @Input() luxAriaRequiredSelector: string;

  @Input()
  get luxAriaRequired() {
    return this._luxAriaRequired;
  }

  set luxAriaRequired(required: boolean) {
    this._luxAriaRequired = required;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-required');
  }

  getSelector(): string {
    return this.luxAriaRequiredSelector;
  }

  getValue(): boolean {
    return this._luxAriaRequired;
  }
}
