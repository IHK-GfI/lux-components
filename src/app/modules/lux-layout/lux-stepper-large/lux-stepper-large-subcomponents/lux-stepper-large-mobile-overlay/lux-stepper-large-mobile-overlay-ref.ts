import { OverlayRef } from '@angular/cdk/overlay';

export class LuxStepperLargeMobileOverlayRef {
  focusedElement: Element | null = null;

  constructor(private overlayRef: OverlayRef) {
    this.focusedElement = document.activeElement;
  }

  close(): void {
    this.overlayRef.dispose();

    if (this.focusedElement instanceof HTMLElement) {
      this.focusedElement.focus();
    }
  }
}
