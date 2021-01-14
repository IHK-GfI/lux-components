import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lux-form-hint',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class LuxFormHintComponent {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor() {}
}
