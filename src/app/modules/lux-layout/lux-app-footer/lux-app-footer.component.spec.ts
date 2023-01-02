/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

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

describe('LuxAppFooterComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockAppFooterButtonOrderComponent, MockAppFooterLinkOrderComponent]);
  });

  describe('App-Footer-Buttons', () => {
    it('Sollte die Buttonreihenfolge beibehalten', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockAppFooterButtonOrderComponent);
      const testComponent = fixture.componentInstance;
      LuxTestHelper.wait(fixture);

      let footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');

      testComponent.nextBtn.alwaysVisible = true;
      testComponent.cancelBtn.alwaysVisible = true;
      testComponent.finishBtn.alwaysVisible = true;
      fixture.detectChanges();

      footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');

      testComponent.nextBtn.alwaysVisible = false;
      testComponent.cancelBtn.alwaysVisible = false;
      testComponent.finishBtn.alwaysVisible = false;
      fixture.detectChanges();

      footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');

      testComponent.nextBtn.prio = 3;
      testComponent.cancelBtn.prio = 2;
      testComponent.finishBtn.prio = 1;
      fixture.detectChanges();

      footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');

      testComponent.nextBtn.prio = 1;
      testComponent.cancelBtn.prio = 2;
      testComponent.finishBtn.prio = 3;
      fixture.detectChanges();

      footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');

      testComponent.nextBtn.prio = 2;
      testComponent.cancelBtn.prio = 1;
      testComponent.finishBtn.prio = 3;
      fixture.detectChanges();

      footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');

      testComponent.nextBtn.alwaysVisible = true;
      testComponent.cancelBtn.alwaysVisible = false;
      testComponent.finishBtn.alwaysVisible = true;
      testComponent.nextBtn.prio = 1;
      testComponent.cancelBtn.prio = 2;
      testComponent.finishBtn.prio = 3;
      fixture.detectChanges();

      footerButtons = fixture.debugElement.queryAll(By.directive(LuxButtonComponent));
      expect(footerButtons.length).toEqual(3);
      expect(footerButtons[0].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Weiter');
      expect(footerButtons[1].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abbrechen');
      expect(footerButtons[2].nativeElement.attributes['ng-reflect-lux-label'].value).toEqual('Abschließen');
    }));

    it('Sollte identische LuxAppFooterButtonInfos über den Konstruktor und die generateInfo-Method erzeugen', fakeAsync(() => {
      const label = 'Weiter';
      const cmd = 'next';
      const prio = 5;
      const color = 'primary';
      const disabled = false;
      const hidden = false;
      const raised = true;
      const flat = false;
      const stroked = false;
      const iconName = 'fas fa-user';
      const alwaysVisible = true;
      const tooltip = 'Tooltip'
      const tooltipMenu = 'TooltipMenu'
      const onClick = () => {};

      const infoConstruktor = new LuxAppFooterButtonInfo(label, cmd, prio, color, disabled, hidden, raised, flat, stroked, iconName, alwaysVisible, tooltip, tooltipMenu, onClick);
      const infoMethod =  LuxAppFooterButtonInfo.generateInfo({ label, cmd, prio, color, disabled, hidden, raised, flat, stroked, iconName, alwaysVisible, tooltip, onClick });

      expect(infoConstruktor.label).toEqual(infoMethod.label);
      expect(infoConstruktor.cmd).toEqual(infoMethod.cmd);
      expect(infoConstruktor.prio).toEqual(infoMethod.prio);
      expect(infoConstruktor.color).toEqual(infoMethod.color);
      expect(infoConstruktor.disabled).toEqual(infoMethod.disabled);
      expect(infoConstruktor.hidden).toEqual(infoMethod.hidden);
      expect(infoConstruktor.raised).toEqual(infoMethod.raised);
      expect(infoConstruktor.iconName).toEqual(infoMethod.iconName);
      expect(infoConstruktor.alwaysVisible).toEqual(infoMethod.alwaysVisible);
      expect(infoConstruktor.tooltip).toEqual(infoMethod.tooltip);
      expect(infoConstruktor.onClick).toEqual(infoMethod.onClick);
    }));

    it('Sollte eine LuxAppFooterButtonInfo über ein Teilobjekt erzeugen', fakeAsync(() => {
      const label = 'Weiter';
      const cmd = 'next';
      const disabled = false;
      const iconName = 'fas fa-user';
      const onClick = () => {};

      const infoMethod =  LuxAppFooterButtonInfo.generateInfo({ label, cmd, disabled, iconName, onClick });

      expect(infoMethod.label).toEqual(label);
      expect(infoMethod.cmd).toEqual(cmd);
      expect(infoMethod.prio).toEqual(0);
      expect(infoMethod.color).toBeUndefined();
      expect(infoMethod.disabled).toEqual(disabled);
      expect(infoMethod.hidden).toEqual(false);
      expect(infoMethod.raised).toEqual(true);
      expect(infoMethod.iconName).toEqual(iconName);
      expect(infoMethod.alwaysVisible).toEqual(false);
      expect(infoMethod.tooltip).toEqual('');
      expect(infoMethod.onClick).toEqual(onClick);
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
