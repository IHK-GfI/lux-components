import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxHtmlComponent } from './lux-html/lux-html.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxSanitizePipe } from './lux-sanitize/lux-sanitize.pipe';

@NgModule({
  declarations: [LuxHtmlComponent, LuxSanitizePipe],
  imports: [CommonModule, FlexLayoutModule],
  exports: [LuxHtmlComponent]
})
export class LuxHtmlModule {}
