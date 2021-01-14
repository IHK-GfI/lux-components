import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LuxDialogRef } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';
import { LuxInputComponent } from '../../../lux-form/lux-input/lux-input.component';

@Component({
  selector: 'lux-filter-save-dialog',
  templateUrl: './lux-filter-save-dialog.component.html',
  styleUrls: ['./lux-filter-save-dialog.component.scss']
})
export class LuxFilterSaveDialogComponent implements AfterViewInit {
  @ViewChild(LuxInputComponent) filterNameComponent: LuxInputComponent;

  constructor(public luxDialogRef: LuxDialogRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.filterNameComponent) {
        this.filterNameComponent.inputElement.nativeElement.focus();
      }
    });
  }
}
