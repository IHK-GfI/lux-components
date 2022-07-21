/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxBadgeComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxBadgeComponent, LuxBadgeIconNameComponent]);
  });

  describe('ng-content "lux-label"', () => {
    let fixture: ComponentFixture<LuxBadgeComponent>;
    let testComponent: LuxBadgeComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxBadgeComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Wert über die Component setzen', fakeAsync(() => {
      // Vorbedingungen testen
      const badgeEl = fixture.debugElement.query(By.css('#badgelabel'));
      expect(fixture.componentInstance.label).toEqual('Test 4711');
      expect(badgeEl.nativeElement.innerHTML.trim()).toEqual('Test 4711');

      // Änderungen durchführen
      const expectedLabel = 'New Lorum ipsum 123';
      fixture.componentInstance.label = expectedLabel;
      fixture.detectChanges();

      // Nachbedingungen testen
      expect(fixture.componentInstance.label).toEqual(expectedLabel);
      expect(badgeEl.nativeElement.innerHTML.trim()).toEqual(expectedLabel);
    }));
  });

  describe('Attribut "luxIconName"', () => {
    let fixture: ComponentFixture<LuxBadgeIconNameComponent>;
    let testComponent: LuxBadgeIconNameComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxBadgeIconNameComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Wert über die Component setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.componentInstance.iconName).toEqual('fa-gear');

      // Änderungen durchführen
      fixture.componentInstance.iconName = '';
      fixture.detectChanges();

      // Nachbedingungen testen
      const iconEl = fixture.debugElement.query(By.css('lux-icon'));
      expect(fixture.componentInstance.iconName).toEqual('');
      expect(iconEl).toBeNull();

      // Änderungen durchführen
      const expectedIcon = 'fa-user';
      fixture.componentInstance.iconName = expectedIcon;
      fixture.detectChanges();

      // Nachbedingungen testen
      const newIconEl = fixture.debugElement.query(By.css('lux-icon'));
      expect(fixture.componentInstance.iconName).toEqual(expectedIcon);
      expect(newIconEl).not.toBeNull();
      expect(newIconEl.nativeElement.innerHTML).toContain(expectedIcon);
    }));
  });

  describe('Attribut "luxUppercase"', () => {
    let fixture: ComponentFixture<LuxBadgeComponent>;
    let testComponent: LuxBadgeComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxBadgeComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Wert über die Component setzen', fakeAsync(() => {
      // Vorbedingungen testen
      const badgeEl = fixture.debugElement.query(By.css('div[class~="lux-badge"]'));
      expect(fixture.componentInstance.label).toEqual('Test 4711');
      expect(fixture.componentInstance.uppercase).toEqual(true);
      expect(badgeEl.nativeElement.innerHTML).toContain('Test 4711');

      // Änderungen durchführen
      fixture.componentInstance.uppercase = false;
      fixture.detectChanges();

      // Nachbedingungen testen
      expect(fixture.componentInstance.uppercase).toBeFalsy();
      expect(badgeEl.nativeElement.classList).not.toContain('lux-badge-uppercase');

      // Änderungen durchführen
      fixture.componentInstance.uppercase = true;
      fixture.detectChanges();

      // Nachbedingungen testen
      expect(fixture.componentInstance.uppercase).toBeTruthy();
      expect(badgeEl.nativeElement.classList).toContain('lux-badge-uppercase');
    }));
  });
});

@Component({
  template: `
    <lux-badge [luxIconName]="iconName" luxColor="red" [luxUppercase]="uppercase">
      <lux-label luxId="badgelabel">
        {{ label }}
      </lux-label>
    </lux-badge>
  `
})
class LuxBadgeComponent {
  label = 'Test 4711';
  uppercase = true;
  iconName = 'fa-gear';
}

@Component({
  template: `
    <lux-badge [luxIconName]="iconName">
      <lux-label luxId="badgelabel">
        BVB
      </lux-label>
    </lux-badge>
  `
})
class LuxBadgeIconNameComponent {
  iconName = 'fa-gear';
}
