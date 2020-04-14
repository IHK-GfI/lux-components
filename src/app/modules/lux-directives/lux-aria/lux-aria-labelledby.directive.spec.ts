import { LuxAriaLabelledbyDirective } from './lux-aria-labelledby.directive';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('LuxAriaLabelledbyDirective', () => {

  beforeEach(async () => {
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

    it('Sollte labelledby in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();

      // labelledby setzen
      let ariaLabelledBy = 'menubar';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(
        ariaLabelledBy
      );

      // labelledby aktualisieren
      ariaLabelledBy = 'menuitem';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(
        ariaLabelledBy
      );

      // labelledby entfernen
      ariaLabelledBy = null;
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();
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

    it('Sollte labelledby in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();

      // labelledby setzen
      let ariaLabelledBy = 'menubar';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(
        ariaLabelledBy
      );

      // labelledby aktualisieren
      ariaLabelledBy = 'menuitem';
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toEqual(
        ariaLabelledBy
      );

      // labelledby entfernen
      ariaLabelledBy = null;
      component.ariaLabelledby = ariaLabelledBy;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-labelledby')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button
      luxIconName="fas fa-bell"
      [luxAriaLabelledby]="ariaLabelledby"
      luxAriaLabelledbySelector="button"
    ></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaLabelledby;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaLabelledby]="ariaLabelledby"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaLabelledby;
}
