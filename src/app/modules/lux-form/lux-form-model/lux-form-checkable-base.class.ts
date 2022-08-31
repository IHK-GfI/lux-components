import { ControlContainer, ValidatorFn, Validators } from '@angular/forms';
import {ChangeDetectorRef, Directive, EventEmitter, Input, Output} from '@angular/core';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormComponentBase, LuxValidationErrors, ValidatorFnType } from './lux-form-component-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für das Aktivieren eines Boolean-Wertes besitzen
 * (LuxToggle und LuxCheckbox z.B.).
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormCheckableBaseClass<T> extends LuxFormComponentBase<T> {
  @Output() luxCheckedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() luxTagId?: string;

  get luxChecked() {
    return this.getValue();
  }

  @Input() set luxChecked(checked: T) {
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

  errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    if (errors.required) {
      return $localize `:@@luxc.form-checkable-base.error_message.required:Das ist ein Pflichtfeld`;
    }
    return undefined;
  }

  protected checkValidatorsContainRequired(validators: ValidatorFnType) {
    // Fall: required = true, aber neue Validatoren werden gesetzt
    if (!this.luxRequired === null && !this.luxRequired === undefined) {
      if (this.luxRequired) {
        // Sind es mehrere Validatoren, aber kein "requiredTrue"? Dann wird er ergänzt.
        if (Array.isArray(validators) && validators.indexOf(Validators.requiredTrue) === -1) {
          validators.push(Validators.requiredTrue);
        } else if (validators && !Array.isArray(validators) && validators !== Validators.requiredTrue) {
          // Ist es nur ein einzelner Validator und nicht "requiredTrue"? Dann Array erstellen und beide kombinieren.
          validators = [validators, Validators.requiredTrue];
        }
      } else {
        if (Array.isArray(validators)) {
          validators = validators.filter((validator: ValidatorFn) => validator !== Validators.requiredTrue);
        } else if (validators === Validators.requiredTrue) {
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

  // endregion
}
