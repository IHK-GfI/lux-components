import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lux-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.scss']
})
export class BaselineComponent implements OnInit {
  @HostBinding('class.show-frames') showFrames: boolean = false;
  showAsColumn: boolean = false;
  disabled: boolean = false;
  form: FormGroup = undefined;

  constructor() {
    this.form = new FormGroup({
      input: new FormControl('', Validators.required),
      textarea: new FormControl('', Validators.required),
      datepicker: new FormControl('', Validators.required),
      autocomplete: new FormControl('', Validators.required),
      select: new FormControl('', Validators.required),
      radio: new FormControl('', Validators.required),
      checkbox: new FormControl('', Validators.requiredTrue),
      toggle: new FormControl('', Validators.requiredTrue),
      slider: new FormControl('', Validators.min(10)),
      slider2: new FormControl('', Validators.min(10))
    });
  }

  ngOnInit() {}

  toggleErrors($event: boolean) {
    Object.keys(this.form.controls).forEach(key => {
      if ($event) {
        this.form.get(key).markAsTouched();
      } else {
        this.form.get(key).markAsUntouched();
      }
      this.form.get(key).updateValueAndValidity();
    });
  }
}
