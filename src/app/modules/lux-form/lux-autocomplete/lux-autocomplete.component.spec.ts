import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';

import { LuxAutocompleteComponent } from './lux-autocomplete.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxAutocompleteComponent', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule(
      [LuxConsoleService],
      [
        LuxAutoCompleteInFormAttributeComponent,
        LuxValueAttributeComponent,
        LuxOptionSelectedComponent,
        MockAutocompleteComponent
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
        expect(component.autocomplete.matInput.nativeElement.required).toBeFalsy('Nachbedingung 2');
        discardPeriodicTasks();
      }));

      it('Wert über das Textfeld setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.formGroup.get('aufgaben').value).toEqual('');

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Vertretungsaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.autocomplete.luxValue).toEqual(component.options[3]);
        expect(component.formGroup.get('aufgaben').value).toEqual(component.options[3]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('Vertretungsaufgaben');
        expect(component.autocomplete.matInput.nativeElement.required).toBeFalsy('Nachbedingung 2');
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
        expect(component.selected).toBeUndefined(`Vorbedingung 1`);

        // Änderungen durchführen
        component.selected = component.options[2];
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[2]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[2].label);
      }));

      it('Wert über das Textfeld setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined(`Vorbedingung 1`);

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Vertretungsaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[3]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[3].label);
        discardPeriodicTasks();
      }));

      it('Wert der keiner Option entspricht', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined(`Vorbedingung 1`);
        expect(component.strict).toBeTruthy(`Vorbedingung 2`);

        // Änderungen durchführen
        component.strict = false;
        fixture.detectChanges();

        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'zzz');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.strict).toBeFalsy('Nachbedingung 1');
        expect(component.selected).toEqual('zzz');
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('zzz');
        discardPeriodicTasks();
      }));

      it('Unvollständigen Wert über das Textfeld setzen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined(`Vorbedingung 1`);

        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Ver');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[3]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[3].label);
        discardPeriodicTasks();
      }));

      it('Wert über Popup auswählen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(component.autocomplete.matInput.nativeElement.value).toEqual('');
        expect(component.selected).toBeUndefined(`Vorbedingung 1`);

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

      it('Neue Option auswählen', fakeAsync(done => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined('Vorbedingung 1');
        const spy = spyOn(component, 'setSelected').and.callThrough();

        // 1. Durchlauf mit dem Wert "Gruppenaufgaben"
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[1]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[1].label);
        expect(spy).toHaveBeenCalledTimes(1);

        // 2. Durchlauf mit dem Wert "Meine Aufga"
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Meine Aufga');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[0]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[0].label);
        expect(spy).toHaveBeenCalledTimes(2);

        discardPeriodicTasks();
      }));

      it('Gleiche Option auswählen', fakeAsync(done => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined('Vorbedingung 1');
        const spy = spyOn(component, 'setSelected').and.callThrough();

        // 1. Durchlauf
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // 2. Durchlauf
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toEqual(component.options[1]);
        expect(component.autocomplete.matInput.nativeElement.value).toEqual(component.options[1].label);
        expect(spy).toHaveBeenCalledTimes(1);
        discardPeriodicTasks();
      }));

      it('Option deselektieren', fakeAsync(done => {
        // Vorbedingungen testen
        expect(component.selected).toBeUndefined('Vorbedingung 1');
        const spy = spyOn(component, 'setSelected').and.callThrough();

        // Ein Element auswählen
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, 'Gruppenaufgaben');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Selektiertes Element entfernen, in dem man den Text löscht.
        // Änderungen durchführen
        LuxTestHelper.typeInElement(component.autocomplete.matInput.nativeElement, '');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Das LUX-Autocomplete muss den Fokus verlieren, damit die Änderungen wirksam werden.
        // Der folgende Code ist eine einfache Möglichkeit, damit ein Element den Fokus verliert.
        LuxTestHelper.dispatchFakeEvent(document, 'click');
        LuxTestHelper.wait(fixture, component.autocomplete.luxLookupDelay);

        // Nachbedingungen testen
        expect(component.selected).toBeNull('Nachbedingung 1');
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

    /** Workaround mit (done) => { fixture.whenStable() bis done() um intervalTimer von RxJs funktionieren zu lassen } **/

    it('sollte sich oeffnen lassen', done => {
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

    it('sollte keine Ergebnisse haben wenn ein invalider Wert eingetippt wird', done => {
      LuxTestHelper.typeInElementAsynch('xxx', fixture, component.autocomplete.matInput.nativeElement, () => {
        const options = overlayHelper.selectAllFromOverlay('mat-option') as NodeListOf<HTMLElement>;
        expect(options.length).toBe(0);
        done();
      });
    });

    it('sollte die richtige Anzahl an Ergebnissen haben wenn ein valider Wert eingetippt wird', done => {
      LuxTestHelper.typeInElementAsynch(
        'Meine Aufgaben',
        fixture,
        component.autocomplete.matInput.nativeElement,
        () => {
          const options = overlayHelper.selectAllFromOverlay('mat-option') as NodeListOf<HTMLElement>;
          expect(options.length).toBe(1);
          options[0].click();
          done();
        }
      );
    });

    it('sollte keine Fehler anzeigen wenn das Input fokussiert ist und kein Wert eingegeben ist', done => {
      fixture.whenStable().then(() => {
        LuxTestHelper.dispatchFakeEvent(component.autocomplete.matInput.nativeElement, 'focus', true);
        fixture.detectChanges();

        expect(component.autocomplete.formControl.errors).toBe(null);
        expect(component.autocomplete.formControl.valid).toBeTruthy();
        done();
      });
    });
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

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      aufgaben: ['']
    });
  }
}

@Component({
  template: `
    <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" [(luxValue)]="selected" [luxStrict]="strict">
    </lux-autocomplete>
  `
})
class LuxValueAttributeComponent {
  selected: any;
  strict: boolean = true;

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
    <lux-autocomplete luxLabel="Autocomplete" [luxOptions]="options" (luxOptionSelected)="setSelected($event)">
    </lux-autocomplete>
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
    <lux-autocomplete
      luxLabel="Autocomplete"
      [luxOptions]="options"
      luxOptionLabelProp="label"
      luxLabel="Mock"
      [luxLookupDelay]="0"
    >
    </lux-autocomplete>
  `
})
class MockAutocompleteComponent implements OnInit {
  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  @ViewChild(LuxAutocompleteComponent) autocomplete: LuxAutocompleteComponent;

  constructor() {}

  ngOnInit() {}
}
