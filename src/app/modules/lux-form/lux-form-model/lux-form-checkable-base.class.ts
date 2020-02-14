import { ControlContainer, ValidatorFn, Validators } from '@angular/forms';
import { ChangeDetectorRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormComponentBase } from './lux-form-component-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für das Aktivieren eines Boolean-Wertes besitzen
 * (LuxToggle und LuxCheckbox z.B.).
 */
export abstract class LuxFormCheckableBaseClass extends LuxFormComponentBase {
  @Output() luxCheckedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() luxTagId: string;
  @Input() luxReadonly: boolean;

  get luxChecked() {
    return this.getValue();
  }

  @Input() set luxChecked(checked: boolean) {
    this.setValue(checked);
  }

  protected constructor(
    controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  // region Overridden methods
  notifyFormValueChanged(formValue: boolean) {
    // Aktualisierungen an dem FormControl-Value sollen auch via EventEmitter bekannt gemacht werden
    this.luxCheckedChange.emit(formValue);

    // Bei luxRequired = true && einem false-Wert entsprechend einen Fehler setzen
    if (formValue === false && this.luxRequired && this.formControl.errors === null) {
      this.formControl.setErrors({ required: true });
    }
  }

  errorMessageModifier(value, errors) {
    if (errors.required) {
      return 'Das ist ein Pflichtfeld';
    }
    return undefined;
  }

  protected checkValidatorsContainRequired(validators: ValidatorFn | ValidatorFn[]) {
    // Fall: required = true, aber neue Validatoren werden gesetzt
    if (this.luxRequired === true) {
      // Sind es mehrere Validatoren, aber kein .requiredTrue? Dann wird er ergänzt
      if (Array.isArray(validators) && validators.indexOf(Validators.requiredTrue) === -1) {
        validators.push(Validators.requiredTrue);
      } else if (!Array.isArray(validators) && validators !== Validators.requiredTrue) {
        // Ist es nur ein einzelner Validator und nicht .requiredTrue? Dann Array erstellen und beide kombinieren
        validators = [validators, Validators.requiredTrue];
      }
    } else if (this.luxRequired === false) {
      if (Array.isArray(validators)) {
        validators = validators.filter((validator: ValidatorFn) => validator !== Validators.requiredTrue);
      } else if (validators === Validators.requiredTrue) {
        validators = undefined;
      }
    }

    return validators;
  }

  protected triggerOutputPatternCheck() {
    this.checkOutputPatternViolation(this.luxCheckedChange.observers);
  }

  protected triggerInputPatternCheck(simpleChanges: SimpleChanges) {
    this.checkInputPatternViolation(simpleChanges.luxChecked);
  }

  // endregion
}
