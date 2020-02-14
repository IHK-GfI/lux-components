import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lux-form-hint',
  template: '<ng-template><ng-content></ng-content></ng-template>\n'
})
export class LuxFormHintComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
