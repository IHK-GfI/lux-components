import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxButtonComponent } from '../../lux-action/lux-button/lux-button.component';
import { LuxAppHeaderNextComponent } from './lux-app-header-next.component';

describe('LuxAppHeaderNextComponent', () => {
  //let component: LuxAppHeaderNextComponent;
  //let fixture: ComponentFixture<LuxAppHeaderNextComponent>;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxAppHeaderNextComponent, MockIconsClickedAppHeaderNextComponent]);
  });
  
  describe('luxClicked', () => {
    it('Applogo im Header soll klickbar sein ', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockIconsClickedAppHeaderNextComponent);
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
    <lux-app-header-next 
      (luxClicked)="onClicked()" 
      luxAppTitle="MyClickTitle"
      luxAppIconName="appIcon"
     
      >
    </lux-app-header-next>
  `
})
class MockIconsClickedAppHeaderNextComponent {
  appIcon = "home";
  
  onClicked() {}
}