import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaHasPopup]'
})
export class LuxAriaHaspopupDirective extends LuxAriaBase<boolean> {
  _luxAriaHasPopup?: boolean | undefined;

  @Input() luxAriaHasPopupSelector?: string;

  @Input()
  get luxAriaHasPopup() {
    return this._luxAriaHasPopup;
  }

  set luxAriaHasPopup(hasPopup: boolean | undefined) {
    this._luxAriaHasPopup = hasPopup;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-haspopup');

    if (!this.luxAriaHasPopupSelector) {
      const tagName = elementRef.nativeElement.tagName.toLowerCase();
      if (tagName === 'lux-button') {
        this.luxAriaHasPopupSelector = 'button';
      } else if (tagName === 'lux-app-header-action-nav-item') {
        this.luxAriaHasPopupSelector = 'button';
      }
    }
  }

  getSelector(): string | undefined {
    return this.luxAriaHasPopupSelector;
  }

  getValue(): boolean | undefined {
    return this._luxAriaHasPopup;
  }
}
