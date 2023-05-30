/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxHttpErrorInterceptor } from './lux-http-error-interceptor';
import { LuxHttpErrorComponent } from './lux-http-error.component';

describe('LuxHttpErrorComponent', () => {
  let component: LuxMockHttpErrorComponent;
  let fixture: ComponentFixture<LuxMockHttpErrorComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let subscription: Subscription;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxMockHttpErrorComponent]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMockHttpErrorComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.get(HttpClient);
    httpController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (subscription) {
      subscription.unsubscribe();
    }

    httpController.verify();
  });

  it('Sollte Fehler aus der Property "errors" anzeigen', fakeAsync(() => {
    // Jeder Request setzt den LuxHttpErrorInterceptor.dataStream$() auf ein leeres Array zurück.
    // Das folgende If stellt sicher, dass nur der Fehlerfall überprüft wird.
    subscription = LuxHttpErrorInterceptor.dataStream$()
      .pipe(skip(1))
      .subscribe((errors) => {
        if (Array.isArray(errors) && errors.length > 0) {
          expect(errors).toEqual(data_errors.errors);

          LuxTestHelper.wait(fixture);
          const messageTexte = fixture.debugElement.queryAll(By.css('.lux-message-text'));
          expect(messageTexte.length).toEqual(data_errors.errors.length);

          for (let i = 0; i < messageTexte.length; i++) {
            expect(messageTexte[i].nativeElement.textContent).toBe(data_errors.errors[i].message);
          }
        }
      });

    // Hier wird die Anzahl der gleichzeitig angezeigten Meldungen auf 4 erhöht,
    // damit alle Meldungen mit einer queryAll-Abfrage eingesammelt werden können.
    component.errorComponent.messageComponent.luxMaximumDisplayed = 4;
    LuxTestHelper.wait(fixture);

    httpClient.get<any>('abc').subscribe({ next: () => {}, error: () => {} });
    httpController
      .expectOne((req: HttpRequest<any>) => req.url.includes('abc'))
      .flush(data_errors, { status: 400, statusText: 'Constraint Violation' });

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte Fehler aus der Property "violations" anzeigen', fakeAsync(() => {
    subscription = LuxHttpErrorInterceptor.dataStream$()
      .pipe(skip(1))
      .subscribe((errors) => {
        // Jeder Request setzt den LuxHttpErrorInterceptor.dataStream$() auf ein leeres Array zurück.
        // Das folgende If stellt sicher, dass nur der Fehlerfall überprüft wird.
        if (Array.isArray(errors) && errors.length > 0) {
          expect(errors).toEqual(data_violations.violations);

          LuxTestHelper.wait(fixture);
          const messageTexte = fixture.debugElement.queryAll(By.css('.lux-message-text'));
          expect(messageTexte.length).toEqual(data_violations.violations.length);

          for (let i = 0; i < messageTexte.length; i++) {
            expect(messageTexte[i].nativeElement.textContent).toBe(data_violations.violations[i].message);
          }
        }
      });

    // Hier wird die Anzahl der gleichzeitig angezeigten Meldungen auf 4 erhöht,
    // damit alle Meldungen mit einer queryAll-Abfrage eingesammelt werden können.
    component.errorComponent.messageComponent.luxMaximumDisplayed = 4;
    LuxTestHelper.wait(fixture);

    httpClient.get<any>('abc').subscribe({ next: () => {}, error: () => {} });
    httpController
      .expectOne((req: HttpRequest<any>) => req.url.includes('abc'))
      .flush(data_violations, { status: 400, statusText: 'Constraint Violation' });

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte die Fehler (aus Strings) anzeigen', fakeAsync(() => {
    // Vorbedingungen testen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon lux-icon[ng-reflect-lux-icon-name=lux-programming-bug]'));

    expect(messageContainer).toBeNull();
    expect(messageText).toBeNull();
    expect(messageIcon).toBeNull();

    // Änderungen durchführen
    LuxHttpErrorInterceptor.dataStream.next(['Error 0', 'Error 1', 'Error 2']);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon lux-icon[ng-reflect-lux-icon-name=lux-programming-bug]'));

    expect(messageContainer).not.toBeNull();
    expect(messageText.nativeElement.textContent).toBe('Error 0');
    expect(messageIcon.nativeElement).toBeDefined();
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white');

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte die Fehler (aus Objekten mit .message) anzeigen', fakeAsync(() => {
    // Vorbedingungen testen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon lux-icon[ng-reflect-lux-icon-name=lux-programming-bug]'));

    expect(messageContainer).toBeNull();
    expect(messageText).toBeNull();
    expect(messageIcon).toBeNull();

    // Änderungen durchführen
    LuxHttpErrorInterceptor.dataStream.next([
      { status: '404', message: 'Error 404' },
      { status: '403', message: 'Error 403' },
      { status: '401', message: 'Error 402' }
    ]);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon lux-icon[ng-reflect-lux-icon-name=lux-programming-bug]'));

    expect(messageContainer).not.toBeNull();
    expect(messageText.nativeElement.textContent).toBe('Error 404');
    expect(messageIcon.nativeElement).toBeDefined();
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white');

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte die Fehler (aus Objekten mit .toString()) anzeigen', fakeAsync(() => {
    // Vorbedingungen testen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon lux-icon[ng-reflect-lux-icon-name=lux-programming-bug]'));

    expect(messageContainer).toBeNull();
    expect(messageText).toBeNull();
    expect(messageIcon).toBeNull();

    // Änderungen durchführen
    LuxHttpErrorInterceptor.dataStream.next([
      { status: '404', toString: () => '404' },
      { status: '403', toString: () => '403' },
      { status: '401', toString: () => '401' }
    ]);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon lux-icon[ng-reflect-lux-icon-name=lux-programming-bug]'));

    expect(messageContainer).not.toBeNull();
    expect(messageText.nativeElement.textContent).toBe('404');
    expect(messageIcon.nativeElement).toBeDefined();
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white');

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte durch die Fehler navigieren können', fakeAsync(() => {
    // Vorbedingungen testen
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText).toBeNull();

    // Änderungen durchführen
    LuxHttpErrorInterceptor.dataStream.next([
      { status: '404', toString: () => '404' },
      { status: '403', toString: () => '403' },
      { status: '401', toString: () => '401' }
    ]);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    const paginatorPrev = fixture.debugElement.query(By.css('.mat-paginator-navigation-previous'));
    const paginatorNext = fixture.debugElement.query(By.css('.mat-paginator-navigation-next'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('404');

    // Änderungen durchführen
    paginatorNext.nativeElement.click();
    fixture.autoDetectChanges();

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('403');

    // Änderungen durchführen
    paginatorNext.nativeElement.click();
    fixture.autoDetectChanges();

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('401');

    // Änderungen durchführen
    paginatorPrev.nativeElement.click();
    fixture.autoDetectChanges();

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('403');

    handleIconRequests(httpController, fixture);
  }));
});

@Component({
  selector: 'lux-mock-http-error',
  template: '<lux-http-error></lux-http-error>'
})
class LuxMockHttpErrorComponent {
  @ViewChild(LuxHttpErrorComponent) errorComponent!: LuxHttpErrorComponent;

  constructor() {}
}

export class TestService {
  constructor(private http: HttpClient) {}
}

const data_errors = {
  status: 400,
  errors: [
    {
      name: 'evaOid',
      message: 'Die Objekt-ID muss größer/gleich 1 sein.'
    },
    {
      name: 'ident',
      message: 'Die Ident-Nr. muss größer/gleich 1 sein.'
    },
    {
      name: 'nachname',
      message: 'Der Nachname darf nicht leer sein.'
    },
    {
      name: 'vorname',
      message: 'Der Vorname darf nicht leer sein.'
    }
  ]
};

const data_violations = {
  title: 'Constraint Violation',
  status: 400,
  violations: [
    {
      field: 'evaOid',
      message: 'Die Objekt-ID muss größer/gleich 1 sein.'
    },
    {
      field: 'ident',
      message: 'Die Ident-Nr. muss größer/gleich 1 sein.'
    },
    {
      field: 'nachname',
      message: 'Der Nachname darf nicht leer sein.'
    },
    {
      field: 'vorname',
      message: 'Der Vorname darf nicht leer sein.'
    }
  ]
};

const svg_icon = `<?xml version="1.0"?>
<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="-0.952 -0.602 511 454"></svg>
`;

/**
 *
 * @param httpTestingController
 * @param fixture
 */
function handleIconRequests(httpTestingController: HttpTestingController, fixture: ComponentFixture<LuxMockHttpErrorComponent>) {
  httpTestingController
    .match((req: HttpRequest<any>) => req.url.includes('assets/icons/'))
    .forEach((request) => {
      if (!request.cancelled) {
        request.flush(svg_icon);
        LuxTestHelper.wait(fixture);
      }
    });
  flush();
}
