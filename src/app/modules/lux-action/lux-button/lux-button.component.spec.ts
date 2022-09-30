/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxButtonComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxButtonComponent, LuxButtonLabelComponent]);
  });

  describe('Attribut "luxClicked"', () => {
    let fixture: ComponentFixture<LuxButtonComponent>;
    let testComponent: LuxButtonComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxButtonComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Button (normal) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxClicked(fixture);
    }));

    it('Button (raised) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = true;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxClicked(fixture);
    }));

    it('Button (round)" anklicken', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = true;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxClicked(fixture);
    }));

    it('Button (flat) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = true;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxClicked(fixture);
    }));

    it('Button (outlined) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = true;
      fixture.detectChanges();

      Checker.checkLuxClicked(fixture);
    }));
  });

  describe('Attribut "luxDisabled"', () => {
    let fixture: ComponentFixture<LuxButtonComponent>;
    let testComponent: LuxButtonComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxButtonComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Button (normal) anklicken', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxDisabled(fixture);
    }));

    it('Button (raised) anklicken', fakeAsync(() => {
      fixture.componentInstance.raised = true;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxDisabled(fixture);
    }));

    it('Button (round) anklicken', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = true;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxDisabled(fixture);
    }));

    it('Button (flat) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = true;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxDisabled(fixture);
    }));

    it('Button (outlined) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = true;
      fixture.detectChanges();

      Checker.checkLuxDisabled(fixture);
    }));
  });

  describe('Attribut "luxLabel"', () => {
    let fixture: ComponentFixture<LuxButtonLabelComponent>;
    let testComponent: LuxButtonLabelComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(LuxButtonLabelComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
    }));

    it('Button (normal)"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxLabel(fixture);
    }));

    it('Button (raised)"', fakeAsync(() => {
      fixture.componentInstance.raised = true;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxLabel(fixture);
    }));

    // Rounded Buttons haben keine Label mehr

    it('Button (flat) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = true;
      fixture.componentInstance.outlined = false;
      fixture.detectChanges();

      Checker.checkLuxLabel(fixture);
    }));

    it('Button (outlined) anklicken"', fakeAsync(() => {
      fixture.componentInstance.raised = false;
      fixture.componentInstance.round = false;
      fixture.componentInstance.flat = false;
      fixture.componentInstance.outlined = true;
      fixture.detectChanges();

      Checker.checkLuxLabel(fixture);
    }));
  });
});

class Checker {
  static checkLuxLabel(fixture: ComponentFixture<LuxButtonLabelComponent>) {
    // Vorbedingungen testen
    const expectedLabel = 'Testbutton 123';
    expect(fixture.componentInstance.label).toEqual('');

    // Änderungen durchführen
    fixture.componentInstance.label = expectedLabel;
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('span[class~="lux-button-label"]'));
    fixture.detectChanges();

    // Nachbedingungen testen
    expect(fixture.componentInstance.label).toEqual(expectedLabel);
    expect(labelEl.nativeElement.innerHTML.trim()).toEqual(expectedLabel);
  }

  static checkLuxClicked(fixture: ComponentFixture<LuxButtonComponent>) {
    // Vorbedingungen testen
    const onClickSpy = spyOn(fixture.componentInstance, 'onClick');
    expect(fixture.componentInstance.disabled).toBeFalse();

    // Änderungen durchführen
    fixture.componentInstance.disabled = false;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();
    fixture.detectChanges();

    // Nachbedingungen testen
    expect(fixture.componentInstance.disabled).toBeFalsy();
    expect(buttonEl.nativeElement.disabled).toBeFalsy();
    expect(buttonEl.nativeElement.getAttribute('aria-label')).toContain('Lorem ipsum 4711');
    expect(onClickSpy).toHaveBeenCalled();
    discardPeriodicTasks();
  }

  static checkLuxDisabled(fixture: ComponentFixture<LuxButtonComponent>) {
    // Vorbedingungen testen
    const onClickSpy = spyOn(fixture.componentInstance, 'onClick');
    expect(fixture.componentInstance.disabled).toBeFalse();

    // Änderungen durchführen
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();
    fixture.detectChanges();

    // Nachbedingungen testen
    expect(fixture.componentInstance.disabled).toBeTruthy();
    expect(buttonEl.nativeElement.disabled).toBeTruthy();
    expect(buttonEl.nativeElement.getAttribute('aria-label')).toContain('Lorem ipsum 4711');
    expect(onClickSpy).not.toHaveBeenCalled();
  }
}

@Component({
  template: `
    <lux-button
      luxLabel="Lorem ipsum 4711"
      [luxDisabled]="disabled"
      (luxClicked)="onClick()"
      [luxRounded]="round"
      [luxRaised]="raised"
      [luxFlat]="flat"
      [luxStroked]="outlined"
    ></lux-button>
  `
})
class LuxButtonComponent {
  disabled = false;
  round = false;
  raised = false;
  flat = false;
  outlined = false;

  onClick() {}
}

@Component({
  template: `
    <lux-button
      [luxLabel]="label"
      [luxDisabled]="disabled"
      (luxClicked)="onClick()"
      [luxRounded]="round"
      [luxRaised]="raised"
      [luxFlat]="flat"
      [luxStroked]="outlined"
    ></lux-button>
  `
})
class LuxButtonLabelComponent {
  disabled = false;
  round = false;
  raised = false;
  label = '';
  flat = false;
  outlined = false;

  onClick() {}
}
