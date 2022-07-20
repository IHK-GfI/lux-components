import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { FormBase } from '../model/form-base.class';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-form-common',
  templateUrl: './form-common.component.html'
})
export class FormCommonComponent extends FormBase implements OnInit {
  hobbies = [
    { label: 'Reiten', value: 'r' },
    { label: 'Fußball', value: 'f' },
    { label: 'Handball', value: 'h' },
    { label: 'Stricken', value: 's' }
  ];
  chipItems: string[] = [];
  chipItems2: string[] = [];

  constructor(private logger: LuxConsoleService, snackbar: LuxSnackbarService) {
    super(snackbar);

    this.chipItems = ['Chip #1', 'Chip #2'];
    this.chipItems2 = ['Chip #3', 'Chip #4'];
  }

  ngOnInit() {
    this.myGroup = new UntypedFormGroup({
      user: new UntypedFormGroup({
        firstname: new UntypedFormControl('', Validators.pattern('[a-zA-Z0-9]*')),
        lastname: new UntypedFormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        email: new UntypedFormControl('', Validators.compose([Validators.required, Validators.email])),
        password: new UntypedFormControl('')
      }),
      description: new UntypedFormControl(''),
      newsletter: new UntypedFormControl(true),
      hobbies: new UntypedFormControl(''),
      donation: new UntypedFormControl('', Validators.compose([Validators.min(0), Validators.max(1000)])),
      hungry: new UntypedFormControl(true),
      chipsLoeschbar: new UntypedFormControl([this.chipItems]),
      chipsFix: new UntypedFormControl([this.chipItems2]),
      radio: new UntypedFormControl(this.hobbies[2]),
      datepicker: new UntypedFormControl(new Date('01.11.2018')),
      autocomplete: new UntypedFormControl(this.chipItems2[1], Validators.required)
    });
    this.myGroup.controls['description'].disable();
  }

  show() {
    this.logger.log(this.myGroup.value);
  }

  chipItemClicked(index: number) {
    this.logger.log(index);
    this.logger.log(this.myGroup.value);
  }
}
