import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LuxFilePreviewBase } from '../lux-file-preview-base/lux-file-preview-base';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';
import { LuxFilePreviewRef } from '../lux-file-preview-ref';

@Component({
  selector: 'lux-file-preview-notsupportedviewer',
  templateUrl: './lux-file-preview-notsupportedviewer.component.html',
  styleUrls: ['./lux-file-preview-notsupportedviewer.component.scss']
})
export class LuxFilePreviewNotSupportedViewerComponent extends LuxFilePreviewBase implements OnInit {
  counter = 5;
  timer: any;

  downloadLabelDefault = 'Download... ';
  downloadLabel = this.downloadLabelDefault + this.counter;

  constructor(
    protected previewRef: LuxFilePreviewRef,
    @Inject(LUX_FILE_PREVIEW_DATA) protected previewData: LuxFilePreviewData,
    protected sanitizer: DomSanitizer
  ) {
    super(previewRef, previewData, sanitizer);
  }

  ngOnInit() {
    this.updateDownloadLabel();
  }

  onDownload() {
    clearTimeout(this.timer);

    super.onDownload();
  }

  onClose() {
    clearTimeout(this.timer);

    super.onClose();
  }

  updateDownloadLabel() {
    this.timer = setTimeout(() => {
      if (this.counter > 0) {
        this.counter--;
        this.downloadLabel = this.downloadLabelDefault + this.counter;
        this.updateDownloadLabel();
      } else {
        this.onDownload();
      }
    }, 1000);
  }
}
