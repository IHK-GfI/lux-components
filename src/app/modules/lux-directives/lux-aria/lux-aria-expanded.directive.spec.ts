import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAriaExpandedDirective } from './lux-aria-expanded.directive';

describe('LuxAriaExpandedDirective', () => {
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

    it('Sollte aria-expanded in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();

      // Aria-expanded setzen
      let ariaExpanded = true;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual(
        ariaExpanded.toString()
      );

      // Aria-expanded aktualisieren
      ariaExpanded = false;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual(
        ariaExpanded.toString()
      );

      // Aria-expanded entfernen
      ariaExpanded = null;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();
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

    it('Sollte aria-expanded in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();

      // Aria-expanded setzen
      let ariaExpanded = true;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual(
        ariaExpanded.toString()
      );

      // Aria-expanded aktualisieren
      ariaExpanded = false;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual(
        ariaExpanded.toString()
      );

      // Aria-expanded entfernen
      ariaExpanded = null;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button
      luxIconName="fas fa-bell"
      [luxAriaExpanded]="ariaExpanded"
      luxAriaExpandedSelector="button"
    ></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaExpanded;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaExpanded]="ariaExpanded"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaExpanded;
}
