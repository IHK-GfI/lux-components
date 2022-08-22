import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { LuxUtil } from "../../../lux-util/lux-util";

@Component({
  selector: 'lux-form-hint',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class LuxFormHintComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('templateRef', this.templateRef)
  }
}
