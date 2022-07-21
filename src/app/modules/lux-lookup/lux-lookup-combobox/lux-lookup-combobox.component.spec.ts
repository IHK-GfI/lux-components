/* eslint-disable max-classes-per-file */
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxComponent } from './lux-lookup-combobox.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { LuxLookupParameters } from '../lux-lookup-model/lux-lookup-parameters';
import { Observable, of } from 'rxjs';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';

describe('LuxLookupComboboxComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxLookupHandlerService, LuxConsoleService, { provide: LuxLookupService, useClass: MockLookupService }],
      [LuxNoFormComponent]
    );
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let combobox: LuxLookupComboboxComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      combobox = fixture.debugElement.query(By.directive(LuxLookupComboboxComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Validatoren setzen und korrekte Fehlermeldung anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeNull();
      expect(combobox.formControl.valid).toBeTruthy();

      // Änderungen durchführen
      component.validators = Validators.compose([Validators.required]);
      LuxTestHelper.wait(fixture);
      combobox.formControl.markAsTouched();
      combobox.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeTruthy();
      expect(errorEl.nativeElement.innerText.trim()).toEqual('* Pflichtfeld');
      expect(combobox.formControl.valid).toBeFalsy();

      discardPeriodicTasks();
    }));

    it('Sollte den luxValue beibehalten, wenn luxRequired geändert wird', fakeAsync(() => {
      // Vorbedingungen testen
      component.value = { value: 'test', label: 'test' };
      LuxTestHelper.wait(fixture);

      expect(combobox.luxValue).toEqual(component.value);

      // Änderungen durchführen
      component.required = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(combobox.luxValue).not.toEqual(null);
      expect(component.value).not.toEqual(null);
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

class MockLookupService {
  getLookupTable(tableNo: string, parameters: LuxLookupParameters, url: string): Observable<LuxLookupTableEntry[]> {
    return of([]);
  }
}
