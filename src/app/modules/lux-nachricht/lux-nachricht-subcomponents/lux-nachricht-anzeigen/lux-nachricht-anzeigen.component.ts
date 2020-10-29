import { Component, OnInit } from '@angular/core';
import { Nachricht, Empfaenger } from '../../lux-nachricht-model/lux-nachricht';
import { LuxDialogRef } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';

@Component({
  selector: 'lux-nachricht-anzeigen',
  templateUrl: './lux-nachricht-anzeigen.component.html',
  styleUrls: ['lux-nachricht-anzeigen.component.scss'],
})
export class LuxNachrichtAnzeigenComponent implements OnInit {

  private nachricht: Nachricht = null;

  constructor(public luxDialogRef: LuxDialogRef) {
  }

  ngOnInit() {
    this.nachricht = this.luxDialogRef.data.nachricht;
  }

  confirm(): void {
    this.luxDialogRef.closeDialog(true);
  }

}
