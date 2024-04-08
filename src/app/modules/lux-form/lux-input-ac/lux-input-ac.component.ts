import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxInputAcPrefixComponent } from '../lux-input-ac/lux-input-ac-subcomponents/lux-input-ac-prefix.component';
import { LuxInputAcSuffixComponent } from '../lux-input-ac/lux-input-ac-subcomponents/lux-input-ac-suffix.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxFormControlWrapperComponent } from '../lux-form-control-wrapper/lux-form-control-wrapper.component';

@Component({
  selector: 'lux-input-ac',
  templateUrl: './lux-input-ac.component.html',
  styleUrls: ['./lux-input-ac.component.scss']
})
export class LuxInputAcComponent<T = string> extends LuxFormInputBaseClass<T> implements OnInit {
  private readonly symbolRegExp = /[,.]/;

  @Input() luxType = 'text';
  @Input() luxNumberAlignLeft = false;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;
  @Input() luxHideCounterLabel = false;

  @Input() set luxMaxLength(maxLength: number) {
    this._luxMaxLength = maxLength;
    if (this.formControl) {
      //erst nach ngOnInit() vorhanden
      this.updateCounterLabel();
    }
  }

  get luxMaxLength() {
    return this._luxMaxLength;
  }

  @ContentChild(LuxInputAcPrefixComponent) inputPrefix?: LuxInputAcPrefixComponent;
  @ContentChild(LuxInputAcSuffixComponent) inputSuffix?: LuxInputAcSuffixComponent;
  @ViewChild('input', { read: ElementRef }) inputElement!: ElementRef;

  counterLabel = '';
  focused = false;
  _luxMaxLength = 0;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  ngOnInit() {
    super.ngOnInit();
    this.updateCounterLabel();
    LuxUtil.assertNonNull('inputElement', this.inputElement);
  }

  /**
   * Wird bei jedem Tastendruck auf dem Inputfeld aufgerufen.
   * @param keyboardEvent
   */
  onKeyDown(keyboardEvent: KeyboardEvent) {
    // Soll nur für number-Inputs greifen
    if (this.inputElement) {
      const value = this.inputElement.nativeElement.value;
      // Doppelte Punkt-/Komma-Setzung und E's vermeiden
      if (
        value &&
        this.symbolRegExp.test(keyboardEvent.key) &&
        (this.inputElement.nativeElement.value.match(this.symbolRegExp) || []).length > 0
      ) {
        keyboardEvent.preventDefault();
      }
    }
  }

  onFocus(e: FocusEvent) {
    this.focused = true;
    this.luxFocus.emit(e);
  }

  onFocusIn(e: FocusEvent) {
    this.focused = true;
    this.luxFocusIn.emit(e);
  }

  onFocusOut(e: FocusEvent) {
    this.focused = false;
    this.luxFocusOut.emit(e);
  }

  descripedBy() {
    if (this.errorMessage) {
      return this.uid + '-error';
    } else {
      return (this.formHintComponent || this.luxHint) && (!this.luxHintShowOnlyOnFocus || (this.luxHintShowOnlyOnFocus && this.focused))
        ? this.uid + '-hint'
        : undefined;
    }
  }

  notifyFormValueChanged(formValue: any) {
    this.updateCounterLabel();
    super.notifyFormValueChanged(formValue);
  }

  private updateCounterLabel() {
    if (this.luxMaxLength > 0 && this.luxType === 'text') {
      if (typeof this.formControl.value === 'string') {
        this.counterLabel = this.formControl.value.length + '/' + this.luxMaxLength;
      } else {
        this.counterLabel = '0/' + this.luxMaxLength;
      }
    } else {
      this.counterLabel = '';
    }
  }
}
