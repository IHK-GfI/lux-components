import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { LuxFormComponentBase } from '../lux-form-model/lux-form-component-base.class';

export const luxFormControlWrapperSelektor = 'lux-form-control-wrapper';

@Component({
  selector: 'lux-form-control-wrapper',
  templateUrl: './lux-form-control-wrapper.component.html',
  styleUrls: ['./lux-form-control-wrapper.component.scss']
})
export class LuxFormControlWrapperComponent {

  focused: boolean;

  @HostBinding('class.lux-form-control-scalable-height') _luxScalableHeight = false;
  @HostBinding('class.lux-form-control-no-top-label') _luxNoTopLabel = false;
  @HostBinding('class.lux-form-control-no-labels') _luxNoLabels = false;
  @HostBinding('class.lux-form-control-no-bottom-label') _luxNoBottomLabel = false;
  // @HostBinding('class.lux-form-control-borderless') _luxHideBottomBorder = false;

  /**
   * Die zugrunde liegende FormComponent
   */
  @Input() luxFormComponent: LuxFormComponentBase;
  @Input() luxFormComponentElementRef: ElementRef;
  @Input() luxIgnoreDefaultLabel = false;
  @Input() luxCounterLabel = ''; 
  @Input() luxHideCounterLabel = false;
  @Input() luxLabelLongFormat = false;
  @Input() luxNoInputRow = false;

  /**
   * Dient dazu, eine Component beliebig Hoch werden zu lassen (z.B. Textarea oder Radio).
   *
   * @param scalable
   */
  @Input() set luxScalableHeight(scalable: boolean) {
    this._luxScalableHeight = scalable;
  }

  get luxScalableHeight(): boolean {
    return this._luxScalableHeight;
  }

  /**
   * Dient dazu, bei einer Component den Label-Container auszublenden.
   *
   * @param noLabel
   */
  @Input() set luxNoTopLabel(noLabel: boolean) {
    this._luxNoTopLabel = noLabel;
  }

  get luxNoTopLabel(): boolean {
    return this._luxNoTopLabel;
  }

  /**
   * Dient dazu, bei einer Component den Label-Container und den Misc-Container auszublenden.
   *
   * @param noLabel
   */
  @Input() set luxNoLabels(noLabel: boolean) {
    this._luxNoLabels = noLabel;
  }

  get luxNoLabels(): boolean {
    return this._luxNoLabels;
  }

  /**
   * Dient dazu, bei einer Component den Misc-Container auszublenden.
   *
   * @param noLabel
   */
  @Input() set luxNoBottomLabel(noLabel: boolean) {
    this._luxNoBottomLabel = noLabel;
  }

  get luxNoBottomLabel(): boolean {
    return this._luxNoBottomLabel;
  }

  /**
   * Bestimmt ob die untere Border ausgeblendet werden soll oder nicht (z.B. bei Checkbox).
   *
   * @param hide
   */
  // @Input() set luxHideBottomBorder(hide: boolean) {
  //   this._luxHideBottomBorder = hide;
  // }

  // get luxHideBottomBorder(): boolean {
  //   return this._luxHideBottomBorder;
  // }
  
  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gibt wieder, ob der Fehler für diese FormComponent dargestellt werden soll.
   */
  shouldDisplayError() {
    return this.luxFormComponent.errorMessage && this.luxFormComponent.formControl.touched;
  }

  shouldDisplayMisc() {
    return (!this.luxNoBottomLabel && !this.luxNoLabels)
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
    console.log('Wrapper FocusIn: ', this.focused);
  }

  /**
   * Deaktiviert den Fokus dieser Component.
   */
  focusout() {
    this.focused = false;
    this.cdr.detectChanges();
    console.log('Wrapper FocusOut: ', this.focused);
  }
}