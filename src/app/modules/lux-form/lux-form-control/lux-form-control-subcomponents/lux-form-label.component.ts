import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lux-form-label',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class LuxFormLabelComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
