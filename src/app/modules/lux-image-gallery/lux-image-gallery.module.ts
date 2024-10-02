import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxImageGalleryComponent } from './lux-image-gallery.component';
import { LuxIconModule } from "../lux-icon/lux-icon.module";
import { LuxActionModule } from "../lux-action/lux-action.module";
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule,
    LuxIconModule,
    LuxActionModule,
    OverlayModule,
    PortalModule
],
  declarations: [LuxImageGalleryComponent],
  exports: [
    LuxImageGalleryComponent
  ]
})
export class LuxImageGalleryModule { }
