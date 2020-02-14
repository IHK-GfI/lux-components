import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAriaHiddenDirective } from './lux-aria-hidden.directive';

describe('LuxAriaHiddenDirective', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule(
      [LuxComponentsConfigService],
      [LuxWithSelectorComponent, LuxWithoutSelectorComponent]
    );
  });

  describe('mit Selector', () => {
    let fixture: ComponentFixture<LuxWithSelectorComponent>;
    let component: LuxWithSelectorComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(LuxWithSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Sollte aria-hidden in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toBeNull();

      // Aria-Hidden setzen
      let ariaHidden = 'Nachrichten anzeigen';
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toEqual(
        ariaHidden
      );

      // Aria-Hidden aktualisieren
      ariaHidden = 'Keine Nachrichten vorhanden';
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toEqual(
        ariaHidden
      );

      // Aria-Hidden entfernen
      ariaHidden = null;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toBeNull();
    }));
  });

  describe('ohne Selector', () => {
    let fixture: ComponentFixture<LuxWithoutSelectorComponent>;
    let component: LuxWithoutSelectorComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(LuxWithoutSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Sollte aria-hidden in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toBeNull();

      // Aria-Hidden setzen
      let ariaHidden = 'Nachrichten anzeigen';
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toEqual(
        ariaHidden
      );

      // Aria-Hidden aktualisieren
      ariaHidden = 'Keine Nachrichten vorhanden';
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toEqual(
        ariaHidden
      );

      // Aria-Hidden entfernen
      ariaHidden = null;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaHidden]="ariaHidden" luxAriaHiddenSelector="button"></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaHidden;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaHidden]="ariaHidden"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaHidden;
}
