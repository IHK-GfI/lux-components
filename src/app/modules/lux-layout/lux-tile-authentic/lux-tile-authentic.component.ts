import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tile-authentic',
  templateUrl: './lux-tile-authentic.component.html',
  styleUrls: ['./lux-tile-authentic.component.scss']
})
export class LuxTileAuthenticComponent implements OnInit, OnDestroy {
  @Input() luxLabel?: string;
  @Input() luxSubTitle?: string;
  @Input() luxTagId?: string;
  @Input() luxShowNotification?: boolean;
  @Input() luxCounter?: number;
  @Input() luxCounterCap = 10;

  @Output() luxClicked = new EventEmitter<Event>();

  mobileView?: boolean;
  subscription?: Subscription;

  constructor(private queryService: LuxMediaQueryObserverService) {}

  ngOnInit() {
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clicked() {
    this.luxClicked.emit();
  }
}
