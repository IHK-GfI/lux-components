import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';

@Component({
  selector: 'lux-file-preview-toolbar',
  templateUrl: './lux-file-preview-toolbar.component.html'
})
export class LuxFilePreviewToolbarComponent implements OnDestroy {
  mobileView: boolean;
  subscription: Subscription;

  constructor(private mediaQueryService: LuxMediaQueryObserverService, @Inject(LUX_FILE_PREVIEW_DATA) public data: LuxFilePreviewData) {
    this.mobileView = mediaQueryService.activeMediaQuery === 'xs';

    this.subscription = this.mediaQueryService.getMediaQueryChangedAsObservable().subscribe((query: string) => {
      this.mobileView = query === 'xs';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
