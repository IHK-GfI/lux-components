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

import { LuxSelectComponent } from './lux-select.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { Subject } from 'rxjs';

describe('LuxSelectComponent', () => {

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
        SelectWithTemplateComponent
      ]
    );
  });

  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let dir: { value: 'ltr' | 'rtl' };
  let platform: Platform;
  const scrolledSubject = new Subject();

  function configureMatSelectTestingModule() {
    inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      platform = p;
    })();
  }

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('innerhalb eines Formulars', () => {
    beforeEach(waitForAsync(() => configureMatSelectTestingModule()));

    let fixture: ComponentFixture<SelectInsideFormComponent>;
    let testComponent: SelectInsideFormComponent;
    let trigger: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectInsideFormComponent);
      testComponent = fixture.componentInstance;
    }));

    it('Wert über das FormControl setzen', fakeAsync(() => {
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      expect(testComponent.formGroup.get('hobbies').value).toEqual(
        null,
        `Initial sollte das FormControl einen leeren String enthalten`
      );

      testComponent.formGroup.get('hobbies').setValue([testComponent.allHobbies[0]]);
      tick();
      fixture.detectChanges();

      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[0].classList).toContain('mat-selected', `Die Option wurde nicht selektiert`);
    }));

    it('Wert über das Popup setzen', fakeAsync(() => {
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

      expect(testComponent.formGroup.get('hobbies').value).toEqual(
        null,
        `Initial sollte das FormControl einen leeren String enthalten`
      );

      trigger.click();
      fixture.detectChanges();
      flush();

      (overlayContainerElement.querySelectorAll('mat-option')[1] as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect([{ label: 'Fußball', value: 'f' }]).toEqual(testComponent.formGroup.get('hobbies').value);
    }));

    it('Den Wert und die Options mit leichter Verzögerung setzen', fakeAsync(() => {
      // Vorbedingungen prüfen
      const luxSelect = fixture.debugElement.query(By.directive(LuxSelectComponent)).componentInstance;
      const mockData = [...testComponent.allHobbies];
      const notFoundSpy = spyOn(luxSelect, 'logSelectedNotFound').and.callThrough();
      const checkSelectedSpy = spyOn(luxSelect, 'checkSelectedInOptions').and.callThrough();

      testComponent.allHobbies = [];
      testComponent.formGroup.get('hobbies').setValue([mockData[0]]);
      LuxTestHelper.wait(fixture);

      expect(notFoundSpy).toHaveBeenCalledTimes(0); // Vorbedingung 1
      expect(checkSelectedSpy).toHaveBeenCalledTimes(0); // Vorbedingung 2

      // Änderungen durchführen
      testComponent.allHobbies = mockData;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(notFoundSpy).toHaveBeenCalledTimes(0); // Nachbedingung 1
      expect(checkSelectedSpy).toHaveBeenCalledTimes(0); // Nachbedingung 2

      // Änderungen durchführen
      testComponent.formGroup.get('hobbies').setValue([{ test: true }]);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(notFoundSpy).toHaveBeenCalledTimes(1); // Nachbedingung 3
      expect(checkSelectedSpy).toHaveBeenCalledTimes(1); // Nachbedingung 4
    }));

    it('Sollte required sein', fakeAsync(() => {
      fixture.detectChanges();
      // Vorbedingungen prüfen
      const luxSelect: LuxSelectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent))
        .componentInstance;
      expect(luxSelect.luxRequired).toBeFalsy();
      expect(luxSelect.formControl.valid).toBe(true);

      // Änderungen durchführen
      testComponent.formGroup.get('hobbies').setValidators(Validators.required);
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
      expect(fixture.componentInstance.selectedOption).toEqual(null, `Initial sollte das Property null enthalten`);

      fixture.componentInstance.selectedOption = testComponent.options[3];

      fixture.detectChanges();
      flush();

      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[3].classList).toContain('mat-selected', `Die Option wurde nicht selektiert`);
    }));

    it('Wert über das Popup setzen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toEqual(null, `Initial sollte das Property null enthalten`);

      trigger.click();
      fixture.detectChanges();
      flush();

      (overlayContainerElement.querySelector('mat-option') as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect({ label: 'Meine Aufgaben', value: 'A' }).toEqual(fixture.componentInstance.selectedOption);

      discardPeriodicTasks();
    }));

    it('Validators setzen und korrekte Fehlermeldung anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      const selectComponent: LuxSelectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent))
        .componentInstance;
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeFalsy(`Vorbedingung 1`);

      // Änderungen durchführen
      testComponent.validators = Validators.required;
      LuxTestHelper.wait(fixture);
      selectComponent.formControl.markAsTouched();
      selectComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture, 100);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl.nativeElement.innerText.trim().length).toBeGreaterThan(0, `Nachbedingung 1`);
      expect(errorEl.nativeElement.innerText.trim()).toEqual('* Pflichtfeld', `Nachbedingung 1`);
      expect(selectComponent.formControl.valid).toBeFalsy(`Nachbedingung 2`);
    }));

    it('Array als Value', fakeAsync(() => {
      // Vorbedingung prüfen
      testComponent.options = <any>[
        { label: '0', value: ['0', '1', '2'] },
        { label: '1', value: ['3', '4', '5'] },
        { label: '2', value: ['6', '7', '8'] },
        { label: '3', value: ['9', '10', '11'] }
      ];
      testComponent.selectedOption = undefined;
      LuxTestHelper.wait(fixture);
      expect(testComponent.select.luxSelected).toBeUndefined('Vorbedingung 1');

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[1];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.select.luxSelected).toEqual(testComponent.options[1], 'Nachbedingung 1');

      flush();
    }));

    it('Kein initiales Change-Event ausgeben', fakeAsync(() => {
      // Vorbedingungen prüfen
      // Die Component muss neu initialisiert werden
      fixture = TestBed.createComponent(SelectOutsideFormComponent);
      testComponent = fixture.componentInstance;
      const selectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent)).componentInstance;
      const changeEventSpy = spyOn(selectComponent.luxSelectedChange, 'emit');

      LuxTestHelper.wait(fixture);

      expect(changeEventSpy).toHaveBeenCalledTimes(0); // Vorbedingung 1

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[0];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(changeEventSpy).toHaveBeenCalledTimes(1); // Nachbedingung 1

      flush();
    }));

    it('Sollte required sein', fakeAsync(() => {
      // Vorbedingungen prüfen
      const luxInput: LuxSelectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent))
        .componentInstance;
      let selectRequired = fixture.debugElement.query(By.css('.mat-select-required'));
      expect(selectRequired).toBe(null);

      // Änderungen durchführen
      testComponent.required = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      selectRequired = fixture.debugElement.query(By.css('.mat-select-required'));
      expect(selectRequired).not.toBe(null);

      // Änderungen durchführen
      luxInput.formControl.markAsTouched();
      luxInput.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(luxInput.formControl.valid).toBe(false);
      expect(luxInput.formControl.errors).not.toBe(null);
      expect(luxInput.formControl.errors.required).toBe(true);
    }));

    it('Sollte readonly sein', fakeAsync(() => {
      // Vorbedingungen prüfen
      let readonlySelect = fixture.debugElement.query(By.css('lux-select .lux-form-control-readonly'));
      expect(readonlySelect).toBe(null);

      // Änderungen durchführen
      testComponent.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      readonlySelect = fixture.debugElement.query(By.css('lux-select .lux-form-control-readonly'));
      expect(readonlySelect).not.toBe(null);
    }));

    it('Sollte disabled sein', fakeAsync(() => {
      // Vorbedingungen prüfen
      let disabledSelect = fixture.debugElement.query(By.css('lux-select .lux-form-control-disabled'));
      expect(disabledSelect).toBe(null);

      // Änderungen durchführen
      testComponent.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledSelect = fixture.debugElement.query(By.css('lux-select .lux-form-control-disabled'));
      expect(disabledSelect).not.toBe(null);
    }));

    it('Sollte das Label darstellen', fakeAsync(() => {
      // Vorbedingungen prüfen
      let label = fixture.debugElement.query(By.css('.lux-label'));
      expect(label.nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      testComponent.label = 'Label';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      label = fixture.debugElement.query(By.css('.lux-label'));
      expect(label.nativeElement.textContent.trim()).toEqual('Label');
    }));

    it('Sollte den Placeholder darstellen', fakeAsync(() => {
      // Vorbedingungen prüfen
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
      // Vorbedingungen prüfen
      let hint = fixture.debugElement.query(By.css('mat-hint'));
      expect(hint).toBe(null);

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
      expect(fixture.componentInstance.selectedOption).toEqual(null, `Initial sollte das Property null enthalten`);

      fixture.componentInstance.selectedOption = { absoluteNeueProperty: 'mock', value: 'D' };
      fixture.detectChanges();
      flush();

      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[3].classList).toContain('mat-selected', `Die Option wurde nicht selektiert`);
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
      expect(fixture.componentInstance.selectedOption).toEqual(null, `Initial sollte das Property null enthalten`);

      fixture.componentInstance.selectedOption = testComponent.options[3];

      fixture.detectChanges();
      flush();

      trigger.click();
      LuxTestHelper.wait(fixture, 500);
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      expect(options[3].classList).toContain('mat-selected', `Die Option wurde nicht selektiert`);
    }));

    it('Wert über das Popup setzen', fakeAsync(() => {
      expect(fixture.componentInstance.selectedOption).toEqual(null, `Initial sollte das Property null enthalten`);

      trigger.click();
      fixture.detectChanges();
      flush();

      (overlayContainerElement.querySelector('mat-option') as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect('A').toEqual(fixture.componentInstance.selectedOption);
    }));

    it('Array als Value', fakeAsync(() => {
      // Vorbedingung prüfen
      testComponent.options = <any>[
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['9', '10', '11']
      ];
      testComponent.selectedOption = undefined;
      LuxTestHelper.wait(fixture);
      expect(testComponent.select.luxSelected).toBeUndefined('Vorbedingung 1');

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[1];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.select.luxSelected).toEqual(testComponent.options[1], 'Nachbedingung 1');

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

      // Vorbedingung prüfen
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
      expect(testComponent.selectedOption).toBe(null);
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).toBe(null);
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).not.toBe(null);

      // Änderungen durchführen
      clickTrigger();
      clickOption(2);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBe('');
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).not.toBe(null);
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).toBe(null);

      // Änderungen durchführen
      clickTrigger();
      clickOption(1);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBe(undefined);
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).toBe(null);
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).not.toBe(null);

      // Änderungen durchführen
      clickTrigger();
      clickOption(3);

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toBe('A');
      expect(fixture.debugElement.query(By.css('.mat-select-value-text'))).not.toBe(null);
      expect(fixture.debugElement.query(By.css('.mat-select-placeholder'))).toBe(null);
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
      // Vorbedingungen prüfen
      testComponent.selectedOption = testComponent.options[1];
      expect(testComponent.selectedOption).toEqual(testComponent.options[1], 'Vorbedingung 1');

      // Änderungen durchführen
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toEqual('B', 'Nachbedingung 1');

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[2];
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.selectedOption).toEqual('C', 'Nachbedingung 2');
    }));

    it('Array als Value', fakeAsync(() => {
      // Vorbedingung prüfen
      testComponent.options = <any>[
        { label: '0', value: ['0', '1', '2'] },
        { label: '1', value: ['3', '4', '5'] },
        { label: '2', value: ['6', '7', '8'] },
        { label: '3', value: ['9', '10', '11'] }
      ];
      testComponent.selectedOption = undefined;
      LuxTestHelper.wait(fixture);
      expect(testComponent.select.luxSelected).toBeUndefined('Vorbedingung 1');

      // Änderungen durchführen
      testComponent.selectedOption = testComponent.options[1];
      LuxTestHelper.wait(fixture);
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.select.luxSelected).toEqual(testComponent.options[1].value, 'Nachbedingung 1');
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
      // Vorbedingungen prüfen
      testComponent.formGroup.get('hobbies').setValue(testComponent.options[1]);
      // Änderungen durchführen
      LuxTestHelper.wait(fixture);
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.formGroup.value.hobbies).toEqual('B', 'Nachbedingung 1');

      // Änderungen durchführen
      testComponent.formGroup.get('hobbies').setValue(testComponent.options[2]);
      LuxTestHelper.wait(fixture);
      flush();

      // Nachbedingungen prüfen
      expect(testComponent.formGroup.value.hobbies).toEqual('C', 'Nachbedingung 2');
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
      // Vorbedingungen prüfen
      expect(testComponent.selectedOption).toEqual([]);

      // Änderungen durchführen
      trigger.click();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('mat-option');
      (<HTMLElement>options[0]).click();
      fixture.detectChanges();
      flush();

      trigger.click();
      fixture.detectChanges();
      flush();

      (<HTMLElement>options[1]).click();
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(
        testComponent.options[0].label + ', ' + testComponent.options[1].label
      );
      expect([testComponent.options[0], testComponent.options[1]]).toEqual(fixture.componentInstance.selectedOption);
      discardPeriodicTasks();
    }));

    it('Sollte mehrere Werte selektieren können (über Value)', fakeAsync(() => {
      // Vorbedingungen prüfen
      const luxSelect: LuxSelectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent))
        .componentInstance;
      expect(testComponent.selectedOption).toEqual([]);

      // Änderungen durchführen
      testComponent.selectedOption = [testComponent.options[0], testComponent.options[1]];
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
      // Vorbedingungen prüfen
      const luxSelect: LuxSelectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent))
        .componentInstance;
      expect(testComponent.selectedOption).toEqual([]);

      // Änderungen durchführen
      testComponent.hook = option => option.value;
      LuxTestHelper.wait(fixture);
      testComponent.selectedOption = [testComponent.options[0].value, testComponent.options[1].value];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(
        testComponent.options[0].label + ', ' + testComponent.options[1].label
      );
      expect(luxSelect.luxSelected).toEqual([testComponent.options[0].value, testComponent.options[1].value]);
      discardPeriodicTasks();
    }));

    it('Sollte mehrere Werte selektieren können (mit String-Options)', fakeAsync(() => {
      // Vorbedingungen prüfen
      const luxSelect: LuxSelectComponent = fixture.debugElement.query(By.directive(LuxSelectComponent))
        .componentInstance;
      expect(testComponent.selectedOption).toEqual([]);

      // Änderungen durchführen
      testComponent.options = <any>['A', 'B', 'C', 'D'];
      LuxTestHelper.wait(fixture);
      testComponent.selectedOption = [testComponent.options[0], testComponent.options[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(testComponent.options[0] + ', ' + testComponent.options[1]);
      expect(luxSelect.luxSelected).toEqual([testComponent.options[0], testComponent.options[1]]);
      discardPeriodicTasks();
    }));

    it('Sollte falsche Werte auslassen und einen Fehler loggen', fakeAsync(() => {
      // Vorbedingungen prüfen
      const spy = spyOn(console, 'error');
      expect(testComponent.selectedOption).toEqual([]);

      // Änderungen durchführen
      testComponent.selectedOption = [{ value: 'WRONG', label: 'WRONG' }, testComponent.options[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const selectText = fixture.debugElement.query(By.css('.mat-select-value-text > span'));
      expect(selectText.nativeElement.textContent).toEqual(testComponent.options[1].label);
      expect(spy).toHaveBeenCalledTimes(1);
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
      // Vorbedingungen prüfen
      let optionTexts = overlayContainerElement.querySelectorAll('.mat-option-text');
      expect(optionTexts.length).toBe(0);

      // Änderungen durchführen
      trigger.click();
      fixture.detectChanges();
      flush();

      // Nachbedingungen prüfen
      optionTexts = overlayContainerElement.querySelectorAll('.mat-option-text');
      expect(optionTexts.length).toBe(4);
      expect(optionTexts[0].textContent.trim()).toEqual('Option: A');
      expect(optionTexts[1].textContent.trim()).toEqual('Option: B');
      expect(optionTexts[2].textContent.trim()).toEqual('Option: C');
      expect(optionTexts[3].textContent.trim()).toEqual('Option: D');
    }));

    it('Sollte ngTemplate luxOptionLabelProp vorziehen', fakeAsync(() => {
      // Vorbedingungen prüfen
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
      expect(optionTexts[0].textContent.trim()).toEqual('Option: A');
      expect(optionTexts[1].textContent.trim()).toEqual('Option: B');
      expect(optionTexts[2].textContent.trim()).toEqual('Option: C');
      expect(optionTexts[3].textContent.trim()).toEqual('Option: D');
    }));
  });
});

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-select
        luxLabel="Hobbys"
        luxControlBinding="hobbies"
        [luxOptions]="allHobbies"
        luxOptionLabelProp="label"
        [luxMultiple]="true"
      ></lux-select>
    </form>
  `
})
class SelectInsideFormComponent {
  @ViewChild(LuxSelectComponent) select: LuxSelectComponent;

  allHobbies = [
    { label: 'Reiten', value: 'r' },
    { label: 'Fußball', value: 'f' },
    { label: 'Handball', value: 'h' },
    { label: 'Stricken', value: 's' }
  ];

  formGroup = new FormGroup({
    hobbies: new FormControl(null)
  });
}

@Component({
  template: `
    <lux-select
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
    ></lux-select>
  `
})
class SelectOutsideFormComponent {
  @ViewChild(LuxSelectComponent) select: LuxSelectComponent;

  label;
  hint;
  readonly;
  disabled;
  placeholder;

  selectedOption: any = null;
  validators;
  required;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  selectedChange($event) {
    console.log($event);
  }
}

@Component({
  template: `
    <lux-select
      luxLabel="Aufgaben"
      [luxOptions]="options"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOption"
      [luxMultiple]="false"
      [luxRequired]="false"
      [luxCompareWith]="compareFn"
    ></lux-select>
  `
})
class SelectCustomCompareComponent {
  @ViewChild(LuxSelectComponent) select: LuxSelectComponent;

  selectedOption: any = null;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  compareFn(o1, o2) {
    console.log('compareFn', o1.value === o2.value);
    return o1.value === o2.value;
  }
}

@Component({
  template: `
    <lux-select
      luxLabel="Aufgaben"
      [luxOptions]="options"
      [(luxSelected)]="selectedOption"
      [luxMultiple]="false"
      [luxRequired]="false"
    ></lux-select>
  `
})
class SelectStringArrayComponent {
  @ViewChild(LuxSelectComponent) select: LuxSelectComponent;
  selectedOption: any = null;
  options = ['A', 'B', 'C', 'D'];
}

@Component({
  template: `
    <lux-select
      luxLabel="Aufgaben"
      [luxOptions]="options"
      [luxPickValue]="hook"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOption"
    ></lux-select>
  `
})
class SelectValueHookComponent {
  @ViewChild(LuxSelectComponent) select: LuxSelectComponent;
  selectedOption: any = null;
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  hook(option) {
    return option ? option.value : option;
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-select
        luxLabel="Hobbys"
        [luxOptions]="options"
        [luxPickValue]="hook"
        luxOptionLabelProp="label"
        luxControlBinding="hobbies"
      ></lux-select>
    </form>
    {{ formGroup.value | json }}
  `
})
class SelectValueHookFormComponent {
  @ViewChild(LuxSelectComponent) select: LuxSelectComponent;
  selectedOption: any = null;
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  formGroup = new FormGroup({
    hobbies: new FormControl('')
  });

  hook(option) {
    return option ? option.value : option;
  }
}

@Component({
  template: `
    <lux-select
      luxLabel="Aufgaben"
      [luxOptions]="options"
      luxOptionLabelProp="label"
      [(luxSelected)]="selectedOption"
      [luxMultiple]="true"
      [luxPickValue]="hook"
    ></lux-select>
  `
})
class SelectMultipleComponent {
  selectedOption: any[] = [];

  hook;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];
}

@Component({
  template: `
    <lux-select [luxOptions]="options" [(luxSelected)]="selectedOption">
      <ng-template let-option>
        {{ 'Option: ' + option.value }}
      </ng-template>
    </lux-select>
  `
})
class SelectWithTemplateComponent {
  selectedOption: any[] = [];
  labelProp;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];
}
