import { FormControl, FormGroup } from '@angular/forms';
import { LuxBgAllColor, LuxBgAllColors } from "./lux-colors.enum";
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
  public static readonly ISO_8601_FULL = new RegExp(
    '^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$',
    'i'
  );

  /**
   * Prueft ob ein String leer ist.
   *
   * @param str
   * @returns boolean
   */
  public static isEmpty(str): boolean {
    return !str || 0 === str.length;
  }

  /**
   * Liest aus einem Objekt ein bestimmtes Feld aus.
   * Laesst sich auch ueber mehrere Unterobjekte verschachteln.
   * Beispiele fuer propertyNamePath:
   * "value"
   * "unterobjekt1.unterobjekt2.value"
   *
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
   * vorhandenen Fehlern der uebergebenen FormControl zurueck.
   *
   * @param formControl
   * @returns string
   */
  public static getErrorMessage(formControl: FormControl): string {
    if (formControl) {
      if (formControl.hasError('required')) {
        return $localize `:@@luxc.util.error_message.required:* Pflichtfeld`;
      }

      if (formControl.hasError('minlength')) {
        return $localize `:@@luxc.util.error_message.minlength:Die Mindestlänge ist ${formControl.getError('minlength').requiredLength}`;
      }

      if (formControl.hasError('maxlength')) {
        return $localize `:@@luxc.util.error_message.maxlength:Die Maximallänge ist ${formControl.getError('maxlength').requiredLength}`;
      }

      if (formControl.hasError('email')) {
        return $localize `:@@luxc.util.error_message.email:Dies ist keine gültige E-Mailadresse`;
      }

      if (formControl.hasError('min')) {
        return $localize `:@@luxc.util.error_message.min:Der Minimalwert ist ${formControl.getError('min').min}`;
      }

      if (formControl.hasError('max')) {
        return $localize `:@@luxc.util.error_message.max:Der Maximalwert ist ${formControl.getError('max').max}`;
      }

      if (formControl.hasError('pattern')) {
        const pattern = formControl.getError('pattern').requiredPattern;
        return $localize `:@@luxc.util.error_message.pattern:Entspricht nicht dem Muster "${pattern.substring(1, pattern.length - 1)}"`;
      }
    }
    return '';
  }

  /**
   * Prueft ob der uebergebene Wert ein JS-Datum ist.
   *
   * @param value
   * @returns boolean
   */
  public static isDate(value: any) {
    return value instanceof Date && !isNaN(value.valueOf());
  }

  /**
   * Zeigt die Validierungsfehler der einzelnen FormControls innerhalb der FormGroup an.
   * Wenn innerhalb der übergebenen FormGroup weitere Formgroups enthalten sind, werden
   * diese ebenfalls validiert.
   *
   * @param formGroup
   */
  public static showValidationErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.showValidationErrors(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  /**
   * Diese Methode scrollt zu der übergebenen Id.
   *
   * @param id Eine Elementid (z.B. <tag id="myId">...)
   */
  public static goTo(id: string): void {
    const element: Element = document.querySelector('#' + id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView();
      });
    }
  }

  /**
   * Diese Methode verhindert, dass ein Event weiterverarbeitet wird.
   *
   * @param event Ein beliebiges Event.
   */
  public static stopEventPropagation(event) {
    if (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        console.log('Die Funktion "event.stopPropagation()" wird nicht unterstützt.');
      }
    }
  }

  public static getColorsByBgColorsEnum(color: LuxBgAllColor): { backgroundCSSClass; fontCSSClass } {
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

  public static base64ToArrayBuffer(data) {
    const binaryString = window.atob(data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowLeft-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowLeft(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowLeft' || key === LEFT_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowUp-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowUp(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowUp' || key === UP_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowRight-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowRight(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowRight' || key === RIGHT_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die ArrowDown-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyArrowDown(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'ArrowDown' || key === DOWN_ARROW;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Home-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyHome(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Home' || key === HOME;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die End-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyEnd(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'End' || key === END;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die PageDown-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyPageDown(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'PageDown' || key === PAGE_DOWN;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die PageUp-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyPageUp(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'PageUp' || key === PAGE_UP;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Enter-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyEnter(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Enter' || key === ENTER;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Tab-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyTab(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Tab' || key === TAB;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Backspace-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyBackspace(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Backspace' || key === BACKSPACE;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Space-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeySpace(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Space' || key === 'Spacebar' || key === ' ' || key === SPACE;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Delete-Taste handelt, false sonst.
   *
   * @param event Ein beliebiges KeyboardEvent
   */
  public static isKeyDelete(event: KeyboardEvent) {
    const key = this.getKey(event);

    return key === 'Delete' || key === 'Del' || key === DELETE;
  }

  /**
   * Diese Methode liefert true zurück, wenn es sich um die Escape-Taste handelt, false sonst.
   *
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
   *
   * @param dateString
   */
  public static stringWithoutASCIIChars(dateString: string): string {
    const exp = new RegExp('[^A-Za-z 0-9 \\.,\\?""!@#\\$%\\^&\\*\\(\\)-_=\\+;:<>\\/\\\\\\|\\}\\{\\[\\]`~]*', 'g');
    return dateString.replace(exp, '');
  }
}
