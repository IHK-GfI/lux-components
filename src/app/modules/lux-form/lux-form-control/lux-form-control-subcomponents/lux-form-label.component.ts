import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lux-form-label',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class LuxFormLabelComponent {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor() {}
}
