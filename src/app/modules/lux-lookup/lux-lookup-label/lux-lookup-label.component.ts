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
  lookupParameters?: LuxLookupParameters;
  entry?: LuxLookupTableEntry;
  subscriptions: Subscription[] = [];

  init = false;
  _luxLookupKnr!: number;
  _luxTableKey!: string;
  _luxTableNo!: string;

  @Input() luxLookupId!: string;
  @Input() luxLookupUrl = '/lookup/';
  @Input() luxBezeichnung = 'kurz';

  @Input()
  get luxLookupKnr(): number {
    return this._luxLookupKnr;
  }

  set luxLookupKnr(knr: number) {
    const changed = knr !== this._luxLookupKnr;

    this._luxLookupKnr = knr;

    if (this.init && changed) {
      this.fetchLookupData();
    }
  }

  @Input()
  get luxTableNo(): string {
    return this._luxTableNo;
  }

  set luxTableNo(tableNo: string) {
    const changed = tableNo !== this._luxTableNo;

    this._luxTableNo = tableNo;

    if (this.init && changed) {
      this.fetchLookupData();
    }
  }

  @Input()
  get luxTableKey(): string {
    return this._luxTableKey;
  }

  set luxTableKey(key: string) {
    const changed = key !== this._luxTableKey;

    this._luxTableKey = key;

    if (this.init && changed) {
      this.fetchLookupData();
    }
  }

  constructor(lookupService: LuxLookupService, lookupHandler: LuxLookupHandlerService, luxConsoleLogger: LuxConsoleService) {
    this.lookupService = lookupService;
    this.lookupHandler = lookupHandler;
    this.logger = luxConsoleLogger;
  }

  ngOnInit() {
    if (!this.luxLookupKnr) {
      console.warn(`The lookup label with the table number ${this.luxLookupKnr} has no LookupKnr.`);
    }

    if (!this.luxLookupId) {
      console.warn(`The lookup label with the table number ${this.luxTableNo} has no LookupId.`);
    }

    if (!this.luxTableNo) {
      console.warn(`The lookup label with the LookupId ${this.luxLookupId} has no table number`);
    }

    if (!this.luxTableKey) {
      console.warn(`The lookup label with the table number ${this.luxTableNo} has no table key`);
    }

    this.fetchLookupData();

    this.lookupHandler.addLookupElement(this.luxLookupId);

    const lookupElementObs = this.lookupHandler.getLookupElementObsv(this.luxLookupId);
    if (!lookupElementObs) {
      throw Error(`Observable "${this.luxLookupId}" not found."`);
    }

    this.subscriptions.push(
      lookupElementObs.subscribe(() => {
        this.fetchLookupData();
      })
    );

    this.init = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected fetchLookupData() {
    if (this.isReadyToFetch()) {
      const keys: string[] = [this.luxTableKey];

      this.lookupParameters = new LuxLookupParameters({ knr: this.luxLookupKnr, keys });

      this.subscriptions.push(
        this.lookupService
          .getLookupTable(this.luxTableNo, this.lookupParameters, this.luxLookupUrl)
          .subscribe((entries: LuxLookupTableEntry[]) => {
            if (typeof entries !== 'undefined' && entries.length === 1) {
              this.entry = entries[0];
            }
          })
      );
    }
  }

  /**
   * liefert die Bezeichnung (Kurz- oder Langbezeichnung) des Entries für den Key zur Tabelle.
   * @returns string
   */
  getBezeichnung(): string {
    let bezeichnung;

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

    return bezeichnung ?? '';
  }

  private isReadyToFetch(): boolean {
    return !!this.luxLookupKnr && !!this.luxLookupId && !!this.luxTableNo && !!this.luxTableKey;
  }
}
