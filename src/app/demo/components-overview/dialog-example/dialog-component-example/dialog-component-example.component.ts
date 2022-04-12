import { Component } from '@angular/core';
import { ILuxDialogPresetConfig } from '../../../../modules/lux-popups/lux-dialog/lux-dialog-model/lux-dialog-preset-config.interface';
import { LuxDialogRef } from '../../../../modules/lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';
import { LuxDialogService } from '../../../../modules/lux-popups/lux-dialog/lux-dialog.service';

@Component({
  selector: 'app-dialog-component-example',
  templateUrl: './dialog-component-example.component.html',
  styleUrls: ['./dialog-component-example.component.scss']
})
export class DialogComponentExampleComponent {
  dialogConfig: ILuxDialogPresetConfig = {
    title: 'Info',
    content: 'Hier könnte ein Hilfetext stehen. ',
    disableClose: true,
    width: 'auto',
    height: 'auto',
    panelClass: [],
    confirmAction: {
      label: 'Ok',
      raised: true,
      color: 'primary'
    }
  };

  constructor(public luxDialogRef: LuxDialogRef, private dialogService: LuxDialogService) {}

  openInfoDialog() {
    // Die Referenz des aktuell angezeigten Dialogs wird gespeichert.
    this.dialogService.storeDialogRef();

    // Jetzt kann der Hilfedialog innerhalb des bereits geöffneten
    // Dialogs angezeigt werden.
    const dialogRef = this.dialogService.open(this.dialogConfig);

    dialogRef.dialogClosed.subscribe((result: any) => {
      // Nach dem Schließen des Hilfedialogs wird die Referenz
      // des ursprünglichen Dialogs wiederhergestellt.
      this.dialogService.restoreDialogRef();
    });
  }
}
