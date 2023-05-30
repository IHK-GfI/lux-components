/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAriaLabelDirective } from './lux-aria-label.directive';

describe('LuxAriaLabelDirective', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule([LuxComponentsConfigService], [LuxWithSelectorComponent, LuxWithoutSelectorComponent]);
  });

  describe('mit Selector', () => {
    let fixture: ComponentFixture<LuxWithSelectorComponent>;
    let component: LuxWithSelectorComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(LuxWithSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Sollte aria-label in den HTML-Button rendern', () => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toBeNull();

      // Aria-Label setzen
      let ariaLabel: string | undefined = 'Nachrichten anzeigen';
      component.ariaLabel = ariaLabel;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toEqual(ariaLabel);

      // Aria-Label aktualisieren
      ariaLabel = 'Keine Nachrichten vorhanden';
      component.ariaLabel = ariaLabel;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toEqual(ariaLabel);

      // Aria-Label entfernen
      ariaLabel = undefined;
      component.ariaLabel = ariaLabel;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toBeNull();
    });
  });

  describe('ohne Selector', () => {
    let fixture: ComponentFixture<LuxWithoutSelectorComponent>;
    let component: LuxWithoutSelectorComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(LuxWithoutSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Sollte aria-label in den LUX-BUTTON rendern', () => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toBeNull();

      // Aria-Label setzen
      let ariaLabel: string | undefined = 'Nachrichten anzeigen';
      component.ariaLabel = ariaLabel;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toEqual(ariaLabel);

      // Aria-Label aktualisieren
      ariaLabel = 'Keine Nachrichten vorhanden';
      component.ariaLabel = ariaLabel;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toEqual(ariaLabel);

      // Aria-Label entfernen
      ariaLabel = undefined;
      component.ariaLabel = ariaLabel;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-label')).toBeNull();
    });
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button luxIconName="lux-interface-alert-alarm-bell-2" [luxAriaLabel]="ariaLabel" luxAriaLabelSelector="button"></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaLabel?: string;
}

@Component({
  selector: 'lux-without-selector',
  template: ` <lux-button luxIconName="lux-interface-alert-alarm-bell-2" [luxAriaLabel]="ariaLabel"></lux-button> `
})
class LuxWithoutSelectorComponent {
  ariaLabel?: string;
}
