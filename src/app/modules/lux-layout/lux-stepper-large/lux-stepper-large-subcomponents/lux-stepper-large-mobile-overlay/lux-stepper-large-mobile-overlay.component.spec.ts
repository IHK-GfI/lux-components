/* eslint-disable max-classes-per-file */
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LUX_STEPPER_LARGE_OVERLAY_DATA } from './lux-stepper-large-mobile-overlay-data';
import { LuxStepperLargeMobileOverlayRef } from './lux-stepper-large-mobile-overlay-ref';

import { LuxStepperLargeMobileOverlayComponent } from './lux-stepper-large-mobile-overlay.component';

describe('LuxStepperLargeMobileOverlayComponent', () => {
  let component: LuxStepperLargeMobileOverlayComponent;
  let fixture: ComponentFixture<LuxStepperLargeMobileOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule],
      declarations: [LuxStepperLargeMobileOverlayComponent],
      providers: [
        { provide: LuxStepperLargeMobileOverlayRef, useClass: MockLuxStepperLargeMobileOverlayRef },
        { provide: LUX_STEPPER_LARGE_OVERLAY_DATA, useClass: MockLuxStepperLargeComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxStepperLargeMobileOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockLuxStepperLargeMobileOverlayRef {}

class MockLuxStepperLargeComponent {
  stepperComponent = {
    luxCurrentStepNumber: 0,
    luxSteps: []
  };
}
