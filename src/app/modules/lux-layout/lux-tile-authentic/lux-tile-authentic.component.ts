import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tile-authentic',
  templateUrl: './lux-tile-authentic.component.html',
  styleUrls: ['./lux-tile-authentic.component.scss']
})
export class LuxTileAuthenticComponent implements OnInit, OnDestroy {
  private static _notificationNewClass = 'lux-notification-new';
  private static _notificationReadClass = 'lux-notification-read';

  @Input() luxLabel: string = undefined;
  @Input() luxTagId: string = undefined;
  @Input() luxShowNotification;
  @Input() luxCounter: number;
  @Input() luxCounterCap = 10;

  @Input() luxSubTitle: string = undefined;


  @Output() luxClicked: EventEmitter<any> = new EventEmitter<any>();

  mobileView: boolean;
  subscription: Subscription;

  constructor(private queryService: LuxMediaQueryObserverService) {}

  ngOnInit() {
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clicked() {
    this.luxClicked.emit();
  }

  getNotificationIconColorClass(): string {
    return this.luxShowNotification === true || this.luxShowNotification === 'true'
      ? LuxTileAuthenticComponent._notificationNewClass
      : LuxTileAuthenticComponent._notificationReadClass;
  }
}