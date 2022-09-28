import { Component } from '@angular/core';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss']
})
export class CardExampleComponent {
  // region Helper-Properties für das Beispiel

  showActions = true;
  showIcon = true;
  showInfo = true;
  useExpandableContent = true;
  btn2Raised = true;
  // endregion

  // region Properties der Component

  disabled = false;
  titleLineBreak = true;
  title = `Lorem ipsum dolor sit amet, consectetur adipisici elit.`;
  subTitle = 'Sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
  iconName ="lux-cogs"
  iconShowRight = true;
  raised = false;
  expanded = false;
  heading = 2;
  headingValidator = Validators.pattern('[1-6]');
  closeLabel = 'Weniger Inhalt Anzeigen';
  openLabel = 'Mehr Inhalt Anzeigen';
  // endregion

  constructor(private snackbar: LuxSnackbarService) {
  }

  onCardClicked() {
    console.log('Card clicked');
    this.snackbar.open(3000, {
      text: 'Card clicked',
      iconName: 'lux-info'
    });
  }

}
