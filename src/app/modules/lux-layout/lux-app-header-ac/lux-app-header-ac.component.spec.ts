import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxButtonComponent } from '../../lux-action/lux-button/lux-button.component';
import { LuxAppHeaderAcComponent } from './lux-app-header-ac.component';

describe('LuxAppHeaderAcComponent', () => {
  //let component: LuxAppHeaderAcComponent;
  //let fixture: ComponentFixture<LuxAppHeaderAcComponent>;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxAppHeaderAcComponent, MockIconsClickedAppHeaderAcComponent]);
  });
  
  describe('luxClicked', () => {
    it('Applogo im Header soll klickbar sein ', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockIconsClickedAppHeaderAcComponent);
      LuxTestHelper.wait(fixture);
      
      const element = fixture.debugElement.query(By.directive(LuxButtonComponent));
      //console.log(element);
      const onClickSpy = spyOn(fixture.componentInstance, 'onClicked');
      element.nativeElement.click();
      fixture.detectChanges();

      expect(element).toBeDefined();
      expect(onClickSpy).toHaveBeenCalled();
    }))

    
  })
});

@Component({
  template: `
    <lux-app-header-ac 
      (luxClicked)="onClicked()" 
      luxAppTitle="MyClickTitle"
      luxAppIconName="appIcon"
     
      >
    </lux-app-header-ac>
  `
})
class MockIconsClickedAppHeaderAcComponent {
  appIcon = "home";
  
  onClicked() {}
}