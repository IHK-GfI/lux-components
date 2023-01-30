/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxCardContentExpandedComponent } from './lux-card-subcomponents/lux-card-content-expanded.component';
import { LuxCardContentComponent } from './lux-card-subcomponents/lux-card-content.component';

import { LuxCardComponent } from './lux-card.component';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

describe('LuxCardComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [],
      [
        LuxContentExpandedComponent,
        NoCardActionComponent,
        ExpandedClickableCardComponent,
        ExpandedCardComponent,
        CardActionComponent,
        MockCardComponent
      ]
    );
  });

  describe('Attribut "luxExpanded"', () => {
    let fixture: ComponentFixture<LuxContentExpandedComponent>;
    let component: LuxContentExpandedComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxContentExpandedComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    }));

    it('Two-Way-Binding testen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(component.expanded).toBeFalsy();

      // Änderungen durchführen
      const toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button button'));
      toggleEl.nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      // Nachbedingungen testen
      expect(component.expanded).toBeTruthy();

      // Änderungen durchführen
      toggleEl.nativeElement.click();

      // Nachbedingungen testen
      expect(component.expanded).toBeFalsy();

      discardPeriodicTasks();
    }));

    it('Event testen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(component.expanded).toBeFalsy();
      const onExpandedSpy = spyOn(component, 'onExpanded').and.callThrough();

      // Änderungen durchführen
      const toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button button'));
      toggleEl.nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      // Nachbedingungen testen
      expect(onExpandedSpy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      toggleEl.nativeElement.click();

      // Nachbedingungen testen
      expect(onExpandedSpy).toHaveBeenCalledTimes(2);

      discardPeriodicTasks();
    }));
  });

  describe('Ohne Card Action', () => {
    let fixture: ComponentFixture<NoCardActionComponent>;
    let testComponent: NoCardActionComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NoCardActionComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Style lux-cursor darf nicht gesetzt sein', fakeAsync(() => {
      const card = fixture.debugElement.query(By.css('.lux-cursor'));
      expect(card).toBeNull();
    }));
  });

  describe('Mit Card Action', () => {
    let fixture: ComponentFixture<CardActionComponent>;
    let testComponent: CardActionComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(CardActionComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Style lux-cursor muss gesetzt sein', fakeAsync(() => {
      const card = fixture.debugElement.query(By.css('.lux-cursor'));
      expect(card).not.toBeNull();
    }));
  });

  describe('Erweiterbare Card mit einer Card-Action', () => {
    let fixture: ComponentFixture<ExpandedClickableCardComponent>;
    let component: ExpandedClickableCardComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ExpandedClickableCardComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    }));

    it('Click auf Toggle darf die Card-Action nicht auslösen', fakeAsync(() => {
      // Vorbedingungen testen
      const cardActionSpy = spyOn(component, 'onCardClickedTest');
      const toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button button'));
      expect(toggleEl).not.toBeNull();

      // Änderungen durchführen
      // 1. Durchlauf: Aufklappen
      toggleEl.nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      // Nachbedingungen testen
      expect(cardActionSpy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      // 2. Durchlauf: Zuklappen
      toggleEl.nativeElement.click();
      fixture.detectChanges();

      // Nachbedingungen testen
      expect(cardActionSpy).toHaveBeenCalledTimes(0);

      discardPeriodicTasks();
    }));
  });

  describe('Card auf- und zuklappen', () => {
    let fixture: ComponentFixture<ExpandedCardComponent>;
    let component: ExpandedCardComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ExpandedCardComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    }));

    it('Card über die Component auf- und zuklappen', fakeAsync(() => {
      // Vorbedingungen testen
      let contentEl = fixture.debugElement.query(By.directive(LuxCardContentComponent));
      let expandedEl = fixture.debugElement.query(By.directive(LuxCardContentExpandedComponent));
      let toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button'));
      expect(component.card.luxExpanded).toBeFalsy();
      expect(contentEl).not.toBeNull();
      expect(contentEl.nativeElement.innerHTML).toEqual('Lorem ipsum');
      expect(expandedEl).toBeNull();
      expect(toggleEl.nativeElement.innerHTML).toContain('lux-interface-arrows-button-down');

      // Änderungen durchführen
      component.card.luxExpanded = true;
      fixture.detectChanges();

      // Nachbedingungen testen
      contentEl = fixture.debugElement.query(By.directive(LuxCardContentComponent));
      expandedEl = fixture.debugElement.query(By.directive(LuxCardContentExpandedComponent));
      toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button'));
      expect(component.card.luxExpanded).toBeTruthy();
      expect(contentEl).not.toBeNull();
      expect(expandedEl).not.toBeNull();
      expect(expandedEl.nativeElement.innerHTML).toEqual('Lorem ipsum expanded');
      expect(toggleEl.nativeElement.innerHTML).toContain('lux-interface-arrows-button-up');

      // Änderungen durchführen
      component.card.luxExpanded = false;
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      contentEl = fixture.debugElement.query(By.directive(LuxCardContentComponent));
      expandedEl = fixture.debugElement.query(By.directive(LuxCardContentExpandedComponent));
      toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button'));
      expect(component.card.luxExpanded).toBeFalsy();
      expect(contentEl.nativeElement.innerHTML).toEqual('Lorem ipsum');
      expect(expandedEl).toBeNull();
      expect(toggleEl.nativeElement.innerHTML).toContain('lux-interface-arrows-button-down');
    }));

    it('Card über den Button auf- und zuklappen', fakeAsync(() => {
      // Vorbedingungen testen
      let contentEl = fixture.debugElement.query(By.directive(LuxCardContentComponent));
      let expandedEl = fixture.debugElement.query(By.directive(LuxCardContentExpandedComponent));
      let toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button button'));
      expect(component.card.luxExpanded).toBeFalsy();
      expect(contentEl).not.toBeNull();
      expect(contentEl.nativeElement.innerHTML).toEqual('Lorem ipsum');
      expect(expandedEl).toBeNull();
      expect(toggleEl.nativeElement.innerHTML).toContain('lux-interface-arrows-button-down');

      // Änderungen durchführen
      toggleEl.nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      // Nachbedingungen testen
      contentEl = fixture.debugElement.query(By.directive(LuxCardContentComponent));
      expandedEl = fixture.debugElement.query(By.directive(LuxCardContentExpandedComponent));
      toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button button'));
      expect(component.card.luxExpanded).toBeTruthy();
      expect(contentEl).not.toBeNull();
      expect(expandedEl).not.toBeNull();
      expect(expandedEl.nativeElement.innerHTML).toEqual('Lorem ipsum expanded');
      expect(toggleEl.nativeElement.innerHTML).toContain('lux-interface-arrows-button-up');

      // Änderungen durchführen
      toggleEl.nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      // Nachbedingungen testen
      contentEl = fixture.debugElement.query(By.directive(LuxCardContentComponent));
      expandedEl = fixture.debugElement.query(By.directive(LuxCardContentExpandedComponent));
      toggleEl = fixture.debugElement.query(By.css('.lux-expanded-button'));
      expect(component.card.luxExpanded).toBeFalsy();
      expect(contentEl.nativeElement.innerHTML).toEqual('Lorem ipsum');
      expect(expandedEl).toBeNull();
      expect(toggleEl.nativeElement.innerHTML).toContain('lux-interface-arrows-button-down');

      discardPeriodicTasks();
    }));
  });

  describe('Grundaufbau', () => {
    let fixture: ComponentFixture<MockCardComponent>;
    let component: MockCardComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockCardComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    }));

    it('Sollte luxTitle und luxSubTitle darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual(
        ''
      );
      expect(fixture.debugElement.query(By.css('.mat-card-subtitle')).nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      component.title = 'Hallo';
      component.subTitle = 'Welt';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual(
        'Hallo'
      );
      expect(fixture.debugElement.query(By.css('.mat-card-subtitle')).nativeElement.textContent.trim()).toEqual('Welt');
    }));

    it('Sollte mat-card-title ausblenden, wenn luxTitle undefined', fakeAsync(() => {
      // Vorbedingungen testen
      component.title = 'Hallo';
      LuxTestHelper.wait(fixture);
      expect(fixture.debugElement.query(By.css('.mat-card-title.lux-display-none-important'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual(
        'Hallo'
      );

      // Änderungen durchführen
      component.title = undefined;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.mat-card-title.lux-display-none-important'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual(
        ''
      );
    }));

    it('Sollte mat-card-title nicht ausblenden, wenn luxTitle undefined aber lux-card-info gesetzt ist', fakeAsync(() => {
      // Vorbedingungen testen
      component.title = 'Hallo';
      LuxTestHelper.wait(fixture);
      expect(fixture.debugElement.query(By.css('.mat-card-title.lux-display-none-important'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual(
        'Hallo'
      );

      // Änderungen durchführen
      component.testShowInfo = true;
      component.title = undefined;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.mat-card-title.lux-display-none-important'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual(
        ''
      );
    }));

    it('Sollte mat-card-subtitle ausblenden, wenn luxSubTitle undefined', fakeAsync(() => {
      // Vorbedingungen testen
      component.subTitle = 'Hallo';
      LuxTestHelper.wait(fixture);
      expect(fixture.debugElement.query(By.css('.mat-card-subtitle.lux-display-none-important'))).toBeNull();

      // Änderungen durchführen
      component.subTitle = undefined;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.mat-card-subtitle.lux-display-none-important'))).not.toBeNull();
    }));

    it('Sollte mat-card-actions ausblenden, wenn keine Actions gesetzt sind', fakeAsync(() => {
      // Vorbedingungen testen
      component.testShowAction = true;
      LuxTestHelper.wait(fixture);
      expect(fixture.debugElement.query(By.css('.mat-card-actions.lux-display-none-important'))).toBeNull();

      // Änderungen durchführen
      component.testShowAction = false;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.mat-card-actions.lux-display-none-important'))).not.toBeNull();
    }));

    it('Sollte Click-Events deaktivieren (luxDisabled)', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(component, 'cardClicked');
      fixture.debugElement.query(By.css('mat-card')).nativeElement.click();
      LuxTestHelper.wait(fixture);
      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      component.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      fixture.debugElement.query(By.css('mat-card')).nativeElement.click();
      LuxTestHelper.wait(fixture);
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });
});

@Component({
  template: `
    <lux-card luxTitle="Lorem ipsum">
      <lux-card-content>
        Lorem ipsum
      </lux-card-content>
    </lux-card>
  `
})
class NoCardActionComponent {}

@Component({
  template: `
    <lux-card luxTitle="Lorem ipsum" (luxClicked)="test()">
      <lux-card-content>
        Lorem ipsum
      </lux-card-content>
    </lux-card>
  `
})
class CardActionComponent {
  test() {}
}

@Component({
  template: `
    <lux-card luxTitle="Lorem ipsum">
      <lux-card-content>Lorem ipsum</lux-card-content>
      <lux-card-content-expanded>Lorem ipsum expanded</lux-card-content-expanded>
    </lux-card>
  `
})
class ExpandedCardComponent {
  @ViewChild(LuxCardComponent) card!: LuxCardComponent;
}

@Component({
  template: `
    <lux-card luxTitle="Lorem ipsum" (luxClicked)="onCardClickedTest()">
      <lux-card-content>Lorem ipsum</lux-card-content>
      <lux-card-content-expanded>Lorem ipsum expanded</lux-card-content-expanded>
    </lux-card>
  `
})
class ExpandedClickableCardComponent {
  @ViewChild(LuxCardComponent) card!: LuxCardComponent;

  onCardClickedTest() {}
}

@Component({
  template: `
    <lux-card luxTitle="Lorem ipsum" [(luxExpanded)]="expanded" (luxExpandedChange)="onExpanded($event)">
      <lux-card-content>Lorem ipsum</lux-card-content>
      <lux-card-content-expanded>Lorem ipsum expanded</lux-card-content-expanded>
    </lux-card>
  `
})
class LuxContentExpandedComponent {
  expanded = false;

  @ViewChild(LuxCardComponent) card!: LuxCardComponent;

  onExpanded(expanded: boolean) {}
}

@Component({
  template: `
    <lux-card [luxTitle]="title" [luxSubTitle]="subTitle" [luxDisabled]="disabled" (luxClicked)="cardClicked()">
      <lux-icon luxIconName="lux-interface-validation-check" *ngIf="testShowIcon"></lux-icon>
      <lux-card-info *ngIf="testShowInfo">
        <span class="test-card-info">Card-Info</span>
      </lux-card-info>
      <lux-card-content>
        <span class="test-card-content">Card-Content</span>
      </lux-card-content>
      <lux-card-actions *ngIf="testShowAction">
        <span class="test-card-action"></span>
      </lux-card-actions>
    </lux-card>
  `
})
class MockCardComponent {
  title?: string;
  subTitle?: string;
  disabled?: boolean;

  testShowIcon = false;
  testShowAction = false;
  testShowInfo = false;

  cardClicked() {}
}
