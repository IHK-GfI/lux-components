/* eslint-disable max-classes-per-file */
import { LuxAriaInvalidDirective } from './lux-aria-invalid.directive';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('LuxAriaInvalidDirective', () => {

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

    it('Sollte aria-invalid in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-invalid')).toBeNull();

      // aria-invalid setzen
      let ariaInvalid: string | undefined = 'true';
      component.ariaInvalid = ariaInvalid;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-invalid')).toEqual(
        ariaInvalid
      );

      // aria-invalid aktualisieren
      ariaInvalid = 'false';
      component.ariaInvalid = ariaInvalid;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-invalid')).toEqual(
        ariaInvalid
      );

      // aria-invalid entfernen
      ariaInvalid = undefined;
      component.ariaInvalid = ariaInvalid;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-invalid')).toBeNull();
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

    it('Sollte aria-invalid in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-invalid')).toBeNull();

      // aria-invalid setzen
      let ariaInvalid: string | undefined = 'true';
      component.ariaInvalid = ariaInvalid;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-invalid')).toEqual(
        ariaInvalid
      );

      // aria-invalid aktualisieren
      ariaInvalid = 'spelling';
      component.ariaInvalid = ariaInvalid;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-invalid')).toEqual(
        ariaInvalid
      );

      // aria-invalid entfernen
      ariaInvalid = undefined;
      component.ariaInvalid = ariaInvalid;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-invalid')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaInvalid]="ariaInvalid" luxAriaInvalidSelector="button"></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaInvalid?: string;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaInvalid]="ariaInvalid"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaInvalid?: string;
}
