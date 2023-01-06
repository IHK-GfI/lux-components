import { Component } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Viewport } from 'karma-viewport/dist/adapter/viewport';
import { LuxImageComponent } from '../../lux-icon/lux-image/lux-image.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAppHeaderAcComponent } from './lux-app-header-ac.component';

declare const viewport: Viewport;

describe('LuxAppHeaderAcComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxAppHeaderAcComponent, MockIconsClickedAppHeaderAcComponent]);
  });

  describe('luxClicked', () => {
    it('App-Title sollte angezeigt werden ', fakeAsync(() => {
      viewport.set('desktop');
      const fixture = TestBed.createComponent(MockIconsClickedAppHeaderAcComponent);
      LuxTestHelper.wait(fixture);

      const element = fixture.debugElement.query(By.css('.lux-app-title'));

      LuxTestHelper.wait(fixture);

      expect(element).toBeDefined();

      discardPeriodicTasks();
    }))
  })
});

@Component({
  template: `
    <lux-app-header-ac
      luxAppTitle="MyClickTitle"
      luxAppIconSrc="/assets/svg/demoAppLogo.svg"
      (luxAppLogoClicked)="onClicked()"
      >
    </lux-app-header-ac>
  `
})
class MockIconsClickedAppHeaderAcComponent {
  onClicked() {}
}
