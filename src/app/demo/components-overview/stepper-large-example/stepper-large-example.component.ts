import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LuxThemeService } from '../../../modules/lux-theme/lux-theme.service';
import { LuxStepperLargeSelectionEvent } from '../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-selection-event';
import { LuxStepperLargeComponent } from '../../../modules/lux-layout/lux-stepper-large/lux-stepper-large.component';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { StepperLargeExampleDataService } from './stepper-large-example-data.service';

@Component({
  selector: 'lux-stepper-large-example',
  templateUrl: './stepper-large-example.component.html',
  styleUrls: ['./stepper-large-example.component.scss']
})
export class StepperLargeExampleComponent {
  @ViewChild(LuxStepperLargeComponent) stepper!: LuxStepperLargeComponent;

  allowed = false;
  stepValidationActive = true;
  currentStepIndex = 0;
  options: any[] = ['100%', '800px', '1000px', '1200px'];
  maxWidth = this.options[0];
  completed = true;
  theme = '';

  constructor(public dataService: StepperLargeExampleDataService, private router: Router, private snackbar: LuxSnackbarService, private themeService: LuxThemeService) {
    this.theme = themeService.getTheme().name;
  }

  onStepChanged(event: LuxStepperLargeSelectionEvent) {
    console.log(
      `Event 'luxStepChanged': Von \nSchritt "${event.prevStep.luxTitle}" (index = ${event.prevIndex}) nach \nSchritt "${event.currentStep.luxTitle}" (index = ${event.currentIndex})`
    );
    console.log(`Stepper-Index': ${event.stepper.luxCurrentStepNumber}`);
    if (this.currentStepIndex == 1) {
      this.dataService.luxStepValidationActive = this.stepValidationActive;
    }
  }

  onFinish() {
    const snackbarDuration = 5000;

    this.snackbar.open(snackbarDuration, {
      iconName: 'lux-info',
      iconSize: '2x',
      iconColor: 'green',
      text: 'Stepper erfolgreich abgeschlossen!'
    });

    setTimeout(() => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }, snackbarDuration);
  }
}
