import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { LuxHttpErrorInterceptor } from './lux-http-error-interceptor';

describe('LuxHttpErrorComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxMockHttpErrorComponent]);
  });

  let component: LuxMockHttpErrorComponent;
  let fixture: ComponentFixture<LuxMockHttpErrorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMockHttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Sollte erzeugt werden', () => {
    expect(component).toBeTruthy();
  });

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
  }));
});

@Component({
  selector: 'lux-mock-http-error',
  template: '<lux-http-error></lux-http-error>'
})
class LuxMockHttpErrorComponent {
  constructor() {}
}
