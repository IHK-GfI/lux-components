import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxTestHelper } from '../lux-util/testing/lux-test-helper';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LuxMediaQueryObserverService } from '../lux-util/lux-media-query-observer.service';
import { Subject } from 'rxjs';

describe('LuxTenantLogoComponent', () => {
  let mediaQuerySubject: Subject<string> = new Subject<string>();

  beforeEach(async () => {
    mediaQuerySubject = new Subject<string>();

    LuxTestHelper.configureTestModule([], [LuxTenantLogoComponent]);
    let mediaQueryService = TestBed.get(LuxMediaQueryObserverService);
    spyOn(mediaQueryService, 'getMediaQueryChangedAsObservable').and.returnValue(mediaQuerySubject);
  });

  describe('Logo Image Source Testen', () => {
    let fixture: ComponentFixture<LuxTenantLogoComponent>;
    let testComponent: LuxTenantLogoComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxTenantLogoComponent);
      //Automatische Varianten durch die Media query werden später getestet
      fixture.componentInstance.tenantVariant = 'lang';
      testComponent = fixture.componentInstance;
      fixture.detectChanges();

      mediaQuerySubject.next('lg');
      fixture.detectChanges();
    }));

    it('Tenant Schlüssel setzen', fakeAsync(() => {
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const initialTenantKey = '100';
      const expectedTenantKey = '202';

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantKey).toEqual(initialTenantKey);
      expect(luxImageEl.nativeElement.src).toContain('/assets/ihk-logos/' + initialTenantKey + '_lang.svg');

      /* ___Änderungen durchführen___ */
      fixture.componentInstance.tenantKey = expectedTenantKey;
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */

      //Input Testen
      expect(fixture.debugElement.componentInstance.tenantKey).toEqual(expectedTenantKey);

      //Image Source Testen
      expect(luxImageEl.nativeElement.src).toContain('/assets/ihk-logos/' + expectedTenantKey + '_lang.svg');
    }));

    it('Tenant Variant setzen', fakeAsync(() => {
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const tenantKey = '100';
      const initialTenantVariant = 'lang';
      const expectedTenantVariant = 'kurz';

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantKey).toEqual(tenantKey);
      expect(fixture.componentInstance.tenantVariant).toEqual(initialTenantVariant);
      expect(luxImageEl.nativeElement.src).toContain('/assets/ihk-logos/' + tenantKey + '_' + initialTenantVariant + '.svg');

      /* ___Änderungen durchführen___ */
      fixture.componentInstance.tenantVariant = expectedTenantVariant;
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */

      //Input Testen
      expect(fixture.debugElement.componentInstance.tenantVariant).toEqual(expectedTenantVariant);

      //Image Source Testen
      expect(luxImageEl.nativeElement.src).toContain('/assets/ihk-logos/' + tenantKey + '_' + expectedTenantVariant + '.svg');
    }));
  });

  describe('Aria Label und Logo-Alternative Text Testen', () => {
    let fixture: ComponentFixture<LuxTenantLogoComponent>;
    let testComponent: LuxTenantLogoComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxTenantLogoComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();

      mediaQuerySubject.next('lg');
      fixture.detectChanges();
    }));

    it('Tenant Schlüssel setzen', fakeAsync(() => {
      const tenantLogoEl = fixture.debugElement.query(By.css('.lux-tenant-logo'));
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const initialTenantKey = '100';
      const expectedTenantKey = '202';

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantKey).toEqual(initialTenantKey);
      expect(tenantLogoEl.nativeElement.ariaLabel).toEqual('Logo ' + initialTenantKey);
      expect(luxImageEl.nativeElement.alt).toEqual('Logo ' + initialTenantKey);

      /* ___Änderungen durchführen___ */
      fixture.componentInstance.tenantKey = expectedTenantKey;
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */
      expect(tenantLogoEl.nativeElement.ariaLabel).toEqual('Logo ' + expectedTenantKey);
      expect(luxImageEl.nativeElement.alt).toEqual('Logo ' + expectedTenantKey);
    }));
  });

  describe('Tenant Logo Automatische Höhe Testen', () => {
    let fixture: ComponentFixture<LuxTenantLogoComponent>;
    let testComponent: LuxTenantLogoComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxTenantLogoComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();

      mediaQuerySubject.next('lg');
      fixture.detectChanges();
    }));

    it('Tenant Logo Höhe selber setzen', fakeAsync(() => {
      const tenantLogoEl = fixture.debugElement.query(By.css('lux-tenant-logo'));
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const initialHeight = '60px';
      const expectedHeight = '100rem';
      testComponent.tenantHeight = initialHeight;
      fixture.detectChanges();

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantHeight).toEqual(initialHeight);
      expect(tenantLogoEl.componentInstance.actualLuxTenantLogoHeight).toEqual(initialHeight);
      expect(luxImageEl.nativeElement.style.height).toEqual(initialHeight);

      /* ___Änderungen durchführen___ */
      fixture.componentInstance.tenantHeight = expectedHeight;
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */
      expect(fixture.componentInstance.tenantHeight).toEqual(expectedHeight);
      expect(tenantLogoEl.componentInstance.actualLuxTenantLogoHeight).toEqual(expectedHeight);
      expect(luxImageEl.nativeElement.style.height).toEqual(expectedHeight);
    }));

    it('Tenant Logo Höhe automatisch setzen lassen', fakeAsync(() => {
      const tenantLogoEl = fixture.debugElement.query(By.css('lux-tenant-logo'));
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const initialComputedHeight = '40px';
      const expectedComputedHeight = '32px';
      testComponent.tenantHeight = '';
      fixture.detectChanges();

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantHeight).toEqual('');
      expect(tenantLogoEl.componentInstance.actualLuxTenantLogoHeight).toEqual(initialComputedHeight);
      expect(luxImageEl.nativeElement.style.height).toEqual(initialComputedHeight);

      /* ___Änderungen durchführen___ */
      mediaQuerySubject.next('sm');
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */
      expect(fixture.componentInstance.tenantHeight).toEqual('');
      expect(tenantLogoEl.componentInstance.actualLuxTenantLogoHeight).toEqual(expectedComputedHeight);
      expect(luxImageEl.nativeElement.style.height).toEqual(expectedComputedHeight);
    }));
  });

  describe('Tenant Logo Automatischer Variant Testen', () => {
    let fixture: ComponentFixture<LuxTenantLogoComponent>;
    let testComponent: LuxTenantLogoComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxTenantLogoComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();

      mediaQuerySubject.next('lg');
      fixture.detectChanges();
    }));

    it('Tenant Logo Variant selber setzen', fakeAsync(() => {
      const tenantLogoEl = fixture.debugElement.query(By.css('lux-tenant-logo'));
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const initialVariant = 'lang';
      const expectedVariant = 'unten';
      testComponent.tenantVariant = initialVariant;
      fixture.detectChanges();

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantVariant).toEqual(initialVariant);
      expect(tenantLogoEl.componentInstance.luxTenantVariant).toEqual(initialVariant);
      expect(luxImageEl.nativeElement.src).toContain('/assets/ihk-logos/' + testComponent.tenantKey + '_' + initialVariant + '.svg');

      /* ___Änderungen durchführen___ */
      fixture.componentInstance.tenantVariant = expectedVariant;
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */
      expect(fixture.componentInstance.tenantVariant).toEqual(expectedVariant);
      expect(tenantLogoEl.componentInstance.luxTenantVariant).toEqual(expectedVariant);
      expect(luxImageEl.nativeElement.src).toContain('/assets/ihk-logos/' + testComponent.tenantKey + '_' + expectedVariant + '.svg');
    }));

    it('Tenant Logo Variant automatisch setzen lassen', fakeAsync(() => {
      const tenantLogoEl = fixture.debugElement.query(By.css('lux-tenant-logo'));
      const luxImageEl = fixture.debugElement.query(By.css('.lux-image'));
      const initialComputedVariant = 'lang';
      const expectedComputedVariant = 'kurz';
      testComponent.tenantVariant = '';
      fixture.detectChanges();

      /* ___Vorbedingungen testen___ */
      expect(fixture.componentInstance.tenantVariant).toEqual('');
      expect(tenantLogoEl.componentInstance.luxTenantVariant).toEqual('');
      expect(luxImageEl.nativeElement.src).toContain(
        '/assets/ihk-logos/' + testComponent.tenantKey + '_' + initialComputedVariant + '.svg'
      );

      /* ___Änderungen durchführen___ */
      mediaQuerySubject.next('sm');
      fixture.detectChanges();

      /* ___Nachbedingungen testen___ */
      expect(fixture.componentInstance.tenantVariant).toEqual('');
      expect(tenantLogoEl.componentInstance.luxTenantVariant).toEqual('');
      expect(luxImageEl.nativeElement.src).toContain(
        '/assets/ihk-logos/' + testComponent.tenantKey + '_' + expectedComputedVariant + '.svg'
      );
    }));
  });
});

@Component({
  template: `
    <lux-tenant-logo [luxTenantKey]="tenantKey" [luxTenantVariant]="tenantVariant" [luxTenantLogoHeight]="tenantHeight"></lux-tenant-logo>
  `
})
class LuxTenantLogoComponent {
  tenantKey = '100';
  tenantVariant = '';
  tenantHeight = '60px';
}
