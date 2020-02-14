import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-table-column-header',
  template: ''
})
export class LuxTableColumnHeaderComponent {
  @ContentChild(TemplateRef, { static: false }) tempRef: TemplateRef<any>;
}
