/* eslint-disable max-classes-per-file */
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { ValidatorFnType } from '../../lux-form/lux-form-model/lux-form-component-base.class';

import { LuxLookupAutocompleteComponent } from './lux-lookup-autocomplete.component';
import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFieldValues, LuxLookupParameters } from '../lux-lookup-model/lux-lookup-parameters';
import { Observable, of } from 'rxjs';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';

describe('LuxLookupAutocompleteComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxLookupHandlerService, LuxConsoleService, { provide: LuxLookupService, useClass: MockLookupService }],
      [LuxNoFormComponent]
    );
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let autocomplete: LuxLookupAutocompleteComponent;
    let onDataLoadedSpy: any;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      onDataLoadedSpy = spyOn(component, 'onDataLoaded');
      autocomplete = fixture.debugElement.query(By.directive(LuxLookupAutocompleteComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Validatoren setzen und korrekte Fehlermeldung anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeNull();
      expect(autocomplete.formControl.valid).toBeTruthy();

      // Änderungen durchführen
      component.validators = Validators.compose([Validators.required]);
      LuxTestHelper.wait(fixture);
      autocomplete.formControl.markAsTouched();
      autocomplete.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeTruthy();
      expect(errorEl.nativeElement.innerText.trim()).toEqual('* Pflichtfeld');
      expect(autocomplete.formControl.valid).toBeFalsy();

      discardPeriodicTasks();
    }));

    it('Sollte Daten über das Outputevent "luxDataLoadedAsArray" senden',  fakeAsync(() => {
      expect(onDataLoadedSpy).toHaveBeenCalledOnceWith(lookupData);
    }));

  });
});

@Component({
  template: `
    <lux-lookup-autocomplete
      luxTableNo="1004"
      [luxParameters]="params"
      [luxControlValidators]="validators"
      [(luxValue)]="value"
      luxLookupId="test"
      [luxLabel]="'Label'"
      (luxDataLoadedAsArray)="onDataLoaded($event)"
    ></lux-lookup-autocomplete>
  `
})
class LuxNoFormComponent {
  params = new LuxLookupParameters({
    knr: 101,
    fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
  });
  validators?: ValidatorFnType;
  value?: any;

  onDataLoaded(data: LuxLookupTableEntry[]) {}
}

class MockLookupService {
  getLookupTable(tableNo: string, parameters: LuxLookupParameters, url: string): Observable<LuxLookupTableEntry[]> {
    return of(lookupData);
  }
}

const lookupData = [
  {
    "key": "1",
    "kurzText": "Frankreich",
    "langText1": "Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?",
    "isUngueltig": false
  },
  {
    "key": "2",
    "kurzText": "Bellux",
    "langText1": "Belgien und Luxemburg",
    "gueltigkeitVon": "19900101",
    "gueltigkeitBis": "20090101",
    "isUngueltig": true
  },
  {
    "key": "3",
    "kurzText": "Niederlande",
    "langText1": "Niederlande",
    "isUngueltig": false
  }
];
