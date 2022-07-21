/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  flushMicrotasks,
  inject,
  TestBed
} from '@angular/core/testing';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxMasterDetailMobileHelperService } from '../lux-master-detail/lux-master-detail-mobile-helper.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';
import { Router } from '@angular/router';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

describe('LuxAppHeaderComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [
        LuxMasterDetailMobileHelperService,
        LuxConsoleService,
        {
          provide: LuxMasterDetailMobileHelperService,
          useClass: MockMasterDetailHelperService
        }
      ],
      [
        MockAppHeaderComponent,
        MockLabelClickedAppHeaderComponent,
        MockIconClickedAppHeaderComponent,
        MockImageClickedAppHeaderComponent
      ]
    );
  });

  describe('luxClicked', () => {
    it('Label im App-Header sollte angeklickt werden können', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockLabelClickedAppHeaderComponent);
      LuxTestHelper.wait(fixture);

      const element = fixture.debugElement.query(By.css('span.lux-cursor'));
      const onClickSpy = spyOn(fixture.componentInstance, 'onClicked');

      element.nativeElement.click();
      fixture.detectChanges();

      expect(element).toBeDefined();
      expect(onClickSpy).toHaveBeenCalled();
      expect(element.classes['lux-cursor']).toBeTrue();
    }));

    it('Icon im App-Header sollte angeklickt werden können', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockIconClickedAppHeaderComponent);
      LuxTestHelper.wait(fixture);

      const element = fixture.debugElement.query(By.css('lux-icon.lux-cursor'));
      const onClickSpy = spyOn(fixture.componentInstance, 'onClicked');

      element.nativeElement.click();
      fixture.detectChanges();

      expect(element).toBeDefined();
      expect(onClickSpy).toHaveBeenCalled();
      expect(element.classes['lux-cursor']).toBeTrue();
    }));

    it('Image im App-Header sollte angeklickt werden können', fakeAsync(() => {
      const fixture = TestBed.createComponent(MockImageClickedAppHeaderComponent);
      LuxTestHelper.wait(fixture);

      const element = fixture.debugElement.query(By.css('lux-image.lux-cursor'));
      const onClickSpy = spyOn(fixture.componentInstance, 'onClicked');

      element.nativeElement.click();
      fixture.detectChanges();

      expect(element).toBeDefined();
      expect(onClickSpy).toHaveBeenCalled();
      expect(element.classes['lux-cursor']).toBeTrue();
    }));
  });

  describe('ohne lux-side-nav und lux-app-header-right-nav', () => {
    let fixture: ComponentFixture<MockAppHeaderComponent>;
    let testComponent: MockAppHeaderComponent;
    let testService: MockMasterDetailHelperService;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockAppHeaderComponent);
      testComponent = fixture.componentInstance;
      testComponent.testUseRightNav = false;
      testComponent.testUseSideNav = false;
      LuxTestHelper.wait(fixture);
    }));

    beforeEach(inject([LuxMasterDetailMobileHelperService], (service: MockMasterDetailHelperService) => {
      testService = service;
    }));

    it('Sollte erstellt werden', fakeAsync(() => {
      expect(testComponent).toBeTruthy();
    }));

    it('Sollte den luxAppTitle darstellen ', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-header-title')).nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      testComponent.title = 'Titel';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-header-title')).nativeElement.textContent.trim()).toEqual('Titel');
    }));

    it('Sollte in kleiner Auflösung den luxAppTitleShort darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      testService.isMobileView = true;
      expect(fixture.debugElement.query(By.css('.lux-header-title')).nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      testComponent.titleShort = 'T';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-header-title')).nativeElement.textContent.trim()).toEqual('T');
    }));

    it('Sollte eine Warnung loggen, wenn kein luxAppTitleShort gesetzt ist', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(console, 'warn');
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      testComponent.titleShort = 'ASDF';
      LuxTestHelper.wait(fixture);
      testComponent.titleShort = null;
      LuxTestHelper.wait(fixture);
      testComponent.titleShort = undefined;
      LuxTestHelper.wait(fixture);
      testComponent.titleShort = '';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(3);
    }));
  });

  describe('mit lux-side-nav', () => {
    let fixture: ComponentFixture<MockAppHeaderComponent>;
    let testComponent: MockAppHeaderComponent;
    let testService: MockMasterDetailHelperService;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockAppHeaderComponent);
      testComponent = fixture.componentInstance;
      testComponent.testUseSideNav = true;
      LuxTestHelper.wait(fixture);
    }));

    beforeEach(inject([LuxMasterDetailMobileHelperService], (service: MockMasterDetailHelperService) => {
      testService = service;
    }));

    it('Sollte erstellt werden', fakeAsync(() => {
      expect(testComponent).toBeTruthy();
    }));

    it('Sollte den Trigger für lux-side-nav darstellen', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('.lux-side-nav-trigger'))).not.toBeNull();
    }));

    it('Sollte das lux-side-nav ausklappen', fakeAsync(() => {
      // Vorbedingungen testen
      const sideNavEl = fixture.debugElement.query(By.css('.lux-side-nav')).nativeElement;
      expect(sideNavEl.style.opacity).toEqual('0');
      expect(fixture.debugElement.query(By.css('.lux-side-nav-overlay'))).toBeNull();

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-side-nav-trigger button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(sideNavEl.style.opacity).toEqual('1');
      expect(fixture.debugElement.query(By.css('.lux-side-nav-overlay')).nativeElement.style.display).toEqual('');

      discardPeriodicTasks();
    }));

    it('Sollte den lux-side-nav-header und lux-side-nav-footer darstellen', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('.test-side-nav-header')).nativeElement.textContent.trim()).toEqual(
        'SideNav-Header'
      );
      expect(fixture.debugElement.query(By.css('.test-side-nav-footer')).nativeElement.textContent.trim()).toEqual(
        'SideNav-Footer'
      );
    }));

    it('Sollte lux-side-nav-items via *ngIf ausblenden können', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.createSideNavItems(2);
      LuxTestHelper.wait(fixture);
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item')).length).toBe(2);

      // Änderungen durchführen
      testComponent.sideNavItems[0].ignoreThisItem = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item')).length).toBe(1);

      // Änderungen durchführen
      testComponent.sideNavItems[1].ignoreThisItem = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item')).length).toBe(0);
    }));

    it('Sollte label und icon für lux-side-nav-items darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item')).length).toBe(0);

      // Änderungen durchführen
      testComponent.createSideNavItems(4);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      const luxSideNavItems = fixture.debugElement.queryAll(By.css('.lux-side-nav-item'));
      expect(luxSideNavItems.length).toBe(4);

      expect(luxSideNavItems[0].query(By.css('.lux-button-label')).nativeElement.textContent.trim()).toEqual('Label 0');
      expect(luxSideNavItems[1].query(By.css('.lux-button-label')).nativeElement.textContent.trim()).toEqual('Label 1');
      expect(luxSideNavItems[2].query(By.css('.lux-button-label')).nativeElement.textContent.trim()).toEqual('Label 2');
      expect(luxSideNavItems[3].query(By.css('.lux-button-label')).nativeElement.textContent.trim()).toEqual('Label 3');

      expect(luxSideNavItems[0].query(By.css('.fas.fa-check')).nativeElement.textContent.trim()).not.toBeNull();
      expect(luxSideNavItems[1].query(By.css('.fas.fa-check')).nativeElement.textContent.trim()).not.toBeNull();
      expect(luxSideNavItems[2].query(By.css('.fas.fa-check')).nativeElement.textContent.trim()).not.toBeNull();
      expect(luxSideNavItems[3].query(By.css('.fas.fa-check')).nativeElement.textContent.trim()).not.toBeNull();
    }));

    it('Sollte lux-side-nav-items deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item')).length).toBe(0);

      // Änderungen durchführen
      testComponent.createSideNavItems(2);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item button'))[0].nativeElement.disabled).toBe(false);
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item button'))[1].nativeElement.disabled).toBe(false);

      // Änderungen durchführen
      testComponent.sideNavItems[0].disabled = true;
      testComponent.sideNavItems[1].disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item button'))[0].nativeElement.disabled).toBe(true);
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item button'))[1].nativeElement.disabled).toBe(true);
    }));

    it('Sollte lux-side-nav-items selektieren', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item-selected')).length).toBe(0);

      // Änderungen durchführen
      testComponent.createSideNavItems(2);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item-selected')).length).toBe(0);

      // Änderungen durchführen
      testComponent.sideNavItems[0].selected = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item-selected')).length).toBe(1);

      // Änderungen durchführen
      testComponent.sideNavItems[1].selected = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('.lux-side-nav-item-selected')).length).toBe(2);
    }));

    it('Sollte onClick aufrufen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(testComponent, 'onClick');
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      testComponent.createSideNavItems(2);
      LuxTestHelper.wait(fixture);

      fixture.debugElement.queryAll(By.css('.lux-side-nav-item button'))[0].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(testComponent.sideNavItems[0]);

      // Änderungen durchführen
      fixture.debugElement.queryAll(By.css('.lux-side-nav-item button'))[1].nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(testComponent.sideNavItems[1]);

      discardPeriodicTasks();
    }));

    it('Sollte das lux-side-nav beim Klick auf ein lux-side-nav-item schließen', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.createSideNavItems(1);
      LuxTestHelper.wait(fixture);
      fixture.debugElement.query(By.css('.lux-side-nav-trigger button')).nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      const sideNavEl = fixture.debugElement.query(By.css('.lux-side-nav')).nativeElement;
      expect(sideNavEl.style.opacity).toEqual('1');
      expect(fixture.debugElement.query(By.css('.lux-side-nav-overlay')).nativeElement.style.display).toEqual('');

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-side-nav-item button')).nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      // Nachbedingungen prüfen
      expect(sideNavEl.style.opacity).toEqual('1');
      expect(fixture.debugElement.query(By.css('.lux-side-nav-overlay')).nativeElement.style.display).toEqual('');

      // Änderungen durchführen
      testComponent.sideNavItems[0].closeOnClick = true;
      LuxTestHelper.wait(fixture);
      fixture.debugElement.query(By.css('.lux-side-nav-item button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(sideNavEl.style.opacity).toEqual('0');
      expect(fixture.debugElement.query(By.css('.lux-side-nav-overlay'))).toBeNull();

      discardPeriodicTasks();
    }));

    it('Sollte bei einem lux-master-detail in Mobilansicht zuerst den Master-Toggle anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-master-toggle'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-side-nav-trigger'))).not.toBeNull();

      // Änderungen durchführen
      testService.isMobileView = true;
      testService.masterIsRegistered.next(true);
      testService.masterHasValue.next(true);
      testService.masterIsOpen.next(false);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-master-toggle'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-side-nav-trigger'))).toBeNull();
    }));

    it('Sollte nach dem Klick auf den master-toggle den side-nav-trigger wieder anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      testService.isMobileView = true;
      testService.masterIsRegistered.next(true);
      testService.masterHasValue.next(true);
      testService.masterIsOpen.next(false);
      LuxTestHelper.wait(fixture);

      expect(fixture.debugElement.query(By.css('.lux-master-toggle'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-side-nav-trigger'))).toBeNull();

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-master-toggle button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-master-toggle'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-side-nav-trigger'))).not.toBeNull();
    }));

    it('Sollte den Dashboard-Link darstellen und öffnen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(window, 'open');

      fixture.debugElement.query(By.css('.lux-side-nav-trigger button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      expect(fixture.debugElement.query(By.css('.lux-side-nav-content lux-link'))).toBeNull();

      // Änderungen durchführen
      testComponent.dashboardTitle = 'Dashboard';
      testComponent.dashboardLink = 'https:///www.ihk-gfi.de';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(
        fixture.debugElement
          .query(By.css('.lux-side-nav-content lux-link .lux-button-label'))
          .nativeElement.textContent.trim()
      ).toEqual('Dashboard');

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-side-nav-content lux-link button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('https:///www.ihk-gfi.de', '_self');

      discardPeriodicTasks();
    }));

    it('Sollte den Dashboard-Link in einem neuen Tab öffnen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(window, 'open');

      testComponent.dashboardTitle = 'Dashboard';
      testComponent.dashboardLink = 'https:///www.ihk-gfi.de';

      LuxTestHelper.wait(fixture);

      expect(
        fixture.debugElement
          .query(By.css('.lux-side-nav-content lux-link .lux-button-label'))
          .nativeElement.textContent.trim()
      ).toEqual('Dashboard');

      fixture.debugElement.query(By.css('.lux-side-nav-content lux-link button')).nativeElement.click();
      LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('https:///www.ihk-gfi.de', '_self');

      // Änderungen durchführen
      testComponent.dashboardBlank = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      fixture.debugElement.query(By.css('.lux-side-nav-content lux-link button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('https:///www.ihk-gfi.de', '_blank');

      discardPeriodicTasks();
    }));

    it('Sollte den Dashboard-Link innerhalb der Applikation routen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(TestBed.inject(Router), 'navigate').and.returnValue(Promise.resolve(true));

      testComponent.dashboardTitle = 'Dashboard';
      testComponent.dashboardLink = '/mock-route';

      LuxTestHelper.wait(fixture);

      expect(
        fixture.debugElement
          .query(By.css('.lux-side-nav-content lux-link .lux-button-label'))
          .nativeElement.textContent.trim()
      ).toEqual('Dashboard');

      fixture.debugElement.query(By.css('.lux-side-nav-content lux-link button')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(['/mock-route']);

      discardPeriodicTasks();
    }));
  });

  describe('mit lux-app-header-right-nav', () => {
    let fixture: ComponentFixture<MockAppHeaderComponent>;
    let testComponent: MockAppHeaderComponent;
    let testService: MockMasterDetailHelperService;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockAppHeaderComponent);
      testComponent = fixture.componentInstance;
      testComponent.testUseRightNav = true;
      LuxTestHelper.wait(fixture);

      overlayHelper = new LuxOverlayHelper();
    }));

    beforeEach(inject([LuxMasterDetailMobileHelperService], (service: MockMasterDetailHelperService) => {
      testService = service;
    }));

    it('Sollte das User-Icon anzeigen', () => {
      expect(testComponent).toBeTruthy();

      testComponent.username = '';
      fixture.detectChanges();

      viewport.set('desktop');
      expect(fixture.debugElement.query(By.css('[luxIconName="fas fa-user"]')).nativeElement.style.display).not.toEqual(
        'none'
      );

      viewport.set('mobile');
      expect(fixture.debugElement.query(By.css('[luxIconName="fas fa-user"]')).nativeElement.style.display).not.toEqual(
        'none'
      );

      viewport.set('desktop');
    });

    it('Sollte erstellt werden', fakeAsync(() => {
      fixture.detectChanges();

      expect(testComponent).toBeTruthy();

      flushMicrotasks();
    }));

    it('Sollte das lux-app-header-menu-right darstellen', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('.lux-header-user'))).not.toBeNull();
    }));

    it('Sollte luxUserName darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-header-username'))).toBeNull();

      // Änderungen durchführen
      testComponent.username = 'Gollum Smeagol';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-header-username')).nativeElement.textContent.trim()).toEqual(
        'Gollum Smeagol'
      );
    }));

    it('Sollte luxUserNameShort korrekt generieren', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-header-user-short > span'))).toBeNull();

      // Änderungen durchführen
      testComponent.username = 'Gollum Smeagol';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-header-user-short > span')).nativeElement.textContent).toEqual(
        'G'
      );
    }));

    it('Sollte das Menu ausklappen und die lux-menu-items darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.createRightNavItems(2);
      LuxTestHelper.wait(fixture);
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item').length).toEqual(0);

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-right-nav-trigger')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item').length).toEqual(2);

      flush();
    }));

    it('Sollte die lux-menu-items korrekt darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.createRightNavItems(2);
      LuxTestHelper.wait(fixture);
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item').length).toEqual(0);

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-right-nav-trigger')).nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item .lux-button-label')[0].textContent.trim()).toEqual(
        'Label 0'
      );
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item .lux-button-label')[1].textContent.trim()).toEqual(
        'Label 1'
      );
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item .fas.fa-check')[0]).not.toBeNull();
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item .fas.fa-check')[1]).not.toBeNull();

      flush();
    }));

    it('Sollte die lux-menu-items deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.createRightNavItems(2);
      LuxTestHelper.wait(fixture);
      expect(overlayHelper.selectAllFromOverlay('.lux-menu-item').length).toEqual(0);

      // Änderungen durchführen
      fixture.debugElement.query(By.css('.lux-right-nav-trigger')).nativeElement.click();
      LuxTestHelper.wait(fixture);
      testComponent.rightNavItems[0].disabled = true;
      testComponent.rightNavItems[1].disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect((overlayHelper.selectAllFromOverlay('.lux-menu-item')[0] as any).disabled).toEqual(true);
      expect((overlayHelper.selectAllFromOverlay('.lux-menu-item')[1] as any).disabled).toEqual(true);

      flush();
    }));
  });

  describe('mit lux-app-header-action-nav', () => {
    let fixture: ComponentFixture<MockAppHeaderComponent>;
    let testComponent: MockAppHeaderComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MockAppHeaderComponent);
      testComponent = fixture.componentInstance;
      testComponent.testUseActionNav = true;
      LuxTestHelper.wait(fixture);
    }));

    it('Sollte erstellt werden', fakeAsync(() => {
      expect(testComponent).toBeTruthy();
    }));

    it('Sollte das lux-app-header-action-nav darstellen', fakeAsync(() => {
      testComponent.createActionNavItems(3);
      LuxTestHelper.wait(fixture);

      expect(fixture.debugElement.query(By.css('.lux-app-header-action-nav'))).not.toBeNull();
    }));

    it('Sollte die MenuItems darstellen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.queryAll(By.css('lux-app-header-action-nav-item')).length).toEqual(0);

      // Änderungen durchführen
      testComponent.createActionNavItems(3);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.queryAll(By.css('lux-app-header-action-nav-item')).length).toEqual(3);
    }));
  });
});

@Component({
  template: `
    <lux-app-header (luxClicked)="onClicked()" luxAppTitle="MyClickTitle" luxAppTitleShort="MyClick"></lux-app-header>
  `
})
class MockLabelClickedAppHeaderComponent {
  onClicked() {}
}

@Component({
  template: `
    <lux-app-header
      (luxClicked)="onClicked()"
      luxImageSrc="/assets/png/example.png"
      luxAppTitle="MyClickTitle"
      luxAppTitleShort="MyClick"
    ></lux-app-header>
  `
})
class MockImageClickedAppHeaderComponent {
  onClicked() {}
}

@Component({
  template: `
    <lux-app-header
      (luxClicked)="onClicked()"
      luxIconName="fa fas-user"
      luxAppTitle="MyClickTitle"
      luxAppTitleShort="MyClick"
    ></lux-app-header>
  `
})
class MockIconClickedAppHeaderComponent {
  onClicked() {}
}

@Component({
  template: `
    <lux-app-header [luxUserName]="username" [luxAppTitle]="title" [luxAppTitleShort]="titleShort">
      <lux-side-nav
        [luxDashboardLink]="dashboardLink"
        [luxDashboardLinkTitle]="dashboardTitle"
        [luxOpenLinkBlank]="dashboardBlank"
        *ngIf="testUseSideNav"
      >
        <lux-side-nav-header>
          <span class="test-side-nav-header">SideNav-Header</span>
        </lux-side-nav-header>
        <ng-container *ngFor="let sideNavItem of sideNavItems" ngProjectAs="lux-side-nav-item">
          <lux-side-nav-item
            [luxDisabled]="sideNavItem.disabled"
            [luxLabel]="sideNavItem.label"
            [luxIconName]="sideNavItem.iconName"
            [luxSelected]="sideNavItem.selected"
            [luxCloseOnClick]="sideNavItem.closeOnClick"
            (luxClicked)="onClick(sideNavItem)"
            *ngIf="!sideNavItem.ignoreThisItem"
          ></lux-side-nav-item>
        </ng-container>
        <lux-side-nav-footer>
          <span class="test-side-nav-footer">SideNav-Footer</span>
        </lux-side-nav-footer>
      </lux-side-nav>
      <lux-app-header-action-nav *ngIf="testUseActionNav">
        <lux-app-header-action-nav-item
          [luxIconName]="actionNavItem.iconName"
          [luxDisabled]="actionNavItem.disabled"
          [luxLabel]="actionNavItem.label"
          (luxClicked)="onClick(actionNavItem)"
          *ngFor="let actionNavItem of actionNavItems"
        >
        </lux-app-header-action-nav-item>
      </lux-app-header-action-nav>
      <lux-app-header-right-nav *ngIf="testUseRightNav">
        <lux-menu-item
          [luxIconName]="rightNavItem.iconName"
          [luxDisabled]="rightNavItem.disabled"
          [luxLabel]="rightNavItem.label"
          (luxClicked)="onClick(rightNavItem)"
          *ngFor="let rightNavItem of rightNavItems"
        ></lux-menu-item>
      </lux-app-header-right-nav>
    </lux-app-header>
  `
})
class MockAppHeaderComponent {
  username: string;
  title: string;
  titleShort: string;

  dashboardLink: string;
  dashboardTitle: string;
  dashboardBlank: boolean;

  testUseSideNav: boolean;
  testUseRightNav: boolean;
  testUseActionNav: boolean;

  sideNavItems = [];
  rightNavItems = [];
  actionNavItems = [];

  createSideNavItems(amount: number) {
    this.sideNavItems = [];

    for (let i = 0; i < amount; i++) {
      this.sideNavItems.push({
        disabled: false,
        label: 'Label ' + i,
        iconName: 'fas fa-check',
        selected: false,
        closeOnClick: false,
        ignoreThisItem: false
      });
    }
  }

  createRightNavItems(amount: number) {
    this.rightNavItems = [];

    for (let i = 0; i < amount; i++) {
      this.rightNavItems.push({
        disabled: false,
        label: 'Label ' + i,
        iconName: 'fas fa-check'
      });
    }
  }

  createActionNavItems(amount: number) {
    this.actionNavItems = [];

    for (let i = 0; i < amount; i++) {
      this.actionNavItems.push({
        disabled: false,
        label: 'Label ' + i,
        iconName: 'fas fa-check'
      });
    }
  }

  onClick(navItem) {}
}

class MockMasterDetailHelperService {
  masterIsOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  masterCollapsedObservable: Observable<boolean> = this.masterIsOpen.asObservable();

  masterIsRegistered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRegisteredObservable: Observable<boolean> = this.masterIsRegistered.asObservable();

  masterHasValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasValueObservable: Observable<boolean> = this.masterHasValue.asObservable();

  isMobileView = false;

  openMaster() {
    this.masterIsOpen.next(true);
  }

  isMobile() {
    return this.isMobileView;
  }
}
