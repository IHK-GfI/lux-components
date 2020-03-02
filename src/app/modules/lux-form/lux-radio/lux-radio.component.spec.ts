import { Component, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxRadioComponent } from './lux-radio.component';
import { Observable, of } from 'rxjs';

describe('LuxRadioComponent', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
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

  describe('Attribut "luxErrorMessage"', function() {
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
      // Vorbedingungen prüfen
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

  describe('Ohne das Attribut "luxErrorMessage"', function() {
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
      // Vorbedingungen prüfen
      let error = fixture.debugElement.query(By.css('mat-error'));
      expect(error).toBeNull();

      // Änderungen durchführen
      const requiredMessage = 'Dieses Feld darf nicht leer sein';
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

  describe('Außerhalb eines Formulars', function() {
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
      // Vorbedingungen prüfen
      let radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Vorbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben', 'Vorbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Vorbedingung 3');

      // Änderungen durchführen
      testComponent.options = <any>['Option 1', ' Option 2', ' Option 3'];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Option 1', 'Nachbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Option 2', 'Nachbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Option 3', 'Nachbedingung 3');

      flush();
    }));

    it('Werte selektieren (Object-Array)', fakeAsync(() => {
      // Vorbedingungen prüfen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Vorbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben', 'Vorbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Vorbedingung 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0], 'Nachbedingung 1');
      expect(testComponent.selected).toEqual(testComponent.options[0], 'Nachbedingung 2');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Nachbedingung 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[2];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[2], 'Nachbedingung 4');
      expect(testComponent.selected).toEqual(testComponent.options[2], 'Nachbedingung 5');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Nachbedingung 6');
    }));

    it('Werte selektieren (String-Array)', fakeAsync(() => {
      testComponent.options = <any>['Option 1', ' Option 2', ' Option 3'];
      LuxTestHelper.wait(fixture);
      // Vorbedingungen prüfen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Option 1', 'Vorbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Option 2', 'Vorbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Option 3', 'Vorbedingung 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0], 'Nachbedingung 1');
      expect(testComponent.selected).toEqual(testComponent.options[0], 'Nachbedingung 2');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Option 1', 'Nachbedingung 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[2];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[2], 'Nachbedingung 4');
      expect(testComponent.selected).toEqual(testComponent.options[2], 'Nachbedingung 5');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Option 3', 'Nachbedingung 6');
    }));

    it('Sollte null, undefined und "" fehlerfrei als leeren String darstellen und die Werte emitten', fakeAsync(() => {
      // Vorbedingung prüfen
      testComponent.options = <any>[null, undefined, '', 'A'];
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
      expect(testComponent.selected).toBe(null);

      // Änderungen durchführen
      radioButtons[1].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.selected).toBe(undefined);

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
      // Vorbedingungen prüfen
      testComponent.pickValueFn = o1 => {
        return o1 ? o1.value : o1;
      };

      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Vorbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben', 'Vorbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Vorbedingung 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      let checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0].value, 'Nachbedingung 1');
      expect(testComponent.selected).toEqual(testComponent.options[0].value, 'Nachbedingung 2');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Nachbedingung 3');

      // Änderungen durchführen
      testComponent.selected = testComponent.options[2];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[2].value, 'Nachbedingung 4');
      expect(testComponent.selected).toEqual(testComponent.options[2].value, 'Nachbedingung 5');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Nachbedingung 6');

      flush();
    }));

    it('Kein initiales Change-Event ausgeben', fakeAsync(() => {
      // Vorbedingungen prüfen
      // Die Component muss neu initialisiert werden
      fixture = TestBed.createComponent(MockRadioComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      const changeEventSpy = spyOn(radioComponent.luxSelectedChange, 'emit');

      LuxTestHelper.wait(fixture);

      expect(changeEventSpy).toHaveBeenCalledTimes(0); // Vorbedingung 1

      // Änderungen durchführen
      testComponent.selected = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(changeEventSpy).toHaveBeenCalledTimes(1); // Nachbedingung 1
    }));

    it('Label anzeigen', fakeAsync(() => {
      // Vorbedingungen prüfen
      let luxLabel = fixture.debugElement.query(By.css('.lux-label'));
      expect(luxLabel.nativeElement.innerText.trim()).toEqual('', 'Vorbedingung 1');

      // Änderungen durchführen
      testComponent.label = 'Demolabel';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      luxLabel = fixture.debugElement.query(By.css('.lux-label'));
      expect(luxLabel.nativeElement.innerText.trim()).toEqual('Demolabel', 'Nachbedingung 1');
    }));

    it('Deaktivieren', fakeAsync(() => {
      // Vorbedingungen prüfen
      let disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      expect(disabledRadioButtons.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      testComponent.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      expect(disabledRadioButtons.length).toBe(4, 'Nachbedingung 1');
    }));

    it('Readonly', fakeAsync(() => {
      // Vorbedingungen prüfen
      let disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      let readonlyRadioGroup = fixture.debugElement.query(By.css('.lux-readonly'));

      expect(disabledRadioButtons.length).toBe(0, 'Vorbedingung 1');
      expect(readonlyRadioGroup).toBeFalsy('Vorbedingung 2');

      // Änderungen durchführen
      testComponent.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledRadioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-disabled'));
      readonlyRadioGroup = fixture.debugElement.query(By.css('.lux-readonly'));

      expect(disabledRadioButtons.length).toBe(0, 'Nachbedingung 1');
      expect(readonlyRadioGroup).toBeDefined('Nachbedingung 2');
    }));

    it('Sollte Werte anhand der Compare-Funktion vergleichen', fakeAsync(() => {
      const errorSpy = spyOn(console, 'error');

      // Vorbedingungen prüfen
      testComponent.compareFn = (o1, o2) => {
        return o1.value === o2.value;
      };
      expect(errorSpy).toHaveBeenCalledTimes(0); // Vorbedingung 1
      expect(radioComponent.luxSelected).toBeFalsy('Vorbedingung 2');

      // Änderungen durchführen
      const copy = JSON.parse(JSON.stringify(testComponent.options[2]));
      testComponent.selected = copy;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(errorSpy).toHaveBeenCalledTimes(0); // Nachbedingung 1
      expect(radioComponent.luxSelected).toBe(copy, 'Nachbedingung 2');

      // Änderungen durchführen
      const copy2 = JSON.parse(JSON.stringify(testComponent.options[0]));
      testComponent.selected = copy2;
      testComponent.selected.value = 'Z';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(errorSpy).toHaveBeenCalledTimes(1); // Nachbedingung 3
      flush();
    }));
  });

  describe('Mit Template für Darstellung', function() {
    let fixture: ComponentFixture<MockRadioWithTemplateComponent>;
    let testComponent: MockRadioWithTemplateComponent;
    let radioComponent: LuxRadioComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockRadioWithTemplateComponent);
      testComponent = fixture.componentInstance;
      radioComponent = fixture.debugElement.query(By.directive(LuxRadioComponent)).componentInstance;
      LuxTestHelper.wait(fixture);
    }));

    it('Sollte das Template korrekt herausrendern', fakeAsync(() => {
      // Vorbedingungen prüfen
      let radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Vorbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben', 'Vorbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Vorbedingung 3');

      // Änderungen durchführen
      testComponent.options = <any>['Option 1', ' Option 2', ' Option 3'];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Option 1', 'Nachbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Option 2', 'Nachbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Option 3', 'Nachbedingung 3');
    }));
  });

  describe('Innerhalb eines Formulars', function() {
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
      // Vorbedingungen prüfen
      const radioLabels = fixture.debugElement.queryAll(By.css('.mat-radio-label-content'));
      expect(radioLabels[0].nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Vorbedingung 1');
      expect(radioLabels[1].nativeElement.innerText.trim()).toEqual('Gruppenaufgaben', 'Vorbedingung 2');
      expect(radioLabels[2].nativeElement.innerText.trim()).toEqual('Zurückgestellte Aufgaben', 'Vorbedingung 3');
      expect(testComponent.form.get('radio').value).toBeFalsy('Vorbedingung 4');

      // Änderungen durchführen
      testComponent.form.get('radio').setValue(testComponent.options[0]);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const checkedRadioLabel = fixture.debugElement.query(By.css('.mat-radio-checked .mat-radio-label-content'));
      expect(radioComponent.luxSelected).toEqual(testComponent.options[0], 'Nachbedingung 1');
      expect(testComponent.selected).toEqual(testComponent.options[0], 'Nachbedingung 2');
      expect(checkedRadioLabel.nativeElement.innerText.trim()).toEqual('Meine Aufgaben', 'Nachbedingung 3');
      expect(testComponent.form.get('radio').value).toEqual(testComponent.options[0], 'Nachbedingung 4');
    }));

    it('Required', fakeAsync(() => {
      // Vorbedingungen prüfen
      let errorMessage = fixture.debugElement.query(By.css('mat-error'));
      expect(errorMessage).toBeNull();

      // Änderungen durchführen
      testComponent.form.get('radio').setValidators(Validators.required);
      fixture.detectChanges();
      LuxTestHelper.wait(fixture);
      radioComponent.formControl.markAsTouched();
      radioComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      errorMessage = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorMessage.nativeElement.innerText.trim()).toEqual(
        'Dieses Feld darf nicht leer sein',
        'Nachbedingung 1'
      );
    }));
  });
});

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
class MockRadioComponent implements OnInit {
  label;
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  selected: any;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  pickValueFn;
  compareFn = (o1, o2) => o1 === o2;

  constructor() {}

  ngOnInit() {}

  radioSelected($event) {
    this.selected = $event;
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
class MockRadioWithTemplateComponent implements OnInit {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  constructor() {}

  ngOnInit() {}
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
class MockRadioFormComponent implements OnInit {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  selected: any;
  disabled: boolean;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      radio: []
    });
  }

  ngOnInit() {}

  radioSelected($event) {
    this.selected = $event;
    console.log(this.selected);
  }
}

class MockMediaObserver {
  static XS: boolean = false;

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
      <lux-radio
        [luxOptions]="options"
        luxOptionLabelProp="label"
        [luxSelected]="selected"
        luxControlBinding="radio"
      ></lux-radio>
    </form>
  `
})
class MockWithoutLuxErrorMessageComponent implements OnInit {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  form: FormGroup;

  selected: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      radio: ['', Validators.required]
    });
  }

  ngOnInit() {}
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
class MockLuxErrorMessageComponent implements OnInit {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  form: FormGroup;

  errorMessage: string;

  selected: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      radio: ['', Validators.required]
    });
  }

  ngOnInit() {}
}
