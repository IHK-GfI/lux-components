import { Component } from '@angular/core';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss']
})
export class CardExampleComponent {
  showActions = true;
  showIcon = true;
  showInfo = true;
  useExpandableContent = true;
  btn2Raised = true;
  disabled = false;
  titleLineBreak = false;
  title = `Lorem ipsum dolor sit amet, consectetur adipisici elit.`;
  subTitle = 'Sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
  expanded = false;
  heading = 2;
  headingValidator = Validators.pattern('[1-6]');

  constructor(private snackbar: LuxSnackbarService) {
  }

  onCardClicked() {
    console.log('Card clicked');
    this.snackbar.open(3000, {
      text: 'Card clicked',
      iconName: 'fas fa-info'
    });
  }

  changeInfo(showInfo: boolean) {
    if (showInfo === true) {
      this.useExpandableContent = false;
    }

    this.showInfo = showInfo;
  }

  changeExpandable(showExpandableContent: boolean) {
    if (showExpandableContent === true) {
      this.showInfo = false;
    }

    this.useExpandableContent = showExpandableContent;
  }
}
