import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

/**
 * Diese Component stellt eine Grundstruktur für Dialoge dar und kann von Aufrufern als Alternative
 * zu LuxDialogPresetComponent genutzt werden (wenn andere Inhalte, etc. gewünscht sind).
 */
@Component({
  selector: 'lux-dialog-structure',
  templateUrl: './lux-dialog-structure.component.html',
  styleUrls: ['./lux-dialog-structure.component.scss']
})
export class LuxDialogStructureComponent implements OnInit, AfterViewInit {
  @ViewChild('dialogBase', { read: ElementRef, static: true }) dialogBase: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // den Fokus auf den Dialog selbst setzen (damit eine Tastatur-Steuerung von oben nach unten stattfinden kann)
    (<HTMLHeadingElement>this.dialogBase.nativeElement).focus();
  }
}
