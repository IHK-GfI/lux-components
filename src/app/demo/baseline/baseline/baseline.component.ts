import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILuxFileObject } from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';

interface DummyForm {
  input: FormControl<string | null>;
  textarea: FormControl<string>;
  datepicker: FormControl<string>;
  autocomplete: FormControl<string>;
  select: FormControl<string>;
  radio: FormControl<string>;
  checkbox: FormControl<boolean>;
  toggle: FormControl<boolean>;
  slider: FormControl<number>;
  file: FormControl<ILuxFileObject | null>;
}

@Component({
  selector: 'lux-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.scss']
})
export class BaselineComponent {
  @HostBinding('class.show-frames') showFrames = false;
  showAsColumn = false;
  disabled = false;
  form: FormGroup<DummyForm>;

  constructor() {
    this.form = new FormGroup<DummyForm>({
      input: new FormControl(null, { validators: Validators.required, nonNullable: false}),
      textarea: new FormControl('', { validators: Validators.required, nonNullable: true}),
      datepicker: new FormControl('', { validators: Validators.required, nonNullable: true}),
      autocomplete: new FormControl('', { validators: Validators.required, nonNullable: true}),
      select: new FormControl('', { validators: Validators.required, nonNullable: true}),
      radio: new FormControl('', { validators: Validators.required, nonNullable: true}),
      checkbox: new FormControl(false, { validators: Validators.required, nonNullable: true}),
      toggle: new FormControl(false, { validators: Validators.required, nonNullable: true}),
      slider: new FormControl(4, { validators: Validators.min(10), nonNullable: true}),
      file: new FormControl<ILuxFileObject | null>(null, Validators.required)
    });
  }

  toggleErrors(showErrorState: boolean) {
    Object.keys(this.form.controls).forEach((key) => {
      if (showErrorState) {
        this.form.get(key)!.markAsTouched();
      } else {
        this.form.get(key)!.markAsUntouched();
      }
      this.form.get(key)!.updateValueAndValidity();
    });
  }
}
