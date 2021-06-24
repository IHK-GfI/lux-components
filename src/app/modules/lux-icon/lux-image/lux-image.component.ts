import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lux-image',
  templateUrl: './lux-image.component.html',
  styleUrls: ['./lux-image.component.scss']
})
export class LuxImageComponent implements OnChanges {
  @Input() luxImageSrc = '';
  @Input() luxImageWidth = 'auto';
  @Input() luxImageHeight = 'auto';
  @Input() luxRawSrc = false;

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxImageSrc) {
      if (!this.luxRawSrc) {
        this.updateImageSrc();
      }
    } else if (simpleChanges.luxRawSrc) {
      if (!this.luxRawSrc) {
        this.updateImageSrc();
      }
    }
  }

  private updateImageSrc() {
    if (this.luxImageSrc) {
      // Pruefen ob es sich um ein externes Bild handelt
      if (this.luxImageSrc.startsWith('http')) {
        this.sanitizeImageSrc();
      } else {
        // Wenn nicht, auf den Assets-Ordner verweisen
        if (this.luxImageSrc.indexOf('asset') === -1) {
          this.luxImageSrc = 'assets/' + this.luxImageSrc;
        }
        this.sanitizeImageSrc();
      }
    }
  }

  private sanitizeImageSrc() {
    // Doppelte Slashes entfernen
    this.luxImageSrc = this.luxImageSrc.replace(/\/\/+/g, '/');
    // Fuehrende Slashes entfernen
    if (this.luxImageSrc.startsWith('/')) {
      this.luxImageSrc = this.luxImageSrc.slice(1, this.luxImageSrc.length);
    }
  }
}
