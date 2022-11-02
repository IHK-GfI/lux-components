import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { LuxTestHelper } from '../../../../lux-util/testing/lux-test-helper';

import { LuxLangSelectAcComponent } from './lux-lang-select-ac.component';

describe('LuxLangSelectAcComponent', () => {
  let component: LuxLangSelectAcComponent;
  let fixture: ComponentFixture<LuxLangSelectAcComponent>;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([{ provide: CookieService, useClass: MockCookieService }]);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    expect(component).toBeTruthy();
  });

  it('should set default locale de (not set)', inject([CookieService], (cookieService: MockCookieService) => {
    cookieService.locale = undefined;
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[0]);
  }));

  it('should set default locale de (unsupported locale)', inject([CookieService], (cookieService: MockCookieService) => {
    cookieService.locale = 'no';
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[0]);
  }));

  it('should generate url (de - root)', inject([CookieService], (cookieService: MockCookieService) => {
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[0]);

    const urlDeEn = component.generateNewUrl(component.allSupportedLocaleArr[0], 'http://localhost:4200', 'http://localhost:4200');
    expect(urlDeEn).toEqual('http://localhost:4200/');
  }));

  it('should generate url (de -> en)', inject([CookieService], (cookieService: MockCookieService) => {
    cookieService.locale = 'de';
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[0]);

    const urlDeEn = component.generateNewUrl(
      component.allSupportedLocaleArr[1],
      'http://localhost:4200/information',
      'http://localhost:4200'
    );
    expect(urlDeEn).toEqual('http://localhost:4200/en/information');
  }));

  it('should generate url (de -> en - with BaseHref)', inject([CookieService], (cookieService: MockCookieService) => {
    cookieService.locale = 'de';
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    component.luxLocaleBaseHref = '/webcomponent/';
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[0]);

    const urlDeEn = component.generateNewUrl(
      component.allSupportedLocaleArr[1],
      'http://localhost:4200/webcomponent/information',
      'http://localhost:4200'
    );
    expect(urlDeEn).toEqual('http://localhost:4200/webcomponent/en/information');
  }));

  it('should generate url (en -> de)', inject([CookieService], (cookieService: MockCookieService) => {
    cookieService.locale = 'en';
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[1]);

    const urlEnDe = component.generateNewUrl(
      component.allSupportedLocaleArr[0],
      'http://localhost:4200/en/information',
      'http://localhost:4200'
    );
    expect(urlEnDe).toEqual('http://localhost:4200/information');
  }));

  it('should generate url (en -> de - with BaseHref)', inject([CookieService], (cookieService: MockCookieService) => {
    cookieService.locale = 'en';
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    component.luxLocaleSupported = ['de', 'en'];
    component.luxLocaleBaseHref = '/webcomponent/test/';
    fixture.detectChanges();
    expect(component.selectedLocale).toEqual(component.allSupportedLocaleArr[1]);

    const urlEnDe = component.generateNewUrl(
      component.allSupportedLocaleArr[0],
      'http://localhost:4200/webcomponent/test/en/information',
      'http://localhost:4200'
    );
    expect(urlEnDe).toEqual('http://localhost:4200/webcomponent/test/information');
  }));
});

class MockCookieService {
  locale: string | undefined = 'de';

  get(name: string) {
    return this.locale;
  }

  set(name: string, value: string) {
    this.locale = value;
  }
}
