import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { ILuxImageGallerySources } from './lux-image-gallery-model/lux-image-gallery-source.interface';

@Component({
  selector: 'lux-image-gallery',
  templateUrl: './lux-image-gallery.component.html',
  styleUrls: ['./lux-image-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxImageGalleryComponent {

  @ViewChild(CdkPortal) portal!: CdkPortal;

  @Input()
  luxImageSrcPreview: string = '';

  @Input()
  luxImageSrc: ILuxImageGallerySources[] = [];

  currentImgIndex = 0;

  overlayRef?: OverlayRef;

  constructor(private overlay: Overlay) {}


  onOpenGallery() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      panelClass: 'lux-image-gallery-content',
      backdropClass: 'lux-image-gallery-backdrop'
    });

    this.currentImgIndex = 0;

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);

    //this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  onNextImage() {
    if (this.currentImgIndex < this.luxImageSrc.length - 1) {
      this.currentImgIndex++;
    }
  }

  onPrevImage() {
    if (this.currentImgIndex > 0) {
      this.currentImgIndex--;
    }
  }

  onImageClose() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
