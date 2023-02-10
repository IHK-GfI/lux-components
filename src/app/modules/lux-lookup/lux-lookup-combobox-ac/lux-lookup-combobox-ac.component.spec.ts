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
      [LuxNoFormComponent, LuxScrollComponent]
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

  describe('Nachladen', () => {
    let fixture: ComponentFixture<LuxScrollComponent>;
    let component: LuxScrollComponent;
    let combobox: LuxLookupComboboxAcComponent;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxScrollComponent);
      component = fixture.componentInstance;
      combobox = fixture.debugElement.query(By.directive(LuxLookupComboboxAcComponent)).componentInstance;
      fixture.detectChanges();
      overlayHelper = new LuxOverlayHelper();
    });

    it('Sollte die Optionen nachladen', fakeAsync(() => {
      fixture.detectChanges();
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      const spy = spyOn(combobox, 'updateDisplayedEntries').and.callThrough();

      trigger.click();
      fixture.detectChanges();
      flush();

      let options = overlayHelper.selectAllFromOverlay('mat-option');
      expect(options?.length).toEqual(9); // 8 + Leereintrag
      expect(component.myEntries.length).toBe(mockResultTest.length);
      expect(combobox.entries.length).toEqual(mockResultTest.length);
      expect(combobox.displayedEntries.length).toEqual(8);
      expect(combobox.invisibleEntries.length).toEqual(2);

      const panel = fixture.debugElement.query(By.css('div.mat-select-panel'));
      expect(panel).toBeDefined();
      panel.nativeElement.scrollTop = 200;
      LuxTestHelper.dispatchFakeEvent(panel.nativeElement, 'scroll');
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.myEntries.length).toBe(mockResultTest.length);
      expect(combobox.entries.length).toEqual(mockResultTest.length);
      expect(combobox.displayedEntries.length).toEqual(10);
      expect(combobox.invisibleEntries.length).toEqual(0);

      discardPeriodicTasks();
    }));
  });
});

@Component({
  template: `
    <lux-lookup-combobox-ac
      luxTableNo="5"
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

@Component({
  template: `
    <lux-lookup-combobox-ac
      luxTableNo="11"
      [luxEntryBlockSize]="8"
      luxLookupId="test"
      luxRenderProp="kurzText"
      [luxParameters]="params"
      [luxLabel]="'Label'"
      (luxDataLoadedAsArray)="updateEntries($event)"
    ></lux-lookup-combobox-ac>
  `
})
class LuxScrollComponent {
  params = new LuxLookupParameters({
    knr: 101,
    fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
  });

  myEntries: LuxLookupTableEntry[] = [];

  updateEntries(entries: LuxLookupTableEntry[]) {
    this.myEntries = entries;
  }
}

const mockResultTest = [
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
  {
    key: '1111',
    kurzText: 'Finnland',
    langText1: 'Finnland'
  },
  {
    key: '1112',
    kurzText: 'Liechtenstein',
    langText1: 'Liechtenstein'
  },
  {
    key: '1113',
    kurzText: 'Österreich',
    langText1: 'Österreich'
  },
  {
    key: '1114',
    kurzText: 'Schweiz',
    langText1: 'Schweiz'
  },
  {
    key: '1115',
    kurzText: 'Färöer',
    langText1: 'Färöer'
  },
];

class MockLookupService {
  getLookupTable(tableNo: string, _parameters: LuxLookupParameters, _url: string): Observable<LuxLookupTableEntry[]> {
    return of(mockResultTest.slice(0, +tableNo));
  }
}
