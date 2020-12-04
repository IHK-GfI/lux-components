import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { LuxFormComponentBase } from '../lux-form-model/lux-form-component-base.class';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-autocomplete',
  templateUrl: './lux-autocomplete.component.html',
  styleUrls: ['./lux-autocomplete.component.scss']
})
export class LuxAutocompleteComponent extends LuxFormComponentBase implements OnInit, OnDestroy, AfterViewInit {
  private selected$: ReplaySubject<any> = new ReplaySubject<any>(1);
  private subscriptions: Subscription[] = [];

  filteredOptions: Observable<any>;

  @Input() luxPlaceholder: string = '';
  @Input() luxOptions: any[] = [];
  @Input() luxOptionLabelProp: string = 'label';
  @Input() luxLookupDelay: number = 500;
  @Input() luxErrorMessageNotAnOption: string = 'Der eingegebene Wert ist nicht Teil der Auswahl.';
  @Input() luxTagId: string;
  @Input() luxSelectAllOnClick: boolean = true;
  @Input() luxStrict: boolean = true;
  @Input() luxPickValue: (selected: any) => any;
  @Input() luxFilterFn: (filterTerm: string, label: string, option: any) => boolean;

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
    if (this.isPickValueMode()) {
      this.setValue(value instanceof Object ? this.luxPickValue(value) : value);
    } else {
      this.setValue(value);
    }
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

    this.subscriptions.push(this.selected$.pipe(distinctUntilChanged()).subscribe(value => {
      if (this.luxStrict) {
        if (value === '' || value === null || value === undefined) {
          this.luxOptionSelected.emit(null);
          this.luxValueChange.emit(null);
        } else {
          let selected;
          if (this.isPickValueMode()) {
            const selectedOption = this.getPickValueOption(value);
            if (selectedOption) {
              selected = this.luxPickValue(selectedOption);
            } else {
              selected = null;
            }
          } else {
            selected = this.luxOptions.find(option => value === option);
          }
          if (selected) {
            this.luxOptionSelected.emit(selected);
            this.luxValueChange.emit(selected);
          }
        }
      } else {
        this.luxOptionSelected.emit(value);
        this.luxValueChange.emit(value);
      }
    }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.matAutoComplete.panelClosingActions
      .pipe(debounceTime(this.luxLookupDelay))
      .subscribe((value: MatOptionSelectionChange) => {
        if (this.luxStrict) {
          const filterResult = this.filter(this.matInput.nativeElement.value);

          if (filterResult.length === 1) {
            let selected;
            if (this.isPickValueMode()) {
              selected = this.luxPickValue(filterResult[0]);
            } else {
              selected = filterResult[0];
            }
            this.formControl.setValue(selected);
          }

          this.handleErrors();
        }
      }));

    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      debounceTime(this.luxLookupDelay),
      map(value => this.getOptionLabel(value)),
      map(() => {
        const filterLabel = this.matInput.nativeElement.value;
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
   * @param value
   * @returns string
   */
  displayFn(value: any): string {
    let selected;
    if (this.isPickValueMode()) {
      selected = this.getPickValueOption(this.luxValue);
    } else {
      selected = this.luxValue;
    }
    return this.getOptionLabel(selected);
  }

  /**
   * Filtert das Options-Array nach dem filterTerm und
   * gibt das Ergebnis als Array zurueck.
   * @param filterTerm
   * @returns any[]
   */
  filter(filterTerm: any) {
    return this.luxOptions.filter((option) => {
      const filterText = filterTerm.trim().toLowerCase();
      const optionLabel = this.getOptionLabel(option).trim().toLowerCase();

      if (this.luxFilterFn) {
        return this.luxFilterFn(filterText, optionLabel, option);
      } else {
        return optionLabel.indexOf(filterText) > -1;
      }
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
    if (this.isPickValueMode()) {
      this.luxValue = this.luxPickValue($event.option.value);
    } else {
      this.luxValue = $event.option.value;
    }
  }

  private handleErrors() {
    const errors = this.formControl ? this.formControl.errors : null;
    if (
      this.luxOptions.indexOf(this.isPickValueMode() ? this.getPickValueOption(this.luxValue) : this.luxValue) > -1 ||
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
    let newValue;
    if (this.isPickValueMode()) {
      newValue = formValue instanceof Object ? this.luxPickValue(formValue) : formValue;
    } else {
      newValue = formValue;
    }

    this.selected$.next(newValue);
    this.luxValueChange.emit(newValue);

    if (newValue && newValue[this.luxOptionLabelProp]) {
      this.matInput.nativeElement.value = newValue[this.luxOptionLabelProp];
    }
  }

  protected triggerOutputPatternCheck() {
    this.checkOutputPatternViolation(this.luxValueChange.observers);
  }

  protected triggerInputPatternCheck(simpleChanges: SimpleChanges) {
    this.checkInputPatternViolation(simpleChanges.luxValue);
  }

  // endregion

  private isPickValueMode(): boolean {
    return this.luxStrict && !!this.luxPickValue;
  }

  private getPickValueOption(value) {
    const pickValue = value instanceof Object ? this.luxPickValue(value) : value;
    return this.luxOptions.find(currentOption => pickValue === this.luxPickValue(currentOption));
  }
}
