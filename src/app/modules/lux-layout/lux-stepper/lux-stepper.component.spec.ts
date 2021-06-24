import { waitForAsync, ComponentFixture, fakeAsync, flush, TestBed, discardPeriodicTasks } from '@angular/core/testing';

import { LuxStepperComponent } from './lux-stepper.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { Component } from '@angular/core';
import { ILuxStepperButtonConfig } from './lux-stepper-model/lux-stepper-button-config.interface';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LuxStepperHelperService } from './lux-stepper-helper.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

describe('LuxStepperComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([LuxStepperHelperService], [MockStepperComponent]);
  });

  let component: MockStepperComponent;
  let fixture: ComponentFixture<MockStepperComponent>;
  let stepperComponent: LuxStepperComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LuxStepperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stepperComponent = fixture.debugElement.query(By.directive(LuxStepperComponent)).componentInstance;
  });

  it('Sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('Sollte die Steps korrekt darstellen', fakeAsync(() => {
    const stepHeaders = fixture.debugElement.queryAll(By.css('.step-header'));
    const stepContents = fixture.debugElement.queryAll(By.css('.step-content'));

    expect(stepHeaders.length).toBe(2);
    expect(stepContents.length).toBe(2);

    expect(stepHeaders[0].nativeElement.textContent).toEqual('Step 0');
    expect(stepHeaders[1].nativeElement.textContent).toEqual('Step 1');

    expect(stepContents[0].nativeElement.textContent).toEqual('Step 0');
    expect(stepContents[1].nativeElement.textContent).toEqual('Step 1');
  }));

  it('Sollte den Stepper deaktivieren', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepperOverlay = fixture.debugElement.query(By.css('.lux-stepper-disabled-overlay.lux-hidden'));
    expect(stepperOverlay).not.toEqual(null);

    // Änderungen durchführen
    component.disabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepperOverlay = fixture.debugElement.query(By.css('.lux-stepper-disabled-overlay.lux-hidden'));
    expect(stepperOverlay).toEqual(null);
  }));

  it('Sollte den Step-Wechsel ohne Validierung erlauben (linear = false)', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 1');

    flush();
  }));

  it('Sollte den Step-Wechsel ohne Validierung nicht erlauben (linear = true)', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    component.linear = true;
    LuxTestHelper.wait(fixture);

    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');
  }));

  it('Sollte die Validierung über luxCompleted ermöglichen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    component.linear = true;
    component.step0Form = undefined;
    component.step0Completed = false;
    LuxTestHelper.wait(fixture);

    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    component.step0Completed = true;
    LuxTestHelper.wait(fixture);

    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 1');

    flush();
  }));

  it('Sollte optionale Steps überspringen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    component.linear = true;
    component.step0Form = undefined;
    component.step0Optional = true;
    LuxTestHelper.wait(fixture);

    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 1');

    flush();
  }));

  it('Sollte nicht editierbare Steps nicht wieder aktivieren können', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    component.linear = true;
    component.step0Form = undefined;
    component.step0Editable = false;
    component.step0Completed = true;
    LuxTestHelper.wait(fixture);

    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 1');

    // Änderungen durchführen
    stepHeaders[0].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 1');

    flush();
  }));

  it('Sollte die Standard-Icons ausblenden', fakeAsync(() => {
    // Vorbedingungen prüfen
    let matStepIcons = fixture.debugElement.queryAll(By.css('.lux-ignore-mat-step-icons .mat-step-icon'));
    expect(matStepIcons.length).toBe(0);

    // Änderungen durchführen
    component.customIcons = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    matStepIcons = fixture.debugElement.queryAll(By.css('.lux-ignore-mat-step-icons .mat-step-icon'));
    expect(matStepIcons.length).toBe(2);
  }));

  it('Sollte die Navigation-Buttons konfigurieren können', fakeAsync(() => {
    // Vorbedingungen prüfen
    const navButtons = fixture.debugElement.queryAll(By.css('lux-stepper-nav-buttons .lux-button-label'));
    expect(navButtons.length).toBe(3);
    expect(navButtons[0].nativeElement.textContent.trim()).toEqual('Test vorwärts');
    expect(navButtons[1].nativeElement.textContent.trim()).toEqual('Test zurück');
    expect(navButtons[2].nativeElement.textContent.trim()).toEqual('Test fertig');

    // Änderungen durchführen
    component.prevConfig.label = 'Test prev';
    component.nextConf.label = 'Test next';
    component.finConf.label = 'Test fin';
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(navButtons[0].nativeElement.textContent.trim()).toEqual('Test next');
    expect(navButtons[1].nativeElement.textContent.trim()).toEqual('Test prev');
    expect(navButtons[2].nativeElement.textContent.trim()).toEqual('Test fin');
  }));

  it('Sollte die Navigation-Buttons ausblenden können', fakeAsync(() => {
    // Vorbedingungen prüfen
    let navButtons = fixture.debugElement.queryAll(By.css('lux-stepper-nav-buttons .lux-button-label'));
    expect(navButtons.length).toBe(3);

    // Änderungen durchführen
    component.showNavButtons = false;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    navButtons = fixture.debugElement.queryAll(By.css('lux-stepper-nav-buttons .lux-button-label'));
    expect(navButtons.length).toBe(0);
  }));

  it('Sollte einen vertikalen Stepper erstellen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepperHorizontal = fixture.debugElement.query(By.css('mat-horizontal-stepper'));
    let stepperVertical = fixture.debugElement.query(By.css('mat-vertical-stepper'));
    expect(stepperHorizontal).not.toBe(null);
    expect(stepperVertical).toBe(null);

    // Änderungen durchführen
    component.vertical = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepperHorizontal = fixture.debugElement.query(By.css('mat-horizontal-stepper'));
    stepperVertical = fixture.debugElement.query(By.css('mat-vertical-stepper'));
    expect(stepperHorizontal).toBe(null);
    expect(stepperVertical).not.toBe(null);
  }));

  it('Sollte zu einem bestimmten Step springen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 0');

    // Änderungen durchführen
    component.currentStep = 1;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    stepSelected = fixture.debugElement.query(By.css('mat-step-header[aria-selected="true"] .step-header'));
    expect(stepSelected.nativeElement.textContent).toEqual('Step 1');

    flush();
  }));

  it('Sollte luxStepChanged emitten', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(component, 'stepChange');
    expect(spy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen
    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);

    flush();
  }));

  it('Sollte luxFinishButtonClicked emitten', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(component, 'finClicked');
    expect(spy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen
    const stepHeaders = fixture.debugElement.queryAll(By.css('mat-step-header'));
    stepHeaders[1].nativeElement.click();
    LuxTestHelper.wait(fixture, LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs);

    const navButtons = fixture.debugElement.queryAll(By.css('lux-stepper-nav-buttons .lux-button-label'));
    navButtons[2].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);

    flush();
    discardPeriodicTasks();
  }));
});

@Component({
  template: `
    <lux-stepper
      [luxDisabled]="disabled"
      [(luxCurrentStepNumber)]="currentStep"
      [luxUseCustomIcons]="customIcons"
      [luxVerticalStepper]="vertical"
      [luxLinear]="linear"
      [luxHorizontalStepAnimationActive]="horAnimation"
      [luxShowNavigationButtons]="showNavButtons"
      [luxEditedIconName]="editedIconName"
      [luxPreviousButtonConfig]="prevConfig"
      [luxNextButtonConfig]="nextConf"
      [luxFinishButtonConfig]="finConf"
      (luxStepChanged)="stepChange($event)"
      (luxFinishButtonClicked)="finClicked($event)"
    >
      <lux-step
        [luxCompleted]="step0Completed"
        [luxOptional]="step0Optional"
        [luxStepControl]="step0Form"
        [luxEditable]="step0Editable"
        [luxIconName]="step0Icon"
      >
        <lux-step-header>
          <span class="step-header step-0-header">Step 0</span>
        </lux-step-header>
        <lux-step-content>
          <span class="step-content step-0-content">Step 0</span>
          <div [formGroup]="form.get('step0')">
            <input formControlName="input" />
          </div>
        </lux-step-content>
      </lux-step>
      <lux-step
        [luxCompleted]="step1Completed"
        [luxOptional]="step1Optional"
        [luxStepControl]="step1Form"
        [luxEditable]="step1Editable"
        [luxIconName]="step1Icon"
      >
        <lux-step-header>
          <span class="step-header step-1-header">Step 1</span>
        </lux-step-header>
        <lux-step-content>
          <span class="step-content step-1-content">Step 1</span>
          <div [formGroup]="form.get('step1')">
            <input formControlName="input" />
          </div>
        </lux-step-content>
      </lux-step>
    </lux-stepper>
  `
})
class MockStepperComponent {
  disabled = false;
  currentStep = 0;
  customIcons = false;
  vertical = false;
  linear = false;
  horAnimation = true;
  showNavButtons = true;
  editedIconName;

  prevConfig: ILuxStepperButtonConfig = {
    label: 'Test zurück'
  };

  nextConf: ILuxStepperButtonConfig = {
    label: 'Test vorwärts'
  };

  finConf: ILuxStepperButtonConfig = {
    label: 'Test fertig'
  };

  step0Optional = false;
  step0Editable = true;
  step0Completed = false;
  step0Form;
  step0Icon = 'fa-user';

  step1Optional = false;
  step1Editable = true;
  step1Completed = false;
  step1Form;
  step1Icon = 'fa-file-signature';

  form;

  stepChange($event) {}

  finClicked($event) {}

  constructor() {
    this.form = new FormGroup({
      step0: new FormGroup({
        input: new FormControl('', Validators.required)
      }),
      step1: new FormGroup({
        input: new FormControl('', Validators.required)
      })
    });
  }
}
