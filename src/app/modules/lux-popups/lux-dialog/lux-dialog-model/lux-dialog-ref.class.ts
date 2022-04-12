import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable, ReplaySubject } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LuxDialogRef {
  _matDialogRef: MatDialogRef<any>;
  _dialogConfirmed: ReplaySubject<void> = new ReplaySubject(1);
  _dialogDeclined: ReplaySubject<void> = new ReplaySubject(1);
  _dialogClosed: ReplaySubject<any> = new ReplaySubject(1);
  _data: any;

  refs: {
    matDialogRef: MatDialogRef<any>;
    dialogConfirmed: ReplaySubject<void>;
    dialogDeclined: ReplaySubject<void>;
    dialogClosed: ReplaySubject<void>;
    data: any;
  }[] = [];

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
   *
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
   * Wenn man innerhalb eines Dialogs einen anderen Dialog (z.B. für Hilfetexte)
   * öffnen möchte, kann man über diese Methode die Referenz inklusive aller
   * benötigten Informationen des aktuell angezeigten Dialogs zwischenspeichern.
   * Nach dem der Hilfedialog geschlossen wurde, kann über die restoreDialogRef-
   * Methode die vorherige Dialogreferenz wiederhergestellt werden.
   */
  storeDialogRef() {
    this.refs.push({
      matDialogRef: this._matDialogRef,
      dialogConfirmed: this._dialogConfirmed,
      dialogDeclined: this._dialogDeclined,
      dialogClosed: this._dialogClosed,
      data: this._data
    });
  }

  /**
   * Siehe storeDialogRef-Methode.
   */
  restoreDialogRef() {
    let last = this.refs.pop();

    if (last) {
      this._matDialogRef    = last.matDialogRef;
      this._dialogConfirmed = last.dialogConfirmed;
      this._dialogDeclined  = last.dialogDeclined;
      this._dialogClosed    = last.dialogClosed;
      this._data            = last.data;
    }
  }

  /**
   * Schließt den Dialog und gibt nach Beenden die entsprechenden Events aus.
   *
   * @param result
   */
  closeDialog(result?: any) {
    this._matDialogRef.close(result);
    this._matDialogRef.afterClosed().pipe(take(1)).subscribe((dialogResult: any) => {
      if (dialogResult === true) {
        this._dialogConfirmed.next();
      } else if (dialogResult === false) {
        this._dialogDeclined.next();
      }
      this._dialogClosed.next(result);
    });
  }
}
