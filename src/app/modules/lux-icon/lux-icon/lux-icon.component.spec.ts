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

    it('Icon setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.componentInstance.iconName).toEqual('lux-interface-setting-cog');

      // Änderungen durchführen
      const expectedIcon = 'lux-interface-setting-cog';
      fixture.componentInstance.iconName = expectedIcon;
      fixture.detectChanges();

      // Nachbedingungen testen
      const newIconEl = fixture.debugElement.query(By.css('lux-icon'));
      expect(fixture.componentInstance.iconName).toEqual(expectedIcon);
      expect(newIconEl.nativeElement.innerHTML).toContain(expectedIcon);
    }));
  });
});

@Component({
  template: ` <lux-icon [luxIconName]="iconName" [luxIconSize]="iconSize"></lux-icon> `
})
class LuxIconComponent {
  iconName = 'lux-interface-setting-cog';
  iconSize = '2x';
}
