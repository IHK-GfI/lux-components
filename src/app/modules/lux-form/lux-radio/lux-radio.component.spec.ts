/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyError as MatError } from '@angular/material/legacy-form-field';
import { By } from '@angular/platform-browser';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxPickValueFnType } from '../lux-form-model/lux-form-selectable-base.class';
import { LuxRadioComponent } from './lux-radio.component';
import { Observable, of } from 'rxjs';

describe('LuxRadioComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxConsoleService, { provide: LuxMediaQueryObserverService, useClass: MockMediaObserver }],
      [
        MockRadioComponent,
        MockRadioWithTemplateComponent,
        MockRadioFormComponent,
        MockLuxErrorMessageComponent,
        MockWithoutLuxErrorMessageComponent
      ]
    );
  });

  describe('Attribut "luxErrorMessage"', () => {
    let fixture: ComponentFixture<MockLuxErrorMessageComponent>;
    let testComponent: MockLuxErrorMessageComponent;
    let radioComponent: LuxRadioComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockLuxErrorMessageComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      LuxTestHelper.wait(fixture);
    }));

    it('luxErrorMessage nur bei Fehlern anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let error = fixture.debugElement.query(By.css('mat-error'));
      expect(error).toBeNull();
      expect(testComponent.errorMessage).toBeUndefined();

      // Änderungen durchführen
      const requiredMessage = 'XXX darf nicht leer sein.';
      testComponent.errorMessage = requiredMessage;
      LuxUtil.showValidationErrors(testComponent.form);
      fixture.detectChanges();

      // Nachbedingungen prüfen
      error = fixture.debugElement.query(By.css('mat-error'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.innerHTML.trim()).toEqual(requiredMessage);
      expect(testComponent.errorMessage).toEqual(requiredMessage);

      // Änderungen durchführen
      testComponent.selected = testComponent.options[1];
      fixture.detectChanges();

      // Nachbedingungen prüfen
      error = fixture.debugElement.query(By.directive(MatError));
      expect(error).toBeNull();

      flush();
    }));
  });

  describe('Ohne das Attribut "luxErrorMessage"', () => {
    let fixture: ComponentFixture<MockWithoutLuxErrorMessageComponent>;
    let testComponent: MockWithoutLuxErrorMessageComponent;
    let radioComponent: LuxRadioComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockWithoutLuxErrorMessageComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      LuxTestHelper.wait(fixture);
    }));

    it('luxErrorMessage nur bei Fehlern anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let error = fixture.debugElement.query(By.css('mat-error'));
      expect(error).toBeNull();

      // Änderungen durchführen
      const requiredMessage = '* Pflichtfeld';
      LuxUtil.showValidationErrors(testComponent.form);
      fixture.detectChanges();

      // Nachbedingungen prüfen
      error = fixture.debugElement.query(By.css('mat-error'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.innerHTML.trim()).toEqual(requiredMessage);

      // Änderungen durchführen
      testComponent.selected = testComponent.options[1];
      fixture.detectChanges();

      // Nachbedingungen prüfen
      error = fixture.debugElement.query(By.directive(MatError));
      expect(error).toBeNull();

      flush();
    }));
  });

  describe('Außerhalb eines Formulars', () => {
    let fixture: ComponentFixture<MockRadioComponent>;
    let testComponent: MockRadioComponent;
    let radioComponent: LuxRadioComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockRadioComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      LuxTestHelper.wait(fixture);
    }));

    it('Werte aus Options darstellen (Object-Array und String-Array)', fakeAsync(() => {
      // Vorbedingungen testen
      let radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');

      // Änderungen durchführen
      testComponent.options = ['Option 1', ' Option 2', ' Option 3'] as any;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Option 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Option 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Option 3');

      flush();
    }));

    it('Werte selektieren (Object-Array)', fakeAsync(() => {
      // Vorbedingungen testen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0]);
      expect(testComponent.selected).toEqual(testComponent.options[0]);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Meine Aufgaben');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[2];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[2]);
      expect(testComponent.selected).toEqual(testComponent.options[2]);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');
    }));

    it('Werte selektieren (String-Array)', fakeAsync(() => {
      testComponent.options = ['Option 1', ' Option 2', ' Option 3'] as any;
      LuxTestHelper.wait(fixture);
      // Vorbedingungen testen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Option 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Option 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Option 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0]);
      expect(testComponent.selected).toEqual(testComponent.options[0]);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Option 1');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[2];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[2]);
      expect(testComponent.selected).toEqual(testComponent.options[2]);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Option 3');
    }));

    it('Sollte null, undefined und "" fehlerfrei als leeren String darstellen und die Werte emitten', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.options = [null, undefined, '', 'A'] as any;
      LuxTestHelper.wait(fixture);

      const optionLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      const radioButtons = fixture.debugElement.queryAll(By.css('mat-radio-button input'));

      expect(optionLabels.length).toBe(testComponent.options.length);
      expect(optionLabels[0].nativeElement.innerText.trim()).toEqual('');
      expect(optionLabels[1].nativeElement.innerText.trim()).toEqual('');
      expect(optionLabels[2].nativeElement.innerText.trim()).toEqual('');
      expect(optionLabels[3].nativeElement.innerText.trim()).toEqual('A');

      // Änderungen durchführen
      radioButtons[0].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.selected).toBeNull();

      // Änderungen durchführen
      radioButtons[1].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.selected).toBeUndefined();

      // Änderungen durchführen
      radioButtons[2].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.selected).toBe('');

      // Änderungen durchführen
      radioButtons[3].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.selected).toBe('A');
    }));

    it('Werte selektieren (mit PickValue Funktion)', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.pickValueFn = (o1: Option) => (o1 ? o1.value : '');
      fixture.detectChanges();

      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0].value);
      expect(testComponent.selected).toEqual(testComponent.options[0].value);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Meine Aufgaben');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[2];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[2].value);
      expect(testComponent.selected).toEqual(testComponent.options[2].value);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');

      flush();
    }));

    it('Kein initiales Change-Event ausgeben', fakeAsync(() => {
      // Vorbedingungen testen.
      // Die Component muss neu initialisiert werden.
      fixture = TestBed.createComponent(MockRadioComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      const changeEventSpy = spyOn(radioComponent.luxSelectedChange, 'emit');

      LuxTestHelper.wait(fixture);

      expect(changeEventSpy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(changeEventSpy).toHaveBeenCalledTimes(1);
    }));

    it('Label anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let luxLabel = fixture.debugElement.query(By.css('.lux-label'));
      expect(luxLabel.nativeElement.innerText.trim()).toEqual('');

      // Änderungen durchführen
      testComponent.label = 'Demolabel';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      luxLabel = fixture.debugElement.query(By.css('.lux-label'));
      expect(luxLabel.nativeElement.innerText.trim()).toEqual('Demolabel');
    }));

    it('Deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      let disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      expect(disabledRadioButtons.length).toBe(0);

      // Änderungen durchführen
      testComponent.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      expect(disabledRadioButtons.length).toBe(4);
    }));

    it('Readonly', fakeAsync(() => {
      // Vorbedingungen testen
      let disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      let readonlyRadioGroup = fixture.debugElement.query(By.css('.lux-readonly'));

      expect(disabledRadioButtons.length).toBe(0);
      expect(readonlyRadioGroup).toBeFalsy();

      // Änderungen durchführen
      testComponent.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      readonlyRadioGroup = fixture.debugElement.query(By.css('.lux-readonly'));

      expect(disabledRadioButtons.length).toBe(0);
      expect(readonlyRadioGroup).toBeDefined();
    }));

    it('Sollte Werte anhand der Compare-Funktion vergleichen', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.compareFn = (o1, o2) => o1.value === o2.value;
      fixture.detectChanges();

      expect(radioComponent.luxSelected).toBeFalsy();

      // Änderungen durchführen
      const copy = JSON.parse(JSON.stringify(testComponent.options[2]));
      testComponent.selected = copy;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(radioComponent.luxSelected).toBe(copy);

      flush();
    }));
  });

  describe('Mit Template für Darstellung', () => {
    let fixture: ComponentFixture<MockRadioWithTemplateComponent>;
    let testComponent: MockRadioWithTemplateComponent;
    let radioComponent: LuxRadioComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockRadioWithTemplateComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      LuxTestHelper.wait(fixture);
    }));

    it('Sollte das Template korrekt rendern', fakeAsync(() => {
      // Vorbedingungen testen
      let radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');

      // Änderungen durchführen
      testComponent.options = ['Option 1', ' Option 2', ' Option 3'] as any;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Option 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Option 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Option 3');
    }));
  });

  describe('Innerhalb eines Formulars', () => {
    let fixture: ComponentFixture<MockRadioFormComponent>;
    let testComponent: MockRadioFormComponent;
    let radioComponent: LuxRadioComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockRadioFormComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      LuxTestHelper.wait(fixture);
    }));

    it('Sollte die Werte korrekt ins Formular übertragen', fakeAsync(() => {
      // Vorbedingungen testen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');
      expect(testComponent.form.get('radio')!.value).toBeFalsy();

      // Änderungen durchführen
      testComponent.form.get('radio')!.setValue(testComponent.options[0]);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0]);
      expect(testComponent.selected).toEqual(testComponent.options[0]);
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(testComponent.form.get('radio')!.value).toEqual(testComponent.options[0]);
    }));

    it('Sollte eine Option deaktivieren können', fakeAsync(() => {
      // Vorbedingungen testen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben');
      expect(testComponent.form.get('radio')!.value).toBeNull();

      // Änderungen durchführen
      testComponent.options[1].disabled = true;
      LuxTestHelper.wait(fixture);

      const radioButtons = fixture.debugElement.queryAll(By.css('mat-radio-button input'));
      radioButtons[1].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.form.get('radio')!.value).toBeNull();
    }));

    it('Required', fakeAsync(() => {
      // Vorbedingungen testen
      let errorMessage = fixture.debugElement.query(By.css('mat-error'));
      expect(errorMessage).toBeNull();

      // Änderungen durchführen
      testComponent.form.get('radio')!.setValidators(Validators.required);
      fixture.detectChanges();
      LuxTestHelper.wait(fixture);
      radioComponent.formControl.markAsTouched();
      radioComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      errorMessage = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorMessage.nativeElement.innerText.trim()).toEqual('* Pflichtfeld');
    }));
  });
});

declare interface Option { label: string; value: string; disabled?: boolean }

@Component({
  template: `
    <lux-radio
      [luxOptions]="options"
      [luxDisabled]="disabled"
      luxOptionLabelProp="label"
      [(luxSelected)]="selected"
      [luxPickValue]="pickValueFn"
      [luxCompareWith]="compareFn"
      [luxReadonly]="readonly"
      [luxLabel]="label"
      [luxRequired]="required"
      (luxSelectedChange)="radioSelected($event)"
    ></lux-radio>
  `
})
class MockRadioComponent {
  label?: string;
  options: Option[]= [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  selected?: any;
  disabled?: boolean;
  readonly = false;
  required = false;
  pickValueFn?: LuxPickValueFnType<Option, string>;
  compareFn = (o1: Option, o2: Option) => o1 === o2;

  constructor() {}

  radioSelected(selected: Option) {
    this.selected = selected;
  }
}

@Component({
  template: `
    <lux-radio [luxOptions]="options">
      <ng-template let-option>
        {{ option.label ? option.label : option }}
      </ng-template>
    </lux-radio>
  `
})
class MockRadioWithTemplateComponent {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  constructor() {}
}

@Component({
  template: `
    <form [formGroup]="form">
      <lux-radio
        [luxOptions]="options"
        [luxDisabled]="disabled"
        luxOptionLabelProp="label"
        (luxSelectedChange)="radioSelected($event)"
        luxControlBinding="radio"
      ></lux-radio>
    </form>
  `
})
class MockRadioFormComponent {
  options: { label: string; value: string; disabled?: boolean }[] = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  selected: any;
  disabled?: boolean;

  form: FormGroup;

  constructor() {
    this.form = new FormGroup<any>({
      radio: new FormControl(null)
    });
  }

  radioSelected(selected: Option) {
    this.selected = selected;
  }
}

class MockMediaObserver {
  static XS = false;

  getMediaQueryChangedAsObservable(): Observable<any> {
    return of('gt');
  }

  isXS() {
    return MockMediaObserver.XS;
  }
}

@Component({
  selector: 'mock-lux-error',
  template: `
    <form [formGroup]="form">
      <lux-radio [luxOptions]="options" luxOptionLabelProp="label" [luxSelected]="selected" luxControlBinding="radio"></lux-radio>
    </form>
  `
})
class MockWithoutLuxErrorMessageComponent {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  form: FormGroup;

  selected: any;

  constructor() {
    this.form = new FormGroup<any>({
      radio: new FormControl('', { validators: Validators.required, nonNullable: true})
    });
  }
}

@Component({
  selector: 'mock-lux-error',
  template: `
    <form [formGroup]="form">
      <lux-radio
        [luxOptions]="options"
        luxOptionLabelProp="label"
        [luxSelected]="selected"
        luxControlBinding="radio"
        [luxErrorMessage]="errorMessage"
      ></lux-radio>
    </form>
  `
})
class MockLuxErrorMessageComponent {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  form: FormGroup;

  errorMessage?: string;

  selected: any;

  constructor() {
    this.form = new FormGroup<any>({
      radio: new FormControl('', { validators: Validators.required, nonNullable: true})
    });
  }
}
