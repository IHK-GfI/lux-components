import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaLabelledby]'
})
export class LuxAriaLabelledbyDirective extends LuxAriaBase<string> {
  _luxAriaLabelledby?: string;

  @Input() luxAriaLabelledbySelector?: string;

  @Input()
  get luxAriaLabelledby() {
    return this._luxAriaLabelledby;
  }

  set luxAriaLabelledby(labelledby: string | undefined) {
    this._luxAriaLabelledby = labelledby;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-labelledby');

    if (!this.luxAriaLabelledbySelector) {
      const tagName = elementRef.nativeElement.tagName.toLowerCase();
      if (tagName === 'lux-button') {
        this.luxAriaLabelledbySelector = 'button';
      } else if (tagName === 'lux-app-header-action-nav-item') {
        this.luxAriaLabelledbySelector = 'button';
      }
    }
  }

  getSelector(): string | undefined {
    return this.luxAriaLabelledbySelector;
  }

  getValue(): string | undefined {
    return this._luxAriaLabelledby;
  }
}
