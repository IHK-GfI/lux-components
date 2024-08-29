import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ILuxBreadcrumbEntry } from './lux-breadcrumb-model/lux-breadcrumb-entry.interface';
import { LuxMediaQueryObserverService } from '../lux-util/lux-media-query-observer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-breadcrumb',
  templateUrl: './lux-breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxBreadcrumbComponent implements OnDestroy {
  @Input() luxEntries?: ILuxBreadcrumbEntry[] = [];

  @Output() luxClicked: EventEmitter<ILuxBreadcrumbEntry> = new EventEmitter();

  mobileView: boolean;
  subscriptions: Subscription[] = [];

  constructor(private mediaQueryService: LuxMediaQueryObserverService) {
    this.mobileView = mediaQueryService.activeMediaQuery === 'xs' || mediaQueryService.activeMediaQuery === 'sd';

    this.subscriptions.push(this.mediaQueryService.getMediaQueryChangedAsObservable().subscribe((query) => {
      this.mobileView = query === 'xs' || query === 'sd';
    }));

  }

  clicked(item: ILuxBreadcrumbEntry) {
    this.luxClicked.emit(item);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getIconSize(): string{
    if (this.mobileView) {
      return '18px'
    }
    return '20px'
  }

}
