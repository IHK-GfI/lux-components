/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxAriaRoleDirective', () => {

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

    it('Sollte role in den HTML-Button rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('role')).toBeNull();

      // role setzen
      let ariaRole = 'menubar';
      component.ariaRole = ariaRole;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('role')).toEqual(ariaRole);

      // role aktualisieren
      ariaRole = 'menuitem';
      component.ariaRole = ariaRole;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('role')).toEqual(ariaRole);

      // role entfernen
      ariaRole = null;
      component.ariaRole = ariaRole;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('role')).toBeNull();
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

    it('Sollte role in den LUX-BUTTON rendern', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('role')).toBeNull();

      // role setzen
      let ariaRole = 'menubar';
      component.ariaRole = ariaRole;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('role')).toEqual(ariaRole);

      // role aktualisieren
      ariaRole = 'menuitem';
      component.ariaRole = ariaRole;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('role')).toEqual(ariaRole);

      // role entfernen
      ariaRole = null;
      component.ariaRole = ariaRole;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('lux-button')).nativeElement.getAttribute('role')).toBeNull();
    }));
  });
});

@Component({
  selector: 'lux-with-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaRole]="ariaRole" luxAriaRoleSelector="button"></lux-button>
  `
})
class LuxWithSelectorComponent {
  ariaRole;
}

@Component({
  selector: 'lux-without-selector',
  template: `
    <lux-button luxIconName="fas fa-bell" [luxAriaRole]="ariaRole"></lux-button>
  `
})
class LuxWithoutSelectorComponent {
  ariaRole;
}
