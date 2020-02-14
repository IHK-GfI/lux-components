import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

export abstract class LuxAriaBase implements AfterViewInit {
  protected init = false;

  protected constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected ariaTagName: string
  ) {}

  ngAfterViewInit(): void {
    this.init = true;

    this.renderAria();
  }

  protected renderAria() {
    if (this.init) {
      const selector = this.getSelector();

      let el;
      if (selector) {
        el = this.elementRef.nativeElement.querySelector(selector);
      } else {
        el = this.elementRef.nativeElement;
      }

      if (el) {
        const value = this.getValue();
        if (value === null || value === undefined) {
          this.renderer.removeAttribute(el, this.ariaTagName);
        } else {
          this.renderer.setAttribute(el, this.ariaTagName, value);
        }
      }
    }
  }

  abstract getSelector(): string;

  abstract getValue(): string;
}
