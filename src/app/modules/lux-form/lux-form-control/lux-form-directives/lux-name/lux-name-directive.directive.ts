import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[luxNameAttr]'
})
export class LuxNameDirectiveDirective {
  _luxNameAttr: string;

  @Input()
  get luxNameAttr() {
    return this._luxNameAttr;
  }

  set luxNameAttr(name: string) {
    this._luxNameAttr = name;

    if (this._luxNameAttr) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'name', this._luxNameAttr);
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'name');
    }
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
