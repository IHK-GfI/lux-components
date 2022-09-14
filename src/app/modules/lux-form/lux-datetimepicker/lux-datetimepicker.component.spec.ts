/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { Component, LOCALE_ID } from '@angular/core';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxDateFilterFn } from '../lux-datepicker/lux-datepicker.component';
import { LuxValidationErrors, ValidatorFnType } from "../lux-form-model/lux-form-component-base.class";
import { LuxDateTimePickerComponent } from './lux-datetimepicker.component';

describe('LuxDatetimepickerComponent', () => {
  const usedLocale = 'de-DE';

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxConsoleService],
      [LuxFormTestComponent, LuxNoFormAttributeTestComponent, LuxFormCustomValidatorComponent]
    );
  });

  describe('Validatoren', () => {
    let fixture: ComponentFixture<LuxFormCustomValidatorComponent>;
    let testComponent: LuxFormCustomValidatorComponent;
    let datepickerComponent: LuxDateTimePickerComponent;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: LOCALE_ID, useValue: usedLocale },
          { provide: MAT_DATE_LOCALE, useValue: usedLocale }
        ]
      });
      fixture = TestBed.createComponent(LuxFormCustomValidatorComponent);
      testComponent = fixture.componentInstance;
      datepickerComponent = fixture.debugElement.query(By.directive(LuxDateTimePickerComponent)).componentInstance;
      flush();
    }));

    it('Sollte mehrere Validatoren (Standard- und Custom-Validatoren) unterstützen', fakeAsync(() => {
      // Vorbedingungen testen
      let matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(testComponent.formControl.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();
      expect(matErrorEl).toBeFalsy();

      // Änderungen durchführen
      testComponent.formControl.setValue('');
      testComponent.formControl.markAsTouched();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).not.toBeNull();
      expect(matErrorEl.nativeElement.innerHTML.trim()).toEqual('Darf nicht leer sein');

      // Änderungen durchführen
      testComponent.formControl.setValue('2019-01-01T00:00:00.000Z');
      testComponent.formControl.markAsTouched();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      const datepickerEl = fixture.debugElement.query(By.css('input'));
      expect(LuxUtil.stringWithoutASCIIChars(datepickerEl.nativeElement.value)).toEqual('01.01.2019, 00:00');

      matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).not.toBeNull();
      expect(matErrorEl.nativeElement.innerHTML.trim()).toEqual('Das Jahr 2019 darf nicht verwendet werden');

      // Änderungen durchführen
      LuxTestHelper.typeInElement(datepickerEl.nativeElement, '01.01.2020, 00:00', false);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeNull();

      // Änderungen durchführen
      LuxTestHelper.typeInElement(datepickerEl.nativeElement, '01.01.20, 00:00', false);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).not.toBeNull();
      expect(matErrorEl.nativeElement.innerHTML.trim()).toEqual('Darf nicht leer sein');
    }));
  });

  describe('innerhalb eines Formulars', () => {
    let fixture: ComponentFixture<LuxFormTestComponent>;
    let testComponent: LuxFormTestComponent;
    let datepickerComponent: LuxDateTimePickerComponent;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: LOCALE_ID, useValue: usedLocale },
          { provide: MAT_DATE_LOCALE, useValue: usedLocale }
        ]
      });
      fixture = TestBed.createComponent(LuxFormTestComponent);
      testComponent = fixture.componentInstance;
      datepickerComponent = fixture.debugElement.query(By.directive(LuxDateTimePickerComponent)).componentInstance;
      flush();
    }));

    it('Sollte einen Wert nach dem Rendern besitzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(testComponent.formControl.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();

      // Änderungen durchführen
      testComponent.formControl.setValue('2015-06-10T01:23:00.000Z');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      const utcNullifiedDate = new Date(0);
      utcNullifiedDate.setUTCFullYear(2015, 5, 10);
      utcNullifiedDate.setUTCHours(1, 23, 0, 0);
      const datepickerEl = fixture.debugElement.query(By.css('input'));
      expect(LuxUtil.stringWithoutASCIIChars(datepickerEl.nativeElement.value)).toEqual('10.06.2015, 01:23');
      expect(datepickerComponent.luxValue).toEqual(utcNullifiedDate.toISOString());
    }));

    it('Sollte den Wert aktualisieren', fakeAsync(() => {
      fixture.detectChanges();
      // Vorbedingungen testen
      expect(testComponent.formControl.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();

      // Änderungen durchführen
      testComponent.formControl.setValue('2015-06-10T00:00:00.000Z');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      const utcNullifiedDate = new Date(0);
      utcNullifiedDate.setUTCFullYear(2015, 5, 10);
      utcNullifiedDate.setUTCHours(0, 0, 0, 0);
      let datepickerEl = fixture.debugElement.query(By.css('input'));
      expect(LuxUtil.stringWithoutASCIIChars(datepickerEl.nativeElement.value)).toEqual('10.06.2015, 00:00');
      expect(datepickerComponent.luxValue).toEqual(utcNullifiedDate.toISOString());

      // Änderungen durchführen
      testComponent.formControl.setValue('2015-07-10T12:15:00.000Z');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      utcNullifiedDate.setUTCMonth(6);
      utcNullifiedDate.setUTCHours(12, 15, 0, 0);
      datepickerEl = fixture.debugElement.query(By.css('input'));
      expect(LuxUtil.stringWithoutASCIIChars(datepickerEl.nativeElement.value)).toEqual('10.07.2015, 12:15');
      expect(datepickerComponent.luxValue).toEqual(utcNullifiedDate.toISOString());
    }));

    it('Sollte das Datum 01.0.2020 in 01.01.2020 umwandeln und nicht in 01.12.2019', fakeAsync(() => {
      fixture.detectChanges();
      // Vorbedingungen testen
      expect(testComponent.formControl.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();

      // Änderungen durchführen
      const datepickerEl = fixture.debugElement.query(By.css('input'));
      LuxTestHelper.typeInElement(datepickerEl.nativeElement, '01.0.2020, 00:00', false);
      LuxTestHelper.dispatchEvent(datepickerEl.nativeElement, new Event('focusout'));
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      const utcNullifiedDate = new Date(0);
      utcNullifiedDate.setUTCFullYear(2020, 0, 1);
      utcNullifiedDate.setUTCHours(0, 0);

      expect(LuxUtil.stringWithoutASCIIChars(datepickerEl.nativeElement.value)).toEqual('01.01.2020, 00:00');
      expect(datepickerComponent.luxValue).toEqual(utcNullifiedDate.toISOString());
    }));

    it('Sollte den korrekten mit Nullen aufgefüllten UTC-Wert ausgeben', fakeAsync(() => {
      const utcDate = new Date(0);
      utcDate.setUTCFullYear(2000, 0, 1);
      utcDate.setUTCHours(9, 15, 0, 0);
      // Vorbedingungen testen
      expect(testComponent.formControl.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();

      // Änderungen durchführen
      testComponent.formControl.setValue('2000-01-01T10:15:23.000+01:00');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(testComponent.formControl.value).toEqual(utcDate.toISOString());
      expect(datepickerComponent.luxValue).toEqual(utcDate.toISOString());
    }));

    it('Sollte required sein', fakeAsync(() => {
      testComponent.formControl.setValidators(Validators.required);
      fixture.detectChanges();
      // Vorbedingungen testen
      let matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeFalsy();

      // Änderungen durchführen
      testComponent.formControl.markAsTouched();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeDefined();
      expect(datepickerComponent.formControl.invalid).toBeTruthy();
    }));

    it('Sollte den korrekten Wert nach asynchronem Aufruf besitzen', fakeAsync(() => {
      // Vorbedingungen testen
      LuxTestHelper.wait(fixture);
      expect(testComponent.formControl.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();
      expect(datepickerComponent.formControl.value).toBeFalsy();

      // Änderungen durchführen
      of('2005-02-05, 00:00')
        .pipe(delay(2000))
        .subscribe((value) => testComponent.formControl.setValue(value));
      LuxTestHelper.wait(fixture, 2500);

      // Nachbedingungen testen
      const expectedDate = '2005-02-05T00:00:00.000Z';
      expect(testComponent.formControl.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);
    }));
  });

  describe('außerhalb eines Formulars', () => {
    let fixture: ComponentFixture<LuxNoFormAttributeTestComponent>;
    let testComponent: LuxNoFormAttributeTestComponent;
    let datepickerComponent: LuxDateTimePickerComponent;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: LOCALE_ID, useValue: usedLocale },
          { provide: MAT_DATE_LOCALE, useValue: usedLocale }
        ]
      });
      fixture = TestBed.createComponent(LuxNoFormAttributeTestComponent);
      testComponent = fixture.componentInstance;
      datepickerComponent = fixture.debugElement.query(By.directive(LuxDateTimePickerComponent)).componentInstance;
      overlayHelper = new LuxOverlayHelper();

      fixture.detectChanges();
      flush();
    }));

    it('LuxValue Simple', fakeAsync(() => {
      // Vorbedingungen testen
      expect(testComponent.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();

      // Änderungen durchführen
      testComponent.value = '10.07.2015';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      const datepickerEl = fixture.debugElement.query(By.css('input'));
      expect(LuxUtil.stringWithoutASCIIChars(datepickerEl.nativeElement.value)).toEqual('10.07.2015');
      expect(datepickerComponent.luxValue).toEqual(testComponent.value);

      flush();
    }));

    it('LuxDisabled', fakeAsync(() => {
      // Vorbedingungen testen
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;

      expect(testComponent.disabled).toBeFalsy();
      expect(inputEl.disabled).toBeFalsy();
      expect(buttonEl.disabled).toBeFalsy();

      // Änderungen durchführen
      testComponent.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(testComponent.disabled).toBeTruthy();
      expect(inputEl.disabled).toBeTruthy();
      expect(buttonEl.disabled).toBeTruthy();
    }));

    it('LuxMinDate und LuxMaxDate', fakeAsync(() => {
      // Vorbedingungen testen
      let matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeFalsy();

      // Änderungen durchführen
      testComponent.minDate = '20.10.2015, 00:00';
      testComponent.maxDate = '25.10.2015, 23:59';
      testComponent.value = new Date(2015, 9, 23).toISOString();
      LuxTestHelper.wait(fixture);

      matErrorEl = fixture.debugElement.query(By.css('mat-error'));

      // Nachbedingungen testen
      expect(matErrorEl).toBeFalsy();

      // Änderungen durchführen
      testComponent.value = '2015-10-19T23:59:00.000Z';
      LuxTestHelper.wait(fixture);
      datepickerComponent.formControl.markAsTouched();
      datepickerComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));

      // Nachbedingungen testen
      expect(matErrorEl).not.toBeNull();
      expect(matErrorEl.nativeElement.innerText.trim()).toEqual('Das Datum unterschreitet den Minimalwert');

      // // Änderungen durchführen
      testComponent.value = '2015-10-26T00:00:00.000Z';
      LuxTestHelper.wait(fixture);
      datepickerComponent.formControl.markAsTouched();
      datepickerComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));

      // Nachbedingungen testen
      expect(matErrorEl.nativeElement.innerText.trim()).toEqual('Das Datum überschreitet den Maximalwert');
    }));

    it('LuxCustomFilter', fakeAsync(() => {
      // Vorbedingungen testen
      let matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeFalsy();

      // Änderungen durchführen
      testComponent.customFilter = (d: Date | null): boolean => {
        const day = d ? d.getDay() : 0;
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
      };
      LuxTestHelper.wait(fixture);
      testComponent.value = new Date(2018, 11, 18).toISOString();
      LuxTestHelper.wait(fixture);
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));

      // Nachbedingungen testen
      expect(matErrorEl).toBeDefined();

      flush();
    }));

    it('LuxRequired', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.required = true;
      let matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeFalsy();

      // Änderungen durchführen
      datepickerComponent.formControl.markAsTouched();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matErrorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(matErrorEl).toBeDefined();
      expect(datepickerComponent.luxRequired).toBeTruthy();
      expect(datepickerComponent.formControl.invalid).toBeTruthy();

      flush();
    }));

    it('LuxReadonly', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.readonly = true;
      const inputEl = fixture.debugElement.query(By.css('input'));
      const toggleEl = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(inputEl.attributes.readonly).toBeFalsy();
      expect(toggleEl.disabled).toBeFalsy();

      // Änderungen durchführen
      testComponent.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(inputEl.attributes.readonly).toBeTruthy();
      expect(toggleEl.disabled).toBeTruthy();
      expect(datepickerComponent.luxReadonly).toBeTruthy();
    }));

    it('LuxValidators', fakeAsync(() => {
      // Vorbedingungen testen
      let matError = fixture.debugElement.query(By.css('mat-error'));

      expect(datepickerComponent.formControl.valid).toBe(true);
      expect(matError).toBeNull();

      // Änderungen durchführen
      testComponent.validators = [Validators.required];
      LuxTestHelper.wait(fixture);
      datepickerComponent.formControl.markAsTouched();
      datepickerComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matError = fixture.debugElement.query(By.css('mat-error'));

      expect(datepickerComponent.formControl!.valid).toBe(false);
      expect(datepickerComponent.formControl.errors!.required).toBeDefined();
      expect(matError).not.toBeNull();

      flush();
      discardPeriodicTasks();
    }));

    it('LuxErrorMessage', fakeAsync(() => {
      // Vorbedingungen testen
      let matError = fixture.debugElement.query(By.css('mat-error'));

      expect(matError).toBeNull();

      // Änderungen durchführen
      testComponent.errorMessage = 'Ein Fehler sie zu knechten';
      testComponent.validators = [Validators.required];
      LuxTestHelper.wait(fixture);
      datepickerComponent.formControl.markAsTouched();
      datepickerComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matError = fixture.debugElement.query(By.css('mat-error'));

      expect(matError).not.toBeNull();
      expect(matError.nativeElement.textContent.trim()).toEqual('Ein Fehler sie zu knechten');

      flush();
    }));

    it('LuxErrorMessageCallback', fakeAsync(() => {
      // Vorbedingungen testen
      let matError = fixture.debugElement.query(By.css('mat-error'));
      expect(matError).toBeNull();

      // Änderungen durchführen
      testComponent.errorCb = () => 'Achtung, das ist ein Fehler';
      const spy = spyOn(testComponent, 'errorCb').and.callThrough();

      testComponent.validators = [Validators.required];
      LuxTestHelper.wait(fixture);
      datepickerComponent.formControl.markAsTouched();
      datepickerComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      matError = fixture.debugElement.query(By.css('mat-error'));

      expect(matError).not.toBeNull();
      expect(matError.nativeElement.textContent.trim()).toEqual('Achtung, das ist ein Fehler');
      expect(spy).toHaveBeenCalled();

      flush();
    }));

    it('LuxOpened', fakeAsync(() => {
      // Vorbedingungen testen
      let calendar = overlayHelper.selectOneFromOverlay('mat-calendar');
      expect(calendar).toBeNull();

      // Änderungen durchführen
      testComponent.opened = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      calendar = overlayHelper.selectOneFromOverlay('mat-calendar');
      expect(calendar).not.toBeNull();

      // Änderungen durchführen
      testComponent.opened = false;
      // Zwei Aufrufe, weil sonst der Calendar nicht rechtzeitig geschlossen wird
      LuxTestHelper.wait(fixture);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      calendar = overlayHelper.selectOneFromOverlay('mat-calendar');
      expect(calendar).toBeNull();

      flush();
    }));

    it('Sollte luxValueChange angemessen oft aufrufen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(testComponent, 'valueChanged');
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      testComponent.value = new Date(2015, 9, 19).toISOString();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      testComponent.value = new Date(2015, 9, 20).toISOString();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);

      // Änderungen durchführen
      // Absichtlich denselben Wert nochmal, sollte nichts auslösen
      testComponent.value = new Date(2015, 9, 20).toISOString();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);

      flush();
    }));

    it('Sollte verschiedene Eingabewerte erlauben', fakeAsync(() => {
      // Vorbedingungen testen
      LuxTestHelper.wait(fixture);
      expect(testComponent.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();
      expect(datepickerComponent.formControl.value).toBeFalsy();

      // Änderungen durchführen
      // ISO-String
      let testDate = new Date(2000, 5, 10, 10, 15, 0);
      testDate.setMinutes(testDate.getMinutes() - testDate.getTimezoneOffset());
      testComponent.value = testDate.toISOString();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let expectedDate = '2000-06-10T10:15:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);

      // Änderungen durchführen
      // Date
      const tempDate = new Date(0);
      tempDate.setUTCFullYear(2001, 5, 10);
      tempDate.setUTCHours(10, 15, 0);
      testComponent.value = tempDate as any;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expectedDate = '2001-06-10T10:15:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);

      // Änderungen durchführen
      // MM/dd/yyyy
      testComponent.value = '06/10/2002, 00:00';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expectedDate = '2002-06-10T00:00:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);

      // Änderungen durchführen
      // dd.MM.yyyy
      testComponent.value = '10.06.2003, 00:00';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expectedDate = '2003-06-10T00:00:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);

      // Änderungen durchführen
      // dd-MM-yyyy
      testComponent.value = '10-06-2004, 00:00';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expectedDate = '2004-06-10T00:00:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);

      // Änderungen durchführen
      // yyyy-MM-dd
      testComponent.value = '2005-06-10, 00:00';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expectedDate = '2005-06-10T00:00:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);
    }));

    it('Sollte den korrekten Wert nach asynchronem Aufruf besitzen', fakeAsync(() => {
      // Vorbedingungen testen
      LuxTestHelper.wait(fixture);
      expect(testComponent.value).toBeFalsy();
      expect(datepickerComponent.luxValue).toBeFalsy();
      expect(datepickerComponent.formControl.value).toBeFalsy();

      // Änderungen durchführen
      of('2005-02-05, 00:00')
        .pipe(delay(2000))
        .subscribe((value) => (testComponent.value = value));
      LuxTestHelper.wait(fixture, 2500);
      flush();

      // Nachbedingungen testen
      const expectedDate = '2005-02-05T00:00:00.000Z';
      expect(testComponent.value).toEqual(expectedDate);
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);
    }));

    it('Sollte nicht rekursiv Wertaktualisierungen vornehmen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(datepickerComponent, 'notifyFormValueChanged');
      LuxTestHelper.wait(fixture);
      expect(datepickerComponent.luxValue).toBeFalsy();
      expect(datepickerComponent.formControl.value).toBeFalsy();
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      for (let i = 0; i < 251; i++) {
        if (i % 2 === 0) {
          datepickerComponent.formControl.setValue('01/01/' + (1950 + i) + ', 00:00');
        } else {
          testComponent.value = '01/01/' + (1950 + i) + ', 00:00';
        }
        LuxTestHelper.wait(fixture);
      }

      // Nachbedingungen prüfen
      const expectedDate = '2200-01-01T00:00:00.000Z';
      expect(datepickerComponent.luxValue).toEqual(expectedDate);
      expect(datepickerComponent.formControl.value).toEqual(expectedDate);
      expect(spy).toHaveBeenCalledTimes(251);
    }));
  });
});

@Component({
  template: `
    <lux-datetimepicker
      luxLabel="Datum"
      [(luxValue)]="value"
      [luxDisabled]="disabled"
      [luxReadonly]="readonly"
      [luxRequired]="required"
      [luxMinDate]="minDate"
      [luxMaxDate]="maxDate"
      [luxCustomFilter]="customFilter"
      [luxStartDate]="startDate"
      [luxShowToggle]="showToggle"
      [luxErrorMessage]="errorMessage"
      [luxErrorCallback]="errorCb"
      [luxControlValidators]="validators"
      [luxOpened]="opened"
      (luxValueChange)="valueChanged()"
    ></lux-datetimepicker>
  `
})
class LuxNoFormAttributeTestComponent {
  value?: string;
  disabled?: boolean;
  readonly = false;
  required = false;
  minDate?: string;
  maxDate?: string;
  startDate?: string;
  customFilter?: LuxDateFilterFn;
  showToggle = true;
  errorMessage?: string;
  validators?: ValidatorFnType;
  opened = false;
  errorCb: (value: any, errors: LuxValidationErrors) => string | undefined = () => undefined;

  valueChanged() {}
}

export const Validator2019NotAllowed = (control: AbstractControl) => {
  console.log(
    'Validator called',
    control.value,
    'value' in control && typeof control.value === 'string' && (control.value as string).indexOf('2019') !== -1
  );
  if ('value' in control && typeof control.value === 'string' && (control.value as string).indexOf('2019') !== -1) {
    return { NotAllowed2019: true };
  }

  return null;
};

export const exampleErrorCallback = (value: any, errors: LuxValidationErrors) => {
  if (errors.required) {
    return 'Darf nicht leer sein';
  } else if (errors.NotAllowed2019) {
    return 'Das Jahr 2019 darf nicht verwendet werden';
  }
  return 'Es ist ein Fehler aufgetreten';
};

@Component({
  template: `
    <div [formGroup]="form">
      <lux-datetimepicker luxLabel="Datum" luxControlBinding="datepicker" [luxErrorCallback]="errorCallBack"></lux-datetimepicker>
    </div>
  `
})
class LuxFormCustomValidatorComponent {
  form: FormGroup;
  formControl: AbstractControl;

  errorCallBack = exampleErrorCallback;

  constructor() {
    this.form = new FormGroup<any>({
      datepicker: new FormControl('', { validators: Validators.compose([Validator2019NotAllowed, Validators.required]), nonNullable: true})
    });
    this.formControl = this.form.get('datepicker')!;
  }
}

@Component({
  template: `
    <div [formGroup]="form">
      <lux-datetimepicker luxLabel="Datum" luxControlBinding="datepicker"></lux-datetimepicker>
      {{ formControl.value }}
    </div>
  `
})
class LuxFormTestComponent {
  form: FormGroup;
  formControl: AbstractControl;

  constructor() {
    this.form = new FormGroup<any>({
      datepicker: new FormControl<string | null>(null)
    });
    this.formControl = this.form.get('datepicker')!;
  }
}
