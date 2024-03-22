import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LuxUtil } from '../../../lux-util/lux-util';
import { LuxDialogRef } from '../lux-dialog-model/lux-dialog-ref.class';

/**
 * Diese Component stellt eine Grundstruktur für Dialoge dar und kann von Aufrufern als Alternative
 * zu LuxDialogPresetComponent genutzt werden (wenn andere Inhalte, etc. gewünscht sind).
 */
@Component({
  selector: 'lux-dialog-structure',
  templateUrl: './lux-dialog-structure.component.html'
})
export class LuxDialogStructureComponent implements OnInit, AfterViewInit {
  @ViewChild('dialogBase', { read: ElementRef, static: true }) dialogBase!: ElementRef;

  disableClose!: boolean;

  private _iconName = '';
  @Input() set luxDialogIcon(name: string | undefined) {
    if (name) this._iconName = name;
  }
  get luxDialogIcon() {
    return this._iconName;
  }

  constructor(private luxDialogRef: LuxDialogRef<any>) {}

  ngOnInit() {
    this.disableClose = this.luxDialogRef?._matDialogRef?.disableClose ?? false;
  }

  ngAfterViewInit() {
    LuxUtil.assertNonNull('dialogBase', this.dialogBase);

    // den Fokus auf den Dialog selbst setzen (damit eine Tastatur-Steuerung von oben nach unten stattfinden kann)
    (this.dialogBase.nativeElement as HTMLHeadingElement).focus();
  }

  onClose() {
    console.log('####DIALOG-CLOSE');
    this.luxDialogRef.closeDialog();
  }
}
