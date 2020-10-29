import { Injectable } from '@angular/core';
import { Nachricht, SaveNachrichtResult } from './lux-nachricht-model/lux-nachricht';
import { NachrichtService } from './lux-nachricht-services/lux-nachricht.service';
import { LuxDialogService } from '../lux-popups/lux-dialog/lux-dialog.service';
import { LuxSnackbarService } from '../lux-popups/lux-snackbar/lux-snackbar.service';

@Injectable()
export class LuxNachrichtController {

  dataSource: Nachricht[];

  constructor(private dialogService: LuxDialogService,
              private nachrichtService: NachrichtService,
              private snackbar: LuxSnackbarService) {
  }

  read(role: string, ihkNr: number, anwendungskuerzel: string): void {
    this.nachrichtService.readNachrichten(role, ihkNr, anwendungskuerzel).subscribe((nachrichten: Nachricht[]) => {
      this.dataSource = nachrichten;
    }, this.nachrichtService.defaultErrHandler);
  }

  create(entry: Nachricht): void {
    this.nachrichtService.createNachricht(entry).subscribe((saveNachrichtResult) => {
      this.dataSource = [];
      this.afterNachrichtSaved(saveNachrichtResult);
    }, this.nachrichtService.defaultErrHandler);
  }

  update(entry: Nachricht): void {
    this.nachrichtService.updateNachricht(entry).subscribe((saveNachrichtResult) => {
      this.afterNachrichtSaved(saveNachrichtResult);
    }, this.nachrichtService.defaultErrHandler);
  }

  delete(entry: Nachricht): void {
    const dialogRef = this.dialogService.open({
      title: 'Nachricht löschen?',
      content: 'Ihre Nachricht wird endgültig gelöscht. Das Löschen kann nicht rückgängig gemacht werden.',
      disableClose: true,
      width: 'auto',
      height: 'auto',
      confirmAction: {
        label: 'Löschen',
        raised: true,
        color: 'warn'
      },
      declineAction: {
        label: 'Abbrechen',
        raised: true,
      }
    });

    dialogRef.dialogConfirmed.subscribe((result: any) => {
      this.nachrichtService.deleteNachricht(entry.id).subscribe(() => {
        this.snackbar.openText('Nachricht wurde gelöscht.', 1000);
        this.dataSource = this.dataSource.filter(element => {
          return element.id !== entry.id;
        });
      }, this.nachrichtService.defaultErrHandler);
    });
  }

  afterNachrichtSaved(saveNachrichtResult: SaveNachrichtResult): void {
    let msg = 'Nachricht wurde gespeichert.';
    let duration = 2000;

    if (saveNachrichtResult.startTimeChanged) {
      msg += `Die Start-Uhrzeit lag in der Vergangenheit und wurde auf ${this.getTime(saveNachrichtResult.nachricht.validFrom)} Uhr gesetzt.`;
      duration = 6000;
    }

    this.snackbar.openText(msg, duration);
  }

  getTime(date: Date) {
    return this.fillTimeWithZero(date.getHours()) + ':' + this.fillTimeWithZero(date.getMinutes());
  }

  fillTimeWithZero(time: number): string {
    if (time < 10) {
      return '0' + time;
    }
    return '' + time;
  }
}
