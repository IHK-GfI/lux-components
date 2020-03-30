import { AfterViewInit, ChangeDetectorRef, Component, Input, Optional, ViewChild } from '@angular/core';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { ControlContainer } from '@angular/forms';
import { LuxLookupComponent } from '../lux-lookup-model/lux-lookup-component';
import { MatSelect, MatSelectChange } from '@angular/material';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupErrorStateMatcher } from '../lux-lookup-model/lux-lookup-error-state-matcher';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-lookup-combobox',
  templateUrl: './lux-lookup-combobox.component.html',
  styleUrls: ['./lux-lookup-combobox.component.scss']
})
export class LuxLookupComboboxComponent extends LuxLookupComponent implements AfterViewInit {
  @Input() luxMultiple: boolean = false;
  @Input() luxEntryBlockSize: number = 25;
  @Input() luxWithEmptyEntry: boolean = true;

  displayedEntries: LuxLookupTableEntry[];
  @ViewChild(MatSelect, { static: false }) matSelect: MatSelect;

  constructor(
    lookupService: LuxLookupService,
    lookupHandler: LuxLookupHandlerService,
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    componentsConfigService: LuxComponentsConfigService
  ) {
    super(lookupService, lookupHandler, controlContainer, cdr, logger, componentsConfigService);

    this.stateMatcher = new LuxLookupErrorStateMatcher(this);
  }

  ngAfterViewInit() {
    this.matSelect.openedChange.subscribe((open: boolean) => {
      if (open) {
        this.registerPanelScrollEvent(this.matSelect.panel.nativeElement);
      }
    });
  }

  /**
   * Vergleicht die Optionen anhand der Key-Werte
   * @param value1
   * @param value2
   * @returns boolean
   */
  compareByKey(value1, value2) {
    const key1 = value1 ? value1.key : -1;
    const key2 = value2 ? value2.key : -2;

    return key1 === key2;
  }

  setLookupData(entries: LuxLookupTableEntry[]) {
    super.setLookupData(entries);
    if (this.entries.length > this.luxEntryBlockSize) {
      this.displayedEntries = this.entries.splice(0, this.luxEntryBlockSize);
    } else {
      this.displayedEntries = [...this.entries];
    }
  }

  /**
   * Setzt den aktuellen Value-Wert auf den ausgewählten Wert.
   * @param $event
   */
  selected($event: MatSelectChange) {
    this.luxValue = $event.value;
  }

  /**
   * Fuegt beim Oeffnen des Selects einen Scrolllistener hinzu.
   */
  private registerPanelScrollEvent(panelElement) {
    panelElement.addEventListener('scroll', event => this.loadOnScroll(event));
  }

  /**
   * Stoesst das Nachladen von Elementen an, wenn ein bestimmter Scrollwert erreicht wurde.
   * @param event - ScrollEvent
   */
  private loadOnScroll(event) {
    const position = event.target;
    if ((position.scrollTop + position.clientHeight) / position.scrollHeight > 85 / 100) {
      this.reloadNextDataBlock();
    }
  }

  /**
   * Laed den naechsten Block Daten aus den Entries nach.
   */
  private reloadNextDataBlock() {
    const start = this.displayedEntries.length - 1;
    const end =
      start + this.luxEntryBlockSize > this.entries.length
        ? this.entries.length - start
        : start + this.luxEntryBlockSize;
    this.displayedEntries.push(...this.entries.splice(start, end));
  }
}
