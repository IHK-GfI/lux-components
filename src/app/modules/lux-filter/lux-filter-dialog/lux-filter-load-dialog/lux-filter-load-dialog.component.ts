import { Component, OnInit } from '@angular/core';
import { LuxDialogRef } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';
import { LuxFilter } from '../../lux-filter-base/lux-filter';
import { LuxFilterFormComponent } from '../../lux-filter-form/lux-filter-form.component';

@Component({
  selector: 'lux-filter-load-dialog',
  templateUrl: './lux-filter-load-dialog.component.html',
  styleUrls: ['./lux-filter-load-dialog.component.scss']
})
export class LuxFilterLoadDialogComponent implements OnInit {
  filterArr: LuxFilter[];
  component: LuxFilterFormComponent;

  constructor(public luxDialogRef: LuxDialogRef) {}

  ngOnInit(): void {
    this.component = this.luxDialogRef.data;
    this.filterArr = this.component.luxStoredFilters;
  }

  onDelete(index: number) {
    const deletedFilter = this.filterArr.splice(index, 1)[0];
    this.component.onDelete(deletedFilter);
  }
}
