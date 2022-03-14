import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxLinkComponent } from './lux-link.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

describe('LuxLinkComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockLinkComponent]);
  });

  let fixture: ComponentFixture<MockLinkComponent>;
  let component: MockLinkComponent;
  let linkComponent: LuxLinkComponent;
  let router: Router;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(MockLinkComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    linkComponent = fixture.debugElement.query(By.directive(LuxLinkComponent)).componentInstance;
    router = TestBed.inject(Router);
  }));

  it('Sollte erstellt werden', fakeAsync(() => {
    expect(component).toBeDefined();
  }));

  it('Sollte das Label darstellen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let label = fixture.debugElement.query(By.css('.lux-button-label'));
    expect(label).toBe(null);

    // Änderungen durchführen
    component.label = 'Ein Label sie zu knechten';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    label = fixture.debugElement.query(By.css('.lux-button-label'));
    expect(label.nativeElement.textContent.trim()).toEqual('Ein Label sie zu knechten');
  }));

  it('Sollte das Icon darstellen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let icon = fixture.debugElement.query(By.css('lux-icon'));
    expect(icon).toBe(null);

    // Änderungen durchführen
    component.iconName = 'fas fa-jedi';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    icon = fixture.debugElement.query(By.css('lux-icon'));
    expect(icon).not.toBe(null);
  }));

  it('Sollte deaktiviert werden', fakeAsync(() => {
    // Vorbedingungen prüfen
    let disabled = fixture.debugElement.query(By.css('button[ng-reflect-disabled="true"]'));
    expect(disabled).toBe(null);

    // Änderungen durchführen
    component.disabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabled = fixture.debugElement.query(By.css('button[ng-reflect-disabled="true"]'));
    expect(disabled).not.toBe(null);
  }));

  it('Sollte raised dargestellt werden', fakeAsync(() => {
    // Vorbedingungen prüfen
    let raised = fixture.debugElement.query(By.css('.mat-raised-button'));
    expect(raised).toBe(null);

    // Änderungen durchführen
    component.raised = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    raised = fixture.debugElement.query(By.css('.mat-raised-button'));
    expect(raised).not.toBe(null);
  }));

  it('Sollte den (internen) href aufrufen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(router, 'navigate').and.callFake(() => Promise.resolve(false));
    expect(spy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen
    component.href = '/mock-route';
    LuxTestHelper.wait(fixture);

    const link = fixture.debugElement.query(By.css('button'));
    link.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['/mock-route']);

    discardPeriodicTasks();
  }));

  it('Sollte den (externen) href aufrufen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(window, 'open');
    expect(spy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen  [mit HTTP]
    component.href = 'http://mock-route';
    LuxTestHelper.wait(fixture);

    const link = fixture.debugElement.query(By.css('button'));
    link.nativeElement.click();
    LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('http://mock-route', '_self');

    // Änderungen durchführen [mit HTTPS]
    component.href = 'https://mock-route';
    LuxTestHelper.wait(fixture);

    link.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('http://mock-route', '_self');

    discardPeriodicTasks();
  }));

  it('Sollte den (externen) href in einem neuen Tab aufrufen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(window, 'open');
    expect(spy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen
    component.blank = true;
    component.href = 'http://mock-route';
    LuxTestHelper.wait(fixture);

    const link = fixture.debugElement.query(By.css('button'));
    link.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('http://mock-route', '_blank');

    discardPeriodicTasks();
  }));

  it('Sollte die Farbe anpassen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let color = fixture.debugElement.query(By.css('button[ng-reflect-color=""]'));
    expect(color).toBe(null);

    // Änderungen durchführen
    component.color = 'primary';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    color = fixture.debugElement.query(By.css('button[ng-reflect-color="primary"]'));
    expect(color).not.toBe(null);

    // Änderungen durchführen
    component.color = 'warn';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    color = fixture.debugElement.query(By.css('button[ng-reflect-color="warn"]'));
    expect(color).not.toBe(null);

    // Änderungen durchführen
    component.color = 'accent';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    color = fixture.debugElement.query(By.css('button[ng-reflect-color="accent"]'));
    expect(color).not.toBe(null);
  }));
});

@Component({
  template: `
    <lux-link
      [luxLabel]="label"
      [luxRaised]="raised"
      [luxIconName]="iconName"
      [luxDisabled]="disabled"
      [luxBlank]="blank"
      [luxHref]="href"
      [luxColor]="color"
    >
    </lux-link>
  `
})
class MockLinkComponent {
  label;
  raised;
  iconName;
  disabled;
  blank;
  href;
  color;
}
