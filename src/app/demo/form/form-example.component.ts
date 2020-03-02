import { Component, ViewChild } from '@angular/core';
import { FormCommonComponent } from './form-common/form-common.component';
import { FormDualColComponent } from './form-dual-col/form-dual-col.component';
import { FormSingleColComponent } from './form-single-col/form-single-col.component';
import { FormThreeColComponent } from './form-three-col/form-three-col.component';
import { IUnsavedDataCheck } from './unsaved-data-guard/unsaved-data-check.interface';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html'
})
export class FormExampleComponent implements IUnsavedDataCheck {
  @ViewChild(FormCommonComponent) formCommon: FormCommonComponent;
  @ViewChild(FormSingleColComponent) formSingle: FormSingleColComponent;
  @ViewChild(FormDualColComponent) formDuo: FormDualColComponent;
  @ViewChild(FormThreeColComponent) formThree: FormThreeColComponent;

  constructor() {}

  hasUnsavedData(): boolean {
    return (
      this.formCommon.myGroup.dirty ||
      this.formSingle.myGroup.dirty ||
      this.formDuo.myGroup.dirty ||
      this.formThree.myGroup.dirty
    );
  }
}
