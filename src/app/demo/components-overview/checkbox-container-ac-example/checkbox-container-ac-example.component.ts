import { Component } from '@angular/core';
import { LuxMediaQueryObserverService } from '../../../modules/lux-util/lux-media-query-observer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkbox-container-ac-example',
  templateUrl: './checkbox-container-ac-example.component.html',
  styleUrls: ['./checkbox-container-ac-example.component.scss']
})
export class CheckboxContainerAcExampleComponent {
  label = 'Optionales Label für den Container';
  isVertical = true;
  isSmall: boolean;
  subscriptions: Subscription[] = [];

  constructor(private mediaQuery: LuxMediaQueryObserverService) {
    this.isSmall = mediaQuery.isSmaller('md');
    this.subscriptions.push(
      this.mediaQuery.getMediaQueryChangedAsObservable().subscribe((query) => {
        this.isSmall = mediaQuery.isSmaller('md');
      })
    );
  }
}
