import { OverlayRef } from '@angular/cdk/overlay';

export class LuxFilePreviewRef {
  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
