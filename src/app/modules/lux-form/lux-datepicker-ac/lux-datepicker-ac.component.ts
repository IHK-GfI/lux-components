import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { LuxThemeService } from '../../lux-theme/lux-theme.service';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxValidationErrors } from '../lux-form-model/lux-form-component-base.class';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxDatepickerAcAdapter } from './lux-datepicker-ac-adapter';
import { LuxDatepickerAcCustomHeaderComponent } from './lux-datepicker-ac-custom-header/lux-datepicker-ac-custom-header.component';

export const APP_DATE_FORMATS_AC = {
  parse: {
    dateInput: { month: '2-digit', year: 'numeric', day: '2-digit' }
  },
  display: {
    dateInput: { month: '2-digit', year: 'numeric', day: '2-digit' },
    monthYearLabel: { year: 'numeric', month: 'long' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

export declare type LuxDateFilterAcFn = (date: Date | null) => boolean;
export declare type LuxStartAcView = 'month' | 'year' | 'multi-year';

@Component({
  selector: 'lux-datepicker-ac',
  templateUrl: './lux-datepicker-ac.component.html',
  providers: [
    { provide: DateAdapter, useClass: LuxDatepickerAcAdapter, deps: [MAT_DATE_LOCALE, Platform] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS_AC }
  ]
})
export class LuxDatepickerAcComponent<T = any> extends LuxFormInputBaseClass<T> implements OnInit, OnChanges, OnDestroy {
  private originalTouchUi = false;
  private mediaSubscription?: Subscription;
  private previousISO?: string;
  min: Date | null = null;
  max: Date | null = null;
  start: Date | null = null;
  focused = false;
  _luxCustomFilter: LuxDateFilterAcFn = () => true;

  @Input() luxStartView: LuxStartAcView = 'month';
  @Input() luxTouchUi = false;
  @Input() luxOpened = false;
  @Input() luxStartDate: string | null = null;
  @Input() luxShowToggle = true;
  @Input() luxLocale = 'de-DE';
  @Input() luxMaxDate: string | null = null;
  @Input() luxMinDate: string | null = null;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  @ViewChild(MatDatepicker) matDatepicker?: MatDatepicker<any>;
  @ViewChild('datepickerInput', { read: ElementRef }) datepickerInput?: ElementRef;

  get luxCustomFilter() {
    return this._luxCustomFilter;
  }

  @Input()
  set luxCustomFilter(customFilterFn: LuxDateFilterAcFn | undefined) {
    this._luxCustomFilter = customFilterFn ?? (() => true);
  }

  get luxValue(): T {
    return this.getValue();
  }

  @Input() set luxValue(value: T) {
    this.setValue(value);
  }

  constructor(
    @Optional() controlContainer: ControlContainer,
    private dateAdapter: DateAdapter<Date>,
    private mediaObserver: LuxMediaQueryObserverService,
    private elementRef: ElementRef,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService,
    private themeService: LuxThemeService
  ) {
    super(controlContainer, cdr, logger, config);
    // den Standard-Wert für Autocomplete für Datepicker ausschalten
    this.luxAutocomplete = 'off';
    this.dateAdapter.setLocale(this.luxLocale);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxOpened) {
      // Eventuell gibt es ohne das Timeout sonst Fehler, weil der matDatepicker noch nicht gesetzt ist
      setTimeout(() => {
        this.triggerOpenClose();
      });
    }
    if (simpleChanges.luxLocale && simpleChanges.luxLocale.currentValue) {
      this.dateAdapter.setLocale(simpleChanges.luxLocale.currentValue);
    }
    if (simpleChanges.luxMaxDate && typeof simpleChanges.luxMaxDate.currentValue === 'string') {
      this.max = this.dateAdapter.parse(simpleChanges.luxMaxDate.currentValue, {});
    }
    if (simpleChanges.luxMinDate && typeof simpleChanges.luxMinDate.currentValue === 'string') {
      this.min = this.dateAdapter.parse(simpleChanges.luxMinDate.currentValue, {});
    }
    if (simpleChanges.luxStartDate && typeof simpleChanges.luxStartDate.currentValue === 'string') {
      this.start = this.dateAdapter.parse(simpleChanges.luxStartDate.currentValue, {});
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.originalTouchUi = this.luxTouchUi;
    this.mediaSubscription = this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
      this.checkMediaObserver();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  /**
   * Erzeugt für die Unter- bzw. Überschreitung
   * @param value
   * @param errors
   */
  errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    if (errors.matDatepickerMin) {
      return $localize`:@@luxc.datepicker.error_message.min:Das Datum unterschreitet den Minimalwert`;
    } else if (errors.matDatepickerMax) {
      return $localize`:@@luxc.datepicker.error_message.max:Das Datum überschreitet den Maximalwert`;
    } else if (errors.matDatepickerParse) {
      return $localize`:@@luxc.datepicker.error_message.invalid:Das Datum ist ungültig`;
    } else if (errors.required) {
      if (this.datepickerInput && this.datepickerInput.nativeElement.value) {
        return $localize`:@@luxc.datepicker.error_message.invalid:Das Datum ist ungültig`;
      } else {
        return $localize`:@@luxc.datepicker.error_message.empty:Das Datum darf nicht leer sein`;
      }
    }

    return undefined;
  }

  onFocus(e: FocusEvent) {
    this.focused = true;
    this.luxFocus.emit(e);
  }

  onFocusIn(e: FocusEvent) {
    this.focused = true;
    this.luxFocusIn.emit(e);
  }

  onFocusOut(e: FocusEvent) {
    this.focused = false;
    this.luxFocusOut.emit(e);
  }

  descripedBy() {
    if (this.errorMessage) {
      return this.uid + '-error';
    } else {
      return (this.formHintComponent || this.luxHint) && (!this.luxHintShowOnlyOnFocus || (this.luxHintShowOnlyOnFocus && this.focused))
        ? this.uid + '-hint'
        : undefined;
    }
  }

  /**
   * Checkt, ob eine mobile Media-Query vorliegt.
   * Wenn ja, wird automatisch die TouchUI aktiviert.
   * Wenn nein, wird der vom Aufrufer/originale luxTouchUI-Wert genutzt.
   */
  private checkMediaObserver() {
    if (this.mediaObserver.isXS() || this.mediaObserver.isSM()) {
      this.luxTouchUi = true;
    } else {
      this.luxTouchUi = this.originalTouchUi;
    }
  }

  /**
   * Führt .open() bzw. .close() vom MatDatepicker aus, abhängig vom Wert für luxOpened.
   */
  private triggerOpenClose() {
    if (this.luxOpened) {
      this.matDatepicker?.open();
    } else {
      this.matDatepicker?.close();
    }
  }

  /**
   * Aktualisiert den FormControl-Value und den Wert im Parent über valueChange mithilfe des übergebenen ISO-Strings.
   * @param isoValue
   */
  private setISOValue(isoValue: string) {
    setTimeout(() => {
      this.previousISO = isoValue;

      let minOk = true;
      if (this.min && isoValue && this.dateAdapter.compareDate(new Date(isoValue), this.min) < 0) {
        minOk = false;
      }

      let maxOk = true;
      if (this.max && isoValue && this.dateAdapter.compareDate(new Date(isoValue), this.max) > 0) {
        maxOk = false;
      }

      // Der valueChange-Emitter wird nur anstoßen, wenn das Datum innerhalb der Grenzen (min und max) liegt.
      if (minOk && maxOk) {
        this.notifyFormValueChanged(isoValue);
      }

      // "silently" den FormControl auf den (potenziell) geänderten Wert aktualisieren
      this.formControl.setValue(isoValue as any, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      });

      // Per Hand dem Input-Element einen formatierten String übergeben
      if (this.datepickerInput && !this.datepickerInput.nativeElement.value && isoValue) {
        this.datepickerInput.nativeElement.value = this.dateAdapter.format(isoValue as any, APP_DATE_FORMATS_AC.display.dateInput);
      }
    });
  }

  protected setValue(value: any) {
    if (value !== this.luxValue) {
      if (!this.formControl) {
        this._initialValue = value;
        return;
      }
      this.formControl.setValue(value);
    }
  }

  protected initFormValueSubscription() {
    // Aktualisierungen an dem FormControl-Value sollen auch via EventEmitter bekannt gemacht werden
    this._formValueChangeSub = this.formControl.valueChanges.subscribe((value: any) => {
      this.updateDateValue(value);
    });

    if (this.formControl.value) {
      // Es kann vorkommen, dass der initiale Wert nicht im ISO-Format angegeben ist.
      // Dann muss der Wert noch umgewandelt werden.
      this.updateDateValue(this.formControl.value);
    } else if (this._initialValue !== null && this._initialValue !== undefined) {
      // Vorhandenen Initialwert setzen
      this.formControl.setValue(this._initialValue);
    }
  }

  private updateDateValue(value: any) {
    if (!value) {
      this.setISOValue(value);
      return;
    }

    // Nachfolgend erstellen
    if (typeof value === 'string') {
      value = this.dateAdapter.parse(value, {});
    }

    const eventDate: Date = value;
    const tempDate = new Date(0);
    tempDate.setUTCFullYear(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    tempDate.setUTCHours(0, 0, 0, 0);

    // Sicherheitshalber noch einmal prüfen, kann vorkommen das ein unsinniger Wert eingetragen wird
    // z.B. 'asdf', das führt zu InvalidDate's
    if (LuxUtil.isDate(tempDate) && this.previousISO !== tempDate.toISOString()) {
      this.setISOValue(tempDate.toISOString());
    }
  }

  // für dem Customheader für das "Green"-Theme
  getHeaderByTheme(): any {
    const customHeader = LuxDatepickerAcCustomHeaderComponent;
    return this.themeService.getTheme().name === 'green' ? customHeader : null;
  }
}
