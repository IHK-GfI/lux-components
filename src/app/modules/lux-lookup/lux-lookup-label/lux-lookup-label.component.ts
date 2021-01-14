import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxLookupParameters } from '../lux-lookup-model/lux-lookup-parameters';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-lookup-label',
  templateUrl: './lux-lookup-label.component.html'
})
export class LuxLookupLabelComponent implements OnInit, OnDestroy {
  lookupService: LuxLookupService;
  lookupHandler: LuxLookupHandlerService;
  logger: LuxConsoleService;
  lookupParameters: LuxLookupParameters;
  entry: LuxLookupTableEntry;
  subscriptions: Subscription[] = [];

  @Input() luxLookupKnr: number;
  @Input() luxLookupId: string;
  @Input() luxLookupUrl = '/lookup/';
  @Input() luxTableNo: string;
  @Input() luxTableKey: string;
  @Input() luxBezeichnung = 'kurz';

  constructor(
    lookupService: LuxLookupService,
    lookupHandler: LuxLookupHandlerService,
    luxConsoleLogger: LuxConsoleService
  ) {
    this.lookupService = lookupService;
    this.lookupHandler = lookupHandler;
    this.logger = luxConsoleLogger;
  }

  ngOnInit() {
    if (!this.luxLookupId) {
      console.error(
        'Das Lookup-Label mit der Tabellen-Nr. ${this.luxTableNo} besitzt keine LookupId.' +
          'Bitte tragen Sie diese nach.'
      );
    }

    if (!this.luxTableNo) {
      console.error(
        'Das Lookup-Label mit der LookupId ${this.luxLookupId} besitzt keine Tabellen-Nummer. ' +
          'Bitte tragen Sie diese nach.'
      );
    }

    if (!this.luxTableKey) {
      console.error(
        'Das Lookup-Label mit der Tabellen-Nr. ${this.luxTableNo} besitzt keinen Tabellen-Key.' +
          'Bitte tragen Sie diese nach.'
      );
    }

    this.fetchLookupData();

    this.lookupHandler.addLookupElement(this.luxLookupId);
    this.subscriptions.push(this.lookupHandler.getLookupElementObsv(this.luxLookupId).subscribe(() => {
      this.fetchLookupData();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected fetchLookupData() {
    const keys: string[] = [this.luxTableKey];

    this.lookupParameters = new LuxLookupParameters({ knr: this.luxLookupKnr, keys });

    this.subscriptions.push(this.lookupService
      .getLookupTable(this.luxTableNo, this.lookupParameters, this.luxLookupUrl)
      .subscribe((entries: LuxLookupTableEntry[]) => {
        if (typeof entries !== 'undefined' && entries.length === 1) {
          this.entry = entries[0];
        }
      }));
  }

  /**
   * liefert die Bezeichnung (Kurz- oder Langbezeichnung) des Entries für den Key zur Tabelle.
   *
   * @returns string
   */
  getBezeichnung(): string {
    let bezeichnung = '';

    if (this.entry) {
      if ('kurz' === this.luxBezeichnung) {
        bezeichnung = this.entry.kurzText;
      } else if ('lang' === this.luxBezeichnung) {
        bezeichnung = this.entry.langText1;

        if (!bezeichnung) {
          bezeichnung = this.entry.kurzText;
        }
      }
    }

    return bezeichnung;
  }
}
