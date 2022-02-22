import { Component } from '@angular/core';
import { LuxDialogRef } from '../../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';

@Component({
  selector: 'lux-lux-file-delete-dialog',
  templateUrl: './lux-file-delete-dialog.component.html',
  styleUrls: ['./lux-file-delete-dialog.component.scss']
})
export class LuxFileDeleteDialogComponent {
  constructor(public luxDialogRef: LuxDialogRef) {}
}
