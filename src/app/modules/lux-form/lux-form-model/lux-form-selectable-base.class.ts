import { LuxFormComponentBase } from './lux-form-component-base.class';
import { ChangeDetectorRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für die Auswahl von
 * Optionen aus einem Array anbieten (Radio-Buttons und Selects z.B.).
 */
export abstract class LuxFormSelectableBase extends LuxFormComponentBase {
  private _luxOptions: any[] = [];

  @Output() luxSelectedChange: EventEmitter<any> = new EventEmitter();

  @Input() luxOptionLabelProp: string = '';
  @Input() luxTagId: string;
  @Input() luxPickValue: (selected) => {};
  @Input() luxReadonly: boolean;
  @Input() luxCompareWith = (o1, o2) => o1 === o2;

  get luxSelected(): any {
    return this.getValue();
  }

  @Input() set luxSelected(selected: any) {
    this.setValue(selected);
  }

  get luxOptions(): any[] {
    return this._luxOptions;
  }

  @Input() set luxOptions(options: any[]) {
    this._luxOptions = options;
    this.checkSelectedAndUpdate(this.luxSelected);
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

  notifyFormValueChanged(formValue: any) {
    this.checkSelectedAndUpdate(formValue);
  }

  // endregion

  /**
   * Versucht, wenn Options und FormControl vorhanden sind, den selected-Wert mit den Options
   * zu vergleichen und dann auch wenn möglich als luxSelected-Wert zu sichern.
   * @param selected
   */
  private checkSelectedAndUpdate(selected: any) {
    if (this.luxOptions && this.luxOptions.length > 0 && this.formControl) {
      if (this.luxPickValue && selected instanceof Object && !Array.isArray(selected)) {
        // Wenn der Wert zufälligerweise noch ein Objekt sein sollte, versuchen den Key auszulesen
        selected = this.luxPickValue(selected);

        // Da der Wert neu gesetzt wurde, diesen im nächsten Zyklus erst in die Werte schreiben
        setTimeout(() => {
          this.checkSelectedAndUpdate(selected);
        });
      } else {
        // Für den Fall, das der eingesetzte Wert sich doch noch vom FormControl-Value unterscheidet,
        // diesen ergänzen
        if (this.luxSelected !== selected) {
          this.luxSelected = selected;
        }
        this.checkSelectedInOptions(selected);
        setTimeout(() => {
          this.luxSelectedChange.emit(selected);
        });
      }
    }
  }

  /**
   * Prüft ob der übergebene Wert in den luxOptions ist.
   * Kann auch ein Array als "selected" enthalten.
   * Wenn der Wert nicht gefunden werden konnte wird eine Fehlermeldung in der console ausgegeben.
   * @param selected
   */
  private checkSelectedInOptions(selected: any) {
    const selectedAsArray = Array.isArray(selected) ? selected : [selected];
    if (selected && this.luxOptions && !this.allSelectedInOptions(selectedAsArray)) {
      // Selected nicht in Options = einen Fehler in die Console loggen
      this.logSelectedNotFound(selected);
    }
  }

  /**
   * Prüft ob die übergebenen Select-Objekte in den luxOptions enthalten sind.
   * @param selectedAsArray
   */
  private allSelectedInOptions(selectedAsArray: any[]): boolean {
    // Prüfen ob ein Unterarray von Elementen existiert.
    const optionsHasSubarray =
      this.luxOptions.length === 0
        ? false
        : // Dieses kann direkt in den Options stehen oder als value-Property
          Array.isArray(this.luxOptions[0]) ||
          (!!this.luxPickValue && Array.isArray(this.luxPickValue(this.luxOptions[0])));

    const targetLength = optionsHasSubarray ? 1 : selectedAsArray.length;
    const length = this.luxOptions.filter((optionEntry: any) => {
      if (optionsHasSubarray) {
        return this.luxPickValue
          ? this.luxPickValue(optionEntry) === selectedAsArray
          : this.compareObjects(optionEntry, selectedAsArray);
      } else {
        return selectedAsArray.find((selectedEntry: any | any[]) => {
          return this.luxPickValue
            ? this.luxPickValue(optionEntry) === selectedEntry
            : this.compareObjects(optionEntry, selectedEntry);
        });
      }
    }).length;

    return length === targetLength;
  }

  /**
   * Loggt die Fehlermeldung in die Console, wenn das neue Value-Objekt nicht in den Options gefunden
   * werden konnte.
   * @param selected
   */
  private logSelectedNotFound(selected: any) {
    this.logger.error(
      `\n### Das Objekt ${JSON.stringify(selected)} ist nicht Teil der möglichen Optionen.\n` +
        `\n### Komponente: "${this}"\n` +
        `Prüfen Sie evtl. die luxCompareWith-Funktion, um Properties anstelle ganzer Objekte zu vergleichen.`
    );
  }

  /**
   * Kapselung von der übergebenen luxCompareWith-Funktion.
   * Fängt undefinierte Objekte ab und returned stattdessen false.
   * @param o1
   * @param o2
   */
  compareObjects = (o1, o2) => {
    if ((!o1 && o2) || (o1 && !o2)) {
      return false;
    } else if (this.luxCompareWith && !!o1 && !!o2) {
      return this.luxCompareWith(o1, o2);
    } else {
      return o1 === o2;
    }
  };

  protected triggerOutputPatternCheck() {
    this.checkOutputPatternViolation(this.luxSelectedChange.observers);
  }

  protected triggerInputPatternCheck(simpleChanges: SimpleChanges) {
    this.checkInputPatternViolation(simpleChanges.luxSelected);
  }
}
