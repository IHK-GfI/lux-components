import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LuxDialogRef } from '../lux-dialog-model/lux-dialog-ref.class';
import { ILuxDialogPresetConfig } from '../lux-dialog-model/lux-dialog-preset-config.interface';

/**
 * Diese Component wird von dem LuxDialogService zur Darstellung via "open" genutzt und nimmt ein Konfig-Objekt
 * vom Typ LuxDialogConfig entgegen.
 */
@Component({
  selector: 'lux-dialog-preset',
  templateUrl: './lux-dialog-preset.component.html',
  styleUrls: ['./lux-dialog-preset.component.scss']
})
export class LuxDialogPresetComponent implements OnInit {
  data: ILuxDialogPresetConfig;

  constructor(public dialogRef: LuxDialogRef) {}

  ngOnInit() {
    this.data = this.dialogRef.data;
  }

  /**
   * Schließt den Dialog beim "positiven" Beenden des Dialogs mit dem Wert true.
   */
  onConfirmClick() {
    this.dialogRef.closeDialog(true);
  }

  /**
   * Schließt den Dialog beim "negativen" Beenden des Dialogs mit dem Wert false.
   */
  onDeclineClick() {
    this.dialogRef.closeDialog(false);
  }
}
