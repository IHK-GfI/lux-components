import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxIconComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxIconComponent]);
  });

  describe('Attribut "luxIconName"', () => {
    let fixture: ComponentFixture<LuxIconComponent>;
    let testComponent: LuxIconComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxIconComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('FA-Icon setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.componentInstance.iconName).toEqual('fa-gear');

      // Änderungen durchführen
      const expectedIcon = 'fa-user';
      fixture.componentInstance.iconName = expectedIcon;
      fixture.detectChanges();

      // Nachbedingungen testen
      const newIconEl = fixture.debugElement.query(By.css('lux-icon'));
      expect(fixture.componentInstance.iconName).toEqual(expectedIcon);
      expect(newIconEl.nativeElement.innerHTML).toContain(expectedIcon);
    }));

    it('MAT-Icon setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.componentInstance.iconName).toEqual('fa-gear');

      // Änderungen durchführen
      const expectedIcon = 'card_giftcard';
      fixture.componentInstance.iconName = expectedIcon;
      fixture.detectChanges();

      // Nachbedingungen testen
      const newIconEl = fixture.debugElement.query(By.css('lux-icon'));
      expect(fixture.componentInstance.iconName).toEqual(expectedIcon);
      expect(newIconEl.nativeElement.innerHTML).toContain(expectedIcon);
    }));
  });

  describe('Attribut "luxIconSize"', () => {
    let fixture: ComponentFixture<LuxIconComponent>;
    let testComponent: LuxIconComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxIconComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('FA-Icon setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.componentInstance.iconSize).toEqual('2x');

      // Änderungen durchführen
      const expectedIconSize = '3x';
      fixture.componentInstance.iconSize = expectedIconSize;
      fixture.detectChanges();

      // Nachbedingungen testen
      const iconEl = fixture.debugElement.query(By.css('i'));
      expect(fixture.componentInstance.iconSize).toEqual(expectedIconSize);
      expect(iconEl.nativeElement.classList).toContain('fa-3x');
    }));

    it('MAT-Icon setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.componentInstance.iconSize).toEqual('2x');

      // Änderungen durchführen
      const expectedIconSize = '3x';
      fixture.componentInstance.iconName = 'card_giftcard';
      fixture.componentInstance.iconSize = expectedIconSize;
      fixture.detectChanges();

      // Nachbedingungen testen
      const iconEl = fixture.debugElement.query(By.css('mat-icon'));
      expect(fixture.componentInstance.iconSize).toEqual(expectedIconSize);
      expect(iconEl.nativeElement.style.fontSize).toEqual('3em');
    }));
  });
});

@Component({
  template: `
    <lux-icon [luxIconName]="iconName" [luxIconSize]="iconSize"></lux-icon>
  `
})
class LuxIconComponent {
  iconName: string = 'fa-gear';
  iconSize: string = '2x';
}
