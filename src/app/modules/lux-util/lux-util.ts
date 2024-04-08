import { FormArray, FormControl, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { LuxBgAllColor, LuxBgAllColors } from './lux-colors.enum';
import {
  BACKSPACE,
  DELETE,
  DOWN_ARROW,
  END,
  ENTER,
  ESCAPE,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  SPACE,
  TAB,
  UP_ARROW
} from '@angular/cdk/keycodes';

export class LuxUtil {
  public static readonly ISO_8601_FULL = new RegExp('^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$', 'i');

  /**
   * Diese Methode wirft einen Fehler, wenn der Wert nicht gesetzt wurde.
   * @param name Ein Name.
   * @param value Ein Wert.
   */
  public static assertNonNull(name: string, value: any) {
    if (value === undefined || value === null) {
      throw Error(`${name} should be initialized.`);
    }
  }

  /**
   * Liest aus einem Objekt ein bestimmtes Feld aus.
   * Lässt sich auch über mehrere Unterobjekte verschachteln.
   * Beispiele für propertyNamePath:
   * "value"
   * "unterobjekt1.unterobjekt2.value"
   * @param el
   * @param propertyNamePath
   * @returns any
   */
  public static readPropertyValueFromObject(el: any, propertyNamePath: string): any {
    let result = null;
    if (el && propertyNamePath) {
      const splitProperties = propertyNamePath.split('.');

      if (splitProperties.length > 0) {
        let tempObject = el;

        for (const property of splitProperties) {
          tempObject = tempObject[property];
        }
        result = tempObject;
      } else {
        result = el[propertyNamePath];
      }
    }
    return result;
  }

  /**
   * Gibt eine von verschiedenen vordefinierten Fehlernachrichten passend zu den
   * vorhandenen Fehlern der übergebenen FormControl zurück.
   * @param formControl
   * @returns string
   */
  public static getErrorMessage(formControl: FormControl<any>): string {
    if (formControl) {
      if (formControl.hasError('required')) {
        return $localize`:@@luxc.util.error_message.required:* Pflichtfeld`;
      }

      if (formControl.hasError('minlength')) {
        return $localize`:@@luxc.util.error_message.minlength:Die Mindestlänge ist ${formControl.getError('minlength').requiredLength}`;
      }

      if (formControl.hasError('maxlength')) {
        return $localize`:@@luxc.util.error_message.maxlength:Die Maximallänge ist ${formControl.getError('maxlength').requiredLength}`;
      }

      if (formControl.hasError('email')) {
        return $localize`:@@luxc.util.error_message.email:Dies ist keine gültige E-Mailadresse`;
      }

      if (formControl.hasError('min')) {
        return $localize`:@@luxc.util.error_message.min:Der Minimalwert ist ${formControl.getError('min').min}`;
      }

      if (formControl.hasError('max')) {
        return $localize`:@@luxc.util.error_message.max:Der Maximalwert ist ${formControl.getError('max').max}`;
      }

      if (formControl.hasError('pattern')) {
        const pattern = formControl.getError('pattern').requiredPattern;
        return $localize`:@@luxc.util.error_message.pattern:Entspricht nicht dem Muster "${pattern.substring(1, pattern.length - 1)}"`;
      }
    }
    return '';
  }

  /**
   * Prüft, ob der übergebene Wert ein JS-Datum ist.
   * @param value
   * @returns boolean
   */
  public static isDate(value: any) {
    return value instanceof Date && !isNaN(value.valueOf());
  }

  /**
   * Diese Methode liefert ein neues Date-Objekt auf Basis des übergebenen Date-Objekts zurück.
   * Das zurückgelieferte Date-Objekt hat denselben Tag, Monat und das Jahr wie das übergebene Date-Objekt,
   * die Stunden, Minuten und Sekunden sind jedoch 0.
   *
   * Sollte der Methode kein Date-Objekt übergeben werden, wird ein neues Date-Objekt erzeugt.
   * @param date oder nichts
   * @returns date
   */
  public static newDateWithoutTime(date = new Date()): Date {
    const result = new Date(0);
    result.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    return result;
  }

  /**
   * Zeigt die Validierungsfehler der einzelnen FormControls innerhalb der FormGroup an.
   * Wenn innerhalb der übergebenen FormGroup weitere Formgroups enthalten sind, werden
   * diese ebenfalls validiert.
   * @param formGroup
   */
  public static showValidationErrors(formGroup: FormGroup | UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup || control instanceof UntypedFormGroup) {
        this.showValidationErrors(control);
      } else if (control instanceof FormArray || control instanceof UntypedFormArray) {
        control.controls.forEach((current) => {
          if (current instanceof FormGroup || current instanceof UntypedFormGroup) {
            this.showValidationErrors(current);
          } else if (current) {
            control.markAsTouched({ onlySelf: true });
          }
        });
      } else if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  /**
   * Diese Methode scrollt zu der übergebenen Id.
   * @param id Eine Element-Id (z.B. <tag id="myId">...)
   */
  public static goTo(id: string): void {
    const element = document.querySelector('#' + id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView();
      });
    }
  }

  /**
   * Diese Methode scrollt zum übergebenen Selector.
   * @param selector Ein Selector. Sollte kein Selector übergeben werden, wird nach oben vom Inhaltsbereich gescrollt.
   */
  public static goToTop(selector = 'div.lux-app-content-container') {
    const element = document.querySelector(selector);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView();
      });
    }
  }

  /**
   * Diese Methode verhindert, dass ein Event weiterverarbeitet wird.
   * @param event Ein beliebiges Event.
   */
  public static stopEventPropagation(event: Event) {
    if (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        console.log('Die Funktion "event.stopPropagation()" wird nicht unterstützt.');
      }
    }
  }

  public static getColorsByBgColorsEnum(color: LuxBgAllColor | undefined): { backgroundCSSClass: string; fontCSSClass: string } {
    const result = { backgroundCSSClass: 'lux-bg-color-blue', fontCSSClass: 'lux-font-color-white' };

    const found = LuxBgAllColors.find((entry) => entry === color);
    if (found) {
      result.backgroundCSSClass = 'lux-bg-color-' + color;
      switch (color) {
        case 'white':
          result.fontCSSClass = 'lux-font-color-black';
          break;
        default:
          result.fontCSSClass = 'lux-font-color-white';
          break;
      }
    }

    return result;
  }

  public static isNumber(toCheck: any): boolean {
    return !Number.isNaN(+toCheck);
  }

  public static base64ToArrayBuffer(data: string) {
    const binaryString = window.atob(data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowLeft-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowLeft(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowLeft' || key === LEFT_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowUp-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowUp(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowUp' || key === UP_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowRight-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowRight(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowRight' || key === RIGHT_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowDown-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowDown(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowDown' || key === DOWN_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Home-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyHome(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Home' || key === HOME;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die End-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyEnd(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'End' || key === END;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die PageDown-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyPageDown(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'PageDown' || key === PAGE_DOWN;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die PageUp-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyPageUp(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'PageUp' || key === PAGE_UP;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Enter-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyEnter(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Enter' || key === ENTER;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Tab-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyTab(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Tab' || key === TAB;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Backspace-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyBackspace(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Backspace' || key === BACKSPACE;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Space-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeySpace(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Space' || key === 'Spacebar' || key === ' ' || key === SPACE;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Delete-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyDelete(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Delete' || key === 'Del' || key === DELETE;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Escape-Taste handelt, false sonst.
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyEscape(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Escape' || key === 'Esc' || key === ESCAPE;
  }

  private static getKey(event: KeyboardEvent): string | number {
    return event.key || event.keyCode;
  }

  /**
   * Entfernt nicht-ASCII-Chars aus dem String (Beim IE wichtig, dieser fügt gerne versteckte Steuerzeichen
   * in Input-Feldern an die Strings).
   * @param dateString
   */
  public static stringWithoutASCIIChars(dateString: string): string {
    const exp = new RegExp('[^A-Za-z 0-9.,?"!@#$%^&*()-_=+;:<>\\/\\\\|}{\\[\\]`~]*', 'g');
    return dateString.replace(exp, '');
  }

  /**
   * Diese Methode liefert für die akzeptierten Dateitypen einen I18N-Nachrichtenteil zurück.
   *
   * Beispiel: acceptTypes = .pdf,.txt,.png
   * de = PDF, TXT oder PNG
   * en = PDF, TXT or PNG
   * @param acceptTypes Die akzeptierten Dateitypen (z.b. .pdf,.txt).
   */
  public static getAcceptTypesAsMessagePart(acceptTypes: string): string {
    let message = '';

    if (acceptTypes) {
      let newAccept = acceptTypes;
      newAccept = newAccept.replace(/\./g, '');
      newAccept = newAccept.replace(/\*/g, '');

      let typesArr = newAccept.split(',');
      typesArr = typesArr.map((str) => str.trim().toUpperCase());

      for (let i = 0; i < typesArr.length; i++) {
        message += typesArr[i].toUpperCase();

        if (i === typesArr.length - 2) {
          message += $localize`:@@luxc.file.upload.file.type.concat: oder `;
        } else if (typesArr.length > 1 && i < typesArr.length - 2) {
          message += ', ';
        }
      }
    }

    return message;
  }
}
