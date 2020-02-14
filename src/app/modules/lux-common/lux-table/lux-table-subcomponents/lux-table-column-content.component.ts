import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-table-column-content',
  template: ''
})
export class LuxTableColumnContentComponent {
  @ContentChild(TemplateRef, { static: false }) tempRef: TemplateRef<any>;
}
