import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';

import { LuxLookupAutocompleteComponent } from './lux-lookup-autocomplete.component';
import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxLookupAutocompleteComponent', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule([LuxLookupHandlerService, LuxConsoleService], [LuxNoFormComponent]);
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let autocomplete: LuxLookupAutocompleteComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      autocomplete = fixture.debugElement.query(By.directive(LuxLookupAutocompleteComponent)).componentInstance;
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
  });
});

@Component({
  template: `
    <lux-lookup-autocomplete
      [luxControlValidators]="validators"
      [(luxValue)]="value"
      luxLookupId="test"
      [luxLabel]="'Label'"
    ></lux-lookup-autocomplete>
  `
})
class LuxNoFormComponent {
  validators;
  value;
}
