import { InjectionToken } from '@angular/core';
import { LuxFilePreviewData } from './lux-file-preview-data';

export const LUX_FILE_PREVIEW_DATA = new InjectionToken<LuxFilePreviewData>('LUX_FILE_PREVIEW_DATA');

export interface LuxFilePreviewConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  previewData: LuxFilePreviewData;
}
