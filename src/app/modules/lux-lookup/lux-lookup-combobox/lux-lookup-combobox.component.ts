import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, Optional, ViewChild } from '@angular/core';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { ControlContainer } from '@angular/forms';
import { LuxLookupComponent } from '../lux-lookup-model/lux-lookup-component';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupErrorStateMatcher } from '../lux-lookup-model/lux-lookup-error-state-matcher';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-lookup-combobox',
  templateUrl: './lux-lookup-combobox.component.html',
  styleUrls: ['./lux-lookup-combobox.component.scss']
})
export class LuxLookupComboboxComponent extends LuxLookupComponent implements AfterViewInit, OnDestroy {
  @Input() luxMultiple = false;
  @Input() luxEntryBlockSize = 25;
  @Input() luxWithEmptyEntry = true;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  @ViewChild(MatSelect) matSelect!: MatSelect;

  stateMatcher: LuxLookupErrorStateMatcher;
  displayedEntries: LuxLookupTableEntry[] = [];
  subscription?: Subscription;

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
    this.subscription =  this.matSelect.openedChange.subscribe((open: boolean) => {
      if (open) {
        this.registerPanelScrollEvent(this.matSelect.panel.nativeElement);
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscription?.unsubscribe();
  }

  /**
   * Vergleicht die Optionen anhand der Key-Werte
   *
   * @param value1
   * @param value2
   * @returns boolean
   */
  compareByKey(value1: LuxLookupTableEntry, value2: LuxLookupTableEntry) {
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
   *
   * @param $event
   */
  selected($event: MatSelectChange) {
    this.luxValue = $event.value;
  }

  /**
   * Fügt beim Öffnen des Selects einen Scroll-Listener hinzu.
   *
   * @param panelElement
   */
  private registerPanelScrollEvent(panelElement: Element) {
    panelElement.addEventListener('scroll', (event) => this.loadOnScroll(event));
  }

  /**
   * Stößt das Nachladen von Elementen an, wenn ein bestimmter Scrollwert erreicht wurde.
   *
   * @param event - ScrollEvent
   */
  private loadOnScroll(event: Event) {
    const position = event.target as any;
    if (position && (position.scrollTop + position.clientHeight) / position.scrollHeight > 85 / 100) {
      this.reloadNextDataBlock();
    }
  }

  /**
   * Läd den nächsten Block Daten aus den Entries nach.
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
