/* eslint-disable max-classes-per-file */
import { Directionality } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import {
  waitForAsync,
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxPickValueFnType } from '../lux-form-model/lux-form-selectable-base.class';
import { LuxSelectAcComponent } from './lux-select-ac.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { Subject } from 'rxjs';

describe('LuxSelectAcComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [
        { provide: Directionality, useFactory: () => (dir = { value: 'ltr' }) },
        {
          provide: ScrollDispatcher,
          useFactory: () => ({
            scrolled: () => scrolledSubject.asObservable()
          })
        },
        LuxMediaQueryObserverService,
        LuxConsoleService
      ],
      [
        SelectInsideFormComponent,
        SelectOutsideFormComponent,
        SelectCustomCompareComponent,
        SelectStringArrayComponent,
        SelectValueHookComponent,
        SelectValueHookFormComponent,
        SelectMultipleComponent,
        SelectMultiplePickValueFnComponent,
        SelectWithTemplateComponent
      ]
    );
  });

  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let dir: { value: 'ltr' | 'rtl' };
  let platform: Platform;
  const scrolledSubject = new Subject();

  const configureMatSelectTestingModule = () => {
    inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      platform = p;
    })();
  };

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('innerhalb eines Formulars', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectInsideFormComponent>;
    let testComponent: SelectInsideFormComponent;
    let trigger: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectInsideFormComponent);
      testComponent = fixture.componentInstance;
    });

    it('Wert über das FormControl setzen', fakeAsync(() => {
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      expect(testComponent.formGroup.get('hobbies')!.value).toBeNull();

      testComponent.formGroup.get('hobbies')!.setValue([testComponent.allHobbies[0]]);
      tick();
      fixture.detectChanges();

      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[0].classList).toContain('mat-selected');
    }));

    it('Wert über das Popup setzen', fakeAsync(() => {
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      expect(testComponent.formGroup.get('hobbies')!.value).toBeNull();

      trigger.click();
      fixture.detectChanges();
      flush();

      (overlayContainerElement.querySelectorAll('mat-option')[1] as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect([{ label: 'Fußball', value: 'f' }]).toEqual(testComponent.formGroup.get('hobbies')!.value as Option[]);
    }));

    it('Den Wert und die Options mit leichter Verzögerung setzen', fakeAsync(() => {
      // Vorbedingungen testen
      const luxSelect = fixture.debugElement.query(By.directive(LuxSelectAcComponent)).componentInstance;
      const mockData = [...testComponent.allHobbies];

      testComponent.allHobbies = [];
      testComponent.formGroup.get('hobbies')!.setValue([mockData[0]]);
      LuxTestHelper.wait(fixture);

      expect(luxSelect.luxSelected).toEqual([mockData[0]]);

      // Änderungen durchführen
      testComponent.allHobbies = mockData;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(luxSelect.luxSelected).toEqual([mockData[0]]);
    }));

    it('Sollte required sein', fakeAsync(() => {
      fixture.detectChanges();
      // Vorbedingungen testen
      const luxSelect: LuxSelectAcComponent = fixture.debugElement.query(By.directive(LuxSelectAcComponent))
        .componentInstance;
      expect(luxSelect.luxRequired).toBeFalsy();
      expect(luxSelect.formControl.valid).toBe(true);

      // Änderungen durchführen
      testComponent.formGroup.get('hobbies')!.setValidators(Validators.required);
      LuxTestHelper.wait(fixture);
      luxSelect.formControl.markAsTouched();
      luxSelect.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(luxSelect.luxRequired).toBe(true);
      expect(luxSelect.formControl.valid).toBe(false);
    }));
  });

  describe('außerhalb eines Formulars', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectOutsideFormComponent>;
    let testComponent: SelectOutsideFormComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectOutsideFormComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('Wert über das Property setzen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toBeNull();

      fixture.componentInstance.selectedOption = testComponent.options[3];

      fixture.detectChanges();
      flush();

      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[3].classList).toContain('mat-selected');
    }));

    it('Wert über das Popup setzen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toBeNull()

      trigger.click();
      fixture.detectChanges();
      flush();

      (overlayContainerElement.querySelector('mat-option') as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect({ label: 'Meine Aufgaben', value: 'A' }).toEqual(fixture.componentInstance.selectedOption as Option);

      discardPeriodicTasks();
    }));

    it('Validators setzen und korrekte Fehlermeldung anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      const selectComponent: LuxSelectAcComponent = fixture.debugElement.query(By.directive(LuxSelectAcComponent))
        .componentInstance;
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeFalsy();

      // Änderungen durchführen
      testComponent.validators = Validators.required;
      LuxTestHelper.wait(fixture);
      selectComponent.formControl.markAsTouched();
      selectComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture, 100);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl.nativeElement.innerText.trim().length).toBeGreaterThan(0);
      expect(errorEl.nativeElement.innerText.trim()).toEqual('* Pflichtfeld');
      expect(selectComponent.formControl.valid).toBeFalsy();
    }));

    it('Array als Value', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.options = [
        { label: '0', value: ['0', '1', '2'] },
        { label: '1', value: ['3', '4', '5'] },
        { label: '2', value: ['6', '7', '8'] },
        { label: '3', value: ['9', '10', '11'] }
      ] as any;
      testComponent.selectedOption = null;
      LuxTestHelper.wait(fixture);
      expect(testComponent.select.luxSelected).toBeNull();

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[1];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.select.luxSelected).toEqual(testComponent.options[1]);

      flush();
    }));

    it('Kein initiales Change-Event ausgeben', fakeAsync(() => {
      // Vorbedingungen testen.
      // Die Component muss neu initialisiert werden.
      fixture = TestBed.createComponent(SelectOutsideFormComponent);
      testComponent = fixture.componentInstance;
      const selectComponent = fixture.debugElement.query(By.directive(LuxSelectAcComponent)).componentInstance;
      const changeEventSpy = spyOn(selectComponent.luxSelectedChange, 'emit');

      LuxTestHelper.wait(fixture);

      expect(changeEventSpy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(changeEventSpy).toHaveBeenCalledTimes(1);

      flush();
    }));

    it('Sollte required sein', fakeAsync(() => {
      // Vorbedingungen testen
      const luxInput: LuxSelectAcComponent = fixture.debugElement.query(By.directive(LuxSelectAcComponent))
        .componentInstance;
      let selectRequired = fixture.debugElement.query(By.css('.mat-select-required'));
      expect(selectRequired).toBeNull();

      // Änderungen durchführen
      testComponent.required = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      selectRequired = fixture.debugElement.query(By.css('.mat-select-required'));
      expect(selectRequired).not.toBeNull();

      // Änderungen durchführen
      luxInput.formControl.markAsTouched();
      luxInput.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(luxInput.formControl.valid).toBe(false);
      expect(luxInput.formControl.errors).not.toBeNull();
      expect(luxInput.formControl.errors!.required).toBe(true);
    }));

    it('Sollte readonly sein', fakeAsync(() => {
      // Vorbedingungen testen
      let readonlySelect = fixture.debugElement.query(By.css('lux-select-ac .lux-form-control-readonly-authentic'));
      expect(readonlySelect).toBeNull();

      // Änderungen durchführen
      testComponent.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      readonlySelect = fixture.debugElement.query(By.css('lux-select-ac .lux-form-control-readonly-authentic'));
      expect(readonlySelect).not.toBeNull();
    }));

    it('Sollte disabled sein', fakeAsync(() => {
      // Vorbedingungen testen
      let disabledSelect = fixture.debugElement.query(By.css('lux-select-ac .lux-form-control-disabled-authentic'));
      expect(disabledSelect).toBeNull();

      // Änderungen durchführen
      testComponent.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledSelect = fixture.debugElement.query(By.css('lux-select-ac .lux-form-control-disabled-authentic'));
      expect(disabledSelect).not.toBeNull();
    }));

    it('Sollte das Label darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      let label = fixture.debugElement.query(By.css('.lux-label-authentic'));
      expect(label.nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      testComponent.label = 'Label';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      label = fixture.debugElement.query(By.css('.lux-label-authentic'));
      expect(label.nativeElement.textContent.trim()).toEqual('Label');
    }));

    it('Sollte den Placeholder darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      let placeholder = fixture.debugElement.query(By.css('.mat-select-placeholder'));
      expect(placeholder.nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      testComponent.placeholder = 'Placeholder';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      placeholder = fixture.debugElement.query(By.css('.mat-select-placeholder'));
      expect(placeholder.nativeElement.textContent.trim()).toEqual('Placeholder');
    }));

    it('Sollte den Hint darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      let hint = fixture.debugElement.query(By.css('mat-hint'));
      expect(hint).toBeNull();

      // Änderungen durchführen
      testComponent.hint = 'Hint';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      hint = fixture.debugElement.query(By.css('mat-hint'));
      expect(hint.nativeElement.textContent.trim()).toEqual('Hint');
    }));
  });

  describe('Custom Compare', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectCustomCompareComponent>;
    let testComponent: SelectCustomCompareComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectCustomCompareComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('Objekte anhand der Values vergleichen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toBeNull();

      fixture.componentInstance.selectedOption = { absoluteNeueProperty: 'mock', value: 'D' };
      fixture.detectChanges();
      flush();

      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[3].classList).toContain('mat-selected');
      discardPeriodicTasks();
    }));
  });

  describe('mit simplem Daten-Array', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectStringArrayComponent>;
    let testComponent: SelectStringArrayComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectStringArrayComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('Wert über das Property setzen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toBeNull();

      fixture.componentInstance.selectedOption = testComponent.options[3];

      fixture.detectChanges();
      flush();

      trigger.click();
      LuxTestHelper.wait(fixture, 500);
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[3].classList).toContain('mat-selected');
    }));

    it('Wert über das Popup setzen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toBeNull();

      trigger.click();
      fixture.detectChanges();
      flush();

      (overlayContainerElement.querySelector('mat-option') as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect('A').toEqual(fixture.componentInstance.selectedOption);
    }));

    it('Array als Value', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.options = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['9', '10', '11']
      ] as any;
      testComponent.selectedOption = undefined;
      LuxTestHelper.wait(fixture);
      expect(testComponent.select.luxSelected).toBeUndefined();

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[1];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.select.luxSelected).toEqual(testComponent.options[1]);

      flush();
    }));

    it('Sollte null, undefined und "" fehlerfrei als leeren String darstellen und die Werte emitten', fakeAsync(() => {
      const clickTrigger = () => {
        trigger.click();
        LuxTestHelper.wait(fixture, 500);
        flush();
      };

      const clickOption = (i: number) => {
        options.item(i).click();
        LuxTestHelper.wait(fixture, 500);
        flush();
      };

      // Vorbedingungen testen
      testComponent.options.unshift(null, undefined, '');
      LuxTestHelper.wait(fixture);

      clickTrigger();

      const options = overlayContainerElement.querySelectorAll('mat-option .mat-option-text') as NodeListOf<
        HTMLElement
        >;

      expect(options.length).toBe(testComponent.options.length);
      expect(options.item(0).innerText.trim()).toEqual('');
      expect(options.item(1).innerText.trim()).toEqual('');
      expect(options.item(2).innerText.trim()).toEqual('');
      expect(options.item(3).innerText.trim()).toEqual('A');
      expect(options.item(4).innerText.trim()).toEqual('B');
      expect(options.item(5).innerText.trim()).toEqual('C');
      expect(options.item(6).innerText.trim()).toEqual('D');

      // Änderungen durchführen
      clickOption(0);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBeNull();
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).not.toBeNull();

      // Änderungen durchführen
      clickTrigger();
      clickOption(2);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBe('');
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).toBeNull();

      // Änderungen durchführen
      clickTrigger();
      clickOption(1);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBeUndefined();
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).not.toBeNull();

      // Änderungen durchführen
      clickTrigger();
      clickOption(3);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBe('A');
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).toBeNull();
    }));
  });

  describe('mit einer gesetzten Value-Hook (ohne Formular)', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectValueHookComponent>;
    let testComponent: SelectValueHookComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectValueHookComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('nur Werte und keine Objekte emitten', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.selectedOption = testComponent.options[1];
      expect(testComponent.selectedOption).toEqual(testComponent.options[1]);

      // Änderungen durchführen
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toEqual('B');

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[2];
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toEqual('C');
    }));

    it('Array als Value', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.options = [
        { label: '0', value: ['0', '1', '2'] },
        { label: '1', value: ['3', '4', '5'] },
        { label: '2', value: ['6', '7', '8'] },
        { label: '3', value: ['9', '10', '11'] }
      ] as any;
      testComponent.selectedOption = undefined;
      LuxTestHelper.wait(fixture);
      expect(testComponent.select.luxSelected).toBeUndefined();

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[1];
      LuxTestHelper.wait(fixture);
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.select.luxSelected).toEqual(testComponent.options[1].value);
    }));
  });

  describe('mit einer gesetzten Value-Hook (in einem Formular)', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectValueHookFormComponent>;
    let testComponent: SelectValueHookFormComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectValueHookFormComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('nur Werte und keine Objekte emitten', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.formGroup.get('hobbies')!.setValue(testComponent.options[1]);
      // Änderungen durchführen
      LuxTestHelper.wait(fixture);
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.formGroup.value.hobbies).toEqual('B');

      // Änderungen durchführen
      testComponent.formGroup.get('hobbies')!.setValue(testComponent.options[2]);
      LuxTestHelper.wait(fixture);
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.formGroup.value.hobbies).toEqual('C');
    }));
  });

  describe('als Multiselect', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectMultipleComponent>;
    let testComponent: SelectMultipleComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectMultipleComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('Sollte mehrere Werte selektieren können (über PopUp)', fakeAsync(() => {
      // Vorbedingungen testen
      expect(testComponent.selectedOptions).toEqual([]);

      // Änderungen durchführen
      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option');
      (options[0] as HTMLElement).click();
      fixture.detectChanges();
      flush();

      trigger.click();
      fixture.detectChanges();
      flush();

      (options[1] as HTMLElement).click();
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(
        testComponent.options[0].label + ', ' + testComponent.options[1].label
      );
      expect([testComponent.options[0], testComponent.options[1]]).toEqual(fixture.componentInstance.selectedOptions as any);
      discardPeriodicTasks();
    }));

    it('Sollte mehrere Werte selektieren können (über Value)', fakeAsync(() => {
      // Vorbedingungen testen
      const luxSelect: LuxSelectAcComponent = fixture.debugElement.query(By.directive(LuxSelectAcComponent))
        .componentInstance;
      expect(testComponent.selectedOptions).toEqual([]);

      // Änderungen durchführen
      testComponent.selectedOptions = [testComponent.options[0], testComponent.options[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(
        testComponent.options[0].label + ', ' + testComponent.options[1].label
      );
      expect(luxSelect.luxSelected).toEqual([testComponent.options[0], testComponent.options[1]]);
      discardPeriodicTasks();
    }));

    it('Sollte mehrere Werte selektieren können (mit ValueHook)', fakeAsync(() => {
      const pickFixture: ComponentFixture<SelectMultiplePickValueFnComponent> = TestBed.createComponent(SelectMultiplePickValueFnComponent);
      const pickComponent: SelectMultiplePickValueFnComponent = pickFixture.componentInstance;
      pickFixture.detectChanges();

      // Vorbedingungen testen
      const luxSelect: LuxSelectAcComponent = pickFixture.debugElement.query(By.directive(LuxSelectAcComponent)).componentInstance;
      expect(pickComponent.selectedOptions).toEqual([]);

      // Änderungen durchführen
      pickComponent.hook = (option: Option) => option.value;
      LuxTestHelper.wait(pickFixture);
      pickComponent.selectedOptions = [pickComponent.options[0].value, pickComponent.options[1].value];
      LuxTestHelper.wait(pickFixture);

      // Nachbedingungen prüfen
      const selectText = pickFixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(
        pickComponent.options[0].label + ', ' + pickComponent.options[1].label
      );
      expect(luxSelect.luxSelected).toEqual([pickComponent.options[0].value, pickComponent.options[1].value]);
      discardPeriodicTasks();
    }));

    it('Sollte mehrere Werte selektieren können (mit String-Options)', fakeAsync(() => {
      // Vorbedingungen testen
      const luxSelect: LuxSelectAcComponent = fixture.debugElement.query(By.directive(LuxSelectAcComponent))
        .componentInstance;
      expect(testComponent.selectedOptions).toEqual([]);

      // Änderungen durchführen
      testComponent.options = ['A', 'B', 'C', 'D'] as any;
      LuxTestHelper.wait(fixture);
      testComponent.selectedOptions = [testComponent.options[0], testComponent.options[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(testComponent.options[0] + ', ' + testComponent.options[1]);
      expect(luxSelect.luxSelected).toEqual([testComponent.options[0], testComponent.options[1]]);
      discardPeriodicTasks();
    }));

    it('Sollte falsche Werte auslassen und einen Fehler loggen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(testComponent.selectedOptions).toEqual([]);

      // Änderungen durchführen
      testComponent.selectedOptions = [{ value: 'WRONG', label: 'WRONG' }, testComponent.options[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(testComponent.options[1].label);
      discardPeriodicTasks();
    }));
  });

  describe('Darstellung über Ng-Template', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectWithTemplateComponent>;
    let testComponent: SelectWithTemplateComponent;
    let select: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectWithTemplateComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    }));

    it('Sollte die Options richtig darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      let optionTexts = overlayContainerElement.querySelectorAll('.mat-option-text');
      expect(optionTexts.length).toBe(0);

      // Änderungen durchführen
      trigger.click();
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      optionTexts = overlayContainerElement.querySelectorAll('.mat-option-text');
      expect(optionTexts.length).toBe(4);
      expect(optionTexts[0].textContent!.trim()).toEqual('Option: A');
      expect(optionTexts[1].textContent!.trim()).toEqual('Option: B');
      expect(optionTexts[2].textContent!.trim()).toEqual('Option: C');
      expect(optionTexts[3].textContent!.trim()).toEqual('Option: D');
    }));

    it('Sollte ngTemplate luxOptionLabelProp vorziehen', fakeAsync(() => {
      // Vorbedingungen testen
      let optionTexts = overlayContainerElement.querySelectorAll('.mat-option-text');
      expect(optionTexts.length).toBe(0);

      // Änderungen durchführen
      testComponent.labelProp = 'label';
      LuxTestHelper.wait(fixture);

      trigger.click();
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      optionTexts = overlayContainerElement.querySelectorAll('.mat-option-text');
      expect(optionTexts.length).toBe(4);
      expect(optionTexts[0].textContent!.trim()).toEqual('Option: A');
      expect(optionTexts[1].textContent!.trim()).toEqual('Option: B');
      expect(optionTexts[2].textContent!.trim()).toEqual('Option: C');
      expect(optionTexts[3].textContent!.trim()).toEqual('Option: D');
    }));
  });
});

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-select-ac
        luxLabel="Hobbys"
        luxControlBinding="hobbies"
        [luxOptions]="allHobbies"
        luxOptionLabelProp="label"
        [luxMultiple]="true"
      ></lux-select-ac>
    </form>
  `
})
class SelectInsideFormComponent {
  @ViewChild(LuxSelectAcComponent) select!: LuxSelectAcComponent;

  allHobbies: Option[] = [
    { label: 'Reiten', value: 'r' },
    { label: 'Fußball', value: 'f' },
    { label: 'Handball', value: 'h' },
    { label: 'Stricken', value: 's' }
  ];

  formGroup = new FormGroup({
    hobbies: new FormControl<Option[] | null>(null)
  });
}

@Component({
  template: `
    <lux-select-ac
      [luxOptions]="options"
      luxOptionLabelProp="label"
      [luxControlValidators]="validators"
      (luxSelectedChange)="selectedChange($event)"
      [(luxSelected)]="selectedOption"
      [luxMultiple]="false"
      [luxRequired]="required"
      [luxLabel]="label"
      [luxHint]="hint"
      [luxReadonly]="readonly"
      [luxDisabled]="disabled"
      [luxPlaceholder]="placeholder"
    ></lux-select-ac>
  `
})
class SelectOutsideFormComponent {
  @ViewChild(LuxSelectAcComponent) select!: LuxSelectAcComponent;

  label?: string;
  hint?: string;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;

  selectedOption: Option | null = null;
  validators?: LuxPickValueFnType;
  required?: boolean;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  selectedChange(selected: Option) {
    console.log(selected);
  }
}

@Component({
  template: `
    <lux-select-ac
      luxLabel="Aufgaben"
      [luxOptions]="options"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOption"
      [luxMultiple]="false"
      [luxRequired]="false"
      [luxCompareWith]="compareFn"
    ></lux-select-ac>
  `
})
class SelectCustomCompareComponent {
  @ViewChild(LuxSelectAcComponent) select!: LuxSelectAcComponent;

  selectedOption: any = null;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  compareFn(o1: Option, o2: Option) {
    console.log('compareFn', o1.value === o2.value);
    return o1.value === o2.value;
  }
}

@Component({
  template: `
    <lux-select-ac
      luxLabel="Aufgaben"
      [luxOptions]="options"
      [(luxSelected)]="selectedOption"
      [luxMultiple]="false"
      [luxRequired]="false"
    ></lux-select-ac>
  `
})
class SelectStringArrayComponent {
  @ViewChild(LuxSelectAcComponent) select!: LuxSelectAcComponent;
  selectedOption: any = null;
  options: (string | null | undefined)[] = ['A', 'B', 'C', 'D'];
}

declare interface Option { label: string; value: string}

@Component({
  template: `
    <lux-select-ac
      luxLabel="Aufgaben"
      [luxOptions]="options"
      [luxPickValue]="hook"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOption"
    ></lux-select-ac>
  `
})
class SelectValueHookComponent {
  @ViewChild(LuxSelectAcComponent) select!: LuxSelectAcComponent;
  selectedOption: any = null;
  options: Option[] = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  hook(option: Option) {
    return option ? option.value : option;
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-select-ac
        luxLabel="Hobbys"
        [luxOptions]="options"
        [luxPickValue]="hook"
        luxOptionLabelProp="label"
        luxControlBinding="hobbies"
      ></lux-select-ac>
    </form>
    {{ formGroup.value | json }}
  `
})
class SelectValueHookFormComponent {
  @ViewChild(LuxSelectAcComponent) select!: LuxSelectAcComponent;

  options: Option[] = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  formGroup = new FormGroup<any>({
    hobbies: new FormControl<any>('')
  });

  hook(option: Option) {
    return option ? option.value : option;
  }
}

@Component({
  template: `
    <lux-select-ac
      luxLabel="Aufgaben"
      [luxOptions]="options"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOptions"
      [luxMultiple]="true"
      [luxPickValue]="hook"
    ></lux-select-ac>
  `
})
class SelectMultipleComponent {
  selectedOptions: Option[] = [];

  hook?: LuxPickValueFnType<Option, Option>;

  options: Option[] = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];
}

@Component({
  template: `
    <lux-select-ac
      luxLabel="Aufgaben"
      [luxOptions]="options"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOptions"
      [luxMultiple]="true"
      [luxPickValue]="hook"
    ></lux-select-ac>
  `
})
class SelectMultiplePickValueFnComponent {
  selectedOptions: string[] = [];

  hook?: LuxPickValueFnType<Option, string>;

  options: Option[] = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];
}

@Component({
  template: `
    <lux-select-ac [luxOptions]="options" [(luxSelected)]="selectedOption">
      <ng-template let-option>
        {{ 'Option: ' + option.value }}
      </ng-template>
    </lux-select-ac>
  `
})
class SelectWithTemplateComponent {
  selectedOption: any[] = [];
  labelProp?: string;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];
}
