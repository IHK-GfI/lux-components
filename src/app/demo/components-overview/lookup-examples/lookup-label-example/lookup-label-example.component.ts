import { Component, OnInit, ViewChild } from '@angular/core';
import { MockLuxLookupService } from '../mock-lookup-service';
import { LuxLookupLabelComponent } from '../../../../modules/lux-lookup/lux-lookup-label/lux-lookup-label.component';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-lookup-label-example',
  templateUrl: './lookup-label-example.component.html',
  styleUrls: ['./lookup-label-example.component.scss']
})
export class LookupLabelExampleComponent implements OnInit {
  @ViewChild(LuxLookupLabelComponent, { static: true }) lookupLabelComponent: LuxLookupLabelComponent;
  originalService: any = null;
  useMock: boolean = false;

  knr: number = 101;
  tableKey: number = 4;
  tableNo: number = 1002;
  bezeichnung: string = 'kurz';

  constructor(private lookupHandler: LuxLookupHandlerService, private snackbar: LuxSnackbarService) {}

  ngOnInit() {}

  start() {
    this.lookupHandler.reloadData('label-example');
    if (this.useMock) {
      this.showSnackbar('Mock-Daten geladen.');
    }
  }

  showSnackbar(text: string, action: string = 'OK') {
    this.snackbar.open(3000, {
      text: text,
      action: action,
      actionColor: 'accent'
    });
  }

  /**
   * Überschreibt/Resettet den Lookup-Service mit einer Mock-Implementierung um eigene Daten zu laden.
   * @param $event
   */
  changeUseMock($event) {
    if ($event) {
      this.originalService = this.lookupLabelComponent.lookupService;
      this.lookupLabelComponent.lookupService = new MockLuxLookupService(null);
    } else {
      this.lookupLabelComponent.lookupService = this.originalService;
      this.originalService = null;
    }

    this.useMock = $event;
  }
}
