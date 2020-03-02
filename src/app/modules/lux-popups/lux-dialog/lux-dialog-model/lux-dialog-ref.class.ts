import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LuxDialogRef {
  private _matDialogRef: MatDialogRef<any>;
  private _dialogConfirmed: ReplaySubject<void> = new ReplaySubject(1);
  private _dialogDeclined: ReplaySubject<void> = new ReplaySubject(1);
  private _dialogClosed: ReplaySubject<any> = new ReplaySubject(1);
  private _data: any;

  /**
   * Gibt die Component, die in dem Dialog angezeigt wird wieder.
   */
  get componentInstance(): any {
    return this._matDialogRef.componentInstance;
  }

  /**
   * Damit hier ein Wert abgegeben wird, muss "closeDialog" ein Result mit dem Wert "true" übergeben bekommen.
   */
  get dialogConfirmed(): Observable<void> {
    return this._dialogConfirmed.asObservable();
  }

  /**
   * Damit hier ein Wert abgegeben wird, muss "closeDialog" ein Result mit dem Wert "false" übergeben bekommen.
   */
  get dialogDeclined(): Observable<void> {
    return this._dialogDeclined.asObservable();
  }

  /**
   * Wird bei Beenden des Dialogs ausgelöst.
   */
  get dialogClosed(): Observable<any> {
    return this._dialogClosed.asObservable();
  }

  /**
   * Enthält die Daten für die Dialog-Component.
   */
  get data(): any {
    return this._data;
  }

  constructor() {}

  /**
   * (Re-)Initialisiert diese Dialog-Referenz neu.
   * @param matDialogRef
   * @param data
   */
  init(matDialogRef: MatDialogRef<any>, data: any) {
    this._matDialogRef = matDialogRef;
    this._dialogConfirmed = new ReplaySubject(1);
    this._dialogDeclined = new ReplaySubject(1);
    this._dialogClosed = new ReplaySubject(1);
    this._data = data;
  }

  /**
   * Schließt den Dialog und gibt nach Beenden die entsprechenden Events aus.
   * @param result
   */
  closeDialog(result?: any) {
    this._matDialogRef.close(result);
    this._matDialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult === true) {
        this._dialogConfirmed.next();
      } else if (dialogResult === false) {
        this._dialogDeclined.next();
      }
      this._dialogClosed.next(result);
    });
  }
}
