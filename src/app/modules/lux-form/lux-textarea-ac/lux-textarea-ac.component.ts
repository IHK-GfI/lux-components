import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-textarea-ac',
  templateUrl: './lux-textarea-ac.component.html',
  styleUrls: []
})
export class LuxTextareaAcComponent<T = string> extends LuxFormInputBaseClass<T> implements OnInit {
  @Input() luxMaxRows = -1;
  @Input() luxMinRows = 0;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;
  @Input() luxHideCounterLabel = false;
  @Input() set luxMaxLength(maxLength: number) {
    this._luxMaxLength = maxLength;
    if (this.formControl) {
      // Erst nach ngOnInit() vorhanden
      this.updateCounterLabel();
    }
  }
  get luxMaxLength() {
    return this._luxMaxLength;
  }

  focused = false;
  counterLabel = '';
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
  }

  notifyFormValueChanged(formValue: any) {
    this.updateCounterLabel();
    super.notifyFormValueChanged(formValue);
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

  private updateCounterLabel() {
    if (this.luxMaxLength > 0) {
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
