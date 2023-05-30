/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { LuxAriaLabelledbyDirective } from './lux-aria-labelledby.directive';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('LuxAriaLabelledbyDirective', () => {
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

    it('Sollte labelledby in den HTML-Button rendern', () => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();

      // labelledby setzen
      let ariaLabelledBy: string | undefined = 'menubar';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(ariaLabelledBy);

      // labelledby aktualisieren
      ariaLabelledBy = 'menuitem';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(ariaLabelledBy);

      // labelledby entfernen
      ariaLabelledBy = undefined;
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();
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

    it('Sollte labelledby in den LUX-BUTTON rendern', () => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();

      // labelledby setzen
      let ariaLabelledBy: string | undefined = 'menubar';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(ariaLabelledBy);

      // labelledby aktualisieren
      ariaLabelledBy = 'menuitem';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(ariaLabelledBy);

      // labelledby entfernen
      ariaLabelledBy = undefined;
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();
    });
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button
      luxIconName="lux-interface-alert-alarm-bell-2"
      [luxAriaLabelledby]="ariaLabelledby"
      luxAriaLabelledbySelector="button"
    ></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaLabelledby?: string;
}

@Component({
  selector: 'lux-without-selector',
  template: ` <lux-button luxIconName="lux-interface-alert-alarm-bell-2" [luxAriaLabelledby]="ariaLabelledby"></lux-button> `
})
class LuxWithoutSelectorComponent {
  ariaLabelledby?: string;
}
