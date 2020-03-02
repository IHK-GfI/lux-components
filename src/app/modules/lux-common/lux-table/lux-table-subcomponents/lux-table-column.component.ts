import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LuxTableColumnHeaderComponent } from './lux-table-column-header.component';
import { LuxTableColumnContentComponent } from './lux-table-column-content.component';
import { LuxTableColumnFooterComponent } from './lux-table-column-footer.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'lux-table-column',
  template:
    '<ng-content select="lux-table-column-header"></ng-content>' +
    '<ng-content select="lux-table-column-content"></ng-content>' +
    '<ng-content select="lux-table-column-footer"></ng-content>'
})
export class LuxTableColumnComponent implements OnInit, OnChanges {
  change$: Subject<void> = new Subject<void>();

  @Input() luxColumnDef: string = undefined;
  @Input() luxSortable: boolean = false;
  @Input() luxSticky: boolean = false;
  @Input() luxResponsiveBehaviour: string;
  @Input() luxResponsiveAt: string | string[];

  @ContentChild(LuxTableColumnHeaderComponent) header: LuxTableColumnHeaderComponent;
  @ContentChild(LuxTableColumnContentComponent) content: LuxTableColumnContentComponent;
  @ContentChild(LuxTableColumnFooterComponent) footer: LuxTableColumnFooterComponent;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.change$.next();
  }
}
