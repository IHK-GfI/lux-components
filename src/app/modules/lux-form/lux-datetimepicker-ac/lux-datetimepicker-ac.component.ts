import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
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
import { AbstractControl, ControlContainer, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFilterFn } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxThemePalette } from '../../lux-util/lux-colors.enum';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxDateFilterAcFn, LuxStartAcView } from '../lux-datepicker-ac/lux-datepicker-ac.component';
import { LuxValidationErrors, ValidatorFnType } from '../lux-form-model/lux-form-component-base.class';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxDatetimeOverlayAcComponent } from '../lux-datetimepicker-ac/lux-datetime-overlay-ac/lux-datetime-overlay-ac.component';
import { LuxDateTimePickerAcAdapter } from './lux-datetimepicker-ac-adapter';

export const APP_DATE_TIME_FORMATS_AC = {
  parse: {
    dateInput: { month: '2-digit', year: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }
  },
  display: {
    dateInput: { month: '2-digit', year: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false },
    monthYearLabel: { year: 'numeric', month: 'long' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};
@Component({
  selector: 'lux-datetimepicker-ac',
  templateUrl: './lux-datetimepicker-ac.component.html',
  providers: [
    { provide: DateAdapter, useClass: LuxDateTimePickerAcAdapter, deps: [MAT_DATE_LOCALE, Platform] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_TIME_FORMATS_AC }
  ]
})
export class LuxDatetimepickerAcComponent<T = any>
  extends LuxFormInputBaseClass<T>
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(LuxDatetimeOverlayAcComponent) dateTimeOverlayComponent?: LuxDatetimeOverlayAcComponent;
  @ViewChild('dateTimePickerInput', { read: ElementRef }) dateTimePickerInputEl!: ElementRef;

  @Input() luxStartView: LuxStartAcView = 'month';
  @Input() luxOpened = false;
  @Input() luxStartDate?: string;
  @Input() luxStartTime: number[] = [];
  @Input() luxShowToggle = true;
  @Input() luxCustomFilter?: LuxDateFilterAcFn;
  @Input() luxMaxDate?: string;
  @Input() luxMinDate?: string;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  dateTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let result = null;

    if (this.dateTimeInputValue) {
      const date = this.parseDateTime(this.dateTimeInputValue);

      if (date === null) {
        result = { matDatepickerParse: { text: this.dateTimeInputValue } };
      } else if (this.min && this.compareDateWithTime(this.min, date) > 0) {
        result = { matDatepickerMin: { min: this.min, actual: this.dateTimeInputValue } };
      } else if (this.max && this.compareDateWithTime(date, this.max) > 0) {
        result = { matDatepickerMax: { max: this.max, actual: this.dateTimeInputValue } };
      }
    } else {
      if (!this.inForm) {
        if (this.luxRequired) {
          result = { required: true };
        }
      }
    }

    return result;
  };

  min: Date | null = null;
  max: Date | null = null;
  start: Date | null = null;

  get selectedDate(): string | undefined {
    return typeof this.formControl.value === 'string' ? this.formControl.value : undefined;
  }

  get dateTimeInputValue() {
    return this.dateTimePickerInputEl?.nativeElement.value;
  }

  set dateTimeInputValue(newValue: string) {
    this.dateTimePickerInputEl.nativeElement.value = newValue;
  }

  constructor(
    private dateTimeAdapter: DateAdapter<Date>,
    private elementRef: ElementRef,
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
    this.luxAutocomplete = 'off';
  }

  // Code des Interfaces "MatDatepickerControl" - Start
  getStartValue() {
    return this.luxStartDate;
  }
  getThemePalette(): LuxThemePalette {
    return undefined;
  }
  disabled = false;
  dateFilter?: DateFilterFn<any>;
  getConnectedOverlayOrigin(): ElementRef {
    return this.dateTimePickerInputEl;
  }

  getOverlayLabelId() {
    return null;
  }
  stateChanges?: Observable<void>;
  // Code des Interfaces "MatDatepickerControl" - Ende

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxOpened) {
      // Eventuell gibt es ohne das Timeout sonst Fehler, weil die OverlayComponent noch nicht gesetzt ist
      setTimeout(() => {
        this.triggerOpenClose();
      });
    }

    if (simpleChanges.luxMaxDate && typeof simpleChanges.luxMaxDate.currentValue === 'string') {
      this.max = this.parseDateTime(simpleChanges.luxMaxDate.currentValue);
    }

    if (simpleChanges.luxMinDate && typeof simpleChanges.luxMinDate.currentValue === 'string') {
      this.min = this.parseDateTime(simpleChanges.luxMinDate.currentValue);
    }

    if (simpleChanges.luxStartDate && typeof simpleChanges.luxStartDate.currentValue === 'string') {
      const startDateArr = simpleChanges.luxStartDate.currentValue.trim().split('.');
      if (startDateArr.length === 3) {
        this.start = new Date(0);
        this.start.setUTCFullYear(+startDateArr[2], +startDateArr[1] - 1, +startDateArr[0]);
      } else {
        this.start = null;
      }
    }
  }

  ngAfterViewInit() {
    this.dateTimeInputValue = this.formatDateTime(this.formControl.value);
    this.formControl.addValidators(this.dateTimeValidator);
  }

  onOk(date: Date) {
    const selected = new Date(date.getTime());

    if (LuxUtil.isDate(selected)) {
      this.setISOValue(selected.toISOString());
    }

    this.dateTimeInputValue = this.formatDateTime(selected);
  }

  onFocusOut(event: FocusEvent) {
    if (this.formControl.value) {
      const formattedDate = this.formatDateTime(this.parseDateTime(this.formControl.value as any));

      if (this.dateTimeInputValue !== formattedDate) {
        this.dateTimeInputValue = formattedDate;
      }
    }

    this.luxFocusOut.emit(event);
  }

  errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    if (errors.matDatepickerMin) {
      return $localize`:@@luxc.datetimepicker.error_message.min:Das Datum unterschreitet den Minimalwert`;
    } else if (errors.matDatepickerMax) {
      return $localize`:@@luxc.datetimepicker.error_message.max:Das Datum überschreitet den Maximalwert`;
    } else if (errors.matDatepickerParse) {
      return $localize`:@@luxc.datetimepicker.error_message.invalid:Die Datum-/Uhrzeitkombination ist ungültig`;
    } else if (errors.required) {
      if (this.dateTimePickerInputEl && this.dateTimeInputValue) {
        return $localize`:@@luxc.datetimepicker.error_message.invalid:Die Datum-/Uhrzeitkombination ist ungültig`;
      } else {
        return $localize`:@@luxc.datetimepicker.error_message.empty:Das Datum darf nicht leer sein`;
      }
    }

    return undefined;
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
    this._formValueChangeSub = this.formControl.valueChanges.subscribe((value: any) => {
      this.updateDateValue(value);

      if (LuxUtil.ISO_8601_FULL.test(value)) {
        this.dateTimeInputValue = this.formatDateTime(this.formControl.value);
      }
    });

    if (this.formControl.value !== null && this.formControl.value !== undefined) {
      // Es kann vorkommen, dass der initiale Wert nicht im ISO-Format angegeben ist.
      // Dann muss der Wert noch umgewandelt werden.
      this.updateDateValue(this.formControl.value);
    } else if (this._initialValue !== null && this._initialValue !== undefined) {
      // Vorhandenen Initialwert setzen
      this.formControl.setValue(this._initialValue);
    }
  }

  protected updateValidators(validators: ValidatorFnType, checkRequiredValidator: boolean) {
    if ((!Array.isArray(validators) && validators) || (Array.isArray(validators) && validators.length > 0)) {
      if (!this.inForm) {
        setTimeout(() => {
          if (checkRequiredValidator) {
            this._luxControlValidators = this.checkValidatorsContainRequired(validators);
          }

          this.formControl.setValidators(validators ?? null);
          this.formControl.addValidators(this.dateTimeValidator);
          this.formControl.updateValueAndValidity();
        });
      }
    } else {
      if (!this.inForm) {
        setTimeout(() => {
          if (checkRequiredValidator) {
            this._luxControlValidators = this.checkValidatorsContainRequired(validators);
          }
          this.formControl.setValidators([this.dateTimeValidator]);
          this.formControl.updateValueAndValidity();
        });
      }
    }
  }

  private compareDateWithTime(first: Date, second: Date): number {
    return (
      this.dateTimeAdapter.compareDate(first, second) || first.getHours() - second.getHours() || first.getMinutes() - second.getMinutes()
    );
  }

  private setISOValue(isoValue: string) {
    setTimeout(() => {
      let minOk = true;
      if (this.min && isoValue && this.dateTimeAdapter.compareDate(new Date(isoValue), this.min) < 0) {
        minOk = false;
      }

      let maxOk = true;
      if (this.max && isoValue && this.dateTimeAdapter.compareDate(new Date(isoValue), this.max) > 0) {
        maxOk = false;
      }

      if (minOk && maxOk) {
        this.notifyFormValueChanged(isoValue);
      }

      // "silently" den FormControl auf den (potenziell) geänderten Wert aktualisieren
      this.formControl.setValue(isoValue as any, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      });

      if (!this.dateTimeInputValue && isoValue) {
        // Per Hand dem Input-Element einen formatierten String übergeben
        this.dateTimeInputValue = this.formatDateTime(isoValue);
      }
    });
  }

  private triggerOpenClose() {
    if (this.luxOpened) {
      this.dateTimeOverlayComponent?.open();
    } else {
      this.dateTimeOverlayComponent?.close();
    }
  }

  private formatDateTime(date: any) {
    return this.dateTimeAdapter.format(date, APP_DATE_TIME_FORMATS_AC.display.dateInput);
  }

  private parseDateTime(date: string) {
    return this.dateTimeAdapter.parse(date, APP_DATE_TIME_FORMATS_AC.parse.dateInput);
  }

  private updateDateValue(value: any) {
    if (typeof value === 'string') {
      value = this.parseDateTime(value);
    }

    if (!value) {
      this.setISOValue(value);
      return;
    }

    // Sicherheitshalber noch einmal prüfen, kann vorkommen das ein unsinniger Wert eingetragen wird
    // z.B. 'asdf', das führt zu InvalidDate's
    if (LuxUtil.isDate(value)) {
      this.setISOValue(value.toISOString());
    }
  }
}
