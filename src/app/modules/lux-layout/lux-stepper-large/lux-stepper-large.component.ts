import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../lux-util/lux-util';
import {
  LUX_STEPPER_LARGE_DEFAULT_FIN_BTN_CONF,
  LUX_STEPPER_LARGE_DEFAULT_NEXT_BTN_CONF,
  LUX_STEPPER_LARGE_DEFAULT_PREV_BTN_CONF
} from './lux-stepper-large-model/lux-stepper-large-button-info';
import { LuxStepperLargeClickEvent } from './lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxStepperLargeSelectionEvent } from './lux-stepper-large-model/lux-stepper-large-selection-event';
import { ILuxStepperLargeStep, LuxVetoState } from './lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeMobileOverlayService } from './lux-stepper-large-subcomponents/lux-stepper-large-mobile-overlay/lux-stepper-large-mobile-overlay.service';
import { LuxStepperLargeStepComponent } from './lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';

@Component({
  selector: 'lux-stepper-large',
  templateUrl: './lux-stepper-large.component.html',
  styleUrls: ['./lux-stepper-large.component.scss']
})
export class LuxStepperLargeComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChildren(LuxStepperLargeStepComponent) steps: QueryList<ILuxStepperLargeStep>;

  @Input() luxPrevButtonConfig = LUX_STEPPER_LARGE_DEFAULT_PREV_BTN_CONF;
  @Input() luxNextButtonConfig = LUX_STEPPER_LARGE_DEFAULT_NEXT_BTN_CONF;
  @Input() luxFinButtonConfig = LUX_STEPPER_LARGE_DEFAULT_FIN_BTN_CONF;

  @Output() luxStepperFinished: EventEmitter<void> = new EventEmitter<void>();
  @Output() luxStepChanged: EventEmitter<LuxStepperLargeSelectionEvent> = new EventEmitter<LuxStepperLargeSelectionEvent>();
  @Output() luxCurrentStepNumberChange: EventEmitter<number> = new EventEmitter();

  _luxCurrentStepNumber = 0;

  get luxCurrentStepNumber(): number {
    return this._luxCurrentStepNumber;
  }

  @Input()
  set luxCurrentStepNumber(stepNumber: number) {
    if (this.luxCurrentStepNumber !== stepNumber) {
      const prevStepIndex = this.luxCurrentStepNumber;
      if (
        stepNumber >= 0 &&
        stepNumber < (this.steps ? this.steps.length : 0) &&
        this.steps &&
        this.steps.get(stepNumber) &&
        this.steps.get(stepNumber).luxTouched
      ) {
        this._luxCurrentStepNumber = stepNumber;
        this.isFirstStep = stepNumber === 0;
        this.isLastStep = stepNumber === this.steps.length - 1;

        this.luxCurrentStepNumberChange.emit(this._luxCurrentStepNumber);
        this.luxStepChanged.emit({
          stepper: this,
          prevIndex: prevStepIndex,
          prevStep: this.steps.get(prevStepIndex),
          currentIndex: this._luxCurrentStepNumber,
          currentStep: this.steps.get(this._luxCurrentStepNumber)
        });
        LuxUtil.goTo('luxstepperlargenavitem' + (this.luxCurrentStepNumber + 1));
        if (this.isMobile) {
          LuxUtil.goTo('luxstepperlargemobilecontentanchor');
        } else {
          LuxUtil.goTo('luxstepperlargecontentanchor');
        }
      }
    }
  }

  isMobile = false;
  isFirstStep = true;
  isLastStep = false;
  isFinished = false;
  cursorPos = -1;

  subscriptions: Subscription[] = [];

  constructor(
    private mobileOverlayService: LuxStepperLargeMobileOverlayService,
    private queryService: LuxMediaQueryObserverService,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.queryService.getMediaQueryChangedAsObservable().subscribe((query) => {
        this.isMobile = query === 'xs' || query === 'sm';
      })
    );
  }

  ngAfterContentInit() {
    if (this.luxCurrentStepNumber >= 0 && this.luxCurrentStepNumber < this.steps.length) {
      this.steps.get(this.luxCurrentStepNumber).luxTouched = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onPrevStep() {
    const newIndex = this.getPrevIndex(this.luxCurrentStepNumber);

    const event: LuxStepperLargeClickEvent = {
      stepper: this,
      newIndex: newIndex,
      newStep: this.steps.get(newIndex)
    };
    const vetoPromise = this.steps.get(this.luxCurrentStepNumber).luxVetoFn(event);

    vetoPromise
      .then((veto) => {
        if (veto === LuxVetoState.navigationAccepted) {
          this.activatePrevStep(newIndex);
        }
      })
      .catch((err) => console.error(err));
  }

  onNextStep() {
    const newIndex = this.getNextIndex(this.luxCurrentStepNumber);

    const event: LuxStepperLargeClickEvent = {
      stepper: this,
      newIndex: newIndex,
      newStep: this.steps.get(newIndex)
    };
    const vetoPromise = this.steps.get(this.luxCurrentStepNumber).luxVetoFn(event);

    vetoPromise
      .then((veto) => {
        if (veto === LuxVetoState.navigationAccepted) {
          this.activateNextStep(newIndex);
        }
      })
      .catch((err) => console.error(err));
  }

  onFinStep() {
    const event: LuxStepperLargeClickEvent = {
      stepper: this,
      newIndex: this.luxCurrentStepNumber,
      newStep: this.steps.get(this.luxCurrentStepNumber)
    };
    const vetoPromise = this.steps.get(this.luxCurrentStepNumber).luxVetoFn(event);

    vetoPromise
      .then((veto) => {
        if (veto === LuxVetoState.navigationAccepted) {
          // Prüfen, ob es einen Step gibt, der noch nicht abgeschlossen ist.
          const index = this.steps.toArray().findIndex((step) => !step.luxCompleted);
          if (index === -1) {
            // Alle Steps signalisieren (luxCompleted = true) das sie valide sind.
            // Der Stepper kann beendet werden.
            this.finishStepper();
          } else {
            // Mindestens ein Step (luxCompleted = false) ist noch nicht valide.
            // Springe zum ersten nicht validen Schritt.
            this.luxCurrentStepNumber = index;
          }
        }
      })
      .catch((err) => console.error(err));
  }

  onNavFocusin(index: number) {
    if (index === this.luxCurrentStepNumber) {
      // Dieser Timeout ist nötig, um einen ExpressionChangedAfterItHasBeenCheckedError zu vermeiden.
      // Details:
      // Ohne Timeout würde die Cursorposition zweimal (alter Eintrag verliert den Fokus "this.cursorPos = -1" und
      // neuer Eintrag erhält den Fokus "this.cursorPos = index") innerhalb eines Zyklus geändert werden,
      // was zu dem ExpressionChangedAfterItHasBeenCheckedError führt.
      // Dieser Fehler wurde entdeckt, als man in einer Veto-Methode einen Dialog geöffnet hat.
      setTimeout(() => {
        this.cursorPos = index;
      });
    }
  }

  onNavFocusout(index: number) {
    if (index === this.luxCurrentStepNumber) {
      this.cursorPos = -1;
    }
  }

  onNavLinkEnter(stepIndex: number) {
    const newIndex = stepIndex === this.cursorPos ? stepIndex : this.cursorPos;
    this.onNavLink(newIndex);
    this.liveAnnouncer.announce('Schritt ausgewählt');
  }

  onNavLink(stepIndex: number) {
    const event: LuxStepperLargeClickEvent = { stepper: this, newIndex: stepIndex, newStep: this.steps.get(stepIndex) };
    const vetoPromise = this.steps.get(this.luxCurrentStepNumber).luxVetoFn(event);

    vetoPromise
      .then((veto) => {
        if (veto === LuxVetoState.navigationAccepted) {
          this.luxCurrentStepNumber = stepIndex;
          this.cursorPos = -1;
        }
      })
      .catch((err) => console.error(err));
  }

  onOpenMobileOverlay() {
    this.mobileOverlayService.open({ data: { stepperComponent: this } });
  }

  onResetStepper() {
    this.luxCurrentStepNumber = 0;
    this.isFinished = false;
  }

  onNavKeyUp() {
    if (this.cursorPos === -1) {
      this.cursorPos = this.luxCurrentStepNumber;
    }

    if (this.cursorPos > 0) {
      this.cursorPos = this.cursorPos - 1;
      this.liveAnnouncer.announce('Schritt' + (this.cursorPos + 1) + ' ' + this.steps.get(this.cursorPos).luxTitle);
    }
  }

  onNavKeyDown() {
    if (this.cursorPos === -1) {
      this.cursorPos = this.luxCurrentStepNumber;
    }

    const lastTouchedStepIndex =
      this.steps.length -
      1 -
      this.steps
        .toArray()
        .reverse()
        .findIndex((step) => step.luxTouched);
    if (this.cursorPos < lastTouchedStepIndex) {
      this.cursorPos = this.cursorPos + 1;
      this.liveAnnouncer.announce('Schritt' + (this.cursorPos + 1) + ' ' + this.steps.get(this.cursorPos).luxTitle);
    }
  }

  private activatePrevStep(newIndex: number) {
    const newStepNumber = newIndex;

    if (newStepNumber >= 0 && newStepNumber < (this.steps ? this.steps.length : 0) && this.steps && this.steps.get(newStepNumber)) {
      this.steps.get(newStepNumber).luxTouched = true;
      this.luxCurrentStepNumber = newStepNumber;
    }
  }

  private activateNextStep(newIndex: number) {
    const newStepNumber = newIndex;

    if (newStepNumber >= 0 && newStepNumber < (this.steps ? this.steps.length : 0) && this.steps && this.steps.get(newStepNumber)) {
      this.steps.get(newStepNumber).luxTouched = true;
      this.luxCurrentStepNumber = newStepNumber;
      this.liveAnnouncer.announce('Schritt' + (newStepNumber + 1) + ' ' + this.steps.get(newStepNumber).luxTitle + ' aktiv.');
    }
  }

  private finishStepper() {
    this.isFinished = true;
    this.luxStepperFinished.emit();
  }

  private getPrevIndex(index: number) {
    const newIndex = index - 1;
    if (!this.steps.get(newIndex).luxDisabled) {
      return newIndex;
    } else {
      return this.getPrevIndex(newIndex);
    }
  }

  private getNextIndex(index: number) {
    const newIndex = index + 1;
    if (!this.steps.get(newIndex).luxDisabled) {
      return newIndex;
    } else {
      this.steps.get(newIndex).luxTouched = true;
      return this.getNextIndex(newIndex);
    }
  }
}
