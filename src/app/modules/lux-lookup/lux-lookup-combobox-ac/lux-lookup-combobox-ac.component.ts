import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, Optional, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxLookupComponent } from '../lux-lookup-model/lux-lookup-component';
import { LuxLookupErrorStateMatcher } from '../lux-lookup-model/lux-lookup-error-state-matcher';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';

@Component({
  selector: 'lux-lookup-combobox-ac',
  templateUrl: './lux-lookup-combobox-ac.component.html',
  styleUrls: ['./lux-lookup-combobox-ac.component.scss']
})
export class LuxLookupComboboxAcComponent<T = LuxLookupTableEntry> extends LuxLookupComponent<T> implements AfterViewInit, OnDestroy {
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

    this.updateDisplayedEntries();
  }

  /**
   * Setzt den aktuellen Value-Wert auf den ausgewählten Wert.
   *
   * @param selectChange
   */
  selected(selectChange: MatSelectChange) {
    this.luxValue = selectChange.value;
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
      this.updateDisplayedEntries();
    }
  }

  /**
   * Läd den nächsten Block Daten aus den Entries nach.
   */
  private updateDisplayedEntries() {
    if (this.entries.length > 0) {
      const start = 0;
      const end = Math.min(this.luxEntryBlockSize, this.entries.length);
      this.displayedEntries.push(...this.entries.splice(start, end));
    }
  }
}
