import {
  ChangeDetectorRef,
  ContentChild, Directive,
  DoCheck,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { LuxFormLabelComponent } from '../lux-form-control/lux-form-control-subcomponents/lux-form-label.component';
import { LuxFormHintComponent } from '../lux-form-control/lux-form-control-subcomponents/lux-form-hint.component';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

let luxFormControlUID: number = 0;

@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormComponentBase implements OnInit, OnChanges, DoCheck, OnDestroy {
  protected static readonly DEFAULT_CTRL_NAME: string = 'control';

  protected _formValueChangeSubscr: Subscription;
  protected _formStatusChangeSubscr: Subscription;
  protected _configSubscription: Subscription;

  private hasHadRequiredValidator: boolean = false;

  protected latestErrors: any = null;
  protected displayBindingDebugHint: boolean = false;
  protected _initialValue: any;
  protected _luxDisabled: boolean;
  protected _luxReadonly: boolean;
  protected _luxRequired: boolean;

  errorMessage: string = undefined;

  controlContainer: ControlContainer;
  formGroup: FormGroup;
  formControl: AbstractControl;

  uid: string = 'lux-form-control-' + luxFormControlUID++;

  @ContentChild(LuxFormLabelComponent) formLabelComponent: LuxFormLabelComponent;
  @ContentChild(LuxFormHintComponent) formHintComponent: LuxFormHintComponent;

  @HostBinding('class.lux-form-control-readonly') cssReadonly;

  @Output() luxFocusIn: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxFocusOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxDisabledChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() luxHint: string;
  @Input() luxHintShowOnlyOnFocus: boolean;
  @Input() luxLabel: string;

  @Input() luxControlBinding: string;
  @Input() luxControlValidators: ValidatorFn | ValidatorFn[];
  @Input() luxErrorMessage: string;
  @Input() luxErrorCallback: Function = (value, errors) => undefined;

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
    if (this.isInForm()) {
      this.logger.error(
        `Achtung: Bei Komponenten innerhalb von ReactiveForms den Required-Validator anstelle der ` +
          `Property "luxRequired" nutzen.\n` +
          `Betroffene Komponente: ${this.luxControlBinding ? this.luxControlBinding : 'Kein Binding gefunden'}`
      );
    } else {
      this._luxRequired = required;
      this.updateValidators(this.luxControlValidators);
      this.cdr.detectChanges();
    }
  }

  protected constructor(
    controlContainer: ControlContainer,
    protected cdr: ChangeDetectorRef,
    protected logger: LuxConsoleService,
    protected configService: LuxComponentsConfigService
  ) {
    this.controlContainer = controlContainer;
    // Wir fragen hier direkt ab, ob die Binding-Warnung ausgegeben werden sollen
    this.displayBindingDebugHint = this.configService.currentConfig.displayBindingDebugHint;
  }

  ngOnInit() {
    this.initFormControl();
    this.initDisabledState();
    this.initFormValueSubscription();
    this.initFormStateSubscription();
    this.updateValidators(this.luxControlValidators);

    this.triggerOutputPatternCheck();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxControlValidators && this.formControl) {
      this.updateValidators(this.luxControlValidators);
    }

    this.triggerInputPatternCheck(simpleChanges);
  }

  ngDoCheck() {
    // Prüfen, ob es neue Fehlermeldungen gibt, wenn ja diese laden und speichern.
    if (this.latestErrors !== this.formControl.errors && this.formControl.touched) {
      this.latestErrors = this.formControl.errors;
      this.errorMessage = this.fetchErrorMessage();
    }

    // Prüfen, ob für das Reactive-Form-Control ein required-Validator ergänzt worden ist
    if (this.isInForm()) {
      const hasRequiredValidator = this.hasRequiredValidator(this.formControl);
      if (this.hasHadRequiredValidator !== hasRequiredValidator) {
        this._luxRequired = hasRequiredValidator;
        this.formControl.updateValueAndValidity();
        this.cdr.detectChanges();
      }

      this.hasHadRequiredValidator = hasRequiredValidator;
    }
  }

  ngOnDestroy() {
    if (this._formValueChangeSubscr) {
      this._formValueChangeSubscr.unsubscribe();
    }

    if (this._formStatusChangeSubscr) {
      this._formStatusChangeSubscr.unsubscribe();
    }

    if (this._configSubscription) {
      this._configSubscription.unsubscribe();
    }
  }

  isInForm(): boolean {
    return this.controlContainer != null && !LuxUtil.isEmpty(this.luxControlBinding);
  }

  /**
   * Versucht eine Fehlermeldung für diese Komponente auszulesen und gibt diese zurück.
   * Wenn das Element nicht den "touched"-Zustand besitzt, wird keine Fehlermeldung zurückgegeben.
   */
  protected fetchErrorMessage(): string {
    // Control undefined/null oder unberührt? => Keinen Fehler ausgeben
    if (!this.formControl || !this.formControl.touched) {
      return undefined;
    }
    const { value, errors } = this.formControl;

    // Gibt der Callback bereits einen User-definierten Fehler wieder? => diesen zurückgeben
    let errorMsg = this.luxErrorMessage
      ? this.luxErrorMessage
      : this.luxErrorCallback
      ? this.luxErrorCallback(value, errors || {})
      : undefined;
    if (errors && errorMsg) {
      return errorMsg;
    }

    // Evtl. falls vorhanden Fehlerbehandlung der ableitenden Komponente aufrufen
    errorMsg = this.errorMessageModifier(value, errors || {});
    if (errorMsg) {
      return errorMsg;
    }
    // Last-but-not-least => versuchen einen Standardfehler auszulesen
    errorMsg = LuxUtil.getErrorMessage(this.formControl as FormControl);

    return errorMsg;
  }

  /**
   * Mappt den Input-Wert aus disabled auf das FormControl.
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
   */
  protected errorMessageModifier(value, errors) {}

  /**
   * Standard-Getter Funktion für den aktuellen Wert in dieser FormComponent.
   */
  protected getValue(): any {
    return this.formControl ? this.formControl.value : this._initialValue;
  }

  /**
   * Standard-Setter Funktion für den aktuellen Wert in dieser FormComponent.
   */
  protected setValue(value: any) {
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
   * @param formValue
   */
  protected notifyFormValueChanged(formValue: any) {}

  /**
   * Wird nach der Aktualisierung des Status aufgerufen.
   * @param formStatus
   */
  protected notifyFormStatusChanged(formStatus: any) {}

  /**
   * Prueft ob das uebergebene Control einen required-Validator besitzt.
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
    if (this.isInForm()) {
      this.formGroup = <FormGroup>this.controlContainer.control;
      this.formControl = this.formGroup.controls[this.luxControlBinding];
    } else {
      this.formGroup = new FormGroup({
        control: new FormControl()
      });
      this.formControl = this.formGroup.get(LuxFormComponentBase.DEFAULT_CTRL_NAME);
      this.formControl.setValue(this._initialValue);
    }
  }

  /**
   * Initialisiert den Disabled-Zustand nach Erstellung dieser Component.
   */
  protected initDisabledState() {
    if (this._luxDisabled) {
      this.handleFormDisabledState();
    } else if (this.luxDisabled === undefined) {
      this.luxDisabled = this.formControl.disabled;
    }
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
    this._formValueChangeSubscr = this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe((value: any) => {
      this.notifyFormValueChanged(value);
    });
  }

  /**
   * Initialisiert das Handling von Statusaktualisierungen.
   */
  protected initFormStateSubscription() {
    this._formStatusChangeSubscr = this.formControl.statusChanges.subscribe((status: any) => {
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
   * @param validators
   */
  protected checkValidatorsContainRequired(validators: ValidatorFn | ValidatorFn[]) {
    // Fall: required = true, aber neue Validatoren werden gesetzt
    if (this.luxRequired === true) {
      // Sind es mehrere Validatoren, aber kein .required? Dann wird er ergänzt
      if (Array.isArray(validators) && validators.indexOf(Validators.required) === -1) {
        validators.push(Validators.required);
      } else if (!Array.isArray(validators) && validators !== Validators.required) {
        // Ist es nur ein einzelner Validator und nicht .required? Dann Array erstellen und beide kombinieren
        validators = [validators, Validators.required];
      }
    } else if (this.luxRequired === false) {
      if (Array.isArray(validators)) {
        validators = validators.filter((validator: ValidatorFn) => validator !== Validators.required);
      } else if (validators === Validators.required) {
        validators = undefined;
      }
    }

    return validators;
  }

  /**
   * Versucht die Validatoren für diese Komponente zu setzen.
   * Ist nur erfolgreich, wenn es sich hierbei nicht um eine ReactiveForm-Komponente handelt.
   * @param validators
   */
  protected updateValidators(validators: ValidatorFn | ValidatorFn[]) {
    if ((!Array.isArray(validators) && validators) || (Array.isArray(validators) && validators.length > 0)) {
      if (!this.isInForm()) {
        setTimeout(() => {
          this.luxControlValidators = this.checkValidatorsContainRequired(validators);
          this.formControl.setValidators(this.luxControlValidators);
          this.formControl.updateValueAndValidity();
        });
      } else {
        this.logger.error(
          `Die Validatoren einer ReactiveForm-Komponente dürfen nicht über ` + `das Template gesetzt werden.`
        );
      }
    }
  }

  /**
   * Gibt an, ob diese Component Output-Property-Binding nutzt obwohl diese Component eigentlich ein Reactive FormControl ist.
   * @param observers
   */
  protected checkOutputPatternViolation(observers: any[] | null) {
    if (this.displayBindingDebugHint && this.isInForm() && observers && observers.length > 0) {
      this.logPatternViolationWarning();
    }
  }

  /**
   * Gibt an, ob diese Component Input-Property-Binding nutzt obwohl diese Component eigentlich ein Reactive FormControl ist.
   * Wird von den ngOnChanges Methoden der Child-Klassen aufgerufen.
   * @param simpleChange
   */
  protected checkInputPatternViolation(simpleChange: SimpleChange) {
    if (this.displayBindingDebugHint && this.isInForm() && simpleChange && simpleChange.firstChange) {
      this.logPatternViolationWarning();
    }
  }

  /**
   * Die Child-Klassen implementieren diese Funktion um zu prüfen, ob gegen das Output-Binding für ReactiveForms verstoßen wird.
   */
  protected abstract triggerOutputPatternCheck();

  /**
   * Die Child-Klassen implementieren diese Funktion um zu prüfen, ob gegen das Input-Binding für ReactiveForms verstoßen wird.
   */
  protected abstract triggerInputPatternCheck(simpleChanges: SimpleChanges);

  /**
   * Gibt über den LuxConsoleService eine Warnung aus, dass hier gegen das ReactiveForm-Pattern mit Property-Binding
   * verstoßen worden ist.
   */
  private logPatternViolationWarning() {
    this.logger.warn(
      `Achtung: Die Component "${this.luxControlBinding}" ist Teil einer ReactiveForm, nutzt aber trotzdem Property-Binding.\n\n` +
        `[Mit ReactiveForms]\n` +
        `Für Components innerhalb von ReactiveForms können Wertaktualisierungen wie folgt abgefragt werden:\n\n` +
        `// Nicht vergessen unsubscribe in ngOnDestroy für die Subscription aufzurufen\n` +
        `this.subscription = this.myForm.get('myFormControl').valueChanges.subscribe((value: any) => console.log(value));\n\n` +
        `Das Setzen von Werten erfolgt zum Beispiel so:\n\n` +
        `this.myForm.get('myFormControl').setValue('myValue');\n\n` +
        `[Ohne ReactiveForms]\n` +
        `Für Components außerhalb von ReactiveForms können Wertaktualisierungen wie folgt abgefragt werden:\n\n` +
        `<lux-xyz-form-component (luxValueChange)="onValueChange($event)"><lux-xyz-form-component>\n\n` +
        `Das Setzen von Werten erfolgt zum Beispiel so:\n\n` +
        `<lux-xyz-form-component [luxValue]="value"><lux-xyz-form-component>\n\n` +
        `Alternativ kann über Two-Way-Binding immer der aktuelle Wert in einer Property gehalten werden:\n\n` +
        `<lux-xyz-form-component [(luxValue)]="value"><lux-xyz-form-component>`
    );

    // Wir deaktivieren weitere Log-Ausgaben für diese Component, um doppelte Meldung zu vermeiden.
    // z.B. wenn Two-Way-Binding genutzt wird.
    this.displayBindingDebugHint = false;
  }
}
