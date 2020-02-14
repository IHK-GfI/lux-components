import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxComponent } from './lux-lookup-combobox.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxLookupComboboxComponent', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule([LuxLookupHandlerService, LuxConsoleService], [LuxNoFormComponent]);
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let autocomplete: LuxLookupComboboxComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      autocomplete = fixture.debugElement.query(By.directive(LuxLookupComboboxComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Validatoren setzen und korrekte Fehlermeldung anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeNull(`Vorbedingung 1`);
      expect(autocomplete.formControl.valid).toBeTruthy(`Vorbedingung 2`);

      // Änderungen durchführen
      component.validators = Validators.compose([Validators.required]);
      LuxTestHelper.wait(fixture);
      autocomplete.formControl.markAsTouched();
      autocomplete.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeTruthy(`Nachbedingung 1`);
      expect(errorEl.nativeElement.innerText.trim()).toEqual('Dieses Feld darf nicht leer sein', `Nachbedingung 1`);
      expect(autocomplete.formControl.valid).toBeFalsy(`Nachbedingung 2`);

      discardPeriodicTasks();
    }));

    it('Sollte den luxValue beibehalten, wenn luxRequired geändert wird', fakeAsync(() => {
      // Vorbedingungen testen
      component.value = { value: 'test', label: 'test' };
      LuxTestHelper.wait(fixture);

      expect(autocomplete.luxValue).toEqual(component.value);

      // Änderungen durchführen
      component.required = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(autocomplete.luxValue).not.toBe(null);
      expect(component.value).not.toBe(null);
    }));
  });
});

@Component({
  template: `
    <lux-lookup-combobox
      [luxControlValidators]="validators"
      [(luxValue)]="value"
      luxLookupId="test"
      [luxLabel]="'Label'"
      [luxRequired]="required"
    ></lux-lookup-combobox>
  `
})
class LuxNoFormComponent {
  validators;
  value;
  required;
}
