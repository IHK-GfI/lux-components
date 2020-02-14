import { FormGroup, Validators } from '@angular/forms';

/**
 * Fügt dem FormControl den required-Validator hinzu bzw. entfernt ihn.
 * @param addValidator
 * @param form
 * @param controlName
 */
export const setRequiredValidatorForFormControl = (addValidator: boolean, form: FormGroup, controlName: string) => {
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
 * @param shouldLog
 * @param msg
 * @param event
 */
export const logResult = (shouldLog: boolean, msg: string, event?: any) => {
  if (!shouldLog) {
    return;
  }
  console.log(msg, event ? event : '');
};

/**
 * Beispielhafte ErrorCallback-Funktion, welche von den Beispielen genutzt wird.
 * @param value
 * @param errors
 */
export const exampleErrorCallback = (value, errors) => {
  if (errors.required) {
    return 'Achtung, dies ist ein Pflichtfeld.';
  }
  return 'Es ist ein Fehler aufgetreten.';
};

/**
 * Beispielhafte pickValue-Funktion die von einigen Beispielen genutzt wird.
 * Geht davon aus, das die Option eine value-Property hat.
 *
 * @param option
 */
export const examplePickValueFn = (option: any) => {
  return option.value;
};

/**
 * Beispielhafte compareWith-Funktion die von einigen Beispielen genutzt wird.
 * Geht davon aus, das die Options value-Properties haben.
 * @param o1
 * @param o2
 */
export const exampleCompareWithFn = (o1: any, o2: any) => {
  return o1.value === o2.value;
};
