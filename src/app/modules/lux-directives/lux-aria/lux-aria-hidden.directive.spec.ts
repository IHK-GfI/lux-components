/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAriaHiddenDirective } from './lux-aria-hidden.directive';

describe('LuxAriaHiddenDirective', () => {
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

    it('Sollte aria-hidden in den HTML-Button rendern', () => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toBeNull();

      // Aria-Hidden setzen
      let ariaHidden: boolean | undefined = true;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toEqual('true');

      // Aria-Hidden aktualisieren
      ariaHidden = false;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toEqual('false');

      // Aria-Hidden entfernen
      ariaHidden = undefined;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-hidden')).toBeNull();
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

    it('Sollte aria-hidden in den LUX-BUTTON rendern', () => {
      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toBeNull();

      // Aria-Hidden setzen
      let ariaHidden: boolean | undefined = true;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toEqual('true');

      // Aria-Hidden aktualisieren
      ariaHidden = false;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toEqual('false');

      // Aria-Hidden entfernen
      ariaHidden = undefined;
      component.ariaHidden = ariaHidden;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('aria-hidden')).toBeNull();
    });
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button luxIconName="lux-interface-alert-alarm-bell-2" [luxAriaHidden]="ariaHidden" luxAriaHiddenSelector="button"></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaHidden?: boolean;
}

@Component({
  selector: 'lux-without-selector',
  template: ` <lux-button luxIconName="lux-interface-alert-alarm-bell-2" [luxAriaHidden]="ariaHidden"></lux-button> `
})
class LuxWithoutSelectorComponent {
  ariaHidden?: boolean;
}
