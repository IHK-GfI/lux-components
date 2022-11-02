import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LuxUtil } from '../../../lux-util/lux-util';

/**
 * Diese Component stellt eine Grundstruktur für Dialoge dar und kann von Aufrufern als Alternative
 * zu LuxDialogPresetComponent genutzt werden (wenn andere Inhalte, etc. gewünscht sind).
 */
@Component({
  selector: 'lux-dialog-structure',
  templateUrl: './lux-dialog-structure.component.html',
  styleUrls: ['./lux-dialog-structure.component.scss']
})
export class LuxDialogStructureComponent implements AfterViewInit {
  @ViewChild('dialogBase', { read: ElementRef, static: true }) dialogBase!: ElementRef;
  
  private _iconName = '';
  @Input() set luxDialogIcon(name: string | undefined) {
    if (name)
      this._iconName = name;
  }
  get luxDialogIcon() {
    return this._iconName;
  }
  
  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('dialogBase', this.dialogBase);

    // den Fokus auf den Dialog selbst setzen (damit eine Tastatur-Steuerung von oben nach unten stattfinden kann)
    (this.dialogBase.nativeElement as HTMLHeadingElement).focus();
  }
}
