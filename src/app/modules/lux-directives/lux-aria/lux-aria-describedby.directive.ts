import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaDescribedby]'
})
export class LuxAriaDescribedbyDirective extends LuxAriaBase {
  _luxAriaDescribedby: string;

  @Input() luxAriaDescribedbySelector: string;

  @Input()
  get luxAriaDescribedby() {
    return this._luxAriaDescribedby;
  }

  set luxAriaDescribedby(describedby: string) {
    this._luxAriaDescribedby = describedby;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-describedby');

    if (!this.luxAriaDescribedbySelector) {
      const tagName = elementRef.nativeElement.tagName.toLowerCase();
      if (tagName === 'lux-button') {
        this.luxAriaDescribedbySelector = 'button';
      } else if (tagName === 'lux-app-header-action-nav-item') {
        this.luxAriaDescribedbySelector = 'button';
      }
    }
  }

  getSelector(): string {
    return this.luxAriaDescribedbySelector;
  }

  getValue(): string {
    return this._luxAriaDescribedby;
  }
}
