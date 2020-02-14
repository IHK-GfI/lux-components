import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuxRelativeTimestampPipe } from './lux-relative-timestamp/lux-relative-timestamp.pipe';
import { LuxRenderPropertyPipe } from './lux-render-property/lux-render-property.pipe';
import { LuxPropertyFromObjectPipe } from './lux-property-from-object/lux-property-from-object.pipe';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxAlphabeticallySortedPipe } from './lux-alphabetically-sorted/lux-alphabetically-sorted.pipe';

@NgModule({
  imports: [CommonModule, LuxComponentsConfigModule],
  declarations: [
    LuxRelativeTimestampPipe,
    LuxRenderPropertyPipe,
    LuxPropertyFromObjectPipe,
    LuxAlphabeticallySortedPipe
  ],
  exports: [LuxRelativeTimestampPipe, LuxRenderPropertyPipe, LuxPropertyFromObjectPipe, LuxAlphabeticallySortedPipe]
})
export class LuxPipesModule {}
