import {
  ChangeDetectorRef,
  ContentChild,
  Directive,
  DoCheck,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer, FormControl, FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxFormHintComponent } from '../lux-form-control/lux-form-control-subcomponents/lux-form-hint.component';
import { LuxFormLabelComponent } from '../lux-form-control/lux-form-control-subcomponents/lux-form-label.component';

let luxFormControlUID = 0;

export declare type LuxValidationErrors = ValidationErrors;
export declare type ValidatorFnType = ValidatorFn | ValidatorFn[] | null | undefined;
export declare type LuxErrorCallbackFnType = (value: any, errors: LuxValidationErrors) => string | undefined;

@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormComponentBase<T = any> implements OnInit, DoCheck, OnDestroy {
  protected static readonly DEFAULT_CTRL_NAME: string = 'control';

  protected _formValueChangeSub?: Subscription;
  protected _formStatusChangeSub?: Subscription;
  protected _configSubscription?: Subscription;

  private hasHadRequiredValidator = false;

  protected latestErrors: any = null;
  protected _initialValue?: any;
  protected _luxDisabled = false;
  protected _luxReadonly = false;
  protected _luxRequired = false;
  protected _luxControlValidators?: ValidatorFnType;

  errorMessage: string | undefined = undefined;

  controlContainer: ControlContainer;
  cdr: ChangeDetectorRef;
  logger: LuxConsoleService;
  configService: LuxComponentsConfigService;
  inForm = false;
  formGroup!: FormGroup;
  formControl!: FormControl<T>;

  uid: string = 'lux-form-control-' + luxFormControlUID++;

  @ContentChild(LuxFormLabelComponent) formLabelComponent?: LuxFormLabelComponent;
  @ContentChild(LuxFormHintComponent) formHintComponent?: LuxFormHintComponent;

  @HostBinding('class.lux-form-control-readonly') cssReadonly = false;

  @Output() luxFocusIn: EventEmitter<FocusEvent> = new EventEmitter<any>();
  @Output() luxFocusOut: EventEmitter<FocusEvent> = new EventEmitter<any>();
  @Output() luxDisabledChange: EventEmitter<boolean> = new EventEmitter<any>();

  @Input() luxHint = '';
  @Input() luxHintShowOnlyOnFocus = false;
  @Input() luxLabel = '';
  @Input() luxLabelLongFormat = false;

  @Input() luxControlBinding?: string;
  @Input() luxErrorMessage?: string;
  @Input() luxErrorCallback: LuxErrorCallbackFnType = () => undefined;

  get luxControlValidators(): ValidatorFnType {
    return this._luxControlValidators;
  }

  @Input() set luxControlValidators(validators: ValidatorFnType) {
    this._luxControlValidators = validators;
    this.updateValidators(validators, false);
  }

  get luxDisabled(): boolean {
    return this._luxDisabled;
  }

  @Input() set luxDisabled(disabled: boolean) {
    this._luxDisabled = disabled;
    this.cdr.detectChanges();

    if (this.formControl) {
      this.handleFormDisabledState();
    }

    this.luxDisabledChange.emit(this._luxDisabled);
  }

  get luxReadonly(): boolean {
    return this._luxReadonly;
  }

  @Input() set luxReadonly(readonly: boolean) {
    this._luxReadonly = readonly;
    this.cssReadonly = readonly;
    this.cdr.detectChanges();
  }

  get luxRequired(): boolean {
    return this._luxRequired;
  }

  @Input() set luxRequired(required: boolean) {
    if (this.inForm) {
      this.logger.error(
        `Attention: Use the Required-Validator instead of the ` +
          `Property "luxRequired" for components within ReactiveForms..\n` +
          `Affected component: ${this.luxControlBinding ? this.luxControlBinding : 'No binding found'}`
      );
    } else {
      this._luxRequired = required;
      this.updateValidators(this.luxControlValidators, true);
      this.cdr.detectChanges();
    }
  }

  protected constructor(
    controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    configService: LuxComponentsConfigService
  ) {
    this.controlContainer = controlContainer;
    this.cdr = cdr;
    this.logger = logger;
    this.configService = configService;
  }

  ngOnInit() {
    this.initFormControl();
    this.initFormValueSubscription();
    this.initFormStateSubscription();
    this.updateValidators(this.luxControlValidators, true);
  }

  ngDoCheck() {
    // Prüfen, ob es neue Fehlermeldungen gibt, wenn ja diese laden und speichern.
    if (this.latestErrors !== this.formControl.errors && this.formControl.touched) {
      this.latestErrors = this.formControl.errors;
      this.errorMessage = this.fetchErrorMessage();
    }
  }

  ngOnDestroy() {
    if (this._formValueChangeSub) {
      this._formValueChangeSub.unsubscribe();
    }

    if (this._formStatusChangeSub) {
      this._formStatusChangeSub.unsubscribe();
    }

    if (this._configSubscription) {
      this._configSubscription.unsubscribe();
    }
  }

  /**
   * Versucht eine Fehlermeldung für diese Komponente auszulesen und gibt diese zurück.
   * Wenn das Element nicht den "touched"-Zustand besitzt, wird keine Fehlermeldung zurückgegeben.
   */
  protected fetchErrorMessage(): string | undefined {
    // Control undefined/null oder unberührt? Keinen Fehler ausgeben
    if (!this.formControl || !this.formControl.touched) {
      return undefined;
    }
    const { value, errors } = this.formControl;

    let errorMsg = undefined;
    if (errors) {
      // Gibt der Callback bereits einen User-definierten Fehler wieder? Diesen zurückgeben.
      errorMsg = this.luxErrorMessage
        ? this.luxErrorMessage
        : this.luxErrorCallback
        ? this.luxErrorCallback(value, errors || {})
        : undefined;
      if (errors && errorMsg) {
        return errorMsg;
      }

      // Eventuell falls vorhanden Fehlerbehandlung der ableitenden Komponente aufrufen
      errorMsg = this.errorMessageModifier(value, errors || {});
      if (errorMsg) {
        return errorMsg;
      }
      // Last-but-not-least => versuchen einen Standardfehler auszulesen
      errorMsg = LuxUtil.getErrorMessage(this.formControl as FormControl<T>);
    }

    return errorMsg;
  }

  /**
   * Überträgt den Input-Wert aus disabled auf das FormControl.
   */
  protected handleFormDisabledState() {
    if (this.luxDisabled && !this.formControl.disabled) {
      this.formControl.disable();
    }

    if (!this.luxDisabled && this.formControl.disabled) {
      this.formControl.enable();
    }
  }

  /**
   * Method-Stub der von ableitenden Klassen genutzt werden kann, um
   * weitergreifende Fehlermeldungen anzugeben.
   *
   * @param value
   * @param errors
   */
  protected errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    return undefined;
  }

  /**
   * Standard-Getter Funktion für den aktuellen Wert in dieser FormComponent.
   */
  protected getValue(): T {
    return this.formControl ? this.formControl.value : this._initialValue;
  }

  /**
   * Standard-Setter Funktion für den aktuellen Wert in dieser FormComponent.
   *
   * @param value
   */
  protected setValue(value: T) {
    // Wenn noch kein FormControl vorhanden, den init-Wert merken und Fn beenden
    if (!this.formControl) {
      this._initialValue = value;
      return;
    }

    // Wenn der Wert bereits in dem FormControl bekannt ist, die Fn beenden
    if (value === this.formControl.value) {
      return;
    }
    // Den Wert im FormControl merken
    this.formControl.setValue(value);
  }

  /**
   * Wird nach der Aktualisierung des Wertes aufgerufen.
   * Hier kann z.B. valueChange.emit() ausgeführt werden.
   *
   * @param formValue
   */
  protected notifyFormValueChanged(formValue: any) {}

  /**
   * Wird nach der Aktualisierung des Status aufgerufen.
   *
   * @param formStatus
   */
  protected notifyFormStatusChanged(formStatus: any) {
    if (this.inForm && (formStatus === 'VALID' || formStatus === 'INVALID')) {
      this.updateValidatorsInForm();
    }
  }

  /**
   * Prüft, ob das übergebene Control einen required-Validator besitzt.
   *
   * @param abstractControl
   */
  protected hasRequiredValidator(abstractControl: AbstractControl) {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && (validator.required || validator.requiredTrue)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Initialisiert die FormGroup und das FormControl abhängig davon, ob es sich um eine ReactiveForm-Component
   * handelt.
   */
  protected initFormControl() {
    this.inForm = !!this.controlContainer && !!this.luxControlBinding;

    if (this.inForm && this.luxControlBinding) {
      this.formGroup = this.controlContainer.control as FormGroup;
      this.formControl = this.formGroup.controls[this.luxControlBinding] as FormControl<T>;
      this.updateValidatorsInForm();
    } else {
      this.formGroup = new FormGroup({
        control: new FormControl()
      });
      this.formControl = this.formGroup.get(LuxFormComponentBase.DEFAULT_CTRL_NAME) as FormControl<T>;
      this.formControl.setValue(this._initialValue);
    }

    this.luxDisabled = this.formControl.disabled;
  }

  /**
   * Initialisiert das Handling von Wertaktualisierungen.
   * Setzt den (optional vorhanden) Initial-Wert und folgende Änderungen über das FormControl.
   */
  protected initFormValueSubscription() {
    if (this._initialValue !== null && this._initialValue !== undefined) {
      this.setValue(this._initialValue);
    }

    // Aktualisierungen an dem FormControl-Value sollen auch via EventEmitter bekannt gemacht werden
    this._formValueChangeSub = this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe((value: any) => {
      this.notifyFormValueChanged(value);
    });
  }

  /**
   * Initialisiert das Handling von Statusaktualisierungen.
   */
  protected initFormStateSubscription() {
    this._formStatusChangeSub = this.formControl.statusChanges.subscribe((status: any) => {
      if (status === 'DISABLED' && !this.luxDisabled) {
        // Das FormControl hat den Zustand "DISABLED", aber die Property "luxDisabled"
        // hat noch den Wert "false". D.h. der FormControl-Status und die Property
        // sind nicht mehr synchron.
        this.luxDisabled = true;
      } else if ((status === 'VALID' || status === 'INVALID') && this.luxDisabled) {
        // Das FormControl hat den Zustand "VALID" oder "INVALID" und ist aktiv,
        // aber die Property "luxDisabled" hat noch den Wert "true".
        // D.h. der FormControl-Status und die Property sind nicht mehr synchron.
        this.luxDisabled = false;
      }

      this.notifyFormStatusChanged(status);
    });
  }

  /**
   * Diese Funktion prüft ob luxRequired auf true gesetzt wurde und die übergebenen validators bereits den
   * required-Validator besitzen.
   * Für den Fall das luxRequired auf false gesetzt worden ist, wird der Validator entfernt.
   *
   * Hinweis: LuxFormCheckableBase überschreibt diese Funktion, um statt required requiredTrue zu setzen.
   *
   * @param validators
   */
  protected checkValidatorsContainRequired(validators: ValidatorFnType) {
    if (!this.luxRequired === null && !this.luxRequired === undefined) {
      if (this.luxRequired) {
        // Fall: required = true, aber neue Validatoren werden gesetzt.
        // Sind es mehrere Validatoren, aber kein "required"? Dann wird er ergänzt
        if (Array.isArray(validators) && validators.indexOf(Validators.required) === -1) {
          validators.push(Validators.required);
        } else if (validators && !Array.isArray(validators) && validators !== Validators.required) {
          // Ist es nur ein einzelner Validator und nicht "required"? Dann Array erstellen und beide kombinieren.
          validators = [validators, Validators.required];
        }
      } else {
        if (Array.isArray(validators)) {
          validators = validators.filter((validator: ValidatorFn) => validator !== Validators.required);
        } else if (validators === Validators.required) {
          validators = undefined;
        }
      }
    } else {
      // Die Aufrufe mit "null" und "undefined" werden an dieser Stelle absichtlich nicht weiter behandelt.
      // Todo: Mit der neuen Angular-Version sind neue Methoden wie z.B. FormControl.hasValidator hinzugekommen.
      //       D.h. die komplizierte Behandlung von Validators.required kann vereinfacht werden.
    }

    return validators;
  }

  /**
   * Versucht die Validatoren für diese Komponente zu setzen.
   * Ist nur erfolgreich, wenn es sich hierbei nicht um eine ReactiveForm-Komponente handelt.
   *
   * @param validators
   * @param checkRequiredValidator
   */
  protected updateValidators(validators: ValidatorFnType, checkRequiredValidator: boolean) {
    if ((!Array.isArray(validators) && validators) || (Array.isArray(validators) && validators.length > 0)) {
      if (!this.inForm) {
        setTimeout(() => {
          if (checkRequiredValidator) {
            this._luxControlValidators = this.checkValidatorsContainRequired(validators);
          }
          this.formControl.setValidators(this.luxControlValidators ?? null);
          this.formControl.updateValueAndValidity();
        });
      } else {
        this.logger.warn(
          `
Die Validatoren des Formularelements (luxControlBinding=${this.luxControlBinding}) können ausschließlich über das Formular gesetzt werden,
aber nicht über das Property 'luxControlValidators'. Dieser Aufruf wurde ignoriert!`
        );
      }
    }
  }

  private updateValidatorsInForm() {
    const hasRequiredValidator = this.hasRequiredValidator(this.formControl);
    if (this.hasHadRequiredValidator !== hasRequiredValidator) {
      this._luxRequired = hasRequiredValidator;
    }

    this.hasHadRequiredValidator = hasRequiredValidator;
  }
}
