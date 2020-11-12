import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Nachricht, Empfaenger, Anwendung, Ihk } from '../../lux-nachricht-model/lux-nachricht-model';
import { LuxNachrichtController } from '../../lux-nachricht-controller';
import { ILuxNachrichtConfig } from '../../lux-nachricht-model/lux-nachricht-config.interface';

@Component({
  selector: 'lux-nachricht-pflegen',
  templateUrl: './lux-nachricht-pflegen.component.html',
  styleUrls: ['lux-nachricht-pflegen.component.scss'],
  providers: [LuxNachrichtController]
})
export class LuxNachrichtPflegenComponent implements OnInit {

  @Input() luxEditMode: boolean;
  @Input() luxNachricht: Nachricht;
  @Input() luxAuthorizedIhks: Ihk[];
  @Input() luxNachrichtConfig: ILuxNachrichtConfig;
  @Output() luxViewType = new EventEmitter<string>();

  title: string;
  formGroup: FormGroup;

  empfaengerliste: Empfaenger[] = [];
  selectedEmpaenger: Empfaenger[];
  selectedIhk: Ihk[];

  constructor(private formBuilder: FormBuilder,
              private nachrichtController: LuxNachrichtController) {
  }

  ngOnInit() {
    this.luxNachrichtConfig.empfaenger.forEach(value => {
      this.empfaengerliste.push(new Empfaenger(value));
    });

    if (this.luxNachrichtConfig.userRole === 'ROLE_IHKAdmin') {
      this.selectedIhk = this.luxAuthorizedIhks;
    }

    if (this.luxEditMode) {
      this.title = 'Nachricht bearbeiten';
      this.selectedEmpaenger = this.empfaengerliste.filter(({ bezeichnung: b1 }) => this.luxNachricht.empfaenger.some(({ bezeichnung: b2 }) => b1 === b2));
      this.selectedIhk = this.luxAuthorizedIhks.filter(({ ihkNr: nr1 }) => this.luxNachricht.ihk.some(({ ihkNr: nr2 }) => nr1 === nr2 ));
    } else {
      this.title = 'Nachricht erstellen';
    }

    this.formGroup = this.formBuilder.group({
      empfaenger: new FormControl(this.luxNachricht.empfaenger, Validators.required),
      ihk: new FormControl(this.luxNachricht.ihk),
      betreff: new FormControl(this.luxNachricht.betreff, Validators.compose([Validators.required, Validators.minLength(5)])),
      message: new FormControl(this.luxNachricht.message, Validators.compose([Validators.required, Validators.minLength(5)])),
      validFrom: new FormControl(this.luxNachricht.validFrom, Validators.required),
      validTo: new FormControl(this.luxNachricht.validTo, Validators.required),
      timeFrom: new FormControl(this.nachrichtController.getTime(this.luxNachricht.validFrom), Validators.required),
      timeTo: new FormControl(this.nachrichtController.getTime(this.luxNachricht.validTo), Validators.required),
      erneutAnzeigen: new FormControl(this.luxNachricht.erneutAnzeigen)
    }, {
        validator(formGroup: FormGroup): ValidationErrors {
          const result = {};

          if (formGroup.get('validFrom').value > formGroup.get('validTo').value) {
            Object.assign(result, { 'invalidDate': true });
          }
          if (formGroup.get('timeFrom').value > formGroup.get('timeTo').value) {
            if (formGroup.get('validFrom').value === formGroup.get('validTo').value) {
              Object.assign(result, { 'invalidTime': true });
            }
          }
          return result;
        }
    });
  }

  speichern(): void {
    Object.assign(this.luxNachricht, {
      ...this.formGroup.value,
    });
    this.luxNachricht.validFrom = this.mergeDateTime(this.formGroup.controls['validFrom'].value, this.formGroup.controls['timeFrom'].value);
    this.luxNachricht.validTo = this.mergeDateTime(this.formGroup.controls['validTo'].value, this.formGroup.controls['timeTo'].value);
    this.luxNachricht.anwendung = new Anwendung(this.luxNachrichtConfig.anwendungKuerzel);

    if (!this.luxEditMode) {
      this.nachrichtController.create(this.luxNachricht);
    }
    if (this.luxEditMode) {
      this.nachrichtController.update(this.luxNachricht);
    }
    this.luxViewType.emit('overview');
  }

  abbrechen(): void {
    this.luxViewType.emit('overview');
  }

  private mergeDateTime(date: Date, time: string): Date {
    if (date && time && time.length === 5) {
      const timeSplit = time.split(':');
      const h = parseInt(timeSplit[0], 10);
      const m = parseInt(timeSplit[1], 10);

      const dateTime = new Date(date);
      dateTime.setHours(h, m, 0, 0);
      return dateTime;
    } else {
      return date;
    }
  }

}
