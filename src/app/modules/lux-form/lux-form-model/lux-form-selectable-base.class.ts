import { LuxFormComponentBase } from './lux-form-component-base.class';
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für die Auswahl von
 * Optionen aus einem Array anbieten (Radio-Buttons und Selects z.B.).
 *
 * @param o1
 * @param o2
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormSelectableBase extends LuxFormComponentBase {
  _luxOptions: any[] = [];
  _luxOptionsPickValue: any[] = [];
  _luxPickValue: (selected) => {};

  @Output() luxSelectedChange: EventEmitter<any> = new EventEmitter();
  @Input() luxOptionLabelProp = '';
  @Input() luxTagId: string;
  @Input() luxCompareWith = (o1, o2) => o1 === o2;

  get luxSelected(): any {
    return this.getValue();
  }

  @Input() set luxSelected(selected: any) {
    this.setValue(selected);
  }

  get luxPickValue(): (selected) => {} {
    return this._luxPickValue;
  }

  @Input() set luxPickValue(pickValueFn: (selected) => {}) {
    this._luxPickValue = pickValueFn;
    this._luxOptionsPickValue = [];

    if (this._luxPickValue && this.luxOptions) {
      this._luxOptions.forEach(option => this._luxOptionsPickValue.push(this.luxPickValue(option)));
    }
  }

  get luxOptions(): any[] {
    return this._luxOptions;
  }

  @Input() set luxOptions(options: any[]) {
    this._luxOptions = options;
    this._luxOptionsPickValue = [];

    if (this._luxOptions && this.luxPickValue) {
      this._luxOptions.forEach(option => this._luxOptionsPickValue.push(this.luxPickValue(option)));
    }
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
   *
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
        this.luxSelectedChange.emit(selected);
      }
    }
  }

  /**
   * Kapselung von der übergebenen luxCompareWith-Funktion.
   * Fängt undefinierte Objekte ab und returned stattdessen false.
   *
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

}
