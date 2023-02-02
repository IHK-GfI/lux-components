/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ValidatorFnType } from '../../lux-form/lux-form-model/lux-form-component-base.class';
import { LuxOverlayHelper } from "../../lux-util/testing/lux-test-overlay-helper";
import { LuxLookupCompareFn, luxLookupCompareKeyFn, luxLookupCompareKurzTextFn } from "../lux-lookup-model/lux-lookup-component";
import { LuxLookupAutocompleteAcComponent } from './lux-lookup-autocomplete-ac.component';
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

describe('LuxLookupAutocompleteAcComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxLookupHandlerService, LuxConsoleService, { provide: LuxLookupService, useClass: MockLookupService }],
      [LuxNoFormComponent]
    );
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let autocomplete: LuxLookupAutocompleteAcComponent;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      autocomplete = fixture.debugElement.query(By.directive(LuxLookupAutocompleteAcComponent)).componentInstance;
      fixture.detectChanges();
      overlayHelper = new LuxOverlayHelper();
      tick(autocomplete.luxDebounceTime);
    }));

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

    it('Sollte die Optionen ausgeben wie sie geladen wurden', fakeAsync(() => {
      expect(autocomplete.matInput.nativeElement.value).toEqual('');

      // Änderungen durchführen
      LuxTestHelper.typeInElement(autocomplete.matInput.nativeElement, 'A');
      LuxTestHelper.wait(fixture, autocomplete.luxDebounceTime);

      // Nachbedingungen testen
      let options = overlayHelper.selectAllFromOverlay('mat-option');

      expect(options?.length).toEqual(5);
      expect(options[0].querySelector('span')?.innerText).toEqual('Afghanistan');
      expect(options[1].querySelector('span')?.innerText).toEqual('Armenien');
      expect(options[2].querySelector('span')?.innerText).toEqual('Angola');
      expect(options[3].querySelector('span')?.innerText).toEqual('Andorra');
      expect(options[4].querySelector('span')?.innerText).toEqual('Algerien');

      discardPeriodicTasks();
    }));

    it('Sollte die Optionen sortiert nach Kurztext ausgeben', fakeAsync(() => {
      expect(autocomplete.matInput.nativeElement.value).toEqual('');

      // Änderungen durchführen
      component.compareFn = luxLookupCompareKurzTextFn;
      fixture.detectChanges();
      fixture.debugElement.injector.get(LuxLookupHandlerService).reloadData('test');
      fixture.detectChanges();
      LuxTestHelper.typeInElement(autocomplete.matInput.nativeElement, 'A');
      LuxTestHelper.wait(fixture, autocomplete.luxDebounceTime);

      // Nachbedingungen testen
      let options = overlayHelper.selectAllFromOverlay('mat-option');

      expect(options?.length).toEqual(5);
      expect(options[0].querySelector('span')?.innerText).toEqual('Afghanistan');
      expect(options[1].querySelector('span')?.innerText).toEqual('Algerien');
      expect(options[2].querySelector('span')?.innerText).toEqual('Andorra');
      expect(options[3].querySelector('span')?.innerText).toEqual('Angola');
      expect(options[4].querySelector('span')?.innerText).toEqual('Armenien');

      discardPeriodicTasks();
    }));

    it('Sollte die Optionen sortiert nach Schlüssel ausgeben', fakeAsync(() => {
      expect(autocomplete.matInput.nativeElement.value).toEqual('');

      // Änderungen durchführen
      component.compareFn = luxLookupCompareKeyFn;
      fixture.detectChanges();
      fixture.debugElement.injector.get(LuxLookupHandlerService).reloadData('test');
      fixture.detectChanges();
      LuxTestHelper.typeInElement(autocomplete.matInput.nativeElement, 'A');
      LuxTestHelper.wait(fixture, autocomplete.luxDebounceTime);

      // Nachbedingungen testen
      let options = overlayHelper.selectAllFromOverlay('mat-option');

      expect(options?.length).toEqual(5);
      expect(options[0].querySelector('span')?.innerText).toEqual('Afghanistan');
      expect(options[1].querySelector('span')?.innerText).toEqual('Armenien');
      expect(options[2].querySelector('span')?.innerText).toEqual('Angola');
      expect(options[3].querySelector('span')?.innerText).toEqual('Andorra');
      expect(options[4].querySelector('span')?.innerText).toEqual('Algerien');

      discardPeriodicTasks();
    }));
  });
});

@Component({
  template: `
    <lux-lookup-autocomplete-ac
      luxTableNo="1004"
      [luxParameters]="params"
      luxRenderProp="kurzText"
      [luxCompareFn]="compareFn"
      [luxControlValidators]="validators"
      [(luxValue)]="value"
      luxLookupId="test"
      [luxLabel]="'Label'"
    ></lux-lookup-autocomplete-ac>
  `
})
class LuxNoFormComponent {
  params = new LuxLookupParameters({
    knr: 101,
    fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
  });
  validators?: ValidatorFnType;
  value?: any;
  compareFn?: LuxLookupCompareFn;
}

class MockLookupService {
  getLookupTable(_tableNo: string, _parameters: LuxLookupParameters, _url: string): Observable<LuxLookupTableEntry[]> {
    return of([
      {
        key: '1',
        kurzText: 'Afghanistan',
        langText1:
          'Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?'
      },
      {
        key: '10',
        kurzText: 'Armenien',
        langText1: 'Armenien'
      },
      {
        key: '11',
        kurzText: 'Angola',
        langText1: 'Angola'
      },
      {
        key: '100',
        kurzText: 'Andorra',
        langText1: 'Andorra'
      },
      {
        key: '1100',
        kurzText: 'Algerien',
        langText1: 'Algerien'
      },
    ]);
  }
}
