/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxAccordionComponent } from './lux-accordion.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxAccordionComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [],
      [
        LuxAccordionHeightComponent,
        LuxAccordionPanelOverrideHeightComponent,
        LuxAccordionPanelMultiComponent,
        LuxAccordionHideToggleComponent,
        LuxAccordionOverrideHideToggleComponent,
        LuxAccordionDisabledComponent,
        LuxAccordionOverrideDisabledComponent
      ]
    );
  });

  describe('Attribut "luxCollapsedHeaderHeight" und "luxExpandedHeaderHeight"', () => {
    describe('Höhe über das Accordion gesetzt"', () => {
      let fixture: ComponentFixture<LuxAccordionHeightComponent>;
      let testComponent: LuxAccordionHeightComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionHeightComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Höhe prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        const panel1HeaderEl = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'))[0];
        expect('150px').toEqual(panel1HeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        panel1HeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect('100px').toEqual(panel1HeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        panel1HeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect('150px').toEqual(panel1HeaderEl.nativeElement.style.height);
      }));

      it('Höhe verändern und prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        const panel1HeaderEl = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'))[0];
        expect('150px').toEqual(panel1HeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        const expectedCollapsedHeight = '200px';
        const expectedExpandedHeight = '250px';
        fixture.componentInstance.collapsedHeaderHeight = expectedCollapsedHeight;
        fixture.componentInstance.expandedHeaderHeight = expectedExpandedHeight;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen.
        // Geschlossenes Panel
        expect(expectedCollapsedHeight).toEqual(panel1HeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        panel1HeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen.
        // Geöffnetes Panel
        expect(expectedExpandedHeight).toEqual(panel1HeaderEl.nativeElement.style.height);
      }));

      it('Panel über *ngIf einblenden', fakeAsync(() => {
        // Vorbedingungen testen
        const headerElemente = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'));
        expect(1).toEqual(headerElemente.length);

        // Änderungen durchführen
        fixture.componentInstance.visible = true;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newHeaderElemente = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'));
        expect(2).toEqual(newHeaderElemente.length);
        const newPanelHeaderEl = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'))[1];
        expect('150px').toEqual(newPanelHeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        newPanelHeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect('100px').toEqual(newPanelHeaderEl.nativeElement.style.height);
      }));
    });

    describe('Höhe des Accordions im Panel überschreiben"', () => {
      let fixture: ComponentFixture<LuxAccordionPanelOverrideHeightComponent>;
      let testComponent: LuxAccordionPanelOverrideHeightComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionPanelOverrideHeightComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Höhe prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        const panel1HeaderEl = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'))[0];
        expect('110px').toEqual(panel1HeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        panel1HeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect('120px').toEqual(panel1HeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        panel1HeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect('110px').toEqual(panel1HeaderEl.nativeElement.style.height);
      }));

      it('Panel über *ngIf einblenden', fakeAsync(() => {
        // Vorbedingungen testen
        const headerElemente = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'));
        expect(1).toEqual(headerElemente.length);

        // Änderungen durchführen
        fixture.componentInstance.visible = true;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newHeaderElemente = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'));
        expect(2).toEqual(newHeaderElemente.length);
        const newPanelHeaderEl = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'))[1];
        expect('110px').toEqual(newPanelHeaderEl.nativeElement.style.height);

        // Änderungen durchführen
        newPanelHeaderEl.nativeElement.click();
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect('120px').toEqual(newPanelHeaderEl.nativeElement.style.height);
      }));
    });
  });

  describe('Attribut "luxMulti"', () => {
    let fixture: ComponentFixture<LuxAccordionPanelMultiComponent>;
    let testComponent: LuxAccordionPanelMultiComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxAccordionPanelMultiComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      tick();
    }));

    it('Mehrere Bereiche dürfen geöffnet sein', fakeAsync(() => {
      // Vorbedingungen testen
      expect(true).toEqual(fixture.componentInstance.multi);
      const items = fixture.debugElement.queryAll(By.css('.mat-expansion-panel'));
      expect(2).toEqual(items.length);
      expect(items[0].classes['mat-expanded']).toBeFalsy();
      expect(items[1].classes['mat-expanded']).toBeFalsy();

      // Änderungen durchführen
      const headerElemente = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'));
      headerElemente[0].nativeElement.click();
      LuxTestHelper.wait(fixture);
      headerElemente[1].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(items[0].classes['mat-expanded']).toBeTruthy();
      expect(items[1].classes['mat-expanded']).toBeTruthy();
    }));

    it('Nur ein Bereich darf geöffnet sein', fakeAsync(() => {
      // Vorbedingungen testen
      expect(true).toEqual(fixture.componentInstance.multi);
      const items = fixture.debugElement.queryAll(By.css('.mat-expansion-panel'));
      expect(2).toEqual(items.length);
      expect(items[0].classes['mat-expanded']).toBeFalsy();
      expect(items[1].classes['mat-expanded']).toBeFalsy();

      // Änderungen durchführen
      fixture.componentInstance.multi = false;
      const headerElemente = fixture.debugElement.queryAll(By.css('mat-expansion-panel-header'));
      headerElemente[0].nativeElement.click();
      LuxTestHelper.wait(fixture);
      headerElemente[1].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(items[0].classes['mat-expanded']).toBeFalsy();
      expect(items[1].classes['mat-expanded']).toBeTruthy();
    }));
  });

  describe('Attribut "luxHideToggle"', () => {
    describe('Toggle über das Accordion gesetzt"', () => {
      let fixture: ComponentFixture<LuxAccordionHideToggleComponent>;
      let testComponent: LuxAccordionHideToggleComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionHideToggleComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Toggle prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.hide).toBeFalsy();
        const toggleEl = fixture.debugElement.query(By.css('.mat-expansion-indicator'));
        expect(toggleEl).not.toBeNull();

        // Änderungen durchführen
        fixture.componentInstance.hide = true;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newToggleEl = fixture.debugElement.query(By.css('.mat-expansion-indicator'));
        expect(newToggleEl).toBeNull();
      }));
    });

    describe('Toggle des Accordions im Panel überschreiben"', () => {
      let fixture: ComponentFixture<LuxAccordionOverrideHideToggleComponent>;
      let testComponent: LuxAccordionOverrideHideToggleComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverrideHideToggleComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Toggle prüfen', fakeAsync(() => {
        const toggleEl = fixture.debugElement.query(By.css('.mat-expansion-indicator'));
        expect(toggleEl).not.toBeNull();
      }));
    });
  });

  describe('Attribut "luxDisabled"', () => {
    describe('Disabled über das Accordion gesetzt"', () => {
      let fixture: ComponentFixture<LuxAccordionDisabledComponent>;
      let testComponent: LuxAccordionDisabledComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionDisabledComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Disabled prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.disabled).toBeFalsy();
        const headerEl = fixture.debugElement.query(By.css('.mat-expansion-panel-header'));
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('false');

        // Änderungen durchführen
        fixture.componentInstance.disabled = true;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('true');
      }));
    });

    describe('Disabled des Accordions im Panel überschreiben"', () => {
      let fixture: ComponentFixture<LuxAccordionOverrideDisabledComponent>;
      let testComponent: LuxAccordionOverrideDisabledComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverrideDisabledComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Disabled prüfen', fakeAsync(() => {
        const headerEl = fixture.debugElement.query(By.css('.mat-expansion-panel-header'));
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('false');
      }));
    });
  });
});

@Component({
  template: `
    <lux-button (luxClicked)="visible = !visible" luxLabel="Toggle"></lux-button>

    <lux-accordion [luxCollapsedHeaderHeight]="collapsedHeaderHeight" [luxExpandedHeaderHeight]="expandedHeaderHeight">
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel *ngIf="visible">
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          2222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionHeightComponent {
  collapsedHeaderHeight = '150px';
  expandedHeaderHeight = '100px';
  visible = false;
}

@Component({
  template: `
    <lux-button (luxClicked)="visible = !visible" luxLabel="Toggle"></lux-button>

    <lux-accordion luxCollapsedHeaderHeight="150px" luxExpandedHeaderHeight="100px">
      <lux-panel luxCollapsedHeaderHeight="110px" luxExpandedHeaderHeight="120px">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel *ngIf="visible" luxCollapsedHeaderHeight="110px" luxExpandedHeaderHeight="120px">
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          2222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionPanelOverrideHeightComponent {
  visible = false;
}

@Component({
  template: `
    <lux-button (luxClicked)="multi = !multi" luxLabel="Toggle"></lux-button>

    <lux-accordion [luxMulti]="multi">
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel>
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          2222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionPanelMultiComponent {
  multi = true;
}

@Component({
  template: `
    <lux-accordion [luxHideToggle]="hide">
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionHideToggleComponent {
  hide = false;
}

@Component({
  template: `
    <lux-accordion [luxHideToggle]="true">
      <lux-panel [luxHideToggle]="false">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionOverrideHideToggleComponent {}

@Component({
  template: `
    <lux-accordion [luxDisabled]="disabled">
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionDisabledComponent {
  disabled = false;
}

@Component({
  template: `
    <lux-accordion [luxDisabled]="true">
      <lux-panel [luxDisabled]="false">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionOverrideDisabledComponent {}
