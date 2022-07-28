/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxAriaHasPopupDirective', () => {

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

    it('Sollte aria-haspopup in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toBeNull();

      // Aria-HasPopup setzen
      let ariaHasPopup: boolean | undefined = true;
      component.ariaHasPopup = ariaHasPopup;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toEqual('true');

      // Aria-HasPopup aktualisieren
      ariaHasPopup = false;
      component.ariaHasPopup = ariaHasPopup;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toEqual('false' );

      // Aria-HasPopup entfernen
      ariaHasPopup = undefined;
      component.ariaHasPopup = ariaHasPopup;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toBeNull();
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

    it('Sollte aria-haspopup in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toBeNull();

      // Aria-HasPopup setzen
      let ariaHasPopup: boolean | undefined = true;
      component.ariaHasPopup = ariaHasPopup;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toEqual('true');

      // Aria-HasPopup aktualisieren
      ariaHasPopup = false;
      component.ariaHasPopup = ariaHasPopup;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toEqual('false');

      // Aria-HasPopup entfernen
      ariaHasPopup = undefined;
      component.ariaHasPopup = ariaHasPopup;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-haspopup')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button
      luxIconName="fas fa-bell"
      [luxAriaHasPopup]="ariaHasPopup"
      luxAriaHasPopupSelector="button"
    ></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaHasPopup?: boolean | undefined;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaHasPopup]="ariaHasPopup"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaHasPopup?: boolean | undefined;
}
