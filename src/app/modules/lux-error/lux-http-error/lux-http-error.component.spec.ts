/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { LuxHttpErrorInterceptor } from './lux-http-error-interceptor';
import { LuxHttpErrorComponent } from './lux-http-error.component';

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

    LuxTestHelper.wait(fixture);
    flush();
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

    LuxTestHelper.wait(fixture);
    flush();
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

    LuxTestHelper.wait(fixture);
    flush();
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

    LuxTestHelper.wait(fixture);
    flush();
  }));
});

@Component({
  selector: 'lux-mock-http-error',
  template: '<lux-http-error></lux-http-error>'
})
class LuxMockHttpErrorComponent {
  constructor() {}
}
