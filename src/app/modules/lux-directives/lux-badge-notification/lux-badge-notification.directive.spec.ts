import { LuxBadgeNotificationDirective } from './lux-badge-notification.directive';
import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('LuxBadgeNotificationDirective', () => {
  LuxTestHelper.configureTestSuite();

  let fixture: ComponentFixture<MockComponent>;
  let mockComp: MockComponent;

  beforeAll(async () => {
    LuxTestHelper.configureTestModule([], [MockComponent]);
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MockComponent);
    mockComp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Sollte die Notification anzeigen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const badgeContent = fixture.debugElement.query(By.css('span'));

    expect(badgeContent.nativeElement.children[0].textContent.trim()).toEqual('');

    // Änderungen durchführen
    mockComp.notification = '1';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(badgeContent.nativeElement.children[0].textContent.trim()).toEqual('1');
  }));

  it('Sollte die Notification verstecken', fakeAsync(() => {
    // Vorbedingungen prüfen
    mockComp.notification = '1';
    LuxTestHelper.wait(fixture);
    expect(fixture.debugElement.query(By.css('.mat-badge-hidden'))).toBe(null);

    // Änderungen durchführen
    mockComp.hidden = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(fixture.debugElement.query(By.css('.mat-badge-hidden'))).not.toBe(null);
  }));

  it('Sollte die Notification deaktivieren', fakeAsync(() => {
    // Vorbedingungen prüfen
    mockComp.notification = '1';
    LuxTestHelper.wait(fixture);
    expect(fixture.debugElement.query(By.css('.mat-badge-disabled'))).toBe(null);

    // Änderungen durchführen
    mockComp.disabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(fixture.debugElement.query(By.css('.mat-badge-disabled'))).not.toBe(null);
  }));

  it('Sollte den Inhalt anhand von luxMaxNumber abkürzen', fakeAsync(() => {
    // Vorbedingungen prüfen
    mockComp.notification = '100';
    LuxTestHelper.wait(fixture);

    const badgeContent = fixture.debugElement.query(By.css('span'));
    expect(badgeContent.nativeElement.children[0].textContent.trim()).toEqual('100');

    // Änderungen durchführen
    mockComp.maxNumber = 90;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(badgeContent.nativeElement.children[0].textContent.trim()).toEqual('90+');
  }));
});

@Component({
  selector: 'mock-component',
  template: `
    <span
      class="badge-target"
      [luxBadgeNotification]="notification"
      [luxBadgeDisabled]="disabled"
      [luxBadgeHidden]="hidden"
      [luxBadgeCap]="maxNumber"
    >
      Test
    </span>
  `
})
class MockComponent {
  notification = '';
  disabled = false;
  hidden = false;
  maxNumber;

  constructor() {}
}
