import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { ILuxStepperConfiguration } from './lux-stepper-configuration.interface';

/**
 * Parent-Klasse für den LuxStepperVertical und LuxStepperHorizontal, beide Komponenten werden ausschließlich von
 * dem LuxStepper zur Darstellung genutzt.
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export class LuxStepperParent implements OnDestroy, AfterViewInit {
  // Diese Outputs werden bei den Klicks auf die Stepper-eigenen Navigations-Buttons augelöst und informieren die
  // LuxStepperComponent
  @Output() luxFinButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() luxNextButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() luxPrevButtonClicked: EventEmitter<any> = new EventEmitter();
  // Wird beim Wechsel des Steps (über Header oder Button) aufgerufen
  @Output() luxStepChanged: EventEmitter<StepperSelectionEvent> = new EventEmitter<StepperSelectionEvent>();
  // über die aktuellen Elemente informiert zu halten
  @Output() luxMatStepperLoaded: EventEmitter<MatHorizontalStepper | MatVerticalStepper> = new EventEmitter();
  @Output() luxMatStepLabelsLoaded: EventEmitter<ViewContainerRef[]> = new EventEmitter();
  @Output() luxStepClicked: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('stepper', { static: true }) matStepper: MatHorizontalStepper | MatVerticalStepper;
  @ViewChildren('matStepLabel', { read: ViewContainerRef }) matStepLabels: QueryList<ViewContainerRef>;

  @Input() luxStepperConfig: ILuxStepperConfiguration;

  subscription: Subscription;

  constructor() {}

  ngAfterViewInit() {
    // Sobald die Component initialisiert ist, dem Parent (luxStepper) den
    // MatStepper und die MatStepLabels mitteilen
    this.luxMatStepperLoaded.emit(this.matStepper);
    this.luxMatStepLabelsLoaded.emit(this.matStepLabels.toArray());
    this.subscription = this.matStepLabels.changes.subscribe(() => {
      this.luxMatStepLabelsLoaded.emit(this.matStepLabels.toArray());
    });
  }

  onStepClicked(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const stepIndex = this.getStepIndex(target as HTMLElement);

    if (stepIndex !== -1) {
      this.luxStepClicked.emit(stepIndex);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getStepIndex(element: HTMLElement, count: number = 0): number {
    if (element) {
      if ('mat-step-header' === element.nodeName.toLowerCase()) {
        // Das Attribut "aria-posinset" fängt mit dem Index 1 an,
        // während das Property "luxCurrentStepNumber" bei Index 0 beginnt.
        // Deshalb wird hier -1 gerechnet.
        return (+element.getAttribute('aria-posinset')) - 1;
      } else {
        if (count <= 10) {
          return this.getStepIndex(element.parentElement, count + 1);
        } else {
          return -1;
        }
      }
    } else {
      return -1;
    }
  }
}
