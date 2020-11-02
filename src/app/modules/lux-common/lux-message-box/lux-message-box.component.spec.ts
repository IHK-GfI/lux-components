import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { LuxMessageBoxComponent } from './lux-message-box.component';
import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { ILuxMessage } from './lux-message-box-model/lux-message.interface';
import { LuxBackgroundColorsEnum } from '../../lux-util/lux-colors.enum';
import { By } from '@angular/platform-browser';
import { ILuxMessageChangeEvent } from './lux-message-box-model/lux-message-events.interface';
import { LuxMessageComponent } from './lux-message-box-subcomponents/lux-message.component';
import { MatPaginator } from '@angular/material/paginator';

describe('LuxMessageBoxComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxMockMessageBoxComponent]);
  });

  let component: LuxMockMessageBoxComponent;
  let fixture: ComponentFixture<LuxMockMessageBoxComponent>;
  let messageBoxComponent: LuxMessageBoxComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMockMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    messageBoxComponent = fixture.debugElement.query(By.directive(LuxMessageBoxComponent)).componentInstance;
  });

  it('Sollte erzeugt werden', () => {
    expect(component).toBeTruthy();
  });

  it('Sollte die Nachrichten anzeigen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    let messageIcon = fixture.debugElement.query(By.css('.lux-message-icon'));

    expect(messageContainer).not.toBe(null, 'Vorbedingung 1');
    expect(messageText).not.toBe(null, 'Vorbedingung 2');
    expect(messageText.nativeElement.textContent.trim()).toEqual('Msg 0', 'Vorbedingung 3');
    expect(messageIcon).not.toBe(null, 'Vorbedingung 4');

    // Änderungen durchführen
    component.messages = [];
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    messageIcon = fixture.debugElement.query(By.css('.lux-message-icon'));

    expect(messageContainer).toBe(null, 'Nachbedingung 1');
    expect(messageText).toBe(null, 'Nachbedingung 2');
    expect(messageIcon).toBe(null, 'Nachbedingung 3');

    LuxTestHelper.wait(fixture);
    flush();
  }));

  it('Sollte mehrere Nachrichtenboxen untereinander anzeigen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let singleMessages = fixture.debugElement.queryAll(By.directive(LuxMessageComponent));

    expect(singleMessages.length).toBe(1, 'Vorbedingung 1');

    // Änderungen durchführen
    component.maxDisplayed = 2;
    component.messages = [...component.messages];
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    singleMessages = fixture.debugElement.queryAll(By.directive(LuxMessageComponent));

    expect(singleMessages.length).toBe(2, 'Nachbedingung 1');

    // Änderungen durchführen
    component.maxDisplayed = 3;
    component.messages = [...component.messages, ...component.messages];
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    singleMessages = fixture.debugElement.queryAll(By.directive(LuxMessageComponent));

    expect(singleMessages.length).toBe(3, 'Nachbedingung 3');

    LuxTestHelper.wait(fixture);
    flush();
  }));

  it('Sollte zur speziellen Nachricht springen und fehlerhafte Eingaben abfangen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));

    expect(messageText).not.toBe(null, 'Vorbedingung 1');
    expect(messageText.nativeElement.textContent).toEqual('Msg 0', 'Vorbedingung 2');

    // Änderungen durchführen
    component.index = 1;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));

    expect(messageText).not.toBe(null, 'Nachbedingung 1');
    expect(messageText.nativeElement.textContent).toEqual('Msg 1', 'Nachbedingung 2');

    // Änderungen durchführen [Sollte negative Werte abfangen]
    component.index = -100;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));

    expect(messageText).not.toBe(null, 'Nachbedingung 3');
    expect(messageText.nativeElement.textContent).toEqual('Msg 0', 'Nachbedingung 4');

    // Änderungen durchführen [Sollte zu hohe positive Werte abfangen]
    component.index = 100;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));

    expect(messageText).not.toBe(null, 'Nachbedingung 5');
    expect(messageText.nativeElement.textContent).toEqual('Msg 1', 'Nachbedingung 6');
  }));

  it('Sollte die Nachrichten wechseln und das Event ausgeben', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageText = fixture.debugElement.query(By.css('.lux-message-text'));
    const changeSpy = spyOn(component, 'changed').and.callThrough();
    const matPaginator: MatPaginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;

    expect(messageText.nativeElement.textContent.trim()).toEqual('Msg 0', 'Vorbedingung 1');
    expect(component.eventObject).toBeUndefined('Vorbedingung 2');

    // Änderungen durchführen [NACH VORNE STEPPEN]
    matPaginator.nextPage();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));

    expect(messageText.nativeElement.textContent.trim()).toEqual('Msg 1', 'Nachbedingung 1');
    expect(changeSpy).toHaveBeenCalledTimes(1); // Nachbedingung 2
    expect(component.eventObject).toBeDefined('Nachbedingung 3');
    expect(component.eventObject.previousPage.index).toBe(0, 'Nachbedingung 4');
    expect(component.eventObject.currentPage.index).toBe(1, 'Nachbedingung 5');

    // Änderungen durchführen [NACH HINTEN STEPPEN]
    matPaginator.previousPage();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageText = fixture.debugElement.query(By.css('.lux-message-text'));

    expect(messageText.nativeElement.textContent.trim()).toEqual('Msg 0', 'Nachbedingung 6');
    expect(changeSpy).toHaveBeenCalledTimes(2); // Nachbedingung 7
    expect(component.eventObject.previousPage.index).toBe(1, 'Nachbedingung 8');
    expect(component.eventObject.currentPage.index).toBe(0, 'Nachbedingung 9');
  }));

  it('Sollte die Nachrichten schließen und das Event ausgeben', fakeAsync(() => {
    // Vorbedingungen prüfen
    let messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    const changeSpy = spyOn(component, 'closed').and.callThrough();

    expect(messageContainer).not.toBe(null, 'Vorbedingung 1');
    expect(changeSpy).toHaveBeenCalledTimes(0); // Vorbedingung 2

    // Änderungen durchführen
    component.messages = [];
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    messageContainer = fixture.debugElement.query(By.css('.lux-message-container'));
    expect(messageContainer).toBe(null, 'Nachbedingung 1');
    expect(changeSpy).toHaveBeenCalledTimes(1); // Nachbedingung 2

    LuxTestHelper.wait(fixture);
    flush();
  }));
});

@Component({
  selector: 'lux-mock-message-box',
  template:
    '<lux-message-box (luxMessageBoxClosed)="closed()" (luxMessageChanged)="changed($event)" ' +
    '[luxMessages]="messages" [luxIndex]="index" [luxMaximumDisplayed]="maxDisplayed"></lux-message-box>'
})
class LuxMockMessageBoxComponent {
  messages: ILuxMessage[] = [
    { text: 'Msg 0', iconName: 'fa-android', color: LuxBackgroundColorsEnum.green },
    { text: 'Msg 1', iconName: 'fa-apple', color: LuxBackgroundColorsEnum.blue }
  ];

  eventObject: ILuxMessageChangeEvent;
  index = 0;
  maxDisplayed = 1;

  constructor() {}

  closed() {}

  changed($event) {
    this.eventObject = $event;
  }
}
