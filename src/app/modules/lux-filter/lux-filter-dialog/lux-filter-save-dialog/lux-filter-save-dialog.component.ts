import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LuxDialogRef } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';
import { LuxInputComponent } from '../../../lux-form/lux-input/lux-input.component';

@Component({
  selector: 'lux-lux-filter-save-dialog',
  templateUrl: './lux-filter-save-dialog.component.html',
  styleUrls: ['./lux-filter-save-dialog.component.scss']
})
export class LuxFilterSaveDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(LuxInputComponent) filterNameComponent: LuxInputComponent;

  constructor(public luxDialogRef: LuxDialogRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.filterNameComponent) {
        this.filterNameComponent.inputElement.nativeElement.focus();
      }
    });
  }
}
