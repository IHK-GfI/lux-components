import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaRole]'
})
export class LuxAriaRoleDirective extends LuxAriaBase {
  _luxAriaRole: string;

  @Input() luxAriaRoleSelector: string;

  @Input()
  get luxAriaRole() {
    return this._luxAriaRole;
  }

  set luxAriaRole(role: string) {
    this._luxAriaRole = role;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'role');
  }

  getSelector(): string {
    return this.luxAriaRoleSelector;
  }

  getValue(): string {
    return this._luxAriaRole;
  }
}
