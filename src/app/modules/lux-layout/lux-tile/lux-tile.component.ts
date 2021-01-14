import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tile',
  templateUrl: './lux-tile.component.html',
  styleUrls: ['./lux-tile.component.scss']
})
export class LuxTileComponent {
  private static _notificationNewClass = 'lux-notification-new';
  private static _notificationReadClass = 'lux-notification-read';

  @Input() luxLabel: string = undefined;
  @Input() luxTagId: string = undefined;
  @Input() luxShowNotification;
  @Input() luxCounter: number;
  @Input() luxCounterCap = 10;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(public queryService: LuxMediaQueryObserverService) {}

  clicked() {
    this.luxClicked.emit();
  }

  getNotificationIconColorClass(): string {
    return this.luxShowNotification === true || this.luxShowNotification === 'true'
      ? LuxTileComponent._notificationNewClass
      : LuxTileComponent._notificationReadClass;
  }
}
