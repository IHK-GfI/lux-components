import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[luxMaxLengthAttr]'
})
export class LuxMaxLengthDirective {
  _luxMaxLengthAttr: string;

  @Input()
  get luxMaxLengthAttr() {
    return this._luxMaxLengthAttr;
  }

  set luxMaxLengthAttr(maxLength: string) {
    this._luxMaxLengthAttr = maxLength;

    if (this._luxMaxLengthAttr) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'maxlength', this._luxMaxLengthAttr);
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'maxlength');
    }
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
