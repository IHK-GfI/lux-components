/* eslint-disable max-classes-per-file */
import { LuxAriaRequiredDirective } from './lux-aria-required.directive';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('LuxAriaRequiredDirective', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [LuxComponentsConfigService],
      [LuxWithSelectorComponent, LuxWithoutSelectorComponent]
    );
  });

  describe('mit Selector', () => {
    let fixture: ComponentFixture<LuxWithSelectorComponent>;
    let component: LuxWithSelectorComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(LuxWithSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Sollte aria-required in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-required')).toBeNull();

      // aria-required setzen
      let ariaRequired: boolean | undefined = true;
      component.ariaRequired = ariaRequired;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-required')).toEqual('true');

      // aria-required aktualisieren
      ariaRequired = false;
      component.ariaRequired = ariaRequired;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-required')).toEqual('false');

      // aria-required entfernen
      ariaRequired = undefined;
      component.ariaRequired = ariaRequired;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-required')).toBeNull();
    }));
  });

  describe('ohne Selector', () => {
    let fixture: ComponentFixture<LuxWithoutSelectorComponent>;
    let component: LuxWithoutSelectorComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(LuxWithoutSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('Sollte aria-required in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-required')).toBeNull();

      // aria-required setzen
      let ariaRequired: boolean | undefined = true;
      component.ariaRequired = ariaRequired;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-required')).toEqual('true');

      // aria-required aktualisieren
      ariaRequired = false;
      component.ariaRequired = ariaRequired;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-required')).toEqual('false');

      // aria-required entfernen
      ariaRequired = undefined;
      component.ariaRequired = ariaRequired;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-required')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button
      luxIconName="fas fa-bell"
      [luxAriaRequired]="ariaRequired"
      luxAriaRequiredSelector="button"
    ></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaRequired?: boolean;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaRequired]="ariaRequired"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaRequired?: boolean;
}
