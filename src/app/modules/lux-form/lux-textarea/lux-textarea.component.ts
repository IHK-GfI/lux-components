import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-textarea',
  templateUrl: './lux-textarea.component.html',
  styleUrls: ['./lux-textarea.component.scss']
})
export class LuxTextareaComponent extends LuxFormInputBaseClass implements OnInit {
  @Input() luxMaxRows = -1;
  @Input() luxMinRows = 0;
  @Input() set luxMaxLength(maxLength: number){
    this._luxMaxLength = maxLength;
    if (this.formControl) { //erst nach ngOnInit() vorhanden
      this.updateCounterLabel();
    }
  };
  get luxMaxLength(){
    return this._luxMaxLength;
  };
  @Input() luxHideCounterLabel = false;

  _luxMaxLength = 0;
  counterLabel = '';
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

  private updateCounterLabel(){
    if (this.luxMaxLength > 0){
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
