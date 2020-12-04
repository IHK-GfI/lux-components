import { Component, OnInit } from '@angular/core';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss']
})
export class CardExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showActions = true;
  showIcon = true;
  showInfo = true;
  useExpandableContent = true;

  // endregion

  // region Properties der Component

  disabled = false;
  titleLineBreak = false;
  title = 'H2 - Lorem ipsum dolor sit amet, consectetur adipisici elit.';
  subTitle = 'Sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
  expanded: boolean = false;

  // endregion

  constructor(private snackbar: LuxSnackbarService) {}

  ngOnInit() {}

  onCardClicked() {
    console.log('Card clicked');
    this.snackbar.open(3000, {
      text: 'Card clicked',
      iconName: 'fas fa-info'
    });
  }

  changeInfo($event: boolean) {
    if ($event === true) {
      this.useExpandableContent = false;
    }

    this.showInfo = $event;
  }

  changeSwitched($event: boolean) {
    if ($event === true) {
      this.showInfo = false;
      this.useExpandableContent = false;
    }
  }

  changeExpandable($event: boolean) {
    if ($event === true) {
      this.showInfo = false;
    }

    this.useExpandableContent = $event;
  }
}
