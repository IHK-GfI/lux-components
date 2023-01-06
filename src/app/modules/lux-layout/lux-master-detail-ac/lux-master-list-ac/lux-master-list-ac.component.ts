import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-master-list-ac',
  template: ''
})
export class LuxMasterListAcComponent {
  @Input() luxTitleProp?: string;
  @Input() luxSubTitleProp?: string;

  @ContentChild('luxSimpleContent') contentTempRef?: TemplateRef<any>;
  @ContentChild('luxSimpleIcon') iconTempRef?: TemplateRef<any>;

  constructor() {}
}
