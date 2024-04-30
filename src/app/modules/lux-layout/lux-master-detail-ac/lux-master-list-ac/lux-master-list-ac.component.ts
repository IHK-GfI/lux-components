import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-master-list-ac',
  template: ''
})
export class LuxMasterListAcComponent {
  @Input() luxTitleProp?: string;
  @Input() luxTitleTooltipProp?: string;
  @Input() luxSubTitleProp?: string;
  @Input() luxSubTitleTooltipProp?: string;

  @ContentChild('luxSimpleContent') contentTempRef?: TemplateRef<any>;
  @ContentChild('luxSimpleIcon') iconTempRef?: TemplateRef<any>;

  constructor() {}
}
