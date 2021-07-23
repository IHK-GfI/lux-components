import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaExpanded]'
})
export class LuxAriaExpandedDirective extends LuxAriaBase<boolean> {
  _luxAriaExpanded: boolean;

  @Input() luxAriaExpandedSelector: string;

  @Input()
  get luxAriaExpanded() {
    return this._luxAriaExpanded;
  }

  set luxAriaExpanded(expanded: boolean) {
    this._luxAriaExpanded = expanded;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'aria-expanded');

    if (!this.luxAriaExpandedSelector) {
      const tagName = elementRef.nativeElement.tagName.toLowerCase();
      if (tagName === 'lux-button') {
        this.luxAriaExpandedSelector = 'button';
      }
    }
  }

  getSelector(): string {
    return this.luxAriaExpandedSelector;
  }

  getValue(): boolean {
    return this._luxAriaExpanded;
  }
}
