import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LuxFilePreviewBase } from '../lux-file-preview-base/lux-file-preview-base';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';
import { LuxFilePreviewRef } from '../lux-file-preview-ref';

@Component({
  selector: 'lux-file-preview-imgviewer',
  templateUrl: './lux-file-preview-imgviewer.component.html',
  styleUrls: ['./lux-file-preview-imgviewer.component.scss']
})
export class LuxFilePreviewImgViewerComponent extends LuxFilePreviewBase implements OnInit, AfterViewInit {
  @ViewChild('previewImg') previewImg: ElementRef;

  zoomActive = false;
  zoomWidth = 0;
  zoomStep = 250;

  constructor(
    protected previewRef: LuxFilePreviewRef,
    @Inject(LUX_FILE_PREVIEW_DATA) protected previewData: LuxFilePreviewData,
    public sanitizer: DomSanitizer
  ) {
    super(previewRef, previewData, sanitizer);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.zoomActive =
        this.previewImg && this.previewImg.nativeElement.naturalWidth - this.paddingWith > window.innerWidth;
    });
  }

  onLoad(event: Event) {
    this.zoomActive =
      this.previewImg && this.previewImg.nativeElement.naturalWidth - this.paddingWith > window.innerWidth;
    this.loadingFinished();
  }

  onZoomIn() {
    this.zoomWidth += this.zoomStep;
    this.clearFocus();
  }

  onZoomOut() {
    this.zoomWidth -= this.zoomStep;
    this.clearFocus();
  }
}
