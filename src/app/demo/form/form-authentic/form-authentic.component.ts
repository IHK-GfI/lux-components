import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { FormBase } from '../model/form-base.class';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-form-authentic',
  templateUrl: './form-authentic.component.html',
  styleUrls: ['./form-authentic.component.scss']
})
export class FormAuthenticComponent extends FormBase implements OnInit {
  hobbies = [
    { label: 'Reiten', value: 'r' },
    { label: 'Fußball', value: 'f' },
    { label: 'Handball', value: 'h' },
    { label: 'Stricken', value: 's' }
  ];
  chipItems = [];
  chipItems2 = [];

  constructor(private logger: LuxConsoleService, snackbar: LuxSnackbarService) {
    super(snackbar);

    this.chipItems = ['Chip #1', 'Chip #2'];
    this.chipItems2 = ['Chip #3', 'Chip #4'];
  }

  ngOnInit() {
    this.myGroup = new FormGroup({
      user: new FormGroup({
        firstname: new FormControl('', Validators.pattern('[a-zA-Z0-9]*')),
        lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl('')
      }),
      description: new FormControl(''),
      newsletter: new FormControl(true),
      hobbies: new FormControl(''),
      donation: new FormControl('', Validators.compose([Validators.min(0), Validators.max(1000)])),
      hungry: new FormControl(true),
      chipsLoeschbar: new FormControl([this.chipItems]),
      chipsFix: new FormControl([this.chipItems2]),
      radio: new FormControl(this.hobbies[2]),
      datepicker: new FormControl(new Date('01.11.2018')),
      autocomplete: new FormControl(this.chipItems2[1], Validators.required)
    });
    this.myGroup.controls['description'].disable();
  }

  show() {
    this.logger.log(this.myGroup.value);
  }

  chipItemClicked(event) {
    this.logger.log(event);
    this.logger.log(this.myGroup.value);
  }
}
