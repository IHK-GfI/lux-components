import { LuxFormComponentBase } from './lux-form-component-base.class';
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

export declare type LuxPickValueFnType<O = any,V = any> = ((option: O) => V) | undefined;
export declare type LuxCompareWithFnType<O = any> = ((o1: O, o2: O) => boolean) | undefined;

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für die Auswahl von
 * Optionen aus einem Array anbieten (Radio-Buttons und Selects z.B.).
 *
 * @param O Optionstyp (z.B Land)
 * @param V Werttyp (z.B. Land, Land[], string, string[],...)
 * @param P PickValueFn-Typ (z.B. string, number,...)
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormSelectableBase<O = any, V = any, P = any> extends LuxFormComponentBase<V> {
  _luxOptions: any[] = [];
  _luxOptionsPickValue: any[] = [];
  _luxPickValue?: LuxPickValueFnType<O,P>;
  _luxCompareWith = (o1: O, o2: O) => o1 === o2;

  @Output() luxSelectedChange = new EventEmitter<any>();
  @Input() luxOptionLabelProp? = '';
  @Input() luxTagId?: string;

  get luxCompareWith(): LuxCompareWithFnType | undefined {
    return this._luxCompareWith;
  }

  @Input()
  set luxCompareWith(compareFn: LuxCompareWithFnType | undefined){
    this._luxCompareWith = compareFn ?? ((o1: O, o2: O) => o1 === o2);
  }

  get luxSelected(): V | null {
    return this.getValue();
  }

  @Input() set luxSelected(selected: V | null) {
    this.setValue(selected as V);
  }

  get luxPickValue(): LuxPickValueFnType<O,P> {
    return this._luxPickValue;
  }

  @Input() set luxPickValue(pickValueFn:LuxPickValueFnType<O,P>) {
    this._luxPickValue = pickValueFn;
    this._luxOptionsPickValue = [];

    if (pickValueFn && this.luxOptions) {
      this._luxOptions.forEach(option => this._luxOptionsPickValue.push(pickValueFn(option)));
    }
  }

  get luxOptions(): any[] {
    return this._luxOptions;
  }

  @Input() set luxOptions(options: any[]) {
    this._luxOptions = options;
    this._luxOptionsPickValue = [];

    const pickValueFn = this.luxPickValue;
    if (this._luxOptions && pickValueFn) {
      this._luxOptions.forEach(option => this._luxOptionsPickValue.push(pickValueFn(option)));
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
   * zu vergleichen und wenn möglich als luxSelected-Wert zu sichern.
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
        // Für den Fall, dass der eingesetzte Wert sich doch noch vom FormControl-Value unterscheidet,
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
  compareObjects = (o1: O, o2: O) => {
    if ((!o1 && o2) || (o1 && !o2)) {
      return false;
    } else {
      return this._luxCompareWith(o1, o2);
    }
  };

}
