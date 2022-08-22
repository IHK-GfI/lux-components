import { UntypedFormGroup, Validators } from '@angular/forms';
import { LuxValidationErrors } from '../../../modules/lux-form/lux-form-model/lux-form-component-base.class';

/**
 * Fügt dem FormControl den required-Validator hinzu bzw. entfernt ihn.
 *
 * @param addValidator
 * @param form
 * @param controlName
 */
export const setRequiredValidatorForFormControl = (addValidator: boolean, form: UntypedFormGroup, controlName: string) => {
  if (addValidator) {
    form.get(controlName).setValidators(Validators.required);
  } else {
    form.get(controlName).setValidators(null);
  }
  form.get(controlName).updateValueAndValidity();
};

/**
 * Loggt in der Console eine Nachricht + ein Event, abhängig von einem übergebenen Flag.
 * Dient primär der Vereinheitlichung der Log-Ausgabe in den einzelnen Beispielen.
 *
 * @param shouldLog
 * @param msg
 * @param event
 */
export const logResult = (shouldLog: boolean, msg: string, event?: any) => {
  if (!shouldLog) {
    return;
  }

  // Hier wird explizit auf ungleich "undefined" und "null" geprüft und nicht auf "event ? event : ''",
  // sonst würden z.B. die folgenden Events nicht geloggt werden:
  // - 0, wenn Event vom Typ "number" ist,
  // - false, wenn Event vom Typ "boolean" ist,
  // - ...
  console.log(msg, event !== undefined && event !== null ? event : '');
};

/**
 * Beispielhafte ErrorCallback-Funktion, welche von den Beispielen genutzt wird.
 *
 * @param value
 * @param errors
 */
export const exampleErrorCallback = (value: any, errors: LuxValidationErrors) => {
  console.log('exampleErrorCallback (value =', value, ', errors =', errors + ')');
  if (errors.required) {
    return 'Achtung, dies ist ein Pflichtfeld.';
  }
  return 'Es ist ein Fehler aufgetreten.';
};

/**
 * Eine ErrorCallback-Funktion die immer undefined zurückliefert.
 */
export const emptyErrorCallback = () => undefined;

/**
 * Beispielhafte pickValue-Funktion die von einigen Beispielen genutzt wird.
 * Geht davon aus, dass die Option eine value-Property hat.
 *
 * @param option
 */
export const examplePickValueFn = (option: any) => {
  console.log(`examplePickValueFn`);
  return option.value;
};

/**
 * Beispielhafte compareWith-Funktion die von einigen Beispielen genutzt wird.
 * Geht davon aus, das die Options value-Properties haben.
 *
 * @param o1
 * @param o2
 */
export const exampleCompareWithFn = (o1: any, o2: any) => o1.value === o2.value;
