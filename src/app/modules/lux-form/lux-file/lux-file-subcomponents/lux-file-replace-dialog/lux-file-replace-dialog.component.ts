import { Component } from '@angular/core';
import { LuxDialogRef } from '../../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';

@Component({
  selector: 'lux-lux-file-replace-dialog',
  templateUrl: './lux-file-replace-dialog.component.html',
  styleUrls: ['./lux-file-replace-dialog.component.scss']
})
export class LuxFileReplaceDialogComponent {
  constructor(public luxDialogRef: LuxDialogRef) {}
}
