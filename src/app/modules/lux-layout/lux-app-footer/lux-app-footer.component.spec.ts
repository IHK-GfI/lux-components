/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { LuxButtonComponent } from '../../lux-action/lux-button/lux-button.component';
import { LuxLinkComponent } from '../../lux-action/lux-link/lux-link.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { LuxAppFooterButtonInfo } from './lux-app-footer-button-info';
import { LuxAppFooterButtonService } from './lux-app-footer-button.service';
import { LuxAppFooterLinkInfo } from './lux-app-footer-link-info';
import { LuxAppFooterLinkService } from './lux-app-footer-link.service';

describe('LuxAppHeaderComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockAppFooterButtonOrderComponent, MockAppFooterLinkOrderComponent]);
  });

  describe('App-Footer-Buttons', () => {
    it('Sollte die Buttonreihenfolge beibehalten', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockAppFooterButtonOrderComponent);
      LuxTestHelper.wait(fixture);

      const footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');
    }));
  });

  describe('App-Footer-Links', () => {
    it('Sollte die Linkreihenfolge beibehalten', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockAppFooterLinkOrderComponent);
      LuxTestHelper.wait(fixture);

      const footerLinks = fixture.debugElement.queryAll(By.directive(LuxLinkComponent));
      expect(footerLinks.length).toEqual(3);
      expect(footerLinks[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Link 1');
      expect(footerLinks[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Link 2');
      expect(footerLinks[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Link 3');
    }));
  });
});

@Component({
  template: ` <lux-app-footer luxVersion="0.1.2"></lux-app-footer> `
})
class MockAppFooterButtonOrderComponent {
  nextBtn = LuxAppFooterButtonInfo.generateInfo({
    label: 'Weiter',
    cmd: 'next'
  });

  cancelBtn = LuxAppFooterButtonInfo.generateInfo({
    label: 'Abbrechen',
    cmd: 'cancel'
  });

  finishBtn = LuxAppFooterButtonInfo.generateInfo({
    label: 'Abschließen',
    cmd: 'finish'
  });

  constructor(private buttonService: LuxAppFooterButtonService) {
    this.buttonService.buttonInfos = [this.nextBtn, this.cancelBtn, this.finishBtn];
  }
}

@Component({
  template: ` <lux-app-footer luxVersion="0.1.3"></lux-app-footer> `
})
class MockAppFooterLinkOrderComponent {
  constructor(private linkService: LuxAppFooterLinkService) {
    this.linkService.linkInfos = [
      new LuxAppFooterLinkInfo('Link 1', 'path1'),
      new LuxAppFooterLinkInfo('Link 2', 'path2'),
      new LuxAppFooterLinkInfo('Link 3', 'path3')
    ];
  }
}
