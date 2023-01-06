/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { ValidatorFnType } from '../lux-form-model/lux-form-component-base.class';
import { LuxToggleAcComponent } from './lux-toggle-ac.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxToggleAcComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxConsoleService],
      [
        LuxToggleInFormAttributeComponent,
        LuxToggleRequiredInFormAttributeComponent,
        LuxCheckedAttributeComponent,
        LuxDisabledAttributeComponent,
        LuxLabelAttributeComponent,
        LuxCheckedChangeComponent,
        LuxRequiredAttributeComponent,
        LuxValidatorsComponent
      ]
    );
  });

  describe('innerhalb eines Formulars', () => {
    describe('FormGroup (not required)"', () => {
      let fixture: ComponentFixture<LuxToggleInFormAttributeComponent>;
      let testComponent: LuxToggleInFormAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxToggleInFormAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
      }));

      it('Formularwert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toEqual(true);

        // Änderungen durchführen
        fixture.componentInstance.formGroup.get('eula')!.setValue(false);
        fixture.detectChanges();

        // Nachbedingungen testen
        const toggleEl = fixture.debugElement.query(By.css('input'));
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();
        expect(toggleEl.nativeElement.checked).toBeFalsy();
        expect(toggleEl.nativeElement.required).toBeFalsy();
      }));
    });

    describe('FormGroup (required)"', () => {
      let fixture: ComponentFixture<LuxToggleRequiredInFormAttributeComponent>;
      let testComponent: LuxToggleRequiredInFormAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxToggleRequiredInFormAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
      }));

      it('Formularwert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toEqual(null);

        // Änderungen durchführen
        fixture.componentInstance.formGroup.get('eula')!.setValue(true);
        fixture.detectChanges();

        // Nachbedingungen testen
        const toggleEl = fixture.debugElement.query(By.css('input'));
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTruthy();
        expect(toggleEl.nativeElement.checked).toBeTruthy();
      }));

      it('Label anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();

        // Änderungen durchführen
        const toggleEl = fixture.debugElement.query(By.css('label'));
        toggleEl.nativeElement.click();
        fixture.detectChanges();
        flush();

        // Nachbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTruthy();
      }));

      it('Toggle anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();

        // Änderungen durchführen
        const toggleEl = fixture.debugElement.query(By.css('input'));
        toggleEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTruthy();
      }));

      it('Sollte die korrekte Fehlermeldung anzeigen', () => {
        let errorElement = fixture.debugElement.query(By.css('mat-error'));

        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();
        expect(errorElement).toBeNull();

        // Änderungen durchführen
        testComponent.formGroup.get('eula')!.markAsTouched();
        fixture.detectChanges();

        // Nachbedingungen testen
        errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld');
      });

      it('Sollte einen Fehler bei Startwert "" anzeigen können', fakeAsync(() => {
        testComponent.formGroup.get('eula')!.setValue('');
        let errorElement = fixture.debugElement.query(By.css('mat-error'));
        LuxTestHelper.wait(fixture);

        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();
        expect(errorElement).toBeNull();

        // Änderungen durchführen
        testComponent.formGroup.get('eula')!.markAsTouched();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld');
      }));

      it('Sollte einen Fehler bei Startwert false anzeigen können', fakeAsync(() => {
        testComponent.formGroup.get('eula')!.setValue(false);
        let errorElement = fixture.debugElement.query(By.css('mat-error'));
        LuxTestHelper.wait(fixture);

        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();
        expect(errorElement).toBeNull();

        // Änderungen durchführen
        testComponent.formGroup.get('eula')!.markAsTouched();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld');
      }));

      it('Sollte einen Fehler bei Startwert true anzeigen können', fakeAsync(() => {
        testComponent.formGroup.get('eula')!.setValue(true);
        let errorElement = fixture.debugElement.query(By.css('mat-error'));
        LuxTestHelper.wait(fixture);

        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTruthy();
        expect(errorElement).toBeNull();

        // Änderungen durchführen
        testComponent.formGroup.get('eula')!.setValue(false);
        testComponent.formGroup.get('eula')!.markAsTouched();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld');
      }));
    });
  });

  describe('außerhalb eines Formulars', () => {
    describe('Attribut "luxChecked" mit Two-Way-Binding', () => {
      let fixture: ComponentFixture<LuxCheckedAttributeComponent>;
      let testComponent: LuxCheckedAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxCheckedAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
      }));

      it('Wert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.eula).toBeUndefined();

        // Änderungen durchführen
        fixture.componentInstance.eula = true;
        fixture.detectChanges();

        // Nachbedingungen testen
        const toggleEl = fixture.debugElement.query(By.css('input'));
        expect(toggleEl.nativeElement.checked).toBeTruthy();
      }));

      it('Label anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.eula).toBeFalsy();

        // Änderungen durchführen
        const toggleEl = fixture.debugElement.query(By.css('label'));
        toggleEl.nativeElement.click();
        fixture.detectChanges();
        flush();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeTruthy();
      }));

      it('Toggle anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.eula).toBeFalsy();

        // Änderungen durchführen
        const toggleEl = fixture.debugElement.query(By.css('input'));
        toggleEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeTruthy();
      }));
    });

    describe('Attribut "luxDisabled"', () => {
      let fixture: ComponentFixture<LuxDisabledAttributeComponent>;
      let testComponent: LuxDisabledAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxDisabledAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
      }));

      it('Wert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.disabled).toBeUndefined();

        // Änderungen durchführen
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();

        const toggleEl = fixture.debugElement.query(By.css('input'));
        toggleEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.disabled).toBeTruthy();
        expect(toggleEl.nativeElement.disabled).toBeTruthy();
      }));
    });

    describe('Attribut "luxLabel"', () => {
      let fixture: ComponentFixture<LuxLabelAttributeComponent>;
      let testComponent: LuxLabelAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxLabelAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
      }));

      it('Wert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.label).toBeUndefined();

        // Änderungen durchführen
        const newLabel = 'A4711';
        fixture.componentInstance.label = newLabel;
        fixture.detectChanges();

        const labelEl = fixture.debugElement.query(By.css('label'));
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.label).toEqual(newLabel);
        expect(labelEl.nativeElement.innerHTML.trim().indexOf(newLabel) !== -1).toBeTruthy();
      }));
    });

    describe('Attribut "luxCheckedChange"', () => {
      let fixture: ComponentFixture<LuxCheckedChangeComponent>;
      let testComponent: LuxCheckedChangeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxCheckedChangeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
      }));

      it('Check Event', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.eula).toBeNull();

        // Änderungen durchführen
        // 1. Click => true
        const toggleEl = fixture.debugElement.query(By.css('input'));
        toggleEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeTruthy();

        // Änderungen durchführen
        // 2. Click => false
        toggleEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeFalsy();
      }));
    });

    describe('Attribut "luxRequired"', () => {
      let fixture: ComponentFixture<LuxRequiredAttributeComponent>;
      let testComponent: LuxRequiredAttributeComponent;
      let toggleComponent: LuxToggleAcComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxRequiredAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        toggleComponent = fixture.debugElement.query(By.directive(LuxToggleAcComponent)).componentInstance;
      }));

      it('Sollte die korrekte Fehlermeldung anzeigen', fakeAsync(() => {
        let errorElement = fixture.debugElement.query(By.css('mat-error'));

        // Vorbedingungen testen
        expect(errorElement).toBeNull();

        // Änderungen durchführen
        toggleComponent.formControl.markAsTouched();
        fixture.detectChanges();
        tick();

        // Nachbedingungen testen
        errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld');
      }));
    });

    describe('Error-Message', () => {
      let fixture: ComponentFixture<LuxValidatorsComponent>;
      let testComponent: LuxValidatorsComponent;
      let toggleComponent: LuxToggleAcComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxValidatorsComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        toggleComponent = fixture.debugElement.query(By.directive(LuxToggleAcComponent)).componentInstance;
      }));

      it('Validatoren setzen und die Fehlermeldungen korrekt anzeigen', fakeAsync(() => {
        // Vorbedingungen testen
        let errorEl = fixture.debugElement.query(By.css('mat-error'));
        expect(errorEl).toBeNull();

        // Änderungen durchführen
        testComponent.validators = Validators.required;
        LuxTestHelper.wait(fixture);
        toggleComponent.formControl.markAsTouched();
        toggleComponent.formControl.updateValueAndValidity();
        LuxTestHelper.wait(fixture, 100);

        // Nachbedingungen testen
        errorEl = fixture.debugElement.query(By.css('mat-error'));
        expect(errorEl.nativeElement.innerText.trim().length).toBeGreaterThan(0);
        expect(toggleComponent.formControl.valid).toBeFalsy();
      }));
    });
  });
});

@Component({
  template: `
    <lux-toggle-ac luxLabel="Magst du Pommes?" [luxChecked]="true" [luxDisabled]="disabled"></lux-toggle-ac>
  `
})
class LuxDisabledAttributeComponent {
  disabled?: boolean;
}

@Component({
  template: `
    <lux-toggle-ac luxLabel="Eula gelesen?" (luxCheckedChange)="onCheckedChange($event)"></lux-toggle-ac>
  `
})
class LuxCheckedChangeComponent {
  eula: boolean | null = null;

  onCheckedChange(value: boolean) {
    this.eula = value;
  }
}

@Component({
  template: `
    <lux-toggle-ac luxLabel="Eula gelesen?" [(luxChecked)]="eula"></lux-toggle-ac>
  `
})
class LuxCheckedAttributeComponent {
  eula?: boolean;
}

@Component({
  template: `
    <lux-toggle-ac [luxLabel]="label" [luxChecked]="false"></lux-toggle-ac>
  `
})
class LuxLabelAttributeComponent {
  label?: string;
}

@Component({
  template: `
    <lux-toggle-ac [luxLabel]="label" [luxRequired]="true"></lux-toggle-ac>
  `
})
class LuxRequiredAttributeComponent {
  label?: string;
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-toggle-ac luxLabel="Eula gelesen?" luxControlBinding="eula" [luxRequired]="required"></lux-toggle-ac>
    </form>
  `
})
class LuxToggleInFormAttributeComponent {
  formGroup: FormGroup;
  required?: boolean;

  constructor() {
    this.formGroup = new FormGroup<any>({
      eula: new FormControl<boolean>(true)
    });
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-toggle-ac luxLabel="Eula gelesen?" luxControlBinding="eula"></lux-toggle-ac>
    </form>
  `
})
class LuxToggleRequiredInFormAttributeComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup<any>({
      eula: new FormControl<boolean | null>(null, Validators.requiredTrue)
    });
  }
}

@Component({
  template: `
    <lux-toggle-ac luxLabel="Eula gelesen?" [(luxChecked)]="eula" [luxControlValidators]="validators"></lux-toggle-ac>
  `
})
class LuxValidatorsComponent {
  eula?: boolean;
  validators: ValidatorFnType;
}
