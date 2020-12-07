import { Component, OnInit } from '@angular/core';
import { Nachricht } from '../../lux-nachricht-model/lux-nachricht-model';
import { LuxDialogRef } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';
import { LuxSanitizeConfig } from '../../../lux-html/lux-sanitize/lux-sanitize-config';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-nachricht-anzeigen',
  templateUrl: './lux-nachricht-anzeigen.component.html',
  styleUrls: ['lux-nachricht-anzeigen.component.scss'],
})
export class LuxNachrichtAnzeigenComponent implements OnInit {

  sanitizeConfig: LuxSanitizeConfig;
  nachricht: Nachricht = null;
  isIE = LuxUtil.isIE();

  constructor(public luxDialogRef: LuxDialogRef) {
  }

  ngOnInit() {
    this.nachricht = this.luxDialogRef.data.nachricht;
    this.sanitizeConfig = {
      allowedTags: ['a']
    };
  }

  confirm(): void {
    this.luxDialogRef.closeDialog(true);
  }

}
