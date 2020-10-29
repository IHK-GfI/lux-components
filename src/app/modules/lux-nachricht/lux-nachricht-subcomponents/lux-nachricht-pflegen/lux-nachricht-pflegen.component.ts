import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Nachricht, Empfaenger, Anwendung, Ihk } from '../../lux-nachricht-model/lux-nachricht';
import { LuxNachrichtController } from '../../lux-nachricht-controller';
import { NachrichtService } from '../../lux-nachricht-services/lux-nachricht.service';
import { ILuxNachrichtConfig } from '../../lux-nachricht-model/lux-nachricht-config.interface';

@Component({
  selector: 'lux-nachricht-pflegen',
  templateUrl: './lux-nachricht-pflegen.component.html',
  styleUrls: ['lux-nachricht-pflegen.component.scss'],
  providers: [LuxNachrichtController]
})
export class LuxNachrichtPflegenComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() nachricht: Nachricht;
  @Input() luxNachrichtConfig: ILuxNachrichtConfig;
  @Output() viewType = new EventEmitter<string>();

  title: string;
  formGroup: FormGroup;

  empfaengerliste: Empfaenger[] = [];
  selectedEmpaenger: Empfaenger[];

  ihkliste: Ihk[];
  selectedIhk: Ihk[];

  constructor(private formBuilder: FormBuilder,
              private nachrichtController: LuxNachrichtController,
              private nachrichtService: NachrichtService) {
  }

  ngOnInit() {
    this.luxNachrichtConfig.empfaenger.forEach(value => {
      this.empfaengerliste.push(new Empfaenger(value));
    });

    this.nachrichtService.getAuthorizedIhksForUser(this.luxNachrichtConfig.userRole, this.luxNachrichtConfig.ihkNr).subscribe((ihks: Ihk[]) => {
      this.ihkliste = ihks;
      if (this.luxNachrichtConfig.userRole === 'ROLE_IHKAdmin') {
        this.selectedIhk = this.ihkliste;
      }

      if (this.editMode) {
        this.selectedIhk = this.ihkliste.filter(({ ihkNr: nr1 }) => this.nachricht.ihk.some(({ ihkNr: nr2 }) => nr1 === nr2 ));
      }
    });

    if (this.editMode) {
      this.title = 'Nachricht bearbeiten';
      this.selectedEmpaenger = this.empfaengerliste.filter(({ bezeichnung: b1 }) => this.nachricht.empfaenger.some(({ bezeichnung: b2 }) => b1 === b2));
    } else {
      this.title = 'Nachricht erstellen';
    }

    this.formGroup = this.formBuilder.group({
      empfaenger: new FormControl(this.nachricht.empfaenger, Validators.required),
      ihk: new FormControl(this.nachricht.ihk),
      betreff: new FormControl(this.nachricht.betreff, Validators.compose([Validators.required, Validators.minLength(5)])),
      message: new FormControl(this.nachricht.message, Validators.compose([Validators.required, Validators.minLength(5)])),
      validFrom: new FormControl(this.nachricht.validFrom, Validators.required),
      validTo: new FormControl(this.nachricht.validTo, Validators.required),
      timeFrom: new FormControl(this.nachrichtController.getTime(this.nachricht.validFrom), Validators.required),
      timeTo: new FormControl(this.nachrichtController.getTime(this.nachricht.validTo), Validators.required),
      erneutAnzeigen: new FormControl(this.nachricht.erneutAnzeigen)
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
    Object.assign(this.nachricht, {
      ...this.formGroup.value,
    });
    this.nachricht.validFrom = this.mergeDateTime(this.formGroup.controls['validFrom'].value, this.formGroup.controls['timeFrom'].value);
    this.nachricht.validTo = this.mergeDateTime(this.formGroup.controls['validTo'].value, this.formGroup.controls['timeTo'].value);
    this.nachricht.anwendung = new Anwendung(this.luxNachrichtConfig.anwendungKuerzel);

    if (!this.editMode) {
      this.nachrichtController.create(this.nachricht);
    }
    if (this.editMode) {
      this.nachrichtController.update(this.nachricht);
    }
    this.viewType.emit('overview');
  }

  abbrechen(): void {
    this.viewType.emit('overview');
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
