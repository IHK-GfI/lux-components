import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxBadgeNotificationColor, LuxBadgeNotificationSize } from '../../lux-directives/lux-badge-notification/lux-badge-notification.directive';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tile-authentic',
  templateUrl: './lux-tile-authentic.component.html',
  styleUrls: ['./lux-tile-authentic.component.scss']
})
export class LuxTileAuthenticComponent implements OnInit, OnChanges, OnDestroy {
  @Input() luxLabel?: string;
  @Input() luxSubTitle?: string;
  @Input() luxTagId?: string;

  @Input() set luxShowNotification(value: boolean) {
    this._showNotification = value;
    this.updateBadgeContent();
  };
  get luxShowNotification() {
    return this._showNotification;
  }

  @Input() set luxCounter(counter: number | undefined){
    this._counter = counter;
    console.log(this.luxCounter)
    this.updateBadgeContent()
  }
  get luxCounter() {
    return this._counter;
  }

  @Input() luxCounterCap = 10;
  @Input() luxNotificationColor: LuxBadgeNotificationColor = 'primary';
  @Input() luxNotificationSize: LuxBadgeNotificationSize = 'medium';

  private _showNotification = false;
  private _counter?: number;
 
  luxBadgeContent = '';
  
  @Output() luxClicked = new EventEmitter<Event>();

  mobileView?: boolean;
  subscription?: Subscription;

  constructor(private queryService: LuxMediaQueryObserverService) {}

  ngOnInit() {
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
    this.updateBadgeContent();
  }

  ngOnChanges() {
    this.updateBadgeContent();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clicked() {
    this.luxClicked.emit();
  }

  getBadgeContent(){
    this.updateBadgeContent();
    return this.luxBadgeContent;
  }

  private updateBadgeContent(){
    if(!this.luxCounter){
      if(this.luxShowNotification) {
        this.luxBadgeContent = ' ';
      } else {
        this.luxBadgeContent = '';
      }
    } else {
      this.luxBadgeContent = '' + this.luxCounter;
    }    
  }
}
