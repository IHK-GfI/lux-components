/* eslint-disable max-classes-per-file */
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { By } from "@angular/platform-browser";
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';

import { LuxAutocompleteComponent } from './lux-autocomplete.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxAutocompleteComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxConsoleService],
      [
        LuxAutoCompleteInFormAttributeComponent,
        LuxValueAttributeComponent,
        LuxOptionSelectedComponent,
        LuxAutoCompleteNotAnOptionComponent,
        MockAutocompleteComponent,
        MockPickValueComponent
      ]
    );
  });

  describe('innerhalb eines Formulars', () => {
    describe('FormGroup (not required)"', () => {
      let fixture: ComponentFixture<LuxAutoCompleteInFormAttributeComponent>;
      let component: LuxAutoCompleteInFormAttributeComponent;
      let overlayHelper: LuxOverlayHelper;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAutoCompleteInFormAttributeComponent);
        fixture.detectChanges();
        overlayHelper = new LuxOverlayHelper();
        component = fixture.componentInstance;
        tick(fixture.componentInstance.autocomplete.luxLookupDelay);
      }));

      it('Formularwert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.formGroup.get('aufgaben').value).toEqual('');

        // Änderungen durchführen
        component.formGroup.get('aufgaben').setValue(component.options[1]);
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.autocomplete.luxValue).toEqual(component.options[1]);
        expect(component.formGroup.get('aufgaben').value).toEqual(component.options[1]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('Gruppenaufgaben');
        expect(component.autocomplete.matInput.nativeElement.required).toBeFalsy();
        discardPeriodicTasks();
      }));

      it('Wert über das Textfeld setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.formGroup.get('aufgaben').value).toEqual('');

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Vertretungsaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.autocomplete.luxValue).toEqual(component.options[3]);
        expect(component.formGroup.get('aufgaben').value).toEqual(component.options[3]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('Vertretungsaufgaben');
        expect(component.autocomplete.matInput.nativeElement.required).toBeFalsy();
        discardPeriodicTasks();
      }));

      it('Wert über Popup auswählen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.formGroup.get('aufgaben').value).toEqual('');

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'meine');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        const options = overlayHelper.selectAllFromOverlay('mat-option');
        options[0].click();
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.autocomplete.luxValue).toEqual(component.options[0]);
        expect(component.formGroup.get('aufgaben').value).toEqual(component.options[0]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('Meine Aufgaben');
        discardPeriodicTasks();
      }));

      it('Sollte die Optionen austauschen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.formGroup.get('aufgaben').value).toEqual('');
        expect(component.options[1].label).toEqual('Gruppenaufgaben');

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'A');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        let options = overlayHelper.selectAllFromOverlay('mat-option');
        expect(options.length).toEqual(4);
        expect(options[1].innerText).toEqual('Gruppenaufgaben');

        // Änderungen durchführen
        const testOptions = [
          { label: 'Meine Aufgaben 2', value: 'A' },
          { label: 'Gruppenaufgaben 2', value: 'B' },
          { label: 'Zurückgestellte Aufgaben 2', value: 'C' }
        ];
        component.options = testOptions;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Au');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);
        options = overlayHelper.selectAllFromOverlay('mat-option');
        expect(options.length).toEqual(3);
        expect(options[1].innerText).toEqual('Gruppenaufgaben 2');

        // Änderungen durchführen
        options[1].click();
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.autocomplete.luxValue).toEqual(testOptions[1]);
        expect(component.formGroup.get('aufgaben').value).toEqual(testOptions[1]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('Gruppenaufgaben 2');
        discardPeriodicTasks();
      }));
    });

    describe('Should not click the save button while invalid', () => {
      let fixture: ComponentFixture<LuxAutoCompleteNotAnOptionComponent>;
      let component: LuxAutoCompleteNotAnOptionComponent;
      let overlayHelper: LuxOverlayHelper;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAutoCompleteNotAnOptionComponent);
        fixture.detectChanges();
        overlayHelper = new LuxOverlayHelper();
        component = fixture.componentInstance;
        tick(fixture.componentInstance.autocomplete.luxLookupDelay);
      }));

      it('Wert über das Textfeld setzen', fakeAsync((done) => {
        // Init
        const onSaveSpy = spyOn(fixture.componentInstance, 'onSave');

        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.formGroup.get('aufgaben').value).toEqual('');

        // Änderungen durchführen
        const newTextValue = 'DieseOptionHierGibtEsNicht';
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, newTextValue);
        LuxTestHelper.dispatchFakeEvent(component.autocomplete.matInput.nativeElement, 'focusout', true);
        LuxTestHelper.wait(fixture);

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect(buttonEl.nativeElement.disabled).toBeTrue();
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(newTextValue);
        expect(onSaveSpy).toHaveBeenCalledTimes(0);
        expect(component.formGroup.valid).toBeFalse();
        discardPeriodicTasks();
      }));

    });
  });

  describe('außerhalb eines Formulars', () => {
    describe('Attribut "luxValue" mit Two-Way-Binding', () => {
      let fixture: ComponentFixture<LuxValueAttributeComponent>;
      let component: LuxValueAttributeComponent;
      let overlayHelper: LuxOverlayHelper;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxValueAttributeComponent);
        fixture.detectChanges();
        overlayHelper = new LuxOverlayHelper();
        component = fixture.componentInstance;
        tick(fixture.componentInstance.autocomplete.luxLookupDelay);
      }));

      it('Wert über die Component setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();

        // Änderungen durchführen
        component.selected = component.options[2];
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[2]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[2].label);
      }));

      it('Wert über das Textfeld setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Vertretungsaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[3]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[3].label);
        discardPeriodicTasks();
      }));

      it('Wert der keiner Option entspricht', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();
        expect(component.strict).toBeTruthy();

        // Änderungen durchführen
        component.strict = false;
        fixture.detectChanges();

        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'zzz');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.strict).toBeFalsy();
        expect(component.selected).toEqual('zzz');
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('zzz');
        discardPeriodicTasks();
      }));

      it('Unvollständigen Wert über das Textfeld setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Ver');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[3]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[3].label);
        discardPeriodicTasks();
      }));

      it('Wert über Popup auswählen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.selected).toBeUndefined();

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'meine');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        const options = overlayHelper.selectAllFromOverlay('mat-option');
        options[0].click();
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.autocomplete.luxValue).toEqual(component.options[0]);
        expect(component.selected).toEqual(component.options[0]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('Meine Aufgaben');
        discardPeriodicTasks();
      }));
    });

    describe('Attribut "luxOptionSelected"', () => {
      let fixture: ComponentFixture<LuxOptionSelectedComponent>;
      let component: LuxOptionSelectedComponent;
      let overlayHelper: LuxOverlayHelper;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxOptionSelectedComponent);
        component = fixture.componentInstance;
        overlayHelper = new LuxOverlayHelper();
        fixture.detectChanges();
        tick(fixture.componentInstance.autocomplete.luxLookupDelay);
      }));

      it('Neue Option auswählen', fakeAsync((done) => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();
        const spy = spyOn(component, 'setSelected').and.callThrough();

        // 1. Durchlauf mit dem Wert "Gruppenaufgaben"
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[1]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[1].label);
        expect(spy).toHaveBeenCalledTimes(1);

        // 2. Durchlauf mit dem Wert "Meine Aufga"
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Meine Aufga');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[0]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[0].label);
        expect(spy).toHaveBeenCalledTimes(2);

        discardPeriodicTasks();
      }));

      it('Gleiche Option auswählen', fakeAsync((done) => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();
        const spy = spyOn(component, 'setSelected').and.callThrough();

        // 1. Durchlauf
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // 2. Durchlauf
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[1]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[1].label);
        expect(spy).toHaveBeenCalledTimes(1);
        discardPeriodicTasks();
      }));

      it('Option deselektieren', fakeAsync((done) => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined();
        const spy = spyOn(component, 'setSelected').and.callThrough();

        // Ein Element auswählen
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Selektiertes Element entfernen, in dem man den Text löscht.
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, '');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toBeNull();
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(spy).toHaveBeenCalledTimes(2);
        discardPeriodicTasks();
      }));
    });
  });

  describe('Autovervollständigung testen', () => {
    let component: MockAutocompleteComponent;
    let fixture: ComponentFixture<MockAutocompleteComponent>;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(() => {
      fixture = TestBed.createComponent(MockAutocompleteComponent);
      component = fixture.componentInstance;
      overlayHelper = new LuxOverlayHelper();
      fixture.detectChanges();
    });

    it('sollte erstellt werden', () => {
      expect(component).toBeTruthy();
    });

    /** Workaround mit (done) => { fixture.whenStable() bis done() um intervalTimer von RxJs funktionieren zu lassen } */

    it('sollte sich oeffnen lassen', (done) => {
      fixture.whenStable().then(() => {
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'a');

        fixture.detectChanges();

        const options = overlayHelper.selectAllFromOverlay('mat-option');
        const optionsOverlay = overlayHelper.selectOneFromOverlay('.mat-autocomplete-panel');

        expect(optionsOverlay).toBeTruthy();
        expect(options.length).toBeGreaterThan(0);
        done();
      });
    });

    it('sollte keine Ergebnisse haben wenn ein invalider Wert eingetippt wird', (done) => {
      LuxTestHelper.typeInElementAsynch('xxx', fixture, component.autocomplete.matInput.nativeElement, () => {
        const options = overlayHelper.selectAllFromOverlay('mat-option') as NodeListOf<HTMLElement>;
        expect(options.length).toBe(0);
        done();
      });
    });

    it('sollte die richtige Anzahl an Ergebnissen haben wenn ein valider Wert eingetippt wird', (done) => {
      LuxTestHelper.typeInElementAsynch('Meine Aufgaben', fixture, component.autocomplete.matInput.nativeElement, () => {
        const options = overlayHelper.selectAllFromOverlay('mat-option') as NodeListOf<HTMLElement>;
        expect(options.length).toBe(1);
        options[0].click();
        done();
      });
    });

    it('sollte keine Fehler anzeigen wenn das Input fokussiert ist und kein Wert eingegeben ist', (done) => {
      fixture.whenStable().then(() => {
        LuxTestHelper.dispatchFakeEvent(component.autocomplete.matInput.nativeElement, 'focus', true);
        fixture.detectChanges();

        expect(component.autocomplete.formControl.errors).toBeNull();
        expect(component.autocomplete.formControl.valid).toBeTruthy();
        done();
      });
    });
  });

  describe('luxPickValue testen', () => {
    let component: MockPickValueComponent;
    let fixture: ComponentFixture<MockPickValueComponent>;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(() => {
      fixture = TestBed.createComponent(MockPickValueComponent);
      component = fixture.componentInstance;
      overlayHelper = new LuxOverlayHelper();
      fixture.detectChanges();
    });

    it('sollte erstellt werden', () => {
      expect(component).toBeTruthy();
    });

    it('Wert über Textfeld setzen', fakeAsync((done) => {
      expect(component.selected).toBeUndefined();
      expect(component.twoWaySelected).toBeUndefined();
      const onSelectedSpy = spyOn(fixture.componentInstance, 'setSelected').and.callThrough();
      expect(onSelectedSpy).toHaveBeenCalledTimes(0);

      // Ein Element auswählen
      // Änderungen durchführen
      LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
      LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

      removeFocus(fixture, component.autocomplete.matInput, component.autocomplete.luxLookupDelay);

      // Nachbedingungen testen
      expect(onSelectedSpy).toHaveBeenCalledTimes(1);
      expect(component.autocomplete.luxValue).toEqual(component.options[1].value);
      expect(component.selected).toEqual(component.options[1].value);
      expect(component.twoWaySelected).toEqual(component.options[1].value);
      expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[1].label);
      discardPeriodicTasks();
    }));
  });
});

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" luxControlBinding="aufgaben"> </lux-autocomplete>
    </form>
  `
})
class LuxAutoCompleteInFormAttributeComponent {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;

  formGroup: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.formGroup = this.fb.group({
      aufgaben: ['']
    });
  }
}

@Component({
  template: `
    <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" [(luxValue)]="selected" [luxStrict]="strict"> </lux-autocomplete>
  `
})
class LuxValueAttributeComponent {
  selected: any;
  strict = true;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;
}

@Component({
  template: `
    <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" (luxOptionSelected)="setSelected($event)"> </lux-autocomplete>
  `
})
class LuxOptionSelectedComponent {
  selected: any;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;

  setSelected(selected: any) {
    this.selected = selected;
  }
}

@Component({
  template: `
    <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" luxOptionLabelProp="label" luxLabel="Mock" [luxLookupDelay]="0">
    </lux-autocomplete>
  `
})
class MockAutocompleteComponent {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;

  constructor() {}
}

@Component({
  template: `
    <lux-autocomplete
      luxLabel="Autocomplete"
      [luxOptions]="options"
      [(luxValue)]="twoWaySelected"
      [luxPickValue]="valueFn"
      [luxStrict]="true"
      (luxValueChange)="setSelected($event)"
    >
    </lux-autocomplete>
  `
})
class MockPickValueComponent {
  selected: any;
  twoWaySelected: any;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;

  setSelected(selected: any) {
    this.selected = selected;
  }

  valueFn(option: any) {
    return option ? option.value : null;
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" luxControlBinding="aufgaben"> </lux-autocomplete>
    </form>

    <lux-button luxLabel="Speichern" [luxDisabled]="!formGroup.valid"></lux-button>
  `
})
class LuxAutoCompleteNotAnOptionComponent {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;

  formGroup: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.formGroup = this.fb.group({
      aufgaben: ['']
    });
  }

  onSave() {}
}

/**
 * Das LUX-Autocomplete muss in manchen Situationen den Fokus verlieren,
 * damit die Änderungen übernommen werden können. Die folgende Methode sorgt dafür,
 * dass das LUX-Autocomplete den Fokus verliert.
 *
 * @param fixture Ein ComponentFixture.
 * @param inputElement Ein Inputelement.
 * @param delay Ein Delay.
 */
function removeFocus(fixture: ComponentFixture<any>, inputElement: ElementRef, delay: number) {

  LuxTestHelper.dispatchFakeEvent(inputElement.nativeElement, 'focusout');
  LuxTestHelper.wait(fixture, delay);
}
