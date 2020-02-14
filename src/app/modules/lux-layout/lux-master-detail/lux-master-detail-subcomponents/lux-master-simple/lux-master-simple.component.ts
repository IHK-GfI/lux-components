import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-master-simple',
  template: ''
})
export class LuxMasterSimpleComponent implements OnInit {
  @Input() luxTitleProp: string;
  @Input() luxSubTitleProp: string;

  @ContentChild('luxSimpleContent', { static: false }) contentTempRef: TemplateRef<any>;
  @ContentChild('luxSimpleIcon', { static: false }) iconTempRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
