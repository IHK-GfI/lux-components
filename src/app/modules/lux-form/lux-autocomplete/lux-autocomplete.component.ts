import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { LuxFormComponentBase } from '../lux-form-model/lux-form-component-base.class';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-autocomplete',
  templateUrl: './lux-autocomplete.component.html',
  styleUrls: ['./lux-autocomplete.component.scss']
})
export class LuxAutocompleteComponent extends LuxFormComponentBase implements OnInit, AfterViewInit {
  private selected$: ReplaySubject<any> = new ReplaySubject<any>(1);

  filteredOptions: Observable<any>;

  @Input() luxPlaceholder: string = '';
  @Input() luxReadonly: boolean;
  @Input() luxOptions: any[] = [];
  @Input() luxOptionLabelProp: string = 'label';
  @Input() luxLookupDelay: number = 500;
  @Input() luxErrorMessageNotAnOption: string = 'Der eingegebene Wert ist nicht Teil der Auswahl.';
  @Input() luxTagId: string;
  @Input() luxSelectAllOnClick: boolean = true;
  @Input() luxStrict: boolean = true;

  @Output() luxValueChange: EventEmitter<any> = new EventEmitter();
  @Output() luxOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() luxBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxFocus: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger })
  matAutoComplete: MatAutocompleteTrigger;
  @ViewChild('autoCompleteInput', { read: ElementRef }) matInput: ElementRef;

  get luxValue(): any {
    return this.getValue();
  }

  @Input() set luxValue(value: any) {
    this.setValue(value);
  }

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    protected config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  ngOnInit() {
    super.ngOnInit();

    this.selected$.pipe(distinctUntilChanged()).subscribe(value => {
      if (this.luxStrict) {
        if (value === '') {
          this.luxOptionSelected.emit(null);
          this.luxValueChange.emit(null);
        } else {
          const selectedOption = this.luxOptions.find(option => value === option);
          if (selectedOption) {
            this.luxOptionSelected.emit(selectedOption);
            this.luxValueChange.emit(selectedOption);
          }
        }
      } else {
        this.luxOptionSelected.emit(value);
        this.luxValueChange.emit(value);
      }
    });
  }

  ngAfterViewInit() {
    this.matAutoComplete.panelClosingActions
      .pipe(debounceTime(this.luxLookupDelay))
      .subscribe((value: MatOptionSelectionChange) => {
        if (this.luxStrict) {
          const filterResult = this.filter(this.getOptionLabel(this.luxValue));

          if (filterResult.length === 1) {
            this.formControl.setValue(filterResult[0]);
          }

          this.handleErrors();
        }
      });

    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      debounceTime(this.luxLookupDelay),
      map(value => this.getOptionLabel(value)),
      map(() => {
        const filterLabel = this.getOptionLabel(this.luxValue);
        return filterLabel ? this.filter(filterLabel) : this.luxOptions;
      })
    );
  }

  /**
   * @override errorMessageModifier - Modifikation der Fehlermeldung
   * @param value
   * @param errors
   */
  errorMessageModifier(value, errors) {
    if (errors['incorrect']) {
      return this.luxErrorMessageNotAnOption;
    }
    return undefined;
  }

  /**
   * Regelt die Darstellung der gewaehlten Option im Normalfall.
   * (Ausnahme: Focus-Verlust)
   * @param option
   * @returns string
   */
  displayFn(option: any): string {
    return this.getOptionLabel(this.luxValue);
  }

  /**
   * Filtert das Options-Array nach dem filterTerm und
   * gibt das Ergebnis als Array zurueck.
   * @param filterTerm
   * @returns any[]
   */
  filter(filterTerm: any) {
    return this.luxOptions.filter(option => {
      const compareValue = this.getOptionLabel(option);
      return (
        compareValue
          .trim()
          .toLowerCase()
          .indexOf(filterTerm.trim().toLowerCase()) > -1
      );
    });
  }

  /**
   * Click-Event Handling
   * Selektiert den gesamten Text im Input, wenn selectAllOnClick = true ist.
   * @param clickEvent
   */
  onClick(clickEvent: any) {
    if (this.luxSelectAllOnClick) {
      clickEvent.target.setSelectionRange(0, clickEvent.target.value.length);
    }
  }

  /**
   * Gibt den darzustellenden Wert einer Option bzw.
   * die Option selbst (wenn string) wider.
   * @param option
   * @returns any
   */
  getOptionLabel(option: any) {
    if (typeof option === 'string') {
      return option;
    } else if (!option) {
      return '';
    } else {
      return option[this.luxOptionLabelProp];
    }
  }

  selected($event: MatAutocompleteSelectedEvent) {
    this.luxValue = $event.option.value;
  }

  private handleErrors() {
    const errors = this.formControl ? this.formControl.errors : null;
    if (
      this.luxOptions.indexOf(this.luxValue) > -1 ||
      (!!errors && Object.keys(errors).length > 0 && errors['required'])
    ) {
      this.handleOtherErrors(errors);
    } else {
      this.handleIncorrectError(errors);
    }
  }

  private handleOtherErrors(errors: any) {
    if (errors && errors['incorrect']) {
      delete errors['incorrect'];
    }

    this.formControl.setErrors(errors && Object.keys(errors).length !== 0 ? errors : null);
  }

  private handleIncorrectError(errors: any) {
    if (this.luxStrict && this.luxValue) {
      errors = errors ? errors : {};
      if (!errors['incorrect']) {
        errors['incorrect'] = true;
      }
      this.formControl.setErrors(errors);
    }
  }

  // region overridden methods
  notifyFormValueChanged(formValue: any) {
    this.selected$.next(formValue);
    this.luxValueChange.emit(formValue);

    if (formValue && formValue[this.luxOptionLabelProp]) {
      this.matInput.nativeElement.value = formValue[this.luxOptionLabelProp];
    }
  }

  protected triggerOutputPatternCheck() {
    this.checkOutputPatternViolation(this.luxValueChange.observers);
  }

  protected triggerInputPatternCheck(simpleChanges: SimpleChanges) {
    this.checkInputPatternViolation(simpleChanges.luxValue);
  }

  // endregion
}
