import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-detail-view',
  template: '',
  styles: ['']
})
export class LuxDetailViewComponent implements OnInit {
  @ContentChild(TemplateRef) tempRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
