import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LuxButtonComponent } from '../../../lux-action/lux-button/lux-button.component';
import { LuxDialogRef } from '../lux-dialog-model/lux-dialog-ref.class';
import { ILuxDialogPresetConfig } from '../lux-dialog-model/lux-dialog-preset-config.interface';

/**
 * Diese Component wird von dem LuxDialogService zur Darstellung via "open" genutzt und nimmt ein Config-Objekt
 * vom Typ LuxDialogConfig entgegen.
 */
@Component({
  selector: 'lux-dialog-preset',
  templateUrl: './lux-dialog-preset.component.html',
  styleUrls: ['./lux-dialog-preset.component.scss']
})
export class LuxDialogPresetComponent implements OnInit, AfterViewInit {
  @ViewChild('confirmButton') confirmButton?: LuxButtonComponent;
  @ViewChild('declineButton') declineButton?: LuxButtonComponent;

  data?: ILuxDialogPresetConfig;
  defaultButton?: LuxButtonComponent;

  constructor(public dialogRef: LuxDialogRef<ILuxDialogPresetConfig>) {}

  ngOnInit() {
    this.data = this.dialogRef.data;
  }

  ngAfterViewInit() {
    this.initDefaultButton();

    setTimeout(() => {
      (this.defaultButton?.elementRef?.nativeElement as HTMLElement)?.querySelector('button')?.focus();
    });
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

  private initDefaultButton() {
    switch (this.data?.defaultButton) {
      case 'confirm':
        this.defaultButton = this.confirmButton;
        break;
      case 'decline':
        this.defaultButton = this.declineButton;
        break;
      default:
        this.defaultButton = undefined;
    }
  }
}
