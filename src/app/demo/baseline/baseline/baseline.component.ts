import { Component, HostBinding } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lux-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.scss']
})
export class BaselineComponent {
  @HostBinding('class.show-frames') showFrames = false;
  showAsColumn = false;
  disabled = false;
  form: UntypedFormGroup = undefined;

  constructor() {
    this.form = new UntypedFormGroup({
      input: new UntypedFormControl('', Validators.required),
      textarea: new UntypedFormControl('', Validators.required),
      datepicker: new UntypedFormControl('', Validators.required),
      autocomplete: new UntypedFormControl('', Validators.required),
      select: new UntypedFormControl('', Validators.required),
      radio: new UntypedFormControl('', Validators.required),
      checkbox: new UntypedFormControl('', Validators.requiredTrue),
      toggle: new UntypedFormControl('', Validators.requiredTrue),
      slider: new UntypedFormControl('4', Validators.min(10)),
      file: new UntypedFormControl('', Validators.required)
    });
  }

  toggleErrors($event: boolean) {
    Object.keys(this.form.controls).forEach((key) => {
      if ($event) {
        this.form.get(key).markAsTouched();
      } else {
        this.form.get(key).markAsUntouched();
      }
      this.form.get(key).updateValueAndValidity();
    });
  }
}
