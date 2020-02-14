import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { LuxFormComponentBase } from '../lux-form-model/lux-form-component-base.class';

export const luxFormControlSelektor: string = 'lux-form-control';

/**
 * @author dron
 * @description Diese Component wird von den anderen LUX-FormControls genutzt, um eine einheitliche Baseline zu erreichen.
 */

@Component({
  selector: 'lux-form-control',
  templateUrl: './lux-form-control.component.html',
  styleUrls: ['./lux-form-control.component.scss']
})
export class LuxFormControlComponent {
  focused: boolean;

  @HostBinding('class.lux-form-control-scalable-height') _luxScalableHeight: boolean = false;
  @HostBinding('class.lux-form-control-borderless') _luxHideBottomBorder: boolean = false;

  /**
   * Die zugrunde liegende FormComponent
   */
  @Input() luxFormComponent: LuxFormComponentBase;
  @Input() luxFormComponentElementRef: ElementRef;

  @Input() luxIgnoreDefaultLabel: boolean = false;

  /**
   * Dient dazu, eine Component beliebig Hoch werden zu lassen (z.B. Textarea oder Radio).
   * @param scalable
   */
  @Input() set luxScalableHeight(scalable: boolean) {
    this._luxScalableHeight = scalable;
  }

  get luxScalableHeight(): boolean {
    return this._luxScalableHeight;
  }

  /**
   * Bestimmt ob die untere Border ausgeblendet werden soll oder nicht (z.B. bei Checkbox).
   * @param hide
   */
  @Input() set luxHideBottomBorder(hide: boolean) {
    this._luxHideBottomBorder = hide;
  }

  get luxHideBottomBorder(): boolean {
    return this._luxHideBottomBorder;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gibt wieder, ob der Fehler für diese FormComponent dargestellt werden soll.
   */
  shouldDisplayError() {
    return this.luxFormComponent.errorMessage && this.luxFormComponent.formControl.touched;
  }

  shouldDisplayMisc() {
    return this.luxFormComponent.formHintComponent || this.luxFormComponent.luxHint || this.shouldDisplayError();
  }

  shouldDisplayLabelByProperty() {
    return !this.luxFormComponent.formLabelComponent && this.luxFormComponent.luxLabel;
  }

  shouldDisplayHintByProperty() {
    return this.luxFormComponent.formHintComponent && !this.luxFormComponent.luxHint;
  }

  /**
   * Aktiviert den Fokus dieser Component.
   */
  focusin() {
    this.focused = true;
    this.cdr.detectChanges();
  }

  /**
   * Deaktiviert den Fokus dieser Component.
   */
  focusout() {
    this.focused = false;
    this.cdr.detectChanges();
  }
}
