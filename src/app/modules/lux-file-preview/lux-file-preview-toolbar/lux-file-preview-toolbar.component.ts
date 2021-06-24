import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';

@Component({
  selector: 'lux-file-preview-toolbar',
  templateUrl: './lux-file-preview-toolbar.component.html',
  styleUrls: ['./lux-file-preview-toolbar.component.scss']
})
export class LuxFilePreviewToolbarComponent implements OnInit, OnDestroy{

  mobileView: boolean;
  subscription: Subscription;

  constructor(
    private mediaQueryService: LuxMediaQueryObserverService,
    @Inject(LUX_FILE_PREVIEW_DATA) public data: LuxFilePreviewData
  ) {}

  ngOnInit() {
    this.subscription = this.mediaQueryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
