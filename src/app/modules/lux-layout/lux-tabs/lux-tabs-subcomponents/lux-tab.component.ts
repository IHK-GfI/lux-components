import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-tab',
  template: ''
})
export class LuxTabComponent implements OnInit {
  @Input() luxTitle: string;
  @Input() luxIconName: string;
  @Input() luxCounter: number;
  @Input() luxCounterCap: number = 10;
  @Input() luxShowNotification;
  @Input() luxDisabled: boolean = false;
  @Input() luxTagIdHeader: string;
  @Input() luxTagIdContent: string;

  @ContentChild(TemplateRef, { static: false }) contentTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
