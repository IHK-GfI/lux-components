import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxInputPrefixComponent } from './lux-input-subcomponents/lux-input-prefix.component';
import { LuxInputSuffixComponent } from './lux-input-subcomponents/lux-input-suffix.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-input',
  templateUrl: './lux-input.component.html',
  styleUrls: ['./lux-input.component.scss']
})
export class LuxInputComponent extends LuxFormInputBaseClass implements OnInit{
  private readonly symbolRegExp = /[,.]/;

  @Input() luxType = 'text';
  @Input() luxNumberAlignLeft = false;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;
  @Input() luxHideCounterLabel = false;

  @Input() set luxMaxLength(maxLength: number){
    this._luxMaxLength = maxLength;
    if (this.formControl) { //erst nach ngOnInit() vorhanden
      this.updateCounterLabel();
    }
  };

  get luxMaxLength(){
    return this._luxMaxLength;
  };

  @ContentChild(LuxInputPrefixComponent) inputPrefix: LuxInputPrefixComponent;
  @ContentChild(LuxInputSuffixComponent) inputSuffix: LuxInputSuffixComponent;
  @ViewChild('input', { read: ElementRef }) inputElement: ElementRef;

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

  ngOnInit(){
    super.ngOnInit();
    this.updateCounterLabel();
  }

  /**
   * Wird bei jedem Tastendruck auf dem Inputfeld aufgerufen.
   *
   * @param $event
   */
  onKeyDown($event: KeyboardEvent) {
    // Soll nur für number-Inputs greifen
    if (this.inputElement) {
      const value = this.inputElement.nativeElement.value;
      // Doppelte Punkt-/Komma-Setzung und E's vermeiden
      if (
        value &&
        this.symbolRegExp.test($event.key) &&
        (this.inputElement.nativeElement.value.match(this.symbolRegExp) || []).length > 0
      ) {
        $event.preventDefault();
      }
    }
  }

  notifyFormValueChanged(formValue: any) {
    this.updateCounterLabel();
    super.notifyFormValueChanged(formValue);
  }

  private updateCounterLabel(){
    if (this.luxMaxLength > 0 && this.luxType === 'text'){
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
