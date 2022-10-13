import { Component } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Viewport } from 'karma-viewport/dist/adapter/viewport';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxAppHeaderAcComponent } from './lux-app-header-ac.component';

declare const viewport: Viewport;

describe('LuxAppHeaderAcComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxAppHeaderAcComponent, MockIconsClickedAppHeaderAcComponent]);
  });

  describe('luxClicked', () => {
    it('App-logo im Header soll klickbar sein ', fakeAsync(() => {
      viewport.set('desktop');
      const fixture = TestBed.createComponent(MockIconsClickedAppHeaderAcComponent);
      LuxTestHelper.wait(fixture);

      expect(fixture.debugElement.query(By.directive(LuxAppHeaderAcComponent)).componentInstance.mobileView).toBeFalse();

      const element = fixture.debugElement.query(By.css('mat-icon'));
      const onClickSpy = spyOn(fixture.componentInstance, 'onClicked');
      element.nativeElement.click();
      LuxTestHelper.wait(fixture);

      expect(element).toBeDefined();
      expect(onClickSpy).toHaveBeenCalled();

      discardPeriodicTasks();
    }))

  })
});

@Component({
  template: `
    <lux-app-header-ac
      luxAppTitle="MyClickTitle"
      luxAppIconName="appIcon"
      (luxClicked)="onClicked()"
      >
    </lux-app-header-ac>
  `
})
class MockIconsClickedAppHeaderAcComponent {
  onClicked() {}
}
