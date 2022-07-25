/* eslint-disable max-classes-per-file */
import { HttpClient, HttpRequest } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, flush, TestBed } from "@angular/core/testing";

import { Component, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { skip } from "rxjs/operators";
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { LuxHttpErrorInterceptor } from './lux-http-error-interceptor';
import { LuxHttpErrorComponent } from "./lux-http-error.component";

describe('LuxHttpErrorComponent', () => {

  let component: LuxMockHttpErrorComponent;
  let fixture: ComponentFixture<LuxMockHttpErrorComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let subscription: Subscription;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([],[LuxMockHttpErrorComponent],[HttpClientTestingModule]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMockHttpErrorComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (subscription) {
      subscription.unsubscribe();
    }

    httpTestingController.verify();
  });

  it('Sollte erzeugt werden', () => {
    expect(component).toBeTruthy();
  });

  it('Sollte Fehler aus der Property "errors" anzeigen', fakeAsync(() => {
    // Jeder Request setzt den LuxHttpErrorInterceptor.dataStream$() auf ein leeres Array zurück.
    // Das folgende If stellt sicher, dass nur der Fehlerfall überprüft wird.
    subscription = LuxHttpErrorInterceptor.dataStream$().pipe(skip(1)).subscribe((errors) => {
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

    httpClient.get<any>('abc').subscribe({ next: () => {}, error: () => {}});

    const request = httpTestingController.expectOne(
      (req: HttpRequest<any>) => req.url.includes('abc'));

    request.flush(data_errors, { status: 400, statusText: 'Constraint Violation' });
    flush();
  }));

  it('Sollte Fehler aus der Property "violations" anzeigen', fakeAsync(() => {
    subscription = LuxHttpErrorInterceptor.dataStream$().pipe(skip(1)).subscribe((errors) => {
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

    httpClient.get<any>('abc').subscribe({ next: () => {}, error: () => {}});

    const request = httpTestingController.expectOne(
      (req: HttpRequest<any>) => req.url.includes('abc'));

    request.flush(data_violations, { status: 400, statusText: 'Constraint Violation' });
    flush();
  }));

  it('Sollte die Fehler (aus Strings) anzeigen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).toBe(null, 'Vorbedingung 1');
    expect(messageText).toBe(null, 'Vorbedingung 1');
    expect(messageIcon).toBe(null, 'Vorbedingung 1');

    // Änderungen durchführen
    LuxHttpErrorInterceptor.dataStream.next(['Error 0', 'Error 1', 'Error 2']);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).not.toBe(null, 'Nachbedingung 1');
    expect(messageText.nativeElement.textContent).toBe('Error 0', 'Nachbedingung 2');
    expect(messageIcon.nativeElement.className).toContain('fa-bug', 'Nachbedingung 3');
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red', 'Nachbedingung 4');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white', 'Nachbedingung 5');

    LuxTestHelper.wait(fixture);
    flush();
  }));

  it('Sollte die Fehler (aus Objekten mit .message) anzeigen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).toBe(null, 'Vorbedingung 1');
    expect(messageText).toBe(null, 'Vorbedingung 1');
    expect(messageIcon).toBe(null, 'Vorbedingung 1');

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
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).not.toBe(null, 'Nachbedingung 1');
    expect(messageText.nativeElement.textContent).toBe('Error 404', 'Nachbedingung 2');
    expect(messageIcon.nativeElement.className).toContain('fa-bug', 'Nachbedingung 3');
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red', 'Nachbedingung 4');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white', 'Nachbedingung 5');

    LuxTestHelper.wait(fixture);
    flush();
  }));

  it('Sollte die Fehler (aus Objekten mit .toString()) anzeigen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).toBe(null, 'Vorbedingung 1');
    expect(messageText).toBe(null, 'Vorbedingung 1');
    expect(messageIcon).toBe(null, 'Vorbedingung 1');

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
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).not.toBe(null, 'Nachbedingung 1');
    expect(messageText.nativeElement.textContent).toBe('404', 'Nachbedingung 2');
    expect(messageIcon.nativeElement.className).toContain('fa-bug', 'Nachbedingung 3');
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red', 'Nachbedingung 4');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white', 'Nachbedingung 5');

    LuxTestHelper.wait(fixture);
    flush();
  }));

  it('Sollte durch die Fehler navigieren können', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText).toBe(null, 'Vorbedingung 1');

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
    expect(messageText.nativeElement.textContent).toBe('404', 'Nachbedingung 1');

    // Änderungen durchführen
    paginatorNext.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('403', 'Nachbedingung 2');

    // Änderungen durchführen
    paginatorNext.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('401', 'Nachbedingung 3');

    // Änderungen durchführen
    paginatorPrev.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    expect(messageText.nativeElement.textContent).toBe('403', 'Nachbedingung 4');

    LuxTestHelper.wait(fixture);
    flush();
  }));
});

@Component({
  selector: 'lux-mock-http-error',
  template: '<lux-http-error></lux-http-error>'
})
class LuxMockHttpErrorComponent {
  @ViewChild(LuxHttpErrorComponent) errorComponent;

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
  'title': 'Constraint Violation',
  'status': 400,
  'violations': [
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
