import { FormControl, FormGroup } from '@angular/forms';
import { LuxBackgroundColorsEnum, LuxFontColorsEnum } from './lux-colors.enum';
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
   * @param formControl
   * @returns string
   */
  public static getErrorMessage(formControl: FormControl): string {
    if (formControl) {
      if (formControl.hasError('required')) {
        return '* Pflichtfeld';
      }

      if (formControl.hasError('minlength')) {
        return 'Die Mindestlänge ist ' + formControl.getError('minlength').requiredLength;
      }

      if (formControl.hasError('maxlength')) {
        return 'Die Maximallänge ist ' + formControl.getError('maxlength').requiredLength;
      }

      if (formControl.hasError('email')) {
        return 'Dies ist keine gültige E-Mailadresse';
      }

      if (formControl.hasError('min')) {
        return 'Der Minimalwert ist ' + formControl.getError('min').min;
      }

      if (formControl.hasError('max')) {
        return 'Der Maximalwert ist ' + formControl.getError('max').max;
      }

      if (formControl.hasError('pattern')) {
        const pattern = formControl.getError('pattern').requiredPattern;
        return 'Entspricht nicht dem Muster "' + pattern.substring(1, pattern.length - 1) + '"';
      }
    }
    return '';
  }

  /**
   * Prueft ob der uebergebene Wert ein JS-Datum ist.
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
   * Prueft ob die Applikation im IE geoeffnet ist.
   * @returns boolean
   */
  public static isIE(): boolean {
    const msie = window.document['documentMode'];
    return msie && msie <= 11;
  }

  /**
   * Prueft ob die Applikation im Edge geoeffnet ist.
   * @returns boolean
   */
  public static isEdge(): boolean {
    return window.navigator.userAgent.indexOf('Edge') > -1;
  }

  /**
   * Prueft ob die Applikation im IE oder Edge geoffnet ist.
   * @returns boolean
   */
  public static isIEorEdge(): boolean {
    return LuxUtil.isIE() || LuxUtil.isEdge();
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

  public static getColorsByBgColorsEnum(color: LuxBackgroundColorsEnum): { backgroundCSSClass; fontCSSClass } {
    const result = { backgroundCSSClass: 'lux-bg-color-blue', fontCSSClass: 'lux-font-color-white' };
    if (LuxBackgroundColorsEnum[color]) {
      result.backgroundCSSClass = 'lux-bg-color-' + color;
      switch (color) {
        case LuxBackgroundColorsEnum.gray:
        case LuxBackgroundColorsEnum.orange:
        case LuxBackgroundColorsEnum.yellow:
          result.fontCSSClass = 'lux-font-color-' + LuxFontColorsEnum.black;
          break;
        default:
          result.fontCSSClass = 'lux-font-color-' + LuxFontColorsEnum.white;
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
   * @param dateString
   */
  public static stringWithoutASCIIChars(dateString: string): string {
    const exp = new RegExp('[^A-Za-z 0-9 \\.,\\?""!@#\\$%\\^&\\*\\(\\)-_=\\+;:<>\\/\\\\\\|\\}\\{\\[\\]`~]*', 'g');
    return dateString.replace(exp, '');
  }
}
