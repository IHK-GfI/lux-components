import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LuxActionModule } from '../lux-action/lux-action.module';
import { LuxCommonModule } from '../lux-common/lux-common.module';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxFormModule } from '../lux-form/lux-form.module';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../lux-layout/lux-layout.module';
import { LuxFilePreviewImgViewerComponent } from './lux-file-preview-imgviewer/lux-file-preview-imgviewer.component';
import { LuxFilePreviewNotSupportedViewerComponent } from './lux-file-preview-notsupportedviewer/lux-file-preview-notsupportedviewer.component';
import { LuxFilePreviewPdfViewerComponent } from './lux-file-preview-pdfviewer/lux-file-preview-pdfviewer.component';
import { LuxFilePreviewToolbarComponent } from './lux-file-preview-toolbar/lux-file-preview-toolbar.component';
import { LuxFilePreviewComponent } from './lux-file-preview.component';

@NgModule({
  declarations: [
    LuxFilePreviewComponent,
    LuxFilePreviewToolbarComponent,
    LuxFilePreviewPdfViewerComponent,
    LuxFilePreviewImgViewerComponent,
    LuxFilePreviewNotSupportedViewerComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    FlexLayoutModule,
    LuxCommonModule,
    LuxLayoutModule,
    LuxActionModule,
    LuxIconModule,
    LuxFormModule,
    LuxDirectivesModule
  ],
  exports: [
    LuxFilePreviewComponent,
    LuxFilePreviewToolbarComponent,
    LuxFilePreviewPdfViewerComponent,
    LuxFilePreviewImgViewerComponent,
    LuxFilePreviewNotSupportedViewerComponent
  ]
})
export class LuxFilePreviewModule {}
