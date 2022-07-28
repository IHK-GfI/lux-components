/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAriaExpandedDirective } from './lux-aria-expanded.directive';

describe('LuxAriaExpandedDirective', () => {

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

    it('Sollte aria-expanded in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();

      // Aria-expanded setzen
      let ariaExpanded: boolean | undefined = true;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual('true');

      // Aria-expanded aktualisieren
      ariaExpanded = false;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual('false');

      // Aria-expanded entfernen
      ariaExpanded = undefined;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();
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

    it('Sollte aria-expanded in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toBeNull();

      // Aria-expanded setzen
      let ariaExpanded: boolean | undefined = true;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual('true');

      // Aria-expanded aktualisieren
      ariaExpanded = false;
      component.ariaExpanded = ariaExpanded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('aria-expanded')).toEqual('false');

      // Aria-expanded entfernen
      ariaExpanded = undefined;
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
  ariaExpanded?: boolean | undefined;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaExpanded]="ariaExpanded"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaExpanded?: boolean | undefined;
}
