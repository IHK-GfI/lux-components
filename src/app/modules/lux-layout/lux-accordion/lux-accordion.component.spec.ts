/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
        LuxAccordionHideToggleTrueComponent,
        LuxAccordionOverrideHideToggleComponent,
        LuxAccordionDisabledComponent,
        LuxAccordionDisabledTrueComponent,
        LuxAccordionOverrideDisabledComponent,
        LuxAccordionOverrideDisabledReversedComponent,
        LuxAccordionluxTogglePositionComponent,
        LuxAccordionluxTogglePositionBeforeComponent,
        LuxAccordionOverrideluxTogglePositionComponent,
        LuxAccordionOverridePanelReversedluxTogglePositionComponent,
        LuxAccordionColorComponent
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
    describe('Toggle über das Accordion gesetzt', () => {
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

    describe('Toggle initial true über Accordion gesetzt', () => {
      let fixture: ComponentFixture<LuxAccordionHideToggleTrueComponent>;
      let testComponent: LuxAccordionHideToggleTrueComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionHideToggleTrueComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Toggle prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.hide).toBeTruthy();
        const toggleEl = fixture.debugElement.query(By.css('.mat-expansion-indicator'));
        expect(toggleEl).toBeNull();

        // Änderungen durchführen
        fixture.componentInstance.hide = false;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newToggleEl = fixture.debugElement.query(By.css('.mat-expansion-indicator'));
        expect(newToggleEl).not.toBeNull();
      }));
    });

    describe('Toggle des Accordions im Panel überschreiben', () => {
      let fixture: ComponentFixture<LuxAccordionOverrideHideToggleComponent>;
      let testComponent: LuxAccordionOverrideHideToggleComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverrideHideToggleComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Toggle prüfen', fakeAsync(() => {
        const toggleEl = fixture.debugElement.query(By.css('#panel1 .mat-expansion-indicator'));
        expect(toggleEl).not.toBeNull();
        const toggle2El = fixture.debugElement.query(By.css('#panel2 .mat-expansion-indicator'));
        expect(toggle2El).toBeNull();
      }));
    });
  });

  describe('Attribut "luxDisabled"', () => {
    describe('Disabled über das Accordion gesetzt', () => {
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

    describe('Disabled initial true über das Accordion gesetzt', () => {
      let fixture: ComponentFixture<LuxAccordionDisabledTrueComponent>;
      let testComponent: LuxAccordionDisabledTrueComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionDisabledTrueComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Disabled prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.disabled).toBeTruthy();
        const headerEl = fixture.debugElement.query(By.css('.mat-expansion-panel-header'));
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('true');

        // Änderungen durchführen
        fixture.componentInstance.disabled = false;
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('false');
      }));
    });

    describe('Disabled des Accordions im Panel überschreiben', () => {
      let fixture: ComponentFixture<LuxAccordionOverrideDisabledComponent>;
      let testComponent: LuxAccordionOverrideDisabledComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverrideDisabledComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Disabled prüfen', fakeAsync(() => {
        const headerEl = fixture.debugElement.query(By.css('#panel1 .mat-expansion-panel-header'));
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('false');
        const header2El = fixture.debugElement.query(By.css('#panel2 .mat-expansion-panel-header'));
        expect(header2El.nativeElement.attributes['aria-disabled'].value).toEqual('true');
      }));
    });

    describe('Disabled des Accordions im Panel umgedreht überschreiben', () => {
      let fixture: ComponentFixture<LuxAccordionOverrideDisabledReversedComponent>;
      let testComponent: LuxAccordionOverrideDisabledReversedComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverrideDisabledReversedComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Disabled prüfen', fakeAsync(() => {
        const headerEl = fixture.debugElement.query(By.css('#panel1 .mat-expansion-panel-header'));
        expect(headerEl.nativeElement.attributes['aria-disabled'].value).toEqual('true');
        const header2El = fixture.debugElement.query(By.css('#panel2 .mat-expansion-panel-header'));
        expect(header2El.nativeElement.attributes['aria-disabled'].value).toEqual('false');
      }));
    });
  });

  describe('Attribut "luxTogglePosition"', () => {
    describe('TogglePosition über das Accordion gesetzt', () => {
      let fixture: ComponentFixture<LuxAccordionluxTogglePositionComponent>;
      let testComponent: LuxAccordionluxTogglePositionComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionluxTogglePositionComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('TogglePosition prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.togglePosition).toBe('after');
        const positionEl = fixture.debugElement.query(By.css('.mat-expansion-toggle-indicator-after'));
        expect(positionEl).not.toBeNull();

        // Änderungen durchführen
        fixture.componentInstance.togglePosition = 'before';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newPositionEl = fixture.debugElement.query(By.css('.mat-expansion-toggle-indicator-before'));
        expect(newPositionEl).not.toBeNull();
      }));
    });

    describe('TogglePosition initial "before" über das Accordion gesetzt', () => {
      let fixture: ComponentFixture<LuxAccordionluxTogglePositionBeforeComponent>;
      let testComponent: LuxAccordionluxTogglePositionBeforeComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionluxTogglePositionBeforeComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('TogglePosition prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.togglePosition).toBe('before');
        const positionEl = fixture.debugElement.query(By.css('.mat-expansion-toggle-indicator-before'));
        expect(positionEl).not.toBeNull();

        // Änderungen durchführen
        fixture.componentInstance.togglePosition = 'after';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newPositionEl = fixture.debugElement.query(By.css('.mat-expansion-toggle-indicator-after'));
        expect(newPositionEl).not.toBeNull();
      }));
    });

    describe('TogglePosition in Panels überschrieben', () => {
      let fixture: ComponentFixture<LuxAccordionOverrideluxTogglePositionComponent>;
      let testComponent: LuxAccordionOverrideluxTogglePositionComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverrideluxTogglePositionComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('TogglePosition prüfen', fakeAsync(() => {
        const positionEl = fixture.debugElement.query(By.css('#panel1 .mat-expansion-toggle-indicator-after'));
        expect(positionEl).not.toBeNull();
        const positionTwoEl = fixture.debugElement.query(By.css('#panel2 .mat-expansion-toggle-indicator-before'));
        expect(positionTwoEl).not.toBeNull();
      }));
    });

    describe('TogglePosition in Panels überschrieben umgedreht', () => {
      let fixture: ComponentFixture<LuxAccordionOverridePanelReversedluxTogglePositionComponent>;
      let testComponent: LuxAccordionOverridePanelReversedluxTogglePositionComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionOverridePanelReversedluxTogglePositionComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('TogglePosition prüfen', fakeAsync(() => {
        const positionEl = fixture.debugElement.query(By.css('#panel1 .mat-expansion-toggle-indicator-before'));
        expect(positionEl).not.toBeNull();
        const positionTwoEl = fixture.debugElement.query(By.css('#panel2 .mat-expansion-toggle-indicator-after'));
        expect(positionTwoEl).not.toBeNull();
      }));
    });
  });

  describe('Attribut "luxColor"', () => {
    describe('Color im Accordion gesetzt', () => {
      let fixture: ComponentFixture<LuxAccordionColorComponent>;
      let testComponent: LuxAccordionColorComponent;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxAccordionColorComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        tick();
      }));

      it('Color prüfen', fakeAsync(() => {
        // Vorbedingungen testen
        expect(fixture.componentInstance.color).toBe('primary');
        const toggleEl = fixture.debugElement.query(By.css('.lux-primary'));
        expect(toggleEl).not.toBeNull();

        // Änderungen auf accent durchführen
        fixture.componentInstance.color = 'accent';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newToggleEl = fixture.debugElement.query(By.css('.lux-accent'));
        expect(newToggleEl).not.toBeNull();

        // Änderungen auf warn durchführen
        fixture.componentInstance.color = 'warn';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newToggleEl2 = fixture.debugElement.query(By.css('.lux-warn'));
        expect(newToggleEl2).not.toBeNull();

        // Änderungen auf neutral durchführen
        fixture.componentInstance.color = 'neutral';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        const newToggleEl3 = fixture.debugElement.query(By.css('.lux-neutral'));
        expect(newToggleEl3).not.toBeNull();
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
  selector: 'LuxAccordionHideToggleFalse',
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
  selector: 'LuxAccordionHideToggleTrue',
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
class LuxAccordionHideToggleTrueComponent {
  hide = true;
}

@Component({
  template: `
    <lux-accordion [luxHideToggle]="true">
      <lux-panel id="panel1" [luxHideToggle]="false">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel id="panel2">
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
  selector: 'LuxAccordionDisabledFalse',
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
  selector: 'LuxAccordionDisabledTrue',
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
class LuxAccordionDisabledTrueComponent {
  disabled = true;
}

@Component({
  selector: 'LuxAccordionOverrideDisabled',
  template: `
    <lux-accordion [luxDisabled]="true">
      <lux-panel id="panel1" [luxDisabled]="false">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel id="panel2">
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          22222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionOverrideDisabledComponent {}

@Component({
  selector: 'LuxAccordionOverrideDisabledReversed',
  template: `
    <lux-accordion [luxDisabled]="false">
      <lux-panel id="panel1" [luxDisabled]="true">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel id="panel2">
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          22222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionOverrideDisabledReversedComponent {}


@Component({
  selector:'LuxTogglePositionAfter',
  template: `
    <lux-accordion [luxTogglePosition]="togglePosition">
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionluxTogglePositionComponent {
  togglePosition = 'after';
}

@Component({
  selector:'LuxTogglePositionBefore',
  template: `
    <lux-accordion [luxTogglePosition]="togglePosition">
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionluxTogglePositionBeforeComponent {
  togglePosition = 'before';
}

@Component({
  selector: 'LuxAccordionOverrideluxTogglePositionComponent',
  template: `
    <lux-accordion [luxTogglePosition]="'after'">
      <lux-panel id="panel1">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel [luxTogglePosition]="'before'" id="panel2">
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          22222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionOverrideluxTogglePositionComponent {}

@Component({
  selector: 'LuxAccordionOverridePanelReversedluxTogglePositionComponent',
  template: `
    <lux-accordion [luxTogglePosition]="'before'">
      <lux-panel id="panel1">
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
      <lux-panel [luxTogglePosition]="'after'" id="panel2">
        <lux-panel-header-title>Titel 2</lux-panel-header-title>
        <lux-panel-content>
          22222222
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionOverridePanelReversedluxTogglePositionComponent {}

@Component({
  selector: 'lux-accordion-override-panel-reversed-luxtoggleposition-component',
  template: `
    <lux-accordion [luxColor] = color>
      <lux-panel>
        <lux-panel-header-title>Titel 1</lux-panel-header-title>
        <lux-panel-content>
          111111
        </lux-panel-content>
      </lux-panel>
    </lux-accordion>
  `
})
class LuxAccordionColorComponent {
  color = 'primary';
}
