import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LuxFilePreviewBase } from '../lux-file-preview-base/lux-file-preview-base';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';
import { LuxFilePreviewRef } from '../lux-file-preview-ref';

@Component({
  selector: 'lux-file-preview-notsupportedviewer',
  templateUrl: './lux-file-preview-notsupportedviewer.component.html'
})
export class LuxFilePreviewNotSupportedViewerComponent extends LuxFilePreviewBase implements OnInit {
  counter = 5;
  timer: any;

  downloadLabelDefault = $localize`:@@luxc.file-preview.notsupportedviewer.download.lbl:Download... `;
  downloadLabel = 'Zur Ansicht Downloaden';

  constructor(
    protected previewRef: LuxFilePreviewRef,
    @Inject(LUX_FILE_PREVIEW_DATA) protected previewData: LuxFilePreviewData,
    protected sanitizer: DomSanitizer
  ) {
    super(previewRef, previewData, sanitizer);
  }

  onDownload() {
    super.onDownload();
  }

  onClose() {
    super.onClose();
  }
}
