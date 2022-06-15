/* eslint-disable max-classes-per-file */
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxSliderAcComponent } from './lux-slider-ac.component';
import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

describe('LuxSliderAcComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([LuxConsoleService], [MockSliderNoFormComponent, MockSliderFormComponent]);
  });

  describe('In ReactiveForm', () => {
    let component: MockSliderFormComponent;
    let fixture: ComponentFixture<MockSliderFormComponent>;
    let sliderComponent: LuxSliderAcComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(MockSliderFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      sliderComponent = fixture.debugElement.query(By.directive(LuxSliderAcComponent)).componentInstance;
    });
    // Vorbedingungen prüfen
    // Änderungen durchführen
    // Nachbedingungen prüfen

    it('Sollte den Wert setzen', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(component.form.value.slider).toEqual(0);

      // Änderungen durchführen
      component.form.get('slider').setValue(25);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(component.form.value.slider).toEqual(25);
      expect(sliderComponent.formControl.value).toEqual(25);
    }));

    it('Sollte den Wert und Prozent-Wert richtig emitten (bei geändertem Max/Min Wert)', fakeAsync(() => {
      // Vorbedingungen prüfen
      const valueSpy = spyOn(component, 'valueChanged');
      const percentSpy = spyOn(component, 'percentChanged');

      LuxTestHelper.wait(fixture);

      expect(valueSpy).toHaveBeenCalledTimes(0);
      expect(percentSpy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      component.max = 50;
      component.min = 25;
      LuxTestHelper.wait(fixture);
      component.form.get('slider').setValue(30);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(valueSpy).toHaveBeenCalledTimes(1);
      expect(percentSpy).toHaveBeenCalledTimes(1);
      expect(valueSpy).toHaveBeenCalledWith(30);
      expect(percentSpy).toHaveBeenCalledWith(20);
    }));

    it('Sollte den Min- und Max-Wert nicht überschreiten', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(component.form.get('slider').value).toEqual(0);
      expect(sliderComponent.luxValue).toEqual(0);

      // Änderungen durchführen
      component.max = 50;
      component.min = 25;
      LuxTestHelper.wait(fixture);
      component.form.get('slider').setValue(20);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(component.form.get('slider').value).toEqual(25);
      expect(sliderComponent.luxValue).toEqual(25);

      // Änderungen durchführen
      component.form.get('slider').setValue(55);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(component.form.get('slider').value).toEqual(50);
      expect(sliderComponent.luxValue).toEqual(50);
    }));

    it('Sollte deaktiviert werden (über die Property)', fakeAsync(() => {
      // Vorbedingungen prüfen
      let disabledSlider = fixture.debugElement.query(By.css('.mat-slider-disabled'));
      expect(disabledSlider).toBe(null);
      expect(sliderComponent.luxDisabled).toBe(false);

      // Änderungen durchführen
      component.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledSlider = fixture.debugElement.query(By.css('.mat-slider-disabled'));
      expect(disabledSlider).toBeDefined();
      expect(sliderComponent.luxDisabled).toBe(true);
    }));

    it('Sollte deaktiviert werden (über die FormControl)', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(sliderComponent.formControl.disabled).toBe(false);

      // Änderungen durchführen
      component.form.get('slider').disable();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(sliderComponent.formControl.disabled).toBe(true);
    }));
  });

  describe('Ohne ReactiveForm', () => {
    let component: MockSliderNoFormComponent;
    let fixture: ComponentFixture<MockSliderNoFormComponent>;
    let sliderComponent: LuxSliderAcComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(MockSliderNoFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      sliderComponent = fixture.debugElement.query(By.directive(LuxSliderAcComponent)).componentInstance;
    });

    it('Sollte den Wert setzen', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(component.value).toEqual(0);
      expect(sliderComponent.luxValue).toEqual(0);

      // Änderungen durchführen
      component.value = 50;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(component.value).toEqual(50);
      expect(sliderComponent.luxValue).toEqual(50);
    }));

    it('Sollte den Wert und Prozent-Wert richtig emitten (bei geändertem Max/Min Wert)', fakeAsync(() => {
      // Vorbedingungen prüfen
      const valueSpy = spyOn(component, 'valueChanged');
      const percentSpy = spyOn(component, 'percentChanged');

      LuxTestHelper.wait(fixture);

      expect(valueSpy).toHaveBeenCalledTimes(0);
      expect(percentSpy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      component.max = 50;
      component.min = 25;
      LuxTestHelper.wait(fixture);
      component.value = 30;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(valueSpy).toHaveBeenCalledTimes(1);
      expect(percentSpy).toHaveBeenCalledTimes(1);
      expect(valueSpy).toHaveBeenCalledWith(30);
      expect(percentSpy).toHaveBeenCalledWith(20);
    }));

    it('Sollte deaktiviert werden', fakeAsync(() => {
      // Vorbedingungen prüfen
      let disabledSlider = fixture.debugElement.query(By.css('.mat-slider-disabled'));
      expect(disabledSlider).toBe(null);
      expect(sliderComponent.luxDisabled).toBe(false);

      // Änderungen durchführen
      component.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      disabledSlider = fixture.debugElement.query(By.css('.mat-slider-disabled'));
      expect(disabledSlider).toBeDefined();
      expect(sliderComponent.luxDisabled).toBe(true);
    }));

    it('Sollte den Min- und Max-Wert nicht überschreiten', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(component.value).toEqual(0);
      expect(sliderComponent.luxValue).toEqual(0);

      // Änderungen durchführen
      component.max = 50;
      component.min = 25;
      LuxTestHelper.wait(fixture);
      component.value = 20;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(component.value).toEqual(25);
      expect(sliderComponent.luxValue).toEqual(25);

      // Änderungen durchführen
      component.value = 55;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(component.value).toEqual(50);
      expect(sliderComponent.luxValue).toEqual(50);
    }));

    it('Sollte den Thumb-Label anzeigen und verstecken', fakeAsync(() => {
      // Vorbedingungen prüfen
      let thumbLabel = fixture.debugElement.query(By.css('.mat-slider-thumb-label-showing .mat-slider-thumb-label'));
      expect(thumbLabel).toBeDefined();

      // Änderungen durchführen
      component.showThumbLabel = false;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      thumbLabel = fixture.debugElement.query(By.css('.mat-slider-thumb-label-showing .mat-slider-thumb-label'));
      expect(thumbLabel).toBe(null);
    }));

    it('Sollte die displayWith-Funktion korrekt ausführen', fakeAsync(() => {
      // Vorbedingungen prüfen
      let thumbLabelText = fixture.debugElement.query(By.css('.mat-slider-thumb-label-text'));
      expect(thumbLabelText.nativeElement.textContent).toEqual('0');

      // Änderungen durchführen
      component.max = 10000;
      component.showThumbLabel = true;
      component.displayWith = value => {
        if (value && value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
        return value;
      };
      LuxTestHelper.wait(fixture);
      component.value = 1000;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      thumbLabelText = fixture.debugElement.query(By.css('.mat-slider-thumb-label-text'));
      expect(thumbLabelText.nativeElement.textContent).toEqual('1k');

      component.value = 5600;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      thumbLabelText = fixture.debugElement.query(By.css('.mat-slider-thumb-label-text'));
      expect(thumbLabelText.nativeElement.textContent).toEqual('6k');
    }));
  });
});

@Component({
  template:
    '' +
    '<lux-slider-ac' +
    '            [luxColor]="color"' +
    '            [luxDisabled]="disabled"' +
    '            [luxShowThumbLabel]="showThumbLabel"' +
    '            [(luxValue)]="value"' +
    '            [luxMax]="max"' +
    '            [luxMin]="min"' +
    '            [luxDisplayWith]="displayWith"' +
    '            (luxValuePercent)="percentChanged($event)"' +
    '            (luxValueChange)="valueChanged($event)"' +
    '            luxTagId="slidernoform">' +
    '          </lux-slider-ac>'
})
class MockSliderNoFormComponent {
  color = 'primary';
  disabled = false;
  showThumbLabel = true;
  value = 0;
  max = 100;
  min = 0;
  displayWith;

  percentChanged($event) {}

  valueChanged($event) {}
}

@Component({
  template:
    '' +
    '<div [formGroup]="form">' +
    '           <lux-slider-ac' +
    '            [luxDisabled]="disabled"' +
    '            [luxMax]="max"' +
    '            [luxMin]="min"' +
    '            luxControlBinding="slider"' +
    '            (luxValuePercent)="percentChanged($event)"' +
    '            (luxValueChange)="valueChanged($event)"' +
    '            luxTagId="slidernoform">' +
    '          </lux-slider-ac>' +
    '</div>'
})
class MockSliderFormComponent {
  disabled = false;
  max = 100;
  min = 0;

  form;

  percentChanged($event) {}

  valueChanged($event) {}

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      slider: [0]
    });
  }
}
