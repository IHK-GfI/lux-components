import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { LUX_FILE_PREVIEW_DATA } from './lux-file-preview-config';
import { LuxFilePreviewData } from './lux-file-preview-data';
import { LuxFilePreviewImgViewerComponent } from './lux-file-preview-imgviewer/lux-file-preview-imgviewer.component';
import {
  LuxFilePreviewNotSupportedViewerComponent
} from './lux-file-preview-notsupportedviewer/lux-file-preview-notsupportedviewer.component';
import { LuxFilePreviewPdfViewerComponent } from './lux-file-preview-pdfviewer/lux-file-preview-pdfviewer.component';

@Component({
  selector: 'lux-file-preview',
  templateUrl: './lux-file-preview.component.html',
  styleUrls: ['./lux-file-preview.component.scss']
})
export class LuxFilePreviewComponent implements OnInit {
  @ViewChild(LuxFilePreviewPdfViewerComponent) pdfViewer?: LuxFilePreviewPdfViewerComponent;
  @ViewChild(LuxFilePreviewImgViewerComponent) imgViewer?: LuxFilePreviewImgViewerComponent;
  @ViewChild(LuxFilePreviewNotSupportedViewerComponent) notSupportedViewer?: LuxFilePreviewNotSupportedViewerComponent;

  fileType: 'img' | 'pdf' | 'notsupported' = 'notsupported';

  constructor(@Inject(LUX_FILE_PREVIEW_DATA) public data: LuxFilePreviewData) {}

  ngOnInit(): void {
    if (this.data && this.data.fileObject && this.data.fileObject.type.indexOf('image/') > -1) {
      this.fileType = 'img';
    } else if (this.data && this.data.fileObject && this.data.fileObject.type.indexOf('application/pdf') > -1) {
      this.fileType = 'pdf';
    } else {
      this.fileType = 'notsupported';
    }
  }

  onClose() {
    if (this.pdfViewer) {
      this.pdfViewer.onClose();
    } else if (this.imgViewer) {
      this.imgViewer.onClose();
    } else if (this.notSupportedViewer) {
      this.notSupportedViewer.onClose();
    }
  }
}
