import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LuxStepperComponent } from './lux-stepper.component';

@Injectable()
export class LuxStepperHelperService {
  private switchStep: Map<LuxStepperComponent, BehaviorSubject<boolean>> = new Map();

  constructor() {}

  /**
   * Springt im Stepper zum naechsten Step.
   * Alternativ (ohne Stepper als Parameter) laesst die Funktion alle
   * bekannten Stepper einen Schritt nach vorne springen.
   *
   * Voraussetzung: luxLinear = false oder aktuell Form ist valide.
   *
   * @param stepper
   */
  public nextStep(stepper?: LuxStepperComponent) {
    if (stepper) {
      const subject = this.switchStep.get(stepper);
      if (subject) {
        subject.next(true);
      }
    } else {
      this.switchStep.forEach((switchStep: BehaviorSubject<boolean>) => switchStep.next(true));
    }
  }

  /**
   * Springt im Stepper zum vorherigen Step.
   * Alternativ (ohne Stepper als Parameter) laesst die Funktion alle
   * Bekannten Stepper einen Schritt zurueckspringen.
   *
   * @param stepper
   */
  public previousStep(stepper?: LuxStepperComponent) {
    if (stepper) {
      const subject = this.switchStep.get(stepper);
      if (subject) {
        subject.next(false);
      }
    } else {
      this.switchStep.forEach((switchStep: BehaviorSubject<boolean>) => switchStep.next(false));
    }
  }

  /**
   * Gibt das Observable der internen Map fuer den Stepper zurueck.
   *
   * @param stepper
   * @returns Observable<boolean> | Observable<any>
   */
  public getObservable(stepper: LuxStepperComponent) {
    const subject = this.switchStep.get(stepper);
    return subject ? subject.asObservable() : of(null);
  }

  /**
   * Traegt den Stepper in die Map der dem Service bekannten Stepper ein.
   *
   * @param stepper
   */
  public registerStepper(stepper: LuxStepperComponent) {
    if (!this.switchStep.get(stepper)) {
      this.switchStep.set(stepper, new BehaviorSubject(false));
    }
  }
}
