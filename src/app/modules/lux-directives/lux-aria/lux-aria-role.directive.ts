import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { LuxAriaBase } from './lux-aria-base';

@Directive({
  selector: '[luxAriaRole]'
})
export class LuxAriaRoleDirective extends LuxAriaBase<string> {
  _luxAriaRole?: string;

  @Input() luxAriaRoleSelector?: string;

  @Input()
  get luxAriaRole() {
    return this._luxAriaRole;
  }

  set luxAriaRole(role: string | undefined) {
    this._luxAriaRole = role;

    this.renderAria();
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super(elementRef, renderer, 'role');
  }

  getSelector(): string | undefined {
    return this.luxAriaRoleSelector;
  }

  getValue(): string | undefined {
    return this._luxAriaRole;
  }
}
