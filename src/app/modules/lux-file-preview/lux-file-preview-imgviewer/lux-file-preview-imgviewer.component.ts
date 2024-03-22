import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LuxFilePreviewBase } from '../lux-file-preview-base/lux-file-preview-base';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';
import { LuxFilePreviewRef } from '../lux-file-preview-ref';

@Component({
  selector: 'lux-file-preview-imgviewer',
  templateUrl: './lux-file-preview-imgviewer.component.html'
})
export class LuxFilePreviewImgViewerComponent extends LuxFilePreviewBase implements OnInit, AfterViewInit {
  @ViewChild('previewImg') previewImg?: ElementRef;

  zoomActive = false;
  zoomWidth = 0;
  zoomStep = 250;

  constructor(
    private elementRef: ElementRef,
    protected previewRef: LuxFilePreviewRef,
    @Inject(LUX_FILE_PREVIEW_DATA) public previewData: LuxFilePreviewData,
    public sanitizer: DomSanitizer
  ) {
    super(previewRef, previewData, sanitizer);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.previewImg) {
        this.zoomActive = this.previewImg && this.previewImg.nativeElement.naturalWidth - this.paddingWith > window.innerWidth;

        const firstButton = (this.elementRef.nativeElement as HTMLElement).querySelector('button');
        if (firstButton) {
          firstButton.focus();
        }
      }
    });
  }

  onLoad() {
    if (this.previewImg) {
      this.zoomActive = this.previewImg && this.previewImg.nativeElement.naturalWidth - this.paddingWith > window.innerWidth;
    }
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
