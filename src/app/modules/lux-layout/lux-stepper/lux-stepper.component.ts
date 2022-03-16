import { CdkStepHeader } from '@angular/cdk/stepper/step-header';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import { ILuxStepperButtonConfig } from './lux-stepper-model/lux-stepper-button-config.interface';
import { LuxStepperHelperService } from './lux-stepper-helper.service';
import { LuxStepComponent } from './lux-stepper-subcomponents/lux-step.component';
import { ILuxStepperConfiguration } from './lux-stepper-model/lux-stepper-configuration.interface';
import { MatHorizontalStepper, MatStepHeader, MatVerticalStepper } from '@angular/material/stepper';
import { LuxIconComponent } from '../../lux-icon/lux-icon/lux-icon.component';
import { LuxUtil } from '../../lux-util/lux-util';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { skip } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-stepper',
  templateUrl: './lux-stepper.component.html',
  styleUrls: ['./lux-stepper.component.scss']
})
export class LuxStepperComponent implements AfterViewInit, OnDestroy {
  private readonly _DEFAULT_PREV_BTN_CONF: ILuxStepperButtonConfig = {
    label: $localize `:@@luxc.stepper.back.btn:Zurück`
  };
  private readonly _DEFAULT_NEXT_BTN_CONF: ILuxStepperButtonConfig = {
    label: $localize `:@@luxc.stepper.next.btn:Weiter`
  };
  private readonly _DEFAULT_FIN_BTN_CONF: ILuxStepperButtonConfig = {
    label: $localize `:@@luxc.stepper.finish.btn:Abschließen`,
    color: 'primary'
  };

  @ContentChildren(LuxStepComponent) luxSteps: QueryList<LuxStepComponent>;

  @Output() luxFinishButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() luxStepChanged: EventEmitter<StepperSelectionEvent> = new EventEmitter<StepperSelectionEvent>();
  @Output() luxCurrentStepNumberChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() luxCheckValidation: EventEmitter<number> = new EventEmitter<number>();
  @Output() luxStepClicked: EventEmitter<number> = new EventEmitter<number>();

  matStepper: MatHorizontalStepper | MatVerticalStepper;
  matStepLabels: ViewContainerRef[];
  matStepHeaders: CdkStepHeader[];

  stepperConfiguration: ILuxStepperConfiguration = {
    luxCurrentStepNumber: 0,
    luxShowNavigationButtons: true,
    luxHorizontalStepAnimationActive: true,
    luxEditedIconName: 'fa-pencil'
  };

  private subscriptions: Subscription[] = [];

  constructor(
    public stepperService: LuxStepperHelperService,
    private cdr: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private elementRef: ElementRef
  ) {
    // Die Default-Konfiguration präventiv als Startwert setzen
    this.luxPreviousButtonConfig = this._DEFAULT_PREV_BTN_CONF;
    this.luxNextButtonConfig = this._DEFAULT_NEXT_BTN_CONF;
    this.luxFinishButtonConfig = this._DEFAULT_FIN_BTN_CONF;
    // Den Stepper im Helper-Service bekannt machen
    this.stepperService.registerStepper(this);
  }

  ngAfterViewInit() {
    // Änderungen an den steps sollten auch dem Konfigurationsobjekt bekannt gemacht werden
    this.subscriptions.push(this.luxSteps.changes.subscribe(() => {
      this.stepperConfiguration.luxSteps = this.luxSteps.toArray();
      this.cdr.detectChanges();
      this.updateIcons();
    }));
    // Initial die aktuellen steps in die Konfiguration schreiben
    this.stepperConfiguration.luxSteps = this.luxSteps.toArray();
    this.cdr.detectChanges();

    // Falls initial bereits bestimmt wurde, dass individuelle Icons genutzt werden, diese generieren
    if (this.stepperConfiguration.luxUseCustomIcons) {
      this.generateCustomIcons();
    }

    // Workaround: this.matStepper._stepHeader
    // Normalerweise sollte man über this.matStepper._stepHeader an die MatStepHeader kommen,
    // aber leider ist mit Angular 9 die QueryList<MatStepHeader> nur in diesem Lifecycle Hook
    // "ngAfterViewInit" gefüllt und danach immer leer. Deshalb werden hier die MatStepHeader
    // zwischengespeichert.
    this.matStepHeaders = this.matStepper._stepHeader.toArray();

    this.subscriptions.push(this.matStepper._stepHeader.changes.subscribe(newStepHeaders => {
      this.matStepHeaders = newStepHeaders.toArray();
    }));

    // Auf next/previous Aufrufe aus dem Service horchen und entsprechend reagieren
    this.subscriptions.push(this.stepperService
      .getObservable(this)
      .pipe(skip(1))
      .subscribe((next: boolean) => {
        // Voraussetzung: Stepper nicht deaktiviert
        if (!this.stepperConfiguration.luxDisabled) {
          if (next === true) {
            this.checkValidation();
            this.matStepper.next();
            if (this.matStepper.selectedIndex < this.matStepHeaders.length) {
              this.matStepHeaders[this.matStepper.selectedIndex].focus();
            }
          } else if (next === false) {
            this.matStepper.previous();
            if (this.matStepper.selectedIndex < this.matStepHeaders.length) {
              this.matStepHeaders[this.matStepper.selectedIndex].focus();
            }
          }
        }
      }));

    // Änderungen an den Icons jedes einzelnen Steps führt zu Neugenerierung aller individuellen Icons
    // ==> Material erlaubt leider nur alle Icons identisch zu ändern, nicht für jeden Step einzeln, deshalb
    // generieren wir selbst die Icons.
    this.luxSteps.toArray().forEach((luxStep: LuxStepComponent) => {
      this.subscriptions.push(luxStep.getIconChangeObsv().subscribe((iconChange: boolean) => {
        if (this.stepperConfiguration.luxUseCustomIcons && iconChange) {
          this.updateIcons();
        }
      }));
    });

    this.setFocusedCSS(this.luxCurrentStepNumber);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Wird beim Wechsel des aktuellen Steps (Klick auf Tab oder .next()/.previous() Aufruf) aufgerufen.
   *
   * @param $event
   */
  onStepChanged($event: StepperSelectionEvent) {
    this.luxCurrentStepNumber = $event.selectedIndex;
    this.luxStepChanged.emit($event);

    const matStepHeaders: NodeListOf<any> = this.elementRef.nativeElement.querySelectorAll('mat-step-header');
    if (matStepHeaders.item($event.selectedIndex).className.indexOf('lux-step-header-touched') === -1) {
      matStepHeaders.item($event.selectedIndex).className += ' lux-step-header-touched';
    }

    this.setFocusedCSS($event.selectedIndex);
  }

  /**
   * Generiert die individuellen Icons fuer die Steps.
   */
  generateCustomIcons() {
    const factory = this.cfr.resolveComponentFactory(LuxIconComponent);
    let index = 0;
    this.matStepLabels.forEach((stepLabel: ViewContainerRef) => {
      this.generateCustomIconForStep(stepLabel, this.luxSteps.toArray()[index], factory);
      index++;
    });
  }

  /**
   * Entfernt die eigenen Icons fuer die Steps.
   */
  clearCustomIcons() {
    this.matStepLabels.forEach((stepLabel: ViewContainerRef) => {
      stepLabel.clear();
    });
  }

  /**
   * Stößt die Validierungsprüfung für den aktuell sichtbaren Step und dessen StepControl (wenn vorhanden) an.
   */
  checkValidation() {
    const stepControl = this.luxSteps.toArray()[this.stepperConfiguration.luxCurrentStepNumber].luxStepControl;
    if (stepControl) {
      LuxUtil.showValidationErrors(stepControl);
    }
  }

  onStepClicked(event: number) {
    this.luxStepClicked.emit(event);

    this.checkValidation();
    // Das Event könnte interessant sein, wenn die Property "luxCompleted" verwendet wird und kein Formular.
    this.luxCheckValidation.emit(event);
  }

  /**
   * Generiert die Icons fuer einen einzelnen Step
   *
   * @param stepLabel
   * @param luxStep
   * @param factory
   */
  private generateCustomIconForStep(
    stepLabel: ViewContainerRef,
    luxStep: LuxStepComponent,
    factory: ComponentFactory<LuxIconComponent>
  ) {
    if (luxStep && luxStep.luxIconName) {
      // Das edited und normal Icon generieren
      const componentIconEdited: ComponentRef<LuxIconComponent> = stepLabel.createComponent(factory);
      const instanceIconEdited: LuxIconComponent = componentIconEdited.instance;

      instanceIconEdited.luxIconName = this.luxEditedIconName;
      instanceIconEdited.luxIconSize = '2x';
      instanceIconEdited.luxRounded = true;
      instanceIconEdited.luxMargin = '0 8px 0 0';
      componentIconEdited.location.nativeElement.className += ' lux-stepper-edited-icon';

      const componentIconNormal: ComponentRef<LuxIconComponent> = stepLabel.createComponent(factory);
      const instanceIconNormal: LuxIconComponent = componentIconNormal.instance;
      instanceIconNormal.luxIconName = luxStep.luxIconName;
      instanceIconNormal.luxIconSize = '2x';
      instanceIconNormal.luxRounded = true;
      instanceIconNormal.luxMargin = '0 8px 0 0';
      componentIconNormal.location.nativeElement.className += ' lux-stepper-normal-icon';
    }
  }

  /**
   * Aktualisiert die aktuellen Icons, entfernt zunächst die individuellen Icons und
   * versucht anschließend diese neu zu generieren (nötig bei Änderungen).
   */
  private updateIcons() {
    if (this.matStepLabels) {
      this.clearCustomIcons();
      if (this.stepperConfiguration.luxUseCustomIcons) {
        this.generateCustomIcons();
      }
    }
  }

  private setFocusedCSS(index: number) {
    const matStepHeaders: NodeListOf<any> = this.elementRef.nativeElement.querySelectorAll('mat-step-header');
    if (matStepHeaders.item(index).className.indexOf('lux-step-header-touched') === -1) {
      matStepHeaders.item(index).className += ' lux-step-header-touched';
    }
  }

  // region ###### Accessoren, die auf die stepperConfiguration verweisen ######

  /**** Getter/Setter luxCurrentStepNumber ****/
  get luxCurrentStepNumber() {
    return this.stepperConfiguration.luxCurrentStepNumber;
  }

  @Input() set luxCurrentStepNumber(step: number) {
    if (step !== this.luxCurrentStepNumber) {
      setTimeout(() => {
        // OutOfBound-Steps abfangen
        step = step < 0 ? 0 : step;
        step = step >= this.luxSteps.length ? this.luxSteps.length - 1 : step;

        this.stepperConfiguration.luxCurrentStepNumber = step;
        this.luxCurrentStepNumberChange.emit(this.stepperConfiguration.luxCurrentStepNumber);
      });
    }
  }

  /**** Getter/Setter luxUseCustomIcons ****/
  get luxUseCustomIcons() {
    return this.stepperConfiguration.luxUseCustomIcons;
  }

  @Input() set luxUseCustomIcons(use: boolean) {
    this.stepperConfiguration.luxUseCustomIcons = use;
    setTimeout(() => {
      this.updateIcons();
    });
  }

  /**** Getter/Setter luxEditedIconName ****/
  get luxEditedIconName() {
    return this.stepperConfiguration.luxEditedIconName;
  }

  @Input() set luxEditedIconName(iconName: string) {
    this.stepperConfiguration.luxEditedIconName = iconName;
    this.updateIcons();
  }

  /**** Getter/Setter luxVerticalStepper ****/
  get luxVerticalStepper() {
    return this.stepperConfiguration.luxVerticalStepper;
  }

  @Input() set luxVerticalStepper(vertical: boolean) {
    this.stepperConfiguration.luxVerticalStepper = vertical;
  }

  /**** Getter/Setter luxLinear ****/
  get luxLinear() {
    return this.stepperConfiguration.luxLinear;
  }

  @Input() set luxLinear(linear: boolean) {
    this.stepperConfiguration.luxLinear = linear;
  }

  /**** Getter/Setter luxDisabled ****/
  get luxDisabled() {
    return this.stepperConfiguration.luxDisabled;
  }

  @Input() set luxDisabled(disabled: boolean) {
    this.stepperConfiguration.luxDisabled = disabled;
  }

  /**** Getter/Setter luxShowNavigationButtons ****/
  get luxShowNavigationButtons() {
    return this.stepperConfiguration.luxShowNavigationButtons;
  }

  @Input() set luxShowNavigationButtons(showNavButtons: boolean) {
    this.stepperConfiguration.luxShowNavigationButtons = showNavButtons;
  }

  /**** Getter/Setter luxHorizontalStepAnimationActive ****/
  get luxHorizontalStepAnimationActive() {
    return this.stepperConfiguration.luxHorizontalStepAnimationActive;
  }

  @Input() set luxHorizontalStepAnimationActive(animationActive: boolean) {
    this.stepperConfiguration.luxHorizontalStepAnimationActive = animationActive;
  }

  /**** Getter/Setter luxPreviousButtonConfig ****/
  get luxPreviousButtonConfig() {
    return this.stepperConfiguration.luxPreviousButtonConfig;
  }

  @Input() set luxPreviousButtonConfig(config: ILuxStepperButtonConfig) {
    this.stepperConfiguration.luxPreviousButtonConfig = config ? config : this._DEFAULT_PREV_BTN_CONF;
  }

  /**** Getter/Setter luxNextButtonConfig ****/
  get luxNextButtonConfig() {
    return this.stepperConfiguration.luxNextButtonConfig;
  }

  @Input() set luxNextButtonConfig(config: ILuxStepperButtonConfig) {
    this.stepperConfiguration.luxNextButtonConfig = config ? config : this._DEFAULT_NEXT_BTN_CONF;
  }

  /**** Getter/Setter luxFinishButtonConfig ****/
  get luxFinishButtonConfig() {
    return this.stepperConfiguration.luxFinishButtonConfig;
  }

  @Input() set luxFinishButtonConfig(config: ILuxStepperButtonConfig) {
    this.stepperConfiguration.luxFinishButtonConfig = config ? config : this._DEFAULT_FIN_BTN_CONF;
  }

  // endregion
}
