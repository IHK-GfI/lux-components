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
  useExpandableContent = false;
  btn2Raised = true;
  hideCardContent = false;
  disabled = false;
  titleLineBreak = true;
  title = `Testkarte - Lorem ipsum dolor sit amet, consectetur adipisici elit.`;
  titleTooltip = ``;
  subTitle = 'Sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
  subTitleTooltip = ``;
  iconName = 'lux-cogs';
  iconShowRight = true;
  raised = false;
  expanded = false;
  heading = 2;
  headingValidator = Validators.pattern('[1-6]');
  closeLabel = 'Weniger Inhalt Anzeigen';
  openLabel = 'Mehr Inhalt Anzeigen';

  constructor(private snackbar: LuxSnackbarService) {}

  onCardClicked() {
    console.log('Card clicked');
    this.snackbar.open(3000, {
      text: 'Card clicked',
      iconName: 'lux-info'
    });
  }
}
