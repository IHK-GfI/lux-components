import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from "@angular/core";
import { LuxValidationErrors } from "../../lux-form/lux-form-model/lux-form-component-base.class";
import { LuxLookupComponent } from '../lux-lookup-model/lux-lookup-component';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { LuxAutocompleteErrorStateMatcher } from './lux-autocomplete-error-state-matcher';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-lookup-autocomplete',
  templateUrl: './lux-lookup-autocomplete.component.html',
  styleUrls: ['./lux-lookup-autocomplete.component.scss']
})
export class LuxLookupAutocompleteComponent extends LuxLookupComponent implements OnInit, AfterViewInit {
  filteredEntries: Observable<LuxLookupTableEntry[]>;
  entriesCount: number;
  latestSearchValue: string;

  @Input() luxDebounceTime = 250;
  @Input() luxMaximumDisplayed = 50;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;
  @Input() luxOptionMultiline = true;

  @Output() luxBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxFocus: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) matAutocompleteTrigger: MatAutocompleteTrigger;

  constructor(
    lookupService: LuxLookupService,
    lookupHandler: LuxLookupHandlerService,
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    componentsConfigService: LuxComponentsConfigService
  ) {
    super(lookupService, lookupHandler, controlContainer, cdr, logger, componentsConfigService);

    this.stateMatcher = new LuxAutocompleteErrorStateMatcher(this, this.entries);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    super.ngOnInit();
    this.filteredEntries = this.formControl.valueChanges.pipe(
      debounceTime(this.luxDebounceTime),
      distinctUntilChanged(),
      startWith<string | LuxLookupTableEntry>(''),
      map((value: any) => {
        const searchValue = typeof value === 'string' ? value : this.displayFn(value);
        this.latestSearchValue = searchValue;
        let filteredValues = searchValue ? this.filter(searchValue) : this.entries ? this.entries.slice() : [];
        this.entriesCount = filteredValues.length;
        if (this.entriesCount > this.luxMaximumDisplayed) {
          filteredValues = filteredValues.splice(0, this.luxMaximumDisplayed);
        }
        return filteredValues;
      })
    );
  }

  /**
   * Vergleicht den eingegebenen Wert mit den Display-Werten der Einträge.
   *
   * @param filterTerm
   * @returns LuxLookupTableEntry[]
   */
  filter(filterTerm: any): LuxLookupTableEntry[] {
    return this.entries.filter((option) => {
      const compareValue = this.displayFn(option);
      return compareValue.trim().toLowerCase().indexOf(filterTerm.trim().toLowerCase()) > -1;
    });
  }

  /**
   * Bestimmt wie eingegebene Optionen dargestellt werden.
   *
   * @param option
   * @returns string
   */
  displayFn(option: LuxLookupTableEntry): string {
    if (typeof option === 'string') {
      return option;
    } else if (this.isRenderPropAFunction()) {
      return (this.luxRenderProp as (currentOption) => string)(option);
    } else if (option) {
      return option[this.luxRenderProp as string] ? option[this.luxRenderProp as string] : 'Fehler beim Auslesen (Property unbekannt)';
    } else {
      return '';
    }
  }

  /**
   * Wird beim Klick auf das Input Feld aufgerufen.
   *
   * @param clickEvent
   */
  onClick(clickEvent: any) {
    clickEvent.target.setSelectionRange(0, clickEvent.target.value.length);
    // Beim Klick wenn kein Wert gesetzt ist, das Panel oeffnen
    if (!this.luxValue) {
      this.matAutocompleteTrigger._onChange('');
      this.matAutocompleteTrigger.openPanel();
    }
  }

  /**
   * Setzt den aktuellen Value-Wert auf den ausgewählten Wert.
   *
   * @param MatAutocompleteSelectedEvent $event
   * @param $event
   */
  selected($event: MatAutocompleteSelectedEvent) {
    this.luxValue = $event.option.value;
    if (this.inForm) {
      this.formControl.setValue(this.luxValue);
    }
  }

  /**
   * @override
   * @param value
   * @param errors
   */
  errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    const msg = super.errorMessageModifier(value, errors);
    if (msg) {
      return msg;
    }

    if (errors['noResult']) {
      // eslint-disable-next-line max-len
      return $localize`:@@luxc.lookup-autocomplete.error_message.not_available:Der eingegebene Eintrag ist nicht Teil der Schlüsseltabelle.`;
    }
    return undefined;
  }
}
