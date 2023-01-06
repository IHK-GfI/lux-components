/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { ValidatorFnType } from '../lux-form-model/lux-form-component-base.class';
import { LuxCheckboxAcComponent } from './lux-checkbox-ac.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxCheckboxAcComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxConsoleService],
      [
        LuxCheckboxInFormAttributeComponent,
        LuxCheckboxRequiredInFormAttributeComponent,
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
      let fixture: ComponentFixture<LuxCheckboxInFormAttributeComponent>;
      let testComponent: LuxCheckboxInFormAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxCheckboxInFormAttributeComponent);
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
        const checkboxEl = fixture.debugElement.query(By.css('input'));
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBe(false);
        expect(checkboxEl.nativeElement.checked).toBeFalsy();
        expect(checkboxEl.nativeElement.required).toBeFalsy();
      }));
    });

    describe('FormGroup (required)"', () => {
      let fixture: ComponentFixture<LuxCheckboxRequiredInFormAttributeComponent>;
      let testComponent: LuxCheckboxRequiredInFormAttributeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxCheckboxRequiredInFormAttributeComponent);
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
        const checkboxEl = fixture.debugElement.query(By.css('input'));
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTruthy();
        expect(checkboxEl.nativeElement.checked).toBeTruthy();
      }));

      it('Label anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();

        // Änderungen durchführen
        const checkboxEl = fixture.debugElement.query(By.css('label'));
        checkboxEl.nativeElement.click();
        fixture.detectChanges();
        flush();

        // Nachbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTruthy();
      }));

      it('Checkbox anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalsy();

        // Änderungen durchführen
        const checkboxEl = fixture.debugElement.query(By.css('input'));
        checkboxEl.nativeElement.click();
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
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld', );
      });

      it('Sollte einen Fehler bei Startwert "" anzeigen können', fakeAsync(() => {
        testComponent.formGroup.get('eula')!.setValue(null);
        let errorElement = fixture.debugElement.query(By.css('mat-error'));
        LuxTestHelper.wait(fixture);

        // Vorbedingungen testen
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeNull();
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
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeFalse();
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
        expect(fixture.componentInstance.formGroup.get('eula')!.value).toBeTrue();
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
        const checkboxEl = fixture.debugElement.query(By.css('input'));
        expect(checkboxEl.nativeElement.checked).toBeTruthy();
      }));

      it('Label anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.eula).toBeFalsy();

        // Änderungen durchführen
        const checkboxEl = fixture.debugElement.query(By.css('label'));
        checkboxEl.nativeElement.click();
        fixture.detectChanges();
        flush();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeTruthy();
      }));

      it('Checkbox anklicken', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.eula).toBeFalsy();

        // Änderungen durchführen
        const checkboxEl = fixture.debugElement.query(By.css('input'));
        checkboxEl.nativeElement.click();
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

        const checkboxEl = fixture.debugElement.query(By.css('input'));
        checkboxEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.disabled).toBeTruthy();
        expect(checkboxEl.nativeElement.disabled).toBeTruthy();
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
        expect(fixture.componentInstance.label).toEqual('');

        // Änderungen durchführen
        const newLabel = 'A4711';
        fixture.componentInstance.label = newLabel;
        fixture.detectChanges();

        const labelEl = fixture.debugElement.query(By.css('label'));
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.label).toEqual(newLabel);
        expect(labelEl.nativeElement.innerHTML.trim().indexOf(newLabel) !== -1).toBeTrue();
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
        expect(fixture.componentInstance.eula).toBeUndefined()

        // Änderungen durchführen
        // 1. Click => true
        const checkboxEl = fixture.debugElement.query(By.css('input'));
        checkboxEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeTruthy();

        // Änderungen durchführen
        // 2. Click => false
        checkboxEl.nativeElement.click();
        fixture.detectChanges();

        // Nachbedingungen testen
        expect(fixture.componentInstance.eula).toBeFalsy();
      }));
    });

    describe('Attribut "luxRequired"', () => {
      let fixture: ComponentFixture<LuxRequiredAttributeComponent>;
      let testComponent: LuxRequiredAttributeComponent;
      let checkboxComponent: LuxCheckboxAcComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxRequiredAttributeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        checkboxComponent = fixture.debugElement.query(By.directive(LuxCheckboxAcComponent)).componentInstance;
      }));

      it('Sollte die korrekte Fehlermeldung anzeigen', fakeAsync(() => {
        let errorElement = fixture.debugElement.query(By.css('mat-error'));

        // Vorbedingungen testen
        expect(errorElement).toBeNull();

        // Änderungen durchführen
        checkboxComponent.formControl.markAsTouched();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        errorElement = fixture.debugElement.query(By.css('mat-error'));
        expect(errorElement.nativeElement.innerText.trim()).toEqual('Das ist ein Pflichtfeld');
      }));
    });

    describe('Error-Message', () => {
      let fixture: ComponentFixture<LuxValidatorsComponent>;
      let testComponent: LuxValidatorsComponent;
      let checkboxComponent: LuxCheckboxAcComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxValidatorsComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        checkboxComponent = fixture.debugElement.query(By.directive(LuxCheckboxAcComponent)).componentInstance;
      }));

      it('Validatoren setzen und die Fehlermeldungen korrekt anzeigen', fakeAsync(() => {
        // Vorbedingungen testen
        let errorEl = fixture.debugElement.query(By.css('mat-error'));
        expect(errorEl).toBeNull();

        // Änderungen durchführen
        testComponent.validators = Validators.required;
        LuxTestHelper.wait(fixture);
        checkboxComponent.formControl.markAsTouched();
        checkboxComponent.formControl.updateValueAndValidity();
        LuxTestHelper.wait(fixture, 100);

        // Nachbedingungen testen
        errorEl = fixture.debugElement.query(By.css('mat-error'));
        expect(errorEl.nativeElement.innerText.trim().length).toBeGreaterThan(0);
        expect(checkboxComponent.formControl.valid).toBeFalsy();
      }));
    });
  });
});

@Component({
  template: `
    <lux-checkbox-ac luxLabel="Magst du Pommes?" [luxChecked]="true" [luxDisabled]="disabled"></lux-checkbox-ac>
  `
})
class LuxDisabledAttributeComponent {
  disabled?: boolean;
}

@Component({
  template: `
    <lux-checkbox-ac luxLabel="Eula gelesen?" (luxCheckedChange)="onCheckedChange($event)"></lux-checkbox-ac>
  `
})
class LuxCheckedChangeComponent {
  eula?: boolean;

  onCheckedChange(value: boolean) {
    this.eula = value;
  }
}

@Component({
  template: `
    <lux-checkbox-ac luxLabel="Eula gelesen?" [(luxChecked)]="eula"></lux-checkbox-ac>
  `
})
class LuxCheckedAttributeComponent {
  eula?: boolean;
}

@Component({
  template: `
    <lux-checkbox-ac [luxLabel]="label" [luxChecked]="false"></lux-checkbox-ac>
  `
})
class LuxLabelAttributeComponent {
  label = '';
}

@Component({
  template: `
    <lux-checkbox-ac [luxLabel]="label" [luxRequired]="true"></lux-checkbox-ac>
  `
})
class LuxRequiredAttributeComponent {
  label = '';
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-checkbox-ac luxLabel="Eula gelesen?" luxControlBinding="eula" [luxRequired]="required"></lux-checkbox-ac>
    </form>
  `
})
class LuxCheckboxInFormAttributeComponent {
  formGroup: FormGroup;
  required?: boolean;

  constructor() {
    this.formGroup = new FormGroup({
      eula: new FormControl<boolean>(true)
    });
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-checkbox-ac luxLabel="Eula gelesen?" luxControlBinding="eula"></lux-checkbox-ac>
    </form>
  `
})
class LuxCheckboxRequiredInFormAttributeComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup<any>({
      eula:  new FormControl<boolean | null>(null, Validators.required)
    });
  }
}

@Component({
  template: `
    <lux-checkbox-ac luxLabel="Eula gelesen?" [(luxChecked)]="eula" [luxControlValidators]="validators"></lux-checkbox-ac>
  `
})
class LuxValidatorsComponent {
  eula?: boolean;
  validators?: ValidatorFnType;
}
