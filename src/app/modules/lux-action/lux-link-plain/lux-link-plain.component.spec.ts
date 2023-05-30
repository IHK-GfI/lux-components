import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxThemePalette } from '../../lux-util/lux-colors.enum';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxLinkPlainComponent } from './lux-link-plain.component';

describe('LuxLinkPlainComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockLinkPlainComponent]);
  });

  let fixture: ComponentFixture<MockLinkPlainComponent>;
  let component: MockLinkPlainComponent;
  let linkComponent: LuxLinkPlainComponent;
  let router: Router;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(MockLinkPlainComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    linkComponent = fixture.debugElement.query(By.directive(LuxLinkPlainComponent)).componentInstance;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sollte das Label darstellen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let label = fixture.debugElement.query(By.css('.lux-link-plain-text'));
    expect(label.nativeElement.textContent.trim()).toEqual('');

    // Änderungen durchführen
    component.label = 'Ein Label sie zu knechten';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    label = fixture.debugElement.query(By.css('.lux-link-plain-text'));
    expect(label.nativeElement.textContent.trim()).toEqual('Ein Label sie zu knechten');
  }));

  it('Sollte das Icon darstellen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let icon = fixture.debugElement.query(By.css('lux-icon'));
    expect(icon).toBeNull();

    // Änderungen durchführen
    component.iconName = 'lux-programming-bug';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    icon = fixture.debugElement.query(By.css('lux-icon'));
    expect(icon).not.toBeNull();
  }));

  it('Sollte deaktiviert werden', fakeAsync(() => {
    // Vorbedingungen prüfen
    let disabled = fixture.debugElement.query(By.css('.lux-disabled'));
    expect(disabled).toBeNull();

    // Änderungen durchführen
    component.disabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabled = fixture.debugElement.query(By.css('.lux-disabled'));
    expect(disabled).not.toBeNull();
  }));

  it('Sollte den (internen) href aufrufen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(router, 'navigate').and.callFake(() => Promise.resolve(false));
    expect(spy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen
    component.href = '/mock-route';
    LuxTestHelper.wait(fixture);

    const link = fixture.debugElement.query(By.css('.link-wrapper'));
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

    const link = fixture.debugElement.query(By.css('.link-wrapper'));
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

    const link = fixture.debugElement.query(By.css('.link-wrapper'));
    link.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('http://mock-route', '_blank');

    discardPeriodicTasks();
  }));
});

@Component({
  template: `
    <lux-link-plain
      [luxLabel]="label"
      [luxIconName]="iconName"
      [luxDisabled]="disabled"
      [luxBlank]="blank"
      [luxHref]="href"
      [luxColor]="color"
    >
    </lux-link-plain>
  `
})
class MockLinkPlainComponent {
  label = '';
  raised = false;
  iconName = '';
  disabled = false;
  blank = false;
  href = '';
  color?: LuxThemePalette;
}
