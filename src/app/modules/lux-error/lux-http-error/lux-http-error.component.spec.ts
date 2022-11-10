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
    LuxTestHelper.configureTestModule([],[LuxMockHttpErrorComponent]);
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

    httpClient.get<any>('abc').subscribe({ next: () => {}, error: () => {} });
    httpController
      .expectOne((req: HttpRequest<any>) => req.url.includes('abc'))
      .flush(data_errors, { status: 400, statusText: 'Constraint Violation' });

    handleIconRequests(httpController, fixture);
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
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).toBeNull();
    expect(messageText).toBeNull();
    expect(messageIcon).toBeNull();

    // Änderungen durchführen
    LuxHttpErrorInterceptor.dataStream.next(['Error 0', 'Error 1', 'Error 2']);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).not.toBeNull();
    expect(messageText.nativeElement.textContent).toBe('Error 0');
    expect(messageIcon.nativeElement.className).toContain('fa-bug');
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white');

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte die Fehler (aus Objekten mit .message) anzeigen', fakeAsync(() => {
    // Vorbedingungen testen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

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
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).not.toBeNull();
    expect(messageText.nativeElement.textContent).toBe('Error 404');
    expect(messageIcon.nativeElement.className).toContain('fa-bug');
    expect(messageContainer.nativeElement.className).toContain('lux-bg-color-red');
    expect(messageContainer.nativeElement.className).toContain('lux-font-color-white');

    handleIconRequests(httpController, fixture);
  }));

  it('Sollte die Fehler (aus Objekten mit .toString()) anzeigen', fakeAsync(() => {
    // Vorbedingungen testen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

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
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon i'));

    expect(messageContainer).not.toBeNull();
    expect(messageText.nativeElement.textContent).toBe('404');
    expect(messageIcon.nativeElement.className).toContain('fa-bug');
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

const svg_icon = `<?xml version="1.0"?>
<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="-0.952 -0.602 511 454">
\t\t<path d="m41.112 452.57c-22.68 0-41.112-18.5-41.112-41.18 0-7.272 1.872-14.4 5.472-20.592l213.84-370.22c15.84-27.432 55.368-27.432 71.208 0l213.77 370.22c3.672 6.264 5.544 13.392 5.544 20.592 0 22.68-18.432 41.112-41.112 41.184h-427.61z" fill="#ED171F"/>
\t\t<polygon points="52.056 405.13 457.63 405.13 254.81 53.838" fill="#FEB82F"/>
\t\t<path d="m356.83 314.98c-0.144-0.72-0.144-1.512-0.072-2.232v-1.368s0-0.936 0-1.368c-0.072-0.864 0-1.728 0.144-2.592 0.432-2.304 0.72-4.464 0.864-6.696 0.144-1.584 0.216-3.168 0.288-4.752l0.144-2.448 0.432-3.384 0.432-4.32c0.072-0.288 0.072-0.576 0.072-0.792 0-0.288 0-0.576-0.072-0.792l-0.432-4.176c0.432 1.944 0.864 3.888 1.08 5.832l1.08 7.056 0.072 0.936 0.216 2.016 0.144 1.512v2.304l-0.072 2.016 0.216 3.456 0.216 4.32 0.216 3.24-0.072 5.472-0.144 1.944-0.144 1.728-0.36 2.16c0 0.432 0.072 0.936 0.072 1.368 0 0.576-0.072 1.224-0.072 1.872v0.216c0 0.432 0.072 0.864 0.144 1.224 0.288 0.792 0.432 1.584 0.504 2.448 0.144 0.864 0.216 1.728 0.432 2.592s0.36 1.728 0.36 2.664l0.072 1.8c0 0.36 0.216 0.72 0.504 0.864 0.432 0.288 1.008 0.504 1.584 0.504 0.072 0 0.144 0.072 0.216 0.072 0.432 0 0.792-0.144 1.152-0.288 0.72-0.216 1.08-0.864 1.08-1.584v-3.6c0-1.584-0.144-3.168-0.432-4.752-0.216-1.296-0.216-2.664-0.072-4.032 0.072-0.36 0.144-0.792 0.288-1.224 0.072-0.432 0.072-0.864 0.072-1.368 0-0.36-0.072-0.72-0.288-0.936-0.432-0.576-0.72-1.08-0.936-1.728-0.36-0.792-0.648-1.584-0.864-2.448-0.216-0.648-0.36-1.368-0.288-2.088 0.072-1.152 0.072-2.304 0.072-3.456v-0.072c0-1.512 0.144-3.024 0.36-4.536 0.216-1.296 0.36-2.664 0.36-4.032v-9.072l0.144-11.52-0.144-5.112c-0.072-0.864-0.072-1.728-0.144-2.592-0.072-2.808-0.576-5.472-1.512-8.064-0.936-2.52-2.232-4.752-4.032-6.768-1.656-1.8-3.456-3.456-5.472-4.896-1.296-0.936-2.664-1.728-4.104-2.304-2.088-0.864-4.32-1.656-6.552-2.232-1.512-0.432-3.024-0.648-4.608-0.72-1.08-0.072-2.448-0.072-3.744-0.144h-1.512c-2.16 0-4.248 0.144-6.336 0.504-1.008 0.216-1.944 0.36-2.952 0.504-1.44 0.216-2.808 0.36-4.176 0.504-3.384 0.36-6.84 0.648-10.296 0.864-6.048 0.288-12.672 0.864-19.368 1.512-2.808 0.36-5.112 0.576-7.416 0.72-0.576 0.072-1.584 0.144-2.52 0.216-1.08 0.072-1.872 0.072-2.664-0.072-0.648-0.072-1.296-0.144-2.016-0.216-2.448-0.36-4.824-0.504-7.2-0.504-6.336 0-12.744-0.432-19.08-1.368-6.984-1.008-13.824-1.584-20.808-1.584h-0.648c-1.8 0-3.6 0-5.328 0.144-1.872 0.144-3.888 0.36-5.904 0.576-1.8 0.216-3.744 0.36-5.76 0.504-2.52 0.216-4.824 0.288-7.128 0.216-1.656-0.072-3.312-0.216-5.04-0.36-1.872-0.144-3.744-0.504-5.616-1.008-2.232-0.576-4.464-1.296-6.624-2.232-0.864-0.288-1.656-0.72-2.448-1.152l-1.296-0.792 0.576-1.368c0.216-0.216 0.288-0.504 0.288-0.864v-0.216c-0.144-0.576-0.432-1.008-1.008-1.224-0.648-0.216-1.368-0.504-2.16-0.72-0.504-0.216-1.08-0.432-1.584-0.648-0.72-0.36-1.512-0.648-2.304-0.792s-1.512-0.576-2.016-1.224l-2.88-3.528c-0.144-0.144-0.288-0.216-0.432-0.288h-0.216c-0.216 0-0.36 0.144-0.504 0.36-0.072 0.216-0.072 0.432-0.072 0.648s0 0.432 0.072 0.576l0.36 0.864 0.72 1.944 0.864 2.304h-0.072c-1.224 0.072-2.304 0.36-3.312 0.864-0.504 0.288-1.296 0.72-2.016 1.152-1.008 0.504-1.584 1.008-2.088 1.656-0.216 0.216-0.432 0.432-0.72 0.576-0.36 0.216-0.792 0.288-1.224 0.144-0.648-0.144-1.296-0.576-1.728-1.152l-3.168-4.104c-0.216-0.216-0.432-0.36-0.72-0.36-0.072-0.072-0.144-0.072-0.144-0.072-0.288 0-0.504 0.144-0.648 0.36-0.144 0.288-0.216 0.576-0.216 0.864 0 0.144 0 0.36 0.072 0.576l0.504 1.152 0.936 2.304 0.72 1.44 0.792 1.08 0.576 0.864 1.224 2.088c0.072 0.144 0.144 0.288 0.144 0.432 0 0.216-0.072 0.36-0.216 0.504-0.504 0.648-1.08 1.296-1.728 1.944-0.504 0.504-1.152 0.864-1.8 1.008-0.792 0.216-1.44 0.864-1.656 1.656-0.216 0.72-0.432 1.512-0.504 2.232-0.144 1.224-0.72 2.304-1.512 3.168-0.648 0.576-1.152 1.224-1.584 1.944-0.72 1.08-1.44 2.16-2.304 3.168-0.648 0.792-1.152 1.728-1.584 2.592-0.432 1.08-1.008 2.088-1.8 2.88l-4.536 4.896c-0.072 0.36-0.144 0.72-0.144 1.08 0 0.288 0 0.504 0.072 0.72 0.144 1.008 0.432 2.016 0.72 2.952 0.288 0.792 0.72 1.44 1.224 2.088 0.504 0.576 1.008 1.152 1.656 1.656s1.44 0.936 2.232 1.224c0.36 0.072 0.72 0.144 1.08 0.144 0.576 0 1.152-0.144 1.656-0.432s1.008-0.432 1.584-0.576c0.792-0.216 1.656-0.216 2.52-0.072 1.224 0.216 2.304 0.432 3.312 0.648-0.36-0.072 0.216-0.072 0.792-0.072s1.224-0.072 1.872-0.144c1.08-0.288 2.16-0.504 3.168-0.648 0.576-0.144 1.512-0.432 2.376-0.792 0.648-0.288 1.368-0.288 2.088-0.072 0.792 0.288 1.584 0.648 2.376 1.08 1.8 1.008 3.744 1.656 5.76 2.016 0.72 0.144 1.44 0.288 2.088 0.432 0.936 0.144 2.088 0.288 3.168 0.288 0.792 0.072 1.584 0.216 2.376 0.576 1.44 0.72 2.736 1.8 3.672 3.168 1.224 1.8 2.304 3.672 3.24 5.688 0.72 1.512 1.584 3.096 2.448 4.608 0.648 1.08 1.224 2.376 1.728 3.672 0.72 1.8 1.44 3.384 2.232 5.04 0.504 1.152 1.008 2.304 1.44 3.528 0.144 0.36 0.36 0.72 0.576 1.008 2.016 2.736 4.752 4.752 7.92 5.76l1.944 0.648-2.016 1.8-4.104 3.672-2.16 2.088-1.728 1.872c-0.504 0.792-1.008 1.656-1.656 2.448-0.504 0.792-0.936 1.44-1.224 2.16-0.288 0.648-0.432 1.296-0.432 2.016 0 0.288 0.072 0.576 0.072 0.864 0.216 1.08 0.648 2.088 1.152 3.024l1.08 1.8 1.296 1.728 3.888 3.672 1.728 1.728 1.584 1.656 0.864 1.08 2.592 3.24 4.536 4.824 2.376 2.232 1.872 1.44 1.512 1.008 1.08 0.504 0.576 0.072c0.648 1.656 1.728 3.168 3.024 4.32 0.504 0.504 1.152 0.864 1.872 1.008 0.648 0.144 1.224 0.288 1.872 0.432h0.432c0.288 0 0.504 0 0.792-0.072l0.432-0.144-3.384-11.592c-0.144-0.432-0.432-0.792-0.936-0.864l-3.096-0.72c-0.288-0.144-0.432-0.432-0.36-0.648l0.648-1.944c0.072-0.144 0.144-0.432 0.144-0.648 0-0.648-0.36-1.224-0.936-1.512-0.504-0.288-1.08-0.504-1.656-0.72-0.792-0.144-1.512-0.576-2.16-1.008-0.864-0.648-1.728-1.296-2.592-2.016-1.152-0.936-2.16-2.16-2.88-3.456-0.648-1.224-1.296-2.448-2.016-3.6-0.648-1.152-0.936-2.16-1.08-3.24-0.144-1.152 0.144-2.304 0.864-3.312s1.728-1.872 2.808-2.376c1.368-0.648 2.736-1.296 4.104-1.944 1.224-0.576 2.448-1.152 3.744-1.656 1.224-0.432 2.304-1.08 3.384-1.8 0.72-0.576 1.44-1.008 2.232-1.44 1.584-1.008 2.808-2.304 3.744-3.96l0.432-0.792 1.8 3.672 0.72 1.584 0.576 1.224 1.152 1.656 1.44 2.088 2.16 3.096 1.8 2.88 1.944 3.168 0.936 1.512 2.736 4.824 1.08 2.088 1.368 2.736 0.72 1.656 0.504 1.512c0.36 0.792 0.576 1.584 0.72 2.448 0.072 0.648 0.216 1.296 0.36 2.016 0 0.288 0.072 0.576 0.072 0.864 0 1.008-0.36 1.944-1.08 2.664l-2.304 2.592-0.36 0.576c-2.232 0.576-3.888 2.448-4.248 4.752l-0.072 0.504h12.312c1.008-1.08 1.584-2.448 1.584-3.888 0-0.864-0.216-1.728-0.576-2.52l-0.36-0.648c-0.072-0.288 0.072-0.504 0.288-0.504h1.44c0.936-0.144 1.512-0.936 1.512-1.8 0-0.144 0-0.216-0.072-0.36l-0.576-2.88-1.008-3.528-1.152-4.248-1.152-3.96-0.72-2.88-0.648-2.664-0.432-1.728-0.432-1.728-0.288-1.584-0.36-1.656-0.288-1.224-0.792-3.024c-0.432-1.368-0.936-2.808-1.296-4.176-0.576-2.088-1.368-4.176-2.376-6.048l-0.648-1.224 5.616-0.144h1.224c1.584 0 3.312 0 4.968-0.144 2.664-0.144 5.472 0.072 8.208 0.72 3.888 0.792 7.776 1.224 11.736 1.296 0.432 0.072 0.792 0.072 1.224 0.072 4.32 0 8.568-0.432 12.744-1.296 2.952-0.576 5.112-1.008 7.272-1.44l0.432-0.072c1.584 1.296 3.313 2.448 5.184 3.312l0.216 0.144-1.008 5.688c0.072 1.152 1.008 2.088 2.16 2.088 0.936 0 1.8-0.504 2.088-1.368l1.8-4.752 2.664 0.576-0.648 4.68v0.432c0 0.432 0.072 0.864 0.288 1.224 0.36 0.576 0.864 0.864 1.512 0.936h0.288c0.432 0 0.864-0.072 1.296-0.144 0.576-0.144 1.08-0.576 1.152-1.224l1.008-5.256 2.448 0.144c0.144 0.936 0.216 1.944 0.216 2.952v0.432c0 1.44-0.144 2.808-0.288 4.248-0.144 1.224-0.432 2.376-0.864 3.456-1.008 2.304-2.16 4.68-3.456 6.912l-0.864 1.512-1.52 2.8c-0.648 1.512-1.584 2.88-2.664 4.104l-0.864 1.008-1.008 1.008-2.592 2.16-2.016 1.728-2.52 2.088c-0.288 0.216-0.576 0.504-0.864 0.72-1.656 1.512-2.952 3.384-3.816 5.4l-0.216 0.648c-1.08 0.432-2.088 1.008-2.952 1.656-1.08 0.936-1.944 2.016-2.52 3.312l-0.288 0.648h12.24l0.288-0.072 3.528-6.552c0.072-0.216 0.288-0.36 0.504-0.36 0.144 0 0.288 0.072 0.36 0.144l0.936 0.792c0.144 0.144 0.36 0.288 0.504 0.288s0.216-0.072 0.288-0.072c0.36-0.216 0.72-0.432 1.008-0.72l0.36-0.432 1.368-1.584 1.08-1.44 3.888-6.552c0.576-0.864 1.08-1.584 1.584-2.304s1.296-1.584 2.232-2.304l2.016-1.512 7.632-5.688c0.288-0.36 0.576-0.792 0.648-1.296l2.16-9.36 0.432-1.656 1.008-2.448 1.08-1.872 0.864-0.864c1.152 2.232 2.664 4.32 4.32 6.12 1.008 1.08 1.944 2.016 2.88 2.952 1.152 1.224 2.16 2.52 2.952 4.032 1.584 3.024 2.736 6.408 3.384 9.792 0.36 1.872 0.648 3.744 1.008 5.616 0.072 0.72 0.144 1.584 0.144 2.448s-0.072 1.728-0.216 2.592c-0.072 0.576-0.288 1.08-0.648 1.512s-0.72 0.936-1.008 1.44c-0.216 0.36-0.288 0.792-0.36 1.296l-0.072 1.368-1.368 1.44-1.44 1.296c-0.504 0.72-0.792 1.44-0.936 2.232l-0.288 1.656h12.24l1.152-1.944c0.288-0.432 0.36-0.936 0.36-1.44 0-0.216 0-0.504-0.072-0.72-0.072-0.432-0.288-0.936-0.576-1.368-0.144-0.288-0.288-0.648-0.432-1.008-0.144-0.432-0.216-0.864-0.288-1.296 0-0.288 0.072-0.576 0.216-0.792 0.216-0.288 0.504-0.432 0.792-0.504l1.368-0.288c0.216 0 0.36-0.144 0.504-0.288 0.288-0.36 0.432-0.792 0.432-1.224 0-0.288-0.072-0.576-0.144-0.792-0.144-0.288-0.216-0.576-0.288-0.864-0.36-2.664-0.864-5.544-1.44-8.352l-0.432-2.376-0.792-5.904c-0.144-0.792-0.36-1.728-0.432-2.664-0.144-1.008-0.144-1.944 0.072-2.88 0.36-1.728 0.648-3.528 0.864-5.328 0.216-1.656 0.432-3.24 0.648-4.824 0.072-0.432 0.072-0.864 0.072-1.368v-1.152c-0.144-1.224-0.576-2.376-1.224-3.312-0.288-0.504-0.576-1.008-0.792-1.584l-0.792-2.304c-0.072-0.288-0.216-0.504-0.288-0.72-0.49-1.72-0.85-3.37-0.92-5.03z"/>
<metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/"/><dc:publisher><cc:Agent rdf:about="http://openclipart.org/"><dc:title>Openclipart</dc:title></cc:Agent></dc:publisher><dc:title>Warning Cows Roadsign</dc:title><dc:date>2006-11-01T21:20:10</dc:date><dc:description>A sign warning of cows.&#xD;\\n  &#xD;\\n  Swedish Road Signs Collection on Wikicommons - &#xD;\\n   URL http://commons.wikimedia.org/wiki/Category:Road_signs_of_Sweden&#xD;\\n   &#xD;\\n   information about why this image is in the public domain can be found there.</dc:description><dc:source>http://openclipart.org/detail/1136/warning-cows-roadsign-by-ryanlerch</dc:source><dc:creator><cc:Agent><dc:title>ryanlerch</dc:title></cc:Agent></dc:creator><dc:subject><rdf:Bag><rdf:li>animal</rdf:li><rdf:li>clip art</rdf:li><rdf:li>clipart</rdf:li><rdf:li>cow</rdf:li><rdf:li>cows</rdf:li><rdf:li>danger</rdf:li><rdf:li>externalsource</rdf:li><rdf:li>farm</rdf:li><rdf:li>image</rdf:li><rdf:li>media</rdf:li><rdf:li>png</rdf:li><rdf:li>public domain</rdf:li><rdf:li>roadsign</rdf:li><rdf:li>sign</rdf:li><rdf:li>svg</rdf:li><rdf:li>sweden</rdf:li><rdf:li>warning</rdf:li><rdf:li>wikimedia commons</rdf:li></rdf:Bag></dc:subject></cc:Work><cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/></cc:License></rdf:RDF></metadata></svg>
`;

/**
 *
 * @param httpTestingController
 * @param fixture
 */
function handleIconRequests(httpTestingController: HttpTestingController, fixture: ComponentFixture<LuxMockHttpErrorComponent>) {
  httpTestingController.match((req: HttpRequest<any>) => req.url.includes('assets/svg/lux-icons')).forEach((request) => {
    if (!request.cancelled) {
      request.flush(svg_icon);
      LuxTestHelper.wait(fixture);
    }
  });
  flush();
}
