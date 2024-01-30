import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { LuxFilePreviewBase } from '../lux-file-preview-base/lux-file-preview-base';
import { LUX_FILE_PREVIEW_DATA } from '../lux-file-preview-config';
import { LuxFilePreviewData } from '../lux-file-preview-data';
import { LuxFilePreviewRef } from '../lux-file-preview-ref';

@Component({
  selector: 'lux-file-preview-pdfviewer',
  templateUrl: './lux-file-preview-pdfviewer.component.html',
  styleUrls: ['./lux-file-preview-pdfviewer.component.scss']
})
export class LuxFilePreviewPdfViewerComponent extends LuxFilePreviewBase implements OnInit, AfterViewInit {
  showAll = true;

  page = 1;
  numPages = 0;

  loadingDivLeft = 0;
  loadingDivTop = 0;
  loadingDivWidth = 100;
  loadingDivHeight = 50;

  options: any[] = [
    { label: ' 15%', value: 0.15 },
    { label: ' 25%', value: 0.25 },
    { label: ' 50%', value: 0.5 },
    { label: ' 75%', value: 0.75 },
    { label: '100%', value: 1.0 },
    { label: '150%', value: 1.5 },
    { label: '200%', value: 2.0 }
  ];
  zoom: any = this.options[4];

  constructor(
    private elementRef: ElementRef,
    protected previewRef: LuxFilePreviewRef,
    @Inject(LUX_FILE_PREVIEW_DATA) protected previewData: LuxFilePreviewData,
    protected sanitizer: DomSanitizer
  ) {
    super(previewRef, previewData, sanitizer);
  }

  ngOnInit() {
    super.ngOnInit();

    this.loadingDivLeft = window.innerWidth / 2 - this.loadingDivWidth / 2;
    this.loadingDivTop = window.innerHeight / 2 - this.loadingDivHeight / 2;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const firstButton = (this.elementRef.nativeElement as HTMLElement).querySelector('button');
      if (firstButton) {
        firstButton.focus();
      }
    });
  }

  onPrevPage() {
    this.page--;
    this.clearFocus();
  }

  onNextPage() {
    this.page++;
    this.clearFocus();
  }

  pageRendered(e: any) {
    if (e && e.pageNumber === 1) {
      this.loadingFinished();
    }
  }

  callBackFn(pdf: any) {
    this.numPages = pdf.numPages;

    pdf.getPage(1).then((page: any) => {
      let viewportWidth = 0;
      let currentIndex = 0;

      while (viewportWidth === 0 || viewportWidth > this.width) {
        viewportWidth =
          (page as any).getViewport({
            scale: this.zoom.value
          }).width * PdfViewerComponent.CSS_UNITS;

        currentIndex = this.options.findIndex((currentZoom) => currentZoom === this.zoom);

        if (currentIndex === 0) {
          break;
        }

        if (viewportWidth > this.width) {
          this.zoom = this.options[Math.max(currentIndex - 1, 0)];
        }
      }
    });
  }

  onError(event: any) {
    console.log(event);
  }

  onProgress() {}
}
