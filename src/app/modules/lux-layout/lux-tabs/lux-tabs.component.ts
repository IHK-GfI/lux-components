import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { LuxTabComponent } from './lux-tabs-subcomponents/lux-tab.component';
import { MatTabChangeEvent } from '@angular/material';
import { ReplaySubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tabs',
  templateUrl: './lux-tabs.component.html',
  styleUrls: ['./lux-tabs.component.scss']
})
export class LuxTabsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private static readonly _DEBOUNCE_TIME: number = 50;

  private static _notificationNewClass = 'lux-notification-new';
  private static _notificationReadClass = 'lux-notification-read';

  private configSubscription: Subscription;

  tabChange$: ReplaySubject<MatTabChangeEvent> = new ReplaySubject<MatTabChangeEvent>(1);
  labelUppercase: boolean;

  @Input() luxTabAnimationActive: boolean = true;
  @Input() luxActiveTab: number = 0;
  @Input() luxIconSize: string = '2x';
  @Input() luxDisplayDivider: boolean = true;
  @Input() luxTagId: string;
  @Input() luxLazyLoading: boolean = false;

  @Output() readonly luxActiveTabChanged: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(LuxTabComponent) luxTabs: QueryList<LuxTabComponent>;
  @ViewChild('matTabs', { read: ElementRef, static: true }) tabHeader;

  constructor(
    public componentsConfigService: LuxComponentsConfigService,
    public queryService: LuxMediaQueryObserverService
  ) {}

  ngOnInit() {
    this.tabChange$
      .asObservable()
      .pipe(debounceTime(LuxTabsComponent._DEBOUNCE_TIME))
      .subscribe((tabChange: MatTabChangeEvent) => {
        this.luxActiveTab = tabChange.index;
        this.luxActiveTabChanged.emit(tabChange);
      });

    this.configSubscription = this.componentsConfigService.config.subscribe(() => {
      this.labelUppercase = this.componentsConfigService.isLabelUppercaseForSelector('lux-tab');
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const activeTabChange = simpleChanges.activeTab;
    if (activeTabChange) {
      if (!activeTabChange.currentValue) {
        this.luxActiveTab = 0;
      }
    }
  }

  ngAfterViewInit() {
    this.rerenderTabs();
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

  getNotificationIconColorClassForTab(luxTab: LuxTabComponent): string {
    return luxTab.luxShowNotification === true || luxTab.luxShowNotification === 'true'
      ? LuxTabsComponent._notificationNewClass
      : LuxTabsComponent._notificationReadClass;
  }

  /**
   * Forciert Angular die Tab-Header neu zu pruefen, in dem
   * der erste Tab ein Leerzeichen bekommt, welches im naechsten
   * Pruefzyklus entfernt wird.
   */
  rerenderTabs() {
    if (this.luxTabs.length > 0) {
      setTimeout(() => {
        this.luxTabs.first.luxTitle += ' ';
        setTimeout(() => {
          this.luxTabs.first.luxTitle = this.luxTabs.first.luxTitle.trim();
        });
      });
    }
  }

  trackTab(index: number, luxTab: LuxTabComponent) {
    return index;
  }
}
