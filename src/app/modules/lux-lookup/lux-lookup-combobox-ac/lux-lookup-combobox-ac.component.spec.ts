/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed } from "@angular/core/testing";

import { Component } from '@angular/core';
import { ValidatorFnType } from '../../lux-form/lux-form-model/lux-form-component-base.class';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { LuxOverlayHelper } from "../../lux-util/testing/lux-test-overlay-helper";
import { LuxLookupCompareFn, luxLookupCompareKeyFn, luxLookupCompareKurzTextFn } from "../lux-lookup-model/lux-lookup-component";
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxAcComponent } from './lux-lookup-combobox-ac.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { LuxFieldValues, LuxLookupParameters } from '../lux-lookup-model/lux-lookup-parameters';
import { Observable, of } from 'rxjs';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';

describe('LuxLookupComboboxAcComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxLookupHandlerService, LuxConsoleService, { provide: LuxLookupService, useClass: MockLookupService }],
      [LuxNoFormComponent]
    );
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let combobox: LuxLookupComboboxAcComponent;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      combobox = fixture.debugElement.query(By.directive(LuxLookupComboboxAcComponent)).componentInstance;
      fixture.detectChanges();
      overlayHelper = new LuxOverlayHelper();
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
      expect(combobox.luxValue).not.toBeNull();
      expect(component.value).not.toBeNull();
    }));

    it('Sollte die Optionen ausgeben wie sie geladen wurden', fakeAsync(() => {
      fixture.detectChanges();
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      trigger.click();
      fixture.detectChanges();
      flush();

      let options = overlayHelper.selectAllFromOverlay('mat-option');
      expect(options?.length).toEqual(6);
      expect(options[1].querySelector('span')?.innerText).toEqual('Afghanistan');
      expect(options[2].querySelector('span')?.innerText).toEqual('Bellux');
      expect(options[3].querySelector('span')?.innerText).toEqual('Ägypten');
      expect(options[4].querySelector('span')?.innerText).toEqual('Deutschland');
      expect(options[5].querySelector('span')?.innerText).toEqual('Algerien');

      discardPeriodicTasks();
    }));

    it('Sollte die Optionen sortiert nach Kurztext ausgeben', fakeAsync(() => {
      component.compareFn = luxLookupCompareKurzTextFn;
      fixture.detectChanges();
      fixture.debugElement.injector.get(LuxLookupHandlerService).reloadData('test');
      fixture.detectChanges();
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      trigger.click();
      fixture.detectChanges();
      flush();

      let options = overlayHelper.selectAllFromOverlay('mat-option');
      expect(options?.length).toEqual(6);
      expect(options[1].querySelector('span')?.innerText).toEqual('Afghanistan');
      expect(options[2].querySelector('span')?.innerText).toEqual('Ägypten');
      expect(options[3].querySelector('span')?.innerText).toEqual('Algerien');
      expect(options[4].querySelector('span')?.innerText).toEqual('Bellux');
      expect(options[5].querySelector('span')?.innerText).toEqual('Deutschland');

      discardPeriodicTasks();
    }));

    it('Sollte die Optionen sortiert nach Schlüssel ausgeben', fakeAsync(() => {
      component.compareFn = luxLookupCompareKeyFn;
      fixture.detectChanges();
      fixture.debugElement.injector.get(LuxLookupHandlerService).reloadData('test');
      fixture.detectChanges();
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      trigger.click();
      fixture.detectChanges();
      flush();

      let options = overlayHelper.selectAllFromOverlay('mat-option');
      expect(options?.length).toEqual(6);
      expect(options[1].querySelector('span')?.innerText).toEqual('Afghanistan');
      expect(options[2].querySelector('span')?.innerText).toEqual('Bellux');
      expect(options[3].querySelector('span')?.innerText).toEqual('Ägypten');
      expect(options[4].querySelector('span')?.innerText).toEqual('Deutschland');
      expect(options[5].querySelector('span')?.innerText).toEqual('Algerien');

      discardPeriodicTasks();
    }));
  });
});

@Component({
  template: `
    <lux-lookup-combobox-ac
      [luxControlValidators]="validators"
      [(luxValue)]="value"
      [luxCompareFn]="compareFn"
      luxLookupId="test"
      luxRenderProp="kurzText"
      [luxParameters]="params"
      [luxLabel]="'Label'"
      [luxRequired]="required"
    ></lux-lookup-combobox-ac>
  `
})
class LuxNoFormComponent {
  params = new LuxLookupParameters({
    knr: 101,
    fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
  });
  validators?: ValidatorFnType;
  value?: any;
  required?: boolean;
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
        kurzText: 'Bellux',
        langText1: 'Belgien und Luxemburg',
        gueltigkeitVon: '19900101',
        gueltigkeitBis: '20090101'
      },
      {
        key: '11',
        kurzText: 'Ägypten',
        langText1: 'Ägypten'
      },
      {
        key: '100',
        kurzText: 'Deutschland',
        langText1: 'Deutschland'
      },
      {
        key: '1100',
        kurzText: 'Algerien',
        langText1: 'Algerien'
      },
    ]);
  }
}
